// ============================================================
// Uplift — Feed Page
// ============================================================

import { VIDEOS, CATEGORIES, getCreator, formatCount } from './data.js';
import { state, saveState, showToast } from './app.js';
import { openComments } from './comments.js';

let feedContainer = null;
let progressInterval = null;
let currentActiveIndex = 0;

// SVG Icons
const ICONS = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  bookmarkFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>',
};

function formatDescription(desc) {
  return desc.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

function createVideoCard(video, index) {
  const creator = getCreator(video.creatorId);
  const category = CATEGORIES[video.category];
  const isLiked = state.likedVideos.has(video.id);
  const isSaved = state.savedVideos.has(video.id);
  const isFollowing = state.following.has(video.creatorId);
  const likeCount = isLiked ? video.likes + 1 : video.likes;

  const card = document.createElement('div');
  card.className = 'video-card';
  card.dataset.index = index;
  card.dataset.videoId = video.id;

  const gradientStyle = `background: linear-gradient(135deg, ${video.gradientColors.join(', ')});`;

  card.innerHTML = `
    <!-- Progress bar -->
    <div class="video-progress">
      <div class="video-progress-fill"></div>
    </div>

    <!-- Video background -->
    <div class="video-bg" style="${gradientStyle}"></div>

    <!-- Play indicator -->
    <div class="play-indicator">${ICONS.play}</div>

    ${video.isLive ? `
      <div class="live-badge">LIVE</div>
      <div class="live-viewers">
        ${ICONS.eye} ${formatCount(Math.floor(Math.random() * 5000 + 500))} watching
      </div>
    ` : ''}

    <!-- Content title (centered) -->
    <div class="video-content-title">
      <h2>${video.title}</h2>
      <div class="category-badge" style="color: ${category.color};">
        <span>${category.emoji}</span> ${category.name}
      </div>
    </div>

    <!-- Bottom info -->
    <div class="video-info">
      <div class="video-info-creator">
        <div class="creator-avatar" style="background: ${creator.color}20; color: ${creator.color};">
          ${getInitials(creator.displayName)}
        </div>
        <span class="creator-name">@${creator.username}</span>
        <button class="follow-btn ${isFollowing ? 'following' : ''}" data-creator-id="${creator.id}">
          ${isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
      <div class="video-description">${formatDescription(video.description)}</div>
      <div class="video-sound">
        ${ICONS.music}
        <div class="sound-marquee"><span>${video.sound}&nbsp;&nbsp;&nbsp;&nbsp;${video.sound}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
      </div>
      <div class="video-inspired">
        ${ICONS.sparkle} ${formatCount(video.inspired)} people inspired
      </div>
    </div>

    ${index === 0 ? `
      <div class="swipe-hint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
        <span>Swipe up</span>
      </div>
    ` : ''}

    <!-- Action bar -->
    <div class="action-bar">
      <div class="action-avatar" style="background: ${creator.color}30; color: ${creator.color};">
        ${getInitials(creator.displayName)}
        ${!isFollowing ? '<span class="action-avatar-plus">+</span>' : ''}
      </div>

      <button class="action-btn action-like ${isLiked ? 'liked' : ''}" data-video-id="${video.id}" data-action="like">
        ${isLiked ? ICONS.heartFilled : ICONS.heart}
        <span class="action-count">${formatCount(likeCount)}</span>
      </button>

      <button class="action-btn action-comment" data-video-id="${video.id}" data-action="comment">
        ${ICONS.comment}
        <span class="action-count">${formatCount(video.comments)}</span>
      </button>

      <button class="action-btn action-share" data-video-id="${video.id}" data-action="share">
        ${ICONS.share}
        <span class="action-count">${formatCount(video.shares)}</span>
      </button>

      <button class="action-btn action-save ${isSaved ? 'saved' : ''}" data-video-id="${video.id}" data-action="save">
        ${isSaved ? ICONS.bookmarkFilled : ICONS.bookmark}
        <span class="action-count">${formatCount(video.saves)}</span>
      </button>

      <div class="action-impact" title="Impact Score">
        <span class="impact-value">${video.impactScore}</span>
        <span class="impact-label">Impact</span>
      </div>
    </div>
  `;

  return card;
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = parseInt(entry.target.dataset.index);
        if (index !== currentActiveIndex) {
          setActiveVideo(index);
          // Hide swipe hint after first scroll
          const hint = feedContainer.querySelector('.swipe-hint');
          if (hint) hint.remove();
        }
      }
    });
  }, {
    root: feedContainer,
    threshold: [0.5],
  });

  feedContainer.querySelectorAll('.video-card').forEach(card => {
    observer.observe(card);
  });
}

function setActiveVideo(index) {
  const prevCard = feedContainer.querySelector(`.video-card[data-index="${currentActiveIndex}"]`);
  if (prevCard) {
    prevCard.classList.remove('active-card');
    prevCard.classList.add('paused');
  }

  currentActiveIndex = index;
  state.currentVideoIndex = index;

  const card = feedContainer.querySelector(`.video-card[data-index="${index}"]`);
  if (card) {
    card.classList.add('active-card');
    card.classList.remove('paused');
    startProgress(card);
  }
}

function startProgress(card) {
  clearInterval(progressInterval);
  const fill = card.querySelector('.video-progress-fill');
  if (!fill) return;

  const videoId = card.dataset.videoId;
  const video = VIDEOS.find(v => v.id === videoId);
  const duration = (video?.duration || 15) * 1000;
  const startTime = Date.now();

  fill.style.transition = 'none';
  fill.style.width = '0%';

  // Force reflow
  fill.offsetHeight;

  fill.style.transition = `width ${duration}ms linear`;
  fill.style.width = '100%';

  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= duration) {
      clearInterval(progressInterval);
      // Auto-advance to next video
      const nextIndex = currentActiveIndex + 1;
      if (nextIndex < VIDEOS.length) {
        const nextCard = feedContainer.querySelector(`.video-card[data-index="${nextIndex}"]`);
        if (nextCard) {
          nextCard.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Loop back to first
        fill.style.transition = 'none';
        fill.style.width = '0%';
        fill.offsetHeight;
        fill.style.transition = `width ${duration}ms linear`;
        fill.style.width = '100%';
      }
    }
  }, 500);
}

function handleActionClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const videoId = btn.dataset.videoId;
  const video = VIDEOS.find(v => v.id === videoId);
  if (!video) return;

  switch (action) {
    case 'like':
      toggleLike(videoId, video, btn);
      break;
    case 'comment':
      openComments(videoId);
      break;
    case 'share':
      handleShare(video);
      break;
    case 'save':
      toggleSave(videoId, video, btn);
      break;
  }
}

function toggleLike(videoId, video, btn) {
  const isLiked = state.likedVideos.has(videoId);
  if (isLiked) {
    state.likedVideos.delete(videoId);
    btn.classList.remove('liked');
    btn.innerHTML = `${ICONS.heart}<span class="action-count">${formatCount(video.likes)}</span>`;
  } else {
    state.likedVideos.add(videoId);
    btn.classList.add('liked');
    btn.innerHTML = `${ICONS.heartFilled}<span class="action-count">${formatCount(video.likes + 1)}</span>`;
  }
  saveState();
}

function toggleSave(videoId, video, btn) {
  const isSaved = state.savedVideos.has(videoId);
  if (isSaved) {
    state.savedVideos.delete(videoId);
    btn.classList.remove('saved');
    btn.innerHTML = `${ICONS.bookmark}<span class="action-count">${formatCount(video.saves)}</span>`;
    showToast('Removed from saved');
  } else {
    state.savedVideos.add(videoId);
    btn.classList.add('saved');
    btn.innerHTML = `${ICONS.bookmarkFilled}<span class="action-count">${formatCount(video.saves + 1)}</span>`;
    showToast('Saved!');
  }
  saveState();
}

function handleShare(video) {
  if (navigator.share) {
    navigator.share({
      title: `Uplift: ${video.title}`,
      text: video.description,
      url: window.location.href,
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      showToast('Link copied!');
    }).catch(() => {
      showToast('Link copied!');
    });
  }
}

function handleDoubleTap(e) {
  const card = e.target.closest('.video-card');
  if (!card) return;
  if (e.target.closest('.action-bar') || e.target.closest('.video-info') || e.target.closest('.follow-btn')) return;

  const videoId = card.dataset.videoId;
  const video = VIDEOS.find(v => v.id === videoId);
  if (!video) return;

  // Show heart burst animation
  const heartBurst = document.getElementById('heart-burst');
  const rect = card.getBoundingClientRect();
  heartBurst.style.left = `${e.clientX || e.touches?.[0]?.clientX || rect.width / 2}px`;
  heartBurst.style.top = `${e.clientY || e.touches?.[0]?.clientY || rect.height / 2}px`;
  heartBurst.classList.remove('active');
  heartBurst.offsetHeight; // Force reflow
  heartBurst.classList.add('active');
  setTimeout(() => heartBurst.classList.remove('active'), 900);

  // Like the video
  if (!state.likedVideos.has(videoId)) {
    state.likedVideos.add(videoId);
    const likeBtn = card.querySelector('.action-like');
    if (likeBtn) {
      likeBtn.classList.add('liked');
      likeBtn.innerHTML = `${ICONS.heartFilled}<span class="action-count">${formatCount(video.likes + 1)}</span>`;
    }
    saveState();
  }
}

function handleTapToPause(e) {
  const card = e.target.closest('.video-card');
  if (!card) return;
  if (e.target.closest('.action-bar') || e.target.closest('.video-info') || e.target.closest('.follow-btn')) return;

  card.classList.toggle('paused');
  if (card.classList.contains('paused')) {
    clearInterval(progressInterval);
  } else {
    startProgress(card);
  }
}

function handleFollowClick(e) {
  const btn = e.target.closest('.follow-btn');
  if (!btn) return;

  const creatorId = btn.dataset.creatorId;
  const isFollowing = state.following.has(creatorId);

  if (isFollowing) {
    state.following.delete(creatorId);
    btn.classList.remove('following');
    btn.textContent = 'Follow';
  } else {
    state.following.add(creatorId);
    btn.classList.add('following');
    btn.textContent = 'Following';
    showToast('Following!');
  }
  saveState();
}

// ----- Double-tap detection -----
let lastTapTime = 0;
function handleTap(e) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    handleDoubleTap(e);
    lastTapTime = 0;
  } else {
    lastTapTime = now;
    // Single tap — delay to check for double tap
    setTimeout(() => {
      if (lastTapTime !== 0 && Date.now() - lastTapTime >= 280) {
        handleTapToPause(e);
        lastTapTime = 0;
      }
    }, 300);
  }
}

// ----- Public API -----
export function initFeed() {
  const page = document.getElementById('page-feed');

  feedContainer = document.createElement('div');
  feedContainer.className = 'feed-container';
  page.appendChild(feedContainer);

  // Render video cards
  VIDEOS.forEach((video, index) => {
    feedContainer.appendChild(createVideoCard(video, index));
  });

  // Event listeners
  feedContainer.addEventListener('click', handleActionClick);
  feedContainer.addEventListener('click', handleFollowClick);
  feedContainer.addEventListener('click', handleTap);

  // Setup scroll observation
  setupIntersectionObserver();

  // Activate first video
  setActiveVideo(0);
}

export function showFeed() {
  setActiveVideo(currentActiveIndex);
}

export function hideFeed() {
  clearInterval(progressInterval);
}

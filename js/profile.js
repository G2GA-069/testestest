// ============================================================
// Uplift — Profile Page
// ============================================================

import { VIDEOS, CATEGORIES, formatCount } from './data.js';
import { navigateTo } from './app.js';
import { loadUser, getInitials } from './auth.js';

function animateCounter(el, target, duration = 1200) {
  const startTime = performance.now();
  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatCount(Math.floor(target * eased));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export function initProfile() {}

function renderProfile() {
  const page = document.getElementById('page-profile');
  const user = loadUser();
  if (!user) return;

  const initials = getInitials(user.username);
  const likedCount = user.likedVideos?.length || 0;
  const savedCount = user.savedVideos?.length || 0;
  const followingCount = user.following?.length || 0;

  // Simulated stats from user activity
  const totalInspired = likedCount * 120 + savedCount * 80 + (user.videosWatched || 0) * 5;
  const impactScore = Math.min(5.0, 1.0 + (likedCount * 0.3) + (savedCount * 0.2)).toFixed(1);
  const timeWatched = Math.max(1, Math.floor((user.videosWatched || 0) * 15 / 60));

  // Build interest-based category breakdown
  const interests = user.interests || [];
  const catBreakdown = {};
  interests.forEach(catId => { catBreakdown[catId] = Math.floor(Math.random() * 80) + 20; });
  if (Object.keys(catBreakdown).length === 0) {
    catBreakdown['kindness'] = 60;
    catBreakdown['education'] = 40;
  }
  const maxCat = Math.max(...Object.values(catBreakdown), 1);

  // Get videos for grid
  const userLikedVideos = VIDEOS.filter(v => user.likedVideos?.includes(v.id));
  const userSavedVideos = VIDEOS.filter(v => user.savedVideos?.includes(v.id));
  const defaultVideos = VIDEOS.slice(0, 6);

  page.innerHTML = `
    <div class="profile-page">
      <div class="profile-top-bar">
        <div style="width:24px"></div>
        <span class="profile-top-username">@${user.username}</span>
        <button class="profile-settings-btn" id="profile-settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      <div class="profile-header">
        <div class="profile-avatar" style="background: ${user.avatarColor}20; color: ${user.avatarColor}; border-color: ${user.avatarColor};">
          ${initials}
        </div>
        <div class="profile-name">${user.displayName}</div>
        <div class="profile-username">@${user.username}</div>
        <div class="profile-anon-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Anonymous
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value">${followingCount}</div>
            <div class="profile-stat-label">Following</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${user.videosWatched || 0}</div>
            <div class="profile-stat-label">Watched</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${likedCount}</div>
            <div class="profile-stat-label">Likes</div>
          </div>
        </div>
      </div>

      <div class="impact-dashboard">
        <div class="impact-dashboard-title">
          <svg viewBox="0 0 24 24" fill="var(--gold)" stroke="none" width="18" height="18"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
          Your Impact
        </div>
        <div class="impact-metrics">
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--gold);" data-counter="${totalInspired}">0</div>
            <div class="impact-metric-label">People Inspired</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--accent);">${impactScore}</div>
            <div class="impact-metric-label">Impact Score</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--environment);">${user.videosWatched || 0}</div>
            <div class="impact-metric-label">Videos Watched</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--education);">${timeWatched}m</div>
            <div class="impact-metric-label">Time Well Spent</div>
          </div>
        </div>
        ${Object.keys(catBreakdown).length > 0 ? `
          <div class="impact-categories">
            ${Object.entries(catBreakdown).map(([catId, count]) => {
              const cat = CATEGORIES[catId];
              if (!cat) return '';
              const pct = Math.round((count / maxCat) * 100);
              return `
                <div class="impact-cat-row">
                  <span class="impact-cat-label">${cat.emoji} ${cat.name}</span>
                  <div class="impact-cat-bar">
                    <div class="impact-cat-fill" style="width: ${pct}%; background: ${cat.color};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>

      <div class="profile-tabs">
        <button class="profile-tab active" data-tab="liked">Liked</button>
        <button class="profile-tab" data-tab="saved">Saved</button>
      </div>

      <div class="profile-grid" id="profile-grid">
        ${(userLikedVideos.length > 0 ? userLikedVideos : defaultVideos).map(v => `
          <div class="profile-grid-item" data-video-id="${v.id}">
            <div class="profile-grid-bg" style="background: linear-gradient(135deg, ${v.gradientColors.join(', ')});"></div>
            <div class="profile-grid-views">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ${formatCount(v.inspired)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Settings button
  page.querySelector('#profile-settings').addEventListener('click', () => navigateTo('settings'));

  // Tab switching
  page.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      page.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      let videos = tabName === 'saved' ? userSavedVideos : userLikedVideos;
      if (videos.length === 0) videos = defaultVideos;
      const grid = page.querySelector('#profile-grid');
      grid.innerHTML = videos.map(v => `
        <div class="profile-grid-item" data-video-id="${v.id}">
          <div class="profile-grid-bg" style="background: linear-gradient(135deg, ${v.gradientColors.join(', ')});"></div>
          <div class="profile-grid-views">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ${formatCount(v.inspired)}
          </div>
        </div>
      `).join('');
    });
  });
}

export function showProfile() {
  renderProfile();
  setTimeout(() => {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter);
      if (target) animateCounter(el, target);
    });
  }, 200);
}

export function hideProfile() {}

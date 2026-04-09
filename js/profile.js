// ============================================================
// Uplift — Profile Page
// ============================================================

import { VIDEOS, CATEGORIES, CREATORS, formatCount } from './data.js';
import { state } from './app.js';

// Use creator c6 (Kindness Kai) as the "current user" for demo
const CURRENT_USER = CREATORS.find(c => c.id === 'c6');

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = formatCount(current);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

export function initProfile() {
  renderProfile();
}

function renderProfile() {
  const page = document.getElementById('page-profile');
  const user = CURRENT_USER;

  // Calculate totals
  const userVideos = VIDEOS.filter(v => v.creatorId === user.id);
  const totalInspired = userVideos.reduce((sum, v) => sum + v.inspired, 0);
  const totalLikes = userVideos.reduce((sum, v) => sum + v.likes, 0);

  // Category breakdown
  const catBreakdown = {};
  userVideos.forEach(v => {
    catBreakdown[v.category] = (catBreakdown[v.category] || 0) + v.inspired;
  });
  const maxCat = Math.max(...Object.values(catBreakdown), 1);

  // Saved videos
  const savedVideos = VIDEOS.filter(v => state.savedVideos.has(v.id));

  page.innerHTML = `
    <div class="profile-page">
      <div class="profile-header">
        <div class="profile-avatar" style="background: ${user.color}20; color: ${user.color};">
          ${getInitials(user.displayName)}
        </div>
        <div class="profile-name">${user.displayName}</div>
        <div class="profile-username">@${user.username}</div>
        <div class="profile-bio">${user.bio}</div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value">${formatCount(user.following)}</div>
            <div class="profile-stat-label">Following</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${formatCount(user.followers)}</div>
            <div class="profile-stat-label">Followers</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${formatCount(totalLikes)}</div>
            <div class="profile-stat-label">Likes</div>
          </div>
        </div>
        <button class="profile-edit-btn">Edit Profile</button>
      </div>

      <!-- Impact Dashboard -->
      <div class="impact-dashboard">
        <div class="impact-dashboard-title">
          <svg viewBox="0 0 24 24" fill="var(--gold)" stroke="none"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
          Your Impact
        </div>
        <div class="impact-metrics">
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--gold);" data-counter="${totalInspired}">0</div>
            <div class="impact-metric-label">People Inspired</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--accent);">${user.impactScore}</div>
            <div class="impact-metric-label">Impact Score</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--environment);">${userVideos.length}</div>
            <div class="impact-metric-label">Videos Created</div>
          </div>
          <div class="impact-metric">
            <div class="impact-metric-value" style="color: var(--education);">42h</div>
            <div class="impact-metric-label">Time Well Spent</div>
          </div>
        </div>
        <div class="impact-categories">
          ${Object.entries(catBreakdown).map(([catId, count]) => {
            const cat = CATEGORIES[catId];
            const pct = Math.round((count / maxCat) * 100);
            return `
              <div class="impact-cat-row">
                <span class="impact-cat-label">${cat.emoji} ${cat.name}</span>
                <div class="impact-cat-bar">
                  <div class="impact-cat-fill" style="width: ${pct}%; background: ${cat.color};" data-width="${pct}"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Tabs -->
      <div class="profile-tabs">
        <button class="profile-tab active" data-tab="videos">My Videos</button>
        <button class="profile-tab" data-tab="saved">Saved</button>
        <button class="profile-tab" data-tab="liked">Liked</button>
      </div>

      <!-- Video Grid -->
      <div class="profile-grid" id="profile-grid">
        ${userVideos.map(v => `
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

  // Tab switching
  page.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      page.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabName = tab.dataset.tab;
      let videos = [];
      if (tabName === 'videos') videos = userVideos;
      else if (tabName === 'saved') videos = savedVideos.length ? savedVideos : VIDEOS.slice(0, 3);
      else if (tabName === 'liked') videos = VIDEOS.filter(v => state.likedVideos.has(v.id));

      if (videos.length === 0) videos = VIDEOS.slice(0, 3); // Fallback for demo

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
  renderProfile(); // Re-render to pick up state changes
  // Animate counters
  setTimeout(() => {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter);
      if (target) animateCounter(el, target);
    });
  }, 200);
}

export function hideProfile() {}

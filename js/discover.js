// ============================================================
// Uplift — Discover Page
// ============================================================

import { CATEGORIES, VIDEOS, CREATORS, getCreator, formatCount } from './data.js';
import { showToast } from './app.js';

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

function getCategoryVideoCount(catId) {
  return VIDEOS.filter(v => v.category === catId).length;
}

export function initDiscover() {
  const page = document.getElementById('page-discover');

  const categoryCards = Object.values(CATEGORIES).map(cat => {
    const count = getCategoryVideoCount(cat.id);
    return `
      <button class="category-card" data-category="${cat.id}" style="background: linear-gradient(135deg, ${cat.color}30, ${cat.color}10); border: 1px solid ${cat.color}25;">
        <div class="category-card-icon">${cat.emoji}</div>
        <div class="category-card-name" style="color: ${cat.color};">${cat.name}</div>
        <div class="category-card-count">${count * 1200}+ videos</div>
      </button>
    `;
  }).join('');

  // Top trending videos
  const trendingCards = VIDEOS
    .sort((a, b) => b.inspired - a.inspired)
    .slice(0, 8)
    .map(v => {
      const creator = getCreator(v.creatorId);
      return `
        <div class="trending-card" data-video-id="${v.id}">
          <div class="trending-card-bg" style="background: linear-gradient(135deg, ${v.gradientColors.join(', ')});"></div>
          <div class="trending-card-info">
            <div class="trending-card-title">${v.title}</div>
            <div class="trending-card-views">
              <span class="inspired-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
                ${formatCount(v.inspired)} inspired
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

  // Rising creators
  const creatorCards = CREATORS
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 8)
    .map(c => `
      <div class="creator-card" data-creator-id="${c.id}">
        <div class="creator-card-avatar" style="background: ${c.color}20; color: ${c.color}; border-color: ${c.color};">
          ${getInitials(c.displayName)}
        </div>
        <div class="creator-card-name">${c.displayName}</div>
      </div>
    `).join('');

  page.innerHTML = `
    <div class="discover-page">
      <div class="discover-header">
        <h1>Discover</h1>
        <div class="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search positive content..." id="discover-search">
        </div>
      </div>

      <div class="discover-section">
        <div class="discover-section-title">Impact Categories</div>
        <div class="category-grid">
          ${categoryCards}
        </div>
      </div>

      <div class="discover-section">
        <div class="discover-section-title">Trending Now</div>
        <div class="trending-scroll">
          ${trendingCards}
        </div>
      </div>

      <div class="discover-section">
        <div class="discover-section-title">Rising Creators</div>
        <div class="creator-scroll">
          ${creatorCards}
        </div>
      </div>

      <div class="discover-section" style="padding-bottom: 20px;">
        <div class="discover-section-title">For You</div>
        <div class="trending-scroll">
          ${VIDEOS.slice(0, 6).map(v => `
            <div class="trending-card" data-video-id="${v.id}">
              <div class="trending-card-bg" style="background: linear-gradient(135deg, ${v.gradientColors.join(', ')});"></div>
              <div class="trending-card-info">
                <div class="trending-card-title">${v.title}</div>
                <div class="trending-card-views">${formatCount(v.likes)} likes</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Category card click — show toast (in full version, would filter feed)
  page.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.category;
      const cat = CATEGORIES[catId];
      showToast(`${cat.emoji} Browsing ${cat.name}`);
    });
  });

  // Search input
  const searchInput = page.querySelector('#discover-search');
  searchInput?.addEventListener('input', () => {
    // Simple UI feedback for prototype
    if (searchInput.value.length > 0) {
      showToast('Search coming soon!');
    }
  });
}

export function showDiscover() {
  document.getElementById('page-discover').classList.add('active');
}

export function hideDiscover() {
  document.getElementById('page-discover').classList.remove('active');
}

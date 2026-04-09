// ============================================================
// Uplift — Main App Controller
// ============================================================

import { initFeed, showFeed, hideFeed } from './feed.js';
import { initDiscover, showDiscover, hideDiscover } from './discover.js';
import { initProfile, showProfile, hideProfile } from './profile.js';
import { initLive, showLive, hideLive } from './live.js';
import { initComments } from './comments.js';

// ----- State -----
export const state = {
  currentPage: 'feed',
  likedVideos: new Set(),
  savedVideos: new Set(),
  following: new Set(),
  currentVideoIndex: 0,
};

// Load persisted state
try {
  const saved = JSON.parse(localStorage.getItem('uplift_state'));
  if (saved) {
    if (saved.likedVideos) state.likedVideos = new Set(saved.likedVideos);
    if (saved.savedVideos) state.savedVideos = new Set(saved.savedVideos);
    if (saved.following) state.following = new Set(saved.following);
  }
} catch (e) { /* ignore */ }

export function saveState() {
  try {
    localStorage.setItem('uplift_state', JSON.stringify({
      likedVideos: [...state.likedVideos],
      savedVideos: [...state.savedVideos],
      following: [...state.following],
    }));
  } catch (e) { /* ignore */ }
}

// ----- Toast -----
let toastTimeout = null;
export function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove('show'), 2200);
}

// ----- Router -----
const pages = {
  feed:     { show: showFeed,     hide: hideFeed },
  discover: { show: showDiscover, hide: hideDiscover },
  create:   { show: showCreate,   hide: hideCreate },
  live:     { show: showLive,     hide: hideLive },
  profile:  { show: showProfile,  hide: hideProfile },
};

function showCreate() {
  document.getElementById('page-create').classList.add('active');
}
function hideCreate() {
  document.getElementById('page-create').classList.remove('active');
}

function navigateTo(page) {
  if (page === state.currentPage) return;
  const prev = pages[state.currentPage];
  if (prev) prev.hide();
  document.getElementById(`page-${state.currentPage}`)?.classList.remove('active');

  state.currentPage = page;
  document.getElementById(`page-${page}`)?.classList.add('active');
  const next = pages[page];
  if (next) next.show();

  // Update nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
}

// ----- Init -----
function initApp() {
  // Init all pages
  initComments();
  initFeed();
  initDiscover();
  initProfile();
  initLive();
  initCreatePage();

  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Hash routing (optional, for direct links)
  const hash = location.hash.replace('#', '');
  if (hash && pages[hash]) {
    navigateTo(hash);
  }

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (h && pages[h]) navigateTo(h);
  });
}

// ----- Create Page (simple, inline) -----
function initCreatePage() {
  const page = document.getElementById('page-create');

  const categories = [
    { name: 'Education', color: '#4A9EFF', emoji: '\uD83C\uDF93' },
    { name: 'Environment', color: '#4ADF8A', emoji: '\uD83C\uDF31' },
    { name: 'Health', color: '#FF6B9D', emoji: '\u2764\uFE0F' },
    { name: 'Community', color: '#FFB84A', emoji: '\uD83E\uDD1D' },
    { name: 'Innovation', color: '#A855F7', emoji: '\uD83D\uDCA1' },
    { name: 'Kindness', color: '#F59E0B', emoji: '\u2728' },
  ];

  page.innerHTML = `
    <div class="create-page">
      <div class="create-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
      <h1 class="create-title">Share Something That Matters</h1>
      <p class="create-subtitle">Create content that inspires, educates, and uplifts</p>
      <div class="create-categories">
        ${categories.map(c => `
          <button class="create-cat-chip" style="border-color: ${c.color}; color: ${c.color};">
            ${c.emoji} ${c.name}
          </button>
        `).join('')}
      </div>
      <div class="create-actions">
        <button class="create-action-btn" id="create-record">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
          Record
        </button>
        <button class="create-action-btn" id="create-upload">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload
        </button>
      </div>
    </div>
  `;

  page.querySelector('#create-record')?.addEventListener('click', () => showToast('Camera access coming soon!'));
  page.querySelector('#create-upload')?.addEventListener('click', () => showToast('Upload feature coming soon!'));
}

// Boot
document.addEventListener('DOMContentLoaded', initApp);

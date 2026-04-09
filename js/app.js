// ============================================================
// Uplift — Main App Controller
// ============================================================

import { initFeed, showFeed, hideFeed } from './feed.js';
import { initDiscover, showDiscover, hideDiscover } from './discover.js';
import { initProfile, showProfile, hideProfile } from './profile.js';
import { initLive, showLive, hideLive } from './live.js';
import { initSettings, showSettings, hideSettings } from './settings.js';
import { initComments } from './comments.js';
import { isLoggedIn, loadUser, logout } from './auth.js';
import { showOnboarding, hideOnboarding } from './onboarding.js';

// ----- State -----
export const state = {
  currentPage: 'feed',
  currentVideoIndex: 0,
};

// ----- Toast -----
let toastTimeout = null;
export function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
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
  settings: { show: showSettings, hide: hideSettings },
};

function showCreate() {
  document.getElementById('page-create').classList.add('active');
}
function hideCreate() {
  document.getElementById('page-create').classList.remove('active');
}

export function navigateTo(page) {
  if (page === state.currentPage) return;
  const prev = pages[state.currentPage];
  if (prev) prev.hide();
  document.getElementById(`page-${state.currentPage}`)?.classList.remove('active');

  state.currentPage = page;
  document.getElementById(`page-${page}`)?.classList.add('active');
  const next = pages[page];
  if (next) next.show();

  // Update nav (settings doesn't have a nav item)
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Show/hide nav for settings
  const nav = document.getElementById('bottom-nav');
  if (page === 'settings') {
    nav.style.display = 'none';
  } else {
    nav.style.display = '';
  }
}

// ----- Splash Screen -----
function hideSplash() {
  return new Promise(resolve => {
    const splash = document.getElementById('splash');
    splash.classList.add('splash-exit');
    setTimeout(() => {
      splash.style.display = 'none';
      resolve();
    }, 600);
  });
}

// ----- Boot the app -----
function showApp() {
  document.getElementById('app').style.display = '';

  initComments();
  initFeed();
  initDiscover();
  initProfile();
  initLive();
  initSettings();
  initCreatePage();

  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Custom navigation events (from settings, etc.)
  window.addEventListener('navigate', (e) => {
    navigateTo(e.detail);
  });

  // Logout event
  window.addEventListener('logout', () => {
    document.getElementById('app').style.display = 'none';
    showOnboarding(onOnboardingComplete);
  });
}

function onOnboardingComplete(user) {
  // Reload the app with the new user
  document.getElementById('app').style.display = '';
  // Re-init pages that depend on user data
  initFeed();
  initProfile();
  navigateTo('feed');
  showToast(`Welcome, ${user.displayName}!`);
}

// ----- Create Page (simple, inline) -----
function initCreatePage() {
  const page = document.getElementById('page-create');
  const user = loadUser();

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

// ----- Entry Point -----
async function boot() {
  // Show splash for minimum 1.2s
  await new Promise(r => setTimeout(r, 1200));
  await hideSplash();

  if (isLoggedIn()) {
    showApp();
  } else {
    showOnboarding(user => {
      showApp();
      showToast(`Welcome to Uplift, ${user.displayName}!`);
    });
  }
}

document.addEventListener('DOMContentLoaded', boot);

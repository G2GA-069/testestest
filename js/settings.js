// ============================================================
// Uplift — Settings Page
// ============================================================

import { loadUser, updateUser, logout, regenerateUsername, rerollAvatarColor, getInitials } from './auth.js';
import { showToast } from './app.js';

let settingsRendered = false;

function renderSettings() {
  const page = document.getElementById('page-settings');
  const user = loadUser();
  if (!user) return;

  const initials = getInitials(user.username);

  page.innerHTML = `
    <div class="settings-page">
      <div class="settings-header">
        <button class="settings-back" id="settings-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1>Settings</h1>
        <div style="width:24px"></div>
      </div>

      <!-- Identity Section -->
      <div class="settings-section">
        <div class="settings-section-title">Your Identity</div>
        <div class="settings-identity-card">
          <div class="settings-avatar" id="settings-avatar" style="background: ${user.avatarColor}20; color: ${user.avatarColor}; border-color: ${user.avatarColor};">
            ${initials}
          </div>
          <div class="settings-identity-info">
            <div class="settings-display-name" id="settings-display-name">${user.displayName}</div>
            <div class="settings-username" id="settings-username">@${user.username}</div>
          </div>
        </div>
        <div class="settings-row-group">
          <button class="settings-row" id="settings-new-name">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            </span>
            <span class="settings-row-label">Generate new identity</span>
            <span class="settings-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
          <button class="settings-row" id="settings-new-color">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
            </span>
            <span class="settings-row-label">Change avatar color</span>
            <span class="settings-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
          <button class="settings-row" id="settings-edit-name">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </span>
            <span class="settings-row-label">Edit display name</span>
            <span class="settings-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="settings-section">
        <div class="settings-section-title">Preferences</div>
        <div class="settings-row-group">
          <div class="settings-row settings-toggle-row">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </span>
            <span class="settings-row-label">Auto-play next video</span>
            <label class="settings-toggle">
              <input type="checkbox" id="settings-autoplay" checked>
              <span class="settings-toggle-track"></span>
            </label>
          </div>
          <div class="settings-row settings-toggle-row">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <span class="settings-row-label">Show inspired counts</span>
            <label class="settings-toggle">
              <input type="checkbox" id="settings-inspired" checked>
              <span class="settings-toggle-track"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy Section -->
      <div class="settings-section">
        <div class="settings-section-title">Privacy & Data</div>
        <div class="settings-row-group">
          <div class="settings-row settings-info-row">
            <span class="settings-row-icon" style="color: var(--environment);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <div class="settings-row-info">
              <span class="settings-row-label">Your data stays on this device</span>
              <span class="settings-row-desc">We don't collect, store, or transmit any personal information. Your identity exists only in this browser.</span>
            </div>
          </div>
          <button class="settings-row" id="settings-clear-history">
            <span class="settings-row-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </span>
            <span class="settings-row-label">Clear watch history</span>
            <span class="settings-row-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </button>
        </div>
      </div>

      <!-- About Section -->
      <div class="settings-section">
        <div class="settings-section-title">About</div>
        <div class="settings-row-group">
          <div class="settings-row settings-info-row">
            <span class="settings-row-icon" style="color: var(--kindness);">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
            </span>
            <div class="settings-row-info">
              <span class="settings-row-label">Uplift v0.1.0</span>
              <span class="settings-row-desc">A platform for content that helps society and contributes to a better world.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="settings-section">
        <button class="settings-logout" id="settings-logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign out & delete identity
        </button>
        <p class="settings-logout-note">This permanently deletes your anonymous identity from this device. You'll start fresh next time.</p>
      </div>
    </div>
  `;

  // Event listeners
  page.querySelector('#settings-back').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'profile' }));
  });

  page.querySelector('#settings-new-name').addEventListener('click', () => {
    const updated = regenerateUsername();
    if (updated) {
      refreshIdentityUI(page, updated);
      showToast('New identity generated!');
    }
  });

  page.querySelector('#settings-new-color').addEventListener('click', () => {
    const updated = rerollAvatarColor();
    if (updated) {
      refreshIdentityUI(page, updated);
      showToast('Avatar color changed!');
    }
  });

  page.querySelector('#settings-edit-name').addEventListener('click', () => {
    const user = loadUser();
    const newName = prompt('Enter a display name:', user?.displayName || '');
    if (newName && newName.trim()) {
      updateUser({ displayName: newName.trim() });
      const updated = loadUser();
      refreshIdentityUI(page, updated);
      showToast('Display name updated!');
    }
  });

  page.querySelector('#settings-clear-history').addEventListener('click', () => {
    updateUser({ videosWatched: 0, timeSpent: 0 });
    showToast('Watch history cleared');
  });

  page.querySelector('#settings-logout').addEventListener('click', () => {
    if (confirm('This will permanently delete your anonymous identity. Continue?')) {
      logout();
      window.dispatchEvent(new CustomEvent('logout'));
    }
  });

  settingsRendered = true;
}

function refreshIdentityUI(page, user) {
  const initials = getInitials(user.username);
  const avatar = page.querySelector('#settings-avatar');
  avatar.textContent = initials;
  avatar.style.background = `${user.avatarColor}20`;
  avatar.style.color = user.avatarColor;
  avatar.style.borderColor = user.avatarColor;
  page.querySelector('#settings-display-name').textContent = user.displayName;
  page.querySelector('#settings-username').textContent = `@${user.username}`;
}

export function initSettings() {
  // Rendered on demand
}

export function showSettings() {
  renderSettings();
  document.getElementById('page-settings').classList.add('active');
}

export function hideSettings() {
  document.getElementById('page-settings').classList.remove('active');
}

// ============================================================
// Uplift — Live Page (Coming Soon)
// ============================================================

import { showToast } from './app.js';

export function initLive() {
  const page = document.getElementById('page-live');

  page.innerHTML = `
    <div class="live-page">
      <div class="live-icon-container">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M23 7l-7 5 7 5V7z"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      </div>

      <h1 class="live-title">Live Discussions</h1>
      <p class="live-subtitle">Watch shorts together with others and have real-time conversations about content that matters.</p>

      <div class="live-features">
        <div class="live-feature">
          <div class="live-feature-icon" style="background: rgba(255,45,85,0.15);">
            \uD83D\uDCE1
          </div>
          <div class="live-feature-text">
            <strong>Go Live in Shorts</strong><br>
            Stream directly within the short-form format
          </div>
        </div>
        <div class="live-feature">
          <div class="live-feature-icon" style="background: rgba(74,158,255,0.15);">
            \uD83D\uDCAC
          </div>
          <div class="live-feature-text">
            <strong>Real-Time Discussion</strong><br>
            Chat with everyone watching the same short
          </div>
        </div>
        <div class="live-feature">
          <div class="live-feature-icon" style="background: rgba(74,223,138,0.15);">
            \uD83C\uDF0D
          </div>
          <div class="live-feature-text">
            <strong>Global Conversations</strong><br>
            Connect with people who care about the same causes
          </div>
        </div>
      </div>

      <button class="live-notify-btn" id="live-notify-btn">
        Notify Me When It's Ready
      </button>
    </div>
  `;

  page.querySelector('#live-notify-btn')?.addEventListener('click', (e) => {
    e.target.textContent = 'You\'ll be notified!';
    e.target.style.background = 'var(--bg-elevated)';
    e.target.style.boxShadow = 'none';
    e.target.style.border = '1px solid var(--border)';
    showToast('We\'ll notify you when Live launches!');
  });
}

export function showLive() {
  document.getElementById('page-live').classList.add('active');
}

export function hideLive() {
  document.getElementById('page-live').classList.remove('active');
}

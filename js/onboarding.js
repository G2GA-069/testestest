// ============================================================
// Uplift — Onboarding Flow
// ============================================================
// 3-step onboarding: Welcome → Interests → Identity → Done
// No personal info collected. Fully anonymous.

import { CATEGORIES } from './data.js';
import { createUser, generateUsername, generateAvatarColor, getInitials } from './auth.js';

let currentStep = 0;
let selectedInterests = [];
let previewUsername = '';
let previewColor = '';
let onCompleteCallback = null;

const STEPS = ['welcome', 'interests', 'identity'];

function renderWelcome(container) {
  container.innerHTML = `
    <div class="onboard-step onboard-welcome">
      <div class="onboard-logo">
        <div class="onboard-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L14.4 9.2L22 12L14.4 14.8L12 22L9.6 14.8L2 12L9.6 9.2Z"/>
          </svg>
        </div>
        <h1 class="onboard-app-name">Uplift</h1>
        <p class="onboard-tagline">Content that matters</p>
      </div>
      <div class="onboard-welcome-features">
        <div class="onboard-feature">
          <span class="onboard-feature-icon">\uD83D\uDD12</span>
          <div>
            <strong>Completely Anonymous</strong>
            <p>No email. No phone. No tracking. Just you.</p>
          </div>
        </div>
        <div class="onboard-feature">
          <span class="onboard-feature-icon">\u2728</span>
          <div>
            <strong>Content That Inspires</strong>
            <p>Short videos that educate, uplift, and connect.</p>
          </div>
        </div>
        <div class="onboard-feature">
          <span class="onboard-feature-icon">\uD83C\uDF0D</span>
          <div>
            <strong>Make An Impact</strong>
            <p>Every view, like, and share contributes to change.</p>
          </div>
        </div>
      </div>
      <button class="onboard-btn onboard-btn-primary" id="onboard-start">
        Get Started
      </button>
      <p class="onboard-privacy-note">No personal data collected. Ever.</p>
    </div>
  `;

  container.querySelector('#onboard-start').addEventListener('click', () => goToStep(1));
}

function renderInterests(container) {
  const cats = Object.values(CATEGORIES);
  container.innerHTML = `
    <div class="onboard-step onboard-interests">
      <div class="onboard-step-header">
        <button class="onboard-back" id="onboard-back-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="onboard-progress">
          <div class="onboard-progress-fill" style="width: 50%"></div>
        </div>
      </div>
      <h2 class="onboard-title">What matters to you?</h2>
      <p class="onboard-subtitle">Pick at least one. This helps us show you content you care about.</p>
      <div class="onboard-interest-grid">
        ${cats.map(cat => `
          <button class="onboard-interest-card" data-cat-id="${cat.id}" style="--cat-color: ${cat.color};">
            <span class="onboard-interest-emoji">${cat.emoji}</span>
            <span class="onboard-interest-name">${cat.name}</span>
            <div class="onboard-interest-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </button>
        `).join('')}
      </div>
      <button class="onboard-btn onboard-btn-primary" id="onboard-next-interests" disabled>
        Continue
      </button>
    </div>
  `;

  const cards = container.querySelectorAll('.onboard-interest-card');
  const nextBtn = container.querySelector('#onboard-next-interests');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.catId;
      card.classList.toggle('selected');
      if (card.classList.contains('selected')) {
        if (!selectedInterests.includes(catId)) selectedInterests.push(catId);
      } else {
        selectedInterests = selectedInterests.filter(id => id !== catId);
      }
      nextBtn.disabled = selectedInterests.length === 0;
    });
  });

  nextBtn.addEventListener('click', () => goToStep(2));
  container.querySelector('#onboard-back-1').addEventListener('click', () => goToStep(0));
}

function renderIdentity(container) {
  previewUsername = generateUsername();
  previewColor = generateAvatarColor();
  const initials = getInitials(previewUsername);
  const displayName = previewUsername.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\s\d+$/, '');

  container.innerHTML = `
    <div class="onboard-step onboard-identity">
      <div class="onboard-step-header">
        <button class="onboard-back" id="onboard-back-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="onboard-progress">
          <div class="onboard-progress-fill" style="width: 100%"></div>
        </div>
      </div>
      <h2 class="onboard-title">Your anonymous identity</h2>
      <p class="onboard-subtitle">This is randomly generated. Nobody knows who you are.</p>

      <div class="onboard-identity-card">
        <div class="onboard-avatar" id="onboard-avatar" style="background: ${previewColor}20; color: ${previewColor}; border-color: ${previewColor};">
          ${initials}
        </div>
        <div class="onboard-identity-name" id="onboard-display-name">${displayName}</div>
        <div class="onboard-identity-username" id="onboard-username">@${previewUsername}</div>
        <div class="onboard-identity-actions">
          <button class="onboard-reroll" id="onboard-reroll-name">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            New name
          </button>
          <button class="onboard-reroll" id="onboard-reroll-color">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
            New color
          </button>
        </div>
      </div>

      <div class="onboard-anon-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Your identity is stored only on this device
      </div>

      <button class="onboard-btn onboard-btn-primary" id="onboard-complete">
        Enter Uplift
      </button>
    </div>
  `;

  container.querySelector('#onboard-reroll-name').addEventListener('click', () => {
    previewUsername = generateUsername();
    const newInitials = getInitials(previewUsername);
    const newDisplay = previewUsername.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\s\d+$/, '');
    container.querySelector('#onboard-username').textContent = `@${previewUsername}`;
    container.querySelector('#onboard-display-name').textContent = newDisplay;
    const avatar = container.querySelector('#onboard-avatar');
    avatar.textContent = newInitials;
  });

  container.querySelector('#onboard-reroll-color').addEventListener('click', () => {
    previewColor = generateAvatarColor();
    const avatar = container.querySelector('#onboard-avatar');
    avatar.style.background = `${previewColor}20`;
    avatar.style.color = previewColor;
    avatar.style.borderColor = previewColor;
  });

  container.querySelector('#onboard-back-2').addEventListener('click', () => goToStep(1));
  container.querySelector('#onboard-complete').addEventListener('click', completeOnboarding);
}

function goToStep(step) {
  currentStep = step;
  const container = document.getElementById('onboarding');
  container.classList.add('onboard-transitioning');

  setTimeout(() => {
    switch (step) {
      case 0: renderWelcome(container); break;
      case 1: renderInterests(container); break;
      case 2: renderIdentity(container); break;
    }
    container.classList.remove('onboard-transitioning');
  }, 200);
}

function completeOnboarding() {
  const displayName = previewUsername.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\s\d+$/, '');
  const user = createUser(selectedInterests, displayName);
  // Override with our preview values
  user.username = previewUsername;
  user.avatarColor = previewColor;
  user.displayName = displayName;

  // Save via auth module
  const { saveUser } = { saveUser: (u) => localStorage.setItem('uplift_user', JSON.stringify(u)) };
  saveUser(user);

  // Hide onboarding
  const onboarding = document.getElementById('onboarding');
  onboarding.classList.add('onboard-exit');
  setTimeout(() => {
    onboarding.style.display = 'none';
    onboarding.classList.remove('onboard-exit');
    if (onCompleteCallback) onCompleteCallback(user);
  }, 500);
}

export function showOnboarding(onComplete) {
  onCompleteCallback = onComplete;
  currentStep = 0;
  selectedInterests = [];
  const container = document.getElementById('onboarding');
  container.style.display = 'flex';
  container.classList.remove('onboard-exit');
  renderWelcome(container);
}

export function hideOnboarding() {
  const container = document.getElementById('onboarding');
  if (container) container.style.display = 'none';
}

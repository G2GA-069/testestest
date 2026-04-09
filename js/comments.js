// ============================================================
// Uplift — Comment Bottom Sheet
// ============================================================

import { getComments, formatCount } from './data.js';
import { showToast } from './app.js';

let currentVideoId = null;
let sheetEl = null;
let backdropEl = null;
let listEl = null;
let countEl = null;
let inputEl = null;
let startY = 0;
let currentY = 0;
let isDragging = false;

function renderComments(videoId) {
  const comments = getComments(videoId);
  countEl.textContent = `${formatCount(comments.length)} comments`;

  listEl.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-item-avatar">${c.username.charAt(0).toUpperCase()}</div>
      <div class="comment-item-body">
        <div class="comment-item-username">@${c.username}</div>
        <div class="comment-item-text">${c.text}</div>
        <div class="comment-item-meta">
          <span>${c.timestamp}</span>
          <span class="comment-item-like" data-comment-id="${c.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${formatCount(c.likes)}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

export function openComments(videoId) {
  currentVideoId = videoId;
  renderComments(videoId);

  sheetEl.classList.add('active');
  backdropEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeComments() {
  sheetEl.classList.remove('active');
  backdropEl.classList.remove('active');
  sheetEl.style.transform = '';
  document.body.style.overflow = '';
  currentVideoId = null;
}

function handleSend() {
  const text = inputEl.value.trim();
  if (!text || !currentVideoId) return;

  // Add comment to top of list
  const item = document.createElement('div');
  item.className = 'comment-item';
  item.style.animation = 'slideUp 0.3s ease';
  item.innerHTML = `
    <div class="comment-item-avatar">Y</div>
    <div class="comment-item-body">
      <div class="comment-item-username">@you</div>
      <div class="comment-item-text">${text}</div>
      <div class="comment-item-meta">
        <span>Just now</span>
        <span class="comment-item-like">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          0
        </span>
      </div>
    </div>
  `;

  listEl.insertBefore(item, listEl.firstChild);
  inputEl.value = '';
  showToast('Comment added!');
}

// Drag-to-dismiss
function handleTouchStart(e) {
  const handle = e.target.closest('.comment-sheet-handle');
  if (!handle) return;
  isDragging = true;
  startY = e.touches[0].clientY;
  sheetEl.style.transition = 'none';
}

function handleTouchMove(e) {
  if (!isDragging) return;
  currentY = e.touches[0].clientY - startY;
  if (currentY < 0) currentY = 0;
  sheetEl.style.transform = `translateX(-50%) translateY(${currentY}px)`;
}

function handleTouchEnd() {
  if (!isDragging) return;
  isDragging = false;
  sheetEl.style.transition = '';
  if (currentY > 120) {
    closeComments();
  } else {
    sheetEl.style.transform = '';
    sheetEl.classList.add('active');
  }
  currentY = 0;
}

export function initComments() {
  sheetEl = document.getElementById('comment-sheet');
  backdropEl = document.getElementById('comment-backdrop');
  listEl = document.getElementById('comment-list');
  countEl = sheetEl.querySelector('.comment-sheet-count');
  inputEl = document.getElementById('comment-input');

  // Close button
  sheetEl.querySelector('.comment-sheet-close').addEventListener('click', closeComments);

  // Backdrop click to close
  backdropEl.addEventListener('click', closeComments);

  // Send comment
  document.getElementById('comment-send').addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Drag to dismiss
  sheetEl.addEventListener('touchstart', handleTouchStart, { passive: true });
  sheetEl.addEventListener('touchmove', handleTouchMove, { passive: true });
  sheetEl.addEventListener('touchend', handleTouchEnd);
}

// Exported for app.js to call after DOMContentLoaded

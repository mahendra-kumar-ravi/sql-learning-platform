import { getCurrentUser, isLoggedIn, requireLogin } from './auth.js';
import { saveProgress as apiSaveProgress, getProgress as apiGetProgress } from './api.js';

// ─── Hybrid Progress (Local for Guest, API for Logged-in) ───────────
async function getProgress() {
  if (isLoggedIn()) {
    try {
      // Aggregate from API for current track
      const user = getCurrentUser();
      return await apiGetProgress(user.trackId || '');  // Update based on context
    } catch {
      console.warn('API failed, falling back to local');
    }
  }
  // Guest: localStorage
  return JSON.parse(localStorage.getItem("sqlProgress") || "{}");
}

async function saveProgress(trackId, questionId) {
  if (isLoggedIn()) {
    try {
      requireLogin();
      await apiSaveProgress({ trackId, questionId });
    } catch (err) {
      console.error('API save failed:', err);
      // Fallback to local
      _localSaveProgress(trackId, questionId);
    }
  } else {
    // Guest: local only
    _localSaveProgress(trackId, questionId);
  }
}

function _localSaveProgress(trackId, questionId) {
  const p = JSON.parse(localStorage.getItem("sqlProgress") || "{}");
  if (!p[trackId]) p[trackId] = [];
  if (!p[trackId].includes(questionId)) p[trackId].push(questionId);
  localStorage.setItem("sqlProgress", JSON.stringify(p));
}

function isCompleted(trackId, questionId) {
  const p = getProgress();
  return p[trackId] && p[trackId].includes(questionId);
}

function getCompletedCount(trackId) {
  const p = getProgress();
  return (p[trackId] || []).length;
}

// ─── URL Param Helper ────────────────────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}


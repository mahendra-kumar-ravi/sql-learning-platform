import { getCurrentUser, isLoggedIn, requireLogin, initAuth, updateUserStatus, logout as authLogout, showLoginModal, hideAuthModal } from './auth.js';
import { saveProgress as apiSaveProgress, getProgress as apiGetProgress } from './api.js';

// ─── Progress Data (LocalStorage Cache for sync display, API sync on save) ───────────
function getProgressData() {
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
  const p = getProgressData();
  return p[trackId] && p[trackId].includes(questionId);
}

function getCompletedCount(trackId) {
  const p = getProgressData();
  return (p[trackId] || []).length;
}

// ─── URL Param Helper ────────────────────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function loadTracks() {
  const grid = document.getElementById('tracksGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const trackData = [
    {id: 'SQL10', name: 'SQL10', tagline: 'Beginner Level', icon: '🌱', color: '#22c55e', count: 10},
    {id: 'SQL50', name: 'SQL50', tagline: 'Interview Prep', icon: '⚡', color: '#f59e0b', count: 5},
    {id: 'SQL75_Analyst', name: 'SQL75', tagline: 'Data Analyst Track', icon: '📊', color: '#3b82f6', count: 3},
    {id: 'SQL75_Engineer', name: 'SQL75', tagline: 'Data Engineer Track', icon: '⚙️', color: '#8b5cf6', count: 2}
  ];
  
  trackData.forEach((track, idx) => {
    const completed = getCompletedCount(track.id);
    const pct = track.count ? Math.round((completed / track.count) * 100) : 0;
    
    const card = document.createElement('div');
    card.className = 'track-card fade-up';
    card.style.animationDelay = `${idx * 0.1}s`;
    card.onclick = (e) => {
      e.preventDefault();
      location.href = `track.html?track=${track.id}`;
    };
    card.innerHTML = `
      <div class="track-icon" style="color: ${track.color};">${track.icon}</div>
      <h3>${track.name}</h3>
      <p>${track.tagline}</p>
      <div class="track-stats">
        <span>${completed}/${track.count} • ${pct}%</span>
        <div class="prog-bar-track">
          <div class="prog-fill-track" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// App Init
document.addEventListener('DOMContentLoaded', function() {
  initAuth();
  updateUserStatus();
  loadTracks();
  
  // Navbar events
  document.getElementById('userMenuBtn').onclick = function() {
    document.getElementById('userMenu').classList.toggle('show');
  };
  
  document.getElementById('loginBtn').onclick = showLoginModal;
  document.getElementById('logoutBtn').onclick = authLogout;
  
  // Modal close
  document.querySelector('.close-btn').onclick = hideAuthModal;
  
  // Close menu on outside click
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('userMenu');
    const btn = document.getElementById('userMenuBtn');
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});


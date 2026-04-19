// Auth state & helpers
import { login as apiLogin, register as apiRegister } from './api.js';

let currentUser = null;

export function getCurrentUser() {
  if (currentUser) return currentUser;
  
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    // Decode JWT to get user info (no API call)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { username: payload.sub };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function isGuest() {
  return !isLoggedIn();
}

export function requireLogin() {
  if (!isLoggedIn()) {
    showLoginModal();
    throw new Error('Login required');
  }
}

export function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  location.reload();  // Refresh UI
}

// UI Helpers
export function showLoginModal() {
  document.getElementById('authModal').classList.add('show');
  document.getElementById('loginTab').click();
}

export function hideAuthModal() {
  document.getElementById('authModal').classList.remove('show');
}

// User type helpers
export function getUserType() {
  if (isGuest()) return 'guest';
  return 'user';  // Admin check would need API call
}

export function initAuth() {
  const authForm = document.getElementById('authForm');
  if (!authForm) return;
  
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginFields = document.getElementById('loginFields');
    const isLogin = loginFields.style.display !== 'none';
    
    try {
      if (isLogin) {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        await apiLogin(email, password);
      } else {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        await apiRegister({username, email, password});
        await apiLogin(email, password); // auto login
      }
      hideAuthModal();
      location.reload(); // Refresh UI
    } catch (error) {
      alert(error.message || 'Authentication failed');
    }
  });
  
  // Tab switch
  ['loginTab', 'registerTab'].forEach(tabId => {
    const tabBtn = document.getElementById(tabId);
    tabBtn.onclick = () => {
      document.getElementById('loginFields').style.display = tabId === 'loginTab' ? 'block' : 'none';
      document.getElementById('registerFields').style.display = tabId === 'registerTab' ? 'block' : 'none';
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
    };
  });
}

export function updateUserStatus() {
  const userStatus = document.getElementById('userStatus');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.getElementById('loginBtn');
  const userInfo = document.getElementById('userInfo');
  
  if (isLoggedIn()) {
    const user = getCurrentUser();
    userStatus.textContent = user.username;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userInfo.innerHTML = `<div>${user.username}</div>`;
  } else {
    userStatus.textContent = 'Guest';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    userInfo.innerHTML = '';
  }
}


// Auth state & helpers
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


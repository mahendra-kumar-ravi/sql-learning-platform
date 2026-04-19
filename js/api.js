// API Base URL - update to your backend URL
const API_BASE = 'http://localhost:8000/api/v1';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Auth
export async function register(userData) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export async function login(email, password) {
  const formData = new FormData();
  formData.append('username', email);  // FastAPI uses username field for email
  formData.append('password', password);
  
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
}

export async function logout() {
  localStorage.removeItem('token');
}

// Progress
export async function saveProgress(trackId, questionId) {
  return apiRequest('/progress/', {
    method: 'POST',
    body: JSON.stringify({ track_id: trackId, question_id: questionId })
  });
}

export async function getProgress(trackId) {
  return apiRequest(`/progress/${trackId}`);
}

// Leaderboard
export async function getLeaderboard(trackId, limit = 100) {
  return apiRequest(`/leaderboards/${trackId}?limit=${limit}`);
}


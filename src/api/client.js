import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (name, email, password) => apiClient.post('/auth/register', { name, email, password }),
  loginWithGoogle: (credential) => apiClient.post('/auth/google', { credential }),
  logout: () => apiClient.post('/auth/logout'),
  checkAuth: () => apiClient.get('/auth/profile'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  verifyOTP: (email, otp) => apiClient.post('/auth/verify-otp', { email, otp }),
  resetPassword: (email, otp, password) => apiClient.post('/auth/reset-password', { email, otp, password }),
};

export const roadmapAPI = {
  getAll: () => apiClient.get('/roadmaps'),
  getBySlug: (slug) => apiClient.get(`/roadmaps/${slug}`),
};

export const progressAPI = {
  getForRoadmap: (roadmapId) => apiClient.get(`/progress/${roadmapId}`),
  updateTopic: (roadmapId, topicId, status) => apiClient.post(`/progress/${roadmapId}/${topicId}`, { status }),
};

export const reviewAPI = {
  getReviews: (roadmapId) => apiClient.get(`/reviews/${roadmapId}`),
  submitReview: (roadmapId, rating, comment) => apiClient.post(`/reviews/${roadmapId}`, { rating, comment }),
};

export const bookmarkAPI = {
  getBookmarks: () => apiClient.get('/bookmarks'),
  toggleBookmark: (roadmapId) => apiClient.post(`/bookmarks/${roadmapId}`)
};

export const notifyAPI = {
  subscribe: (email, roadmapId, level) => apiClient.post('/notify', { email, roadmapId, level }),
  check: (email, roadmapId, level) => apiClient.get('/notify/check', { params: { email, roadmapId, level } }),
};

export const searchAPI = {
  query: (q) => apiClient.get('/search', { params: { q } }),
};

export default apiClient;

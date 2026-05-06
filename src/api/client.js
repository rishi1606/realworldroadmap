import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  loginWithGoogle: (credential) => apiClient.post('/auth/google', { credential }),
  logout: () => apiClient.post('/auth/logout'),
  checkAuth: () => apiClient.get('/auth/me'),
};

export const roadmapAPI = {
  getAll: () => apiClient.get('/roadmaps'),
  getBySlug: (slug) => apiClient.get(`/roadmaps/${slug}`),
};

export const progressAPI = {
  getForRoadmap: (roadmapId) => apiClient.get(`/progress/${roadmapId}`),
  updateTopic: (roadmapId, topicId, status) => apiClient.put('/progress/update', {
    roadmapId,
    topicId,
    status
  }),
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

export default apiClient;

import axios from 'axios';


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const searchAPI = {
  query: (q) => apiClient.get('/search', { params: { q } }),
};

export const notifyAPI = {
  subscribe: (email, roadmapId, level) => apiClient.post('/notify', { email, roadmapId, level }),
  check: (email, roadmapId, level) => apiClient.get('/notify/check', { params: { email, roadmapId, level } }),
};

export const progressAPI = {
  get: (roadmapId) => apiClient.get(`/progress/${roadmapId}`),
  toggle: (roadmapId, topicId) => apiClient.post('/progress/toggle', { roadmapId, topicId }),
};

export default apiClient;

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ro-service-engineer-be.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (import.meta.env.MODE === 'development') {
      console.debug('API_BASE_URL:', API_BASE_URL);
      console.log('Request:', (config.method || '').toUpperCase(), config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // optional: redirect to login
      // window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_BASE_URL };

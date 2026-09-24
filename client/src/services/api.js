import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach Bearer token from localStorage
API.interceptors.request.use(
  (config) => {
    // Axios URL resolution strips paths from the baseURL if the request URL starts with a slash.
    // To prevent it from stripping '/api', we remove the leading slash.
    if (config.url && config.url.startsWith('/')) {
      config.url = config.url.substring(1);
    }
    
    // Ensure baseURL ends with a trailing slash so the relative path appends correctly
    if (config.baseURL && !config.baseURL.endsWith('/')) {
      config.baseURL += '/';
    }

    const token = localStorage.getItem('stockwise_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401 handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('stockwise_token');
      localStorage.removeItem('stockwise_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;

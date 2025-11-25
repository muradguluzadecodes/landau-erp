import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const toError = (e: unknown): Error => {
  if (e instanceof Error) return e;
  if (isAxiosError(e)) return new Error(e.message || 'Axios error');
  if (typeof e === 'string') return new Error(e);
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)['Authorization'] =
        `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(toError(error)),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Narrow before using response/status
    if (isAxiosError(error) && error.response?.status === 401) {
      console.log('Unauthorized request');
    }
    return Promise.reject(toError(error));
  },
);

export default api;

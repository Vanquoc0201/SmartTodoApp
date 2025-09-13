import axios, { AxiosResponse } from 'axios';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import { DOMAIN } from '@/constant/app.constant';

const API_BASE_URL = DOMAIN

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      authStorage.removeAccessToken();
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      return Promise.reject(error);
    }

    if (error.response?.data?.message) {
    } else if (error.message === 'Network Error') {
      toast.error('Lỗi mạng. Vui lòng kiểm tra kết nối internet của bạn.');
    } else {
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
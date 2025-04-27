import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプター（共通エラー処理など）
axiosClient.interceptors.response.use(
  (response: any) => response,
  (error: { response: any; message: any; }) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// リトライ設定（最大3回、指数バックオフ）
axiosRetry(axiosClient, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);


export default axiosClient;

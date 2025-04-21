import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター（例：トークン付与）
axiosClient.interceptors.request.use(
  (  config: any) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (  error: any) => Promise.reject(error)
);

// レスポンスインターセプター（共通エラー処理など）
axiosClient.interceptors.response.use(
  (  response: any) => response,
  (  error: { response: any; message: any; }) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// リトライ設定（最大3回、指数バックオフ）
axiosRetry(axiosClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

axiosClient.interceptors.request.use(
  (  config: { headers: { Authorization: string; }; }) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (  error: any) => Promise.reject(error)
);

export default axiosClient;

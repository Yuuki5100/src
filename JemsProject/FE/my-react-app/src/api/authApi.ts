import axiosClient from '../lib/axiosClient';

export const loginApi = async (username: string, password: string) => {
  const response = await axiosClient.post('/auth/login', { username, password });
  return response.data; // { accessToken: string, user: {...} }
};

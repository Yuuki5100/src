import axiosClient from '../lib/axiosClient';

export const loginApi = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', { email, password });
  return response.data; // { accessToken: string, user: {...} }
};

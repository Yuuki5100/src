import axiosClient from '../lib/axiosClient';

export const fetchUser = async () => {
  const response = await axiosClient.get('/user');
  return response.data;
};

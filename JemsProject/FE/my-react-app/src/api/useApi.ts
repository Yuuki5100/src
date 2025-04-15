import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/user`);
  return response.data;
};

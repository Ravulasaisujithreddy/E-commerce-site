import axios from 'axios';

const API_URL = 'https://66cb58114290b1c4f19a1971.mockapi.io/api/v1/users';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
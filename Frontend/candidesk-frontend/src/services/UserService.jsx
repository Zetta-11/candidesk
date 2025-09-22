import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/users';

const getToken = () => localStorage.getItem('token');

export const listUsers = () => {
  const token = getToken();
  return axios.get(REST_API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`, 
    }
  });
};
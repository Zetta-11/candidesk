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

export const deleteUser = (id) => {
    const token = getToken();
    return axios.delete(`${REST_API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  };
  
  export const updateUserRequest = (id, userData) => {
    const token = getToken();
    return axios.put(`${REST_API_BASE_URL}/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

  export const createUserRequest = (user) => {
    const token = getToken();
    return axios.post(REST_API_BASE_URL, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };
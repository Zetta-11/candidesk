import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/logs';

const getToken = () => localStorage.getItem('token');

export const getAllLogs = () => {
  const token = getToken();
  return axios.get(REST_API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addLog = (log) => {
  const token = getToken();
  return axios.post(REST_API_BASE_URL, log, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const clearAllLogs = () => {
  const token = getToken();
  return axios.delete(REST_API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

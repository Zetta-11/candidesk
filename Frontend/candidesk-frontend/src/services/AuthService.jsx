import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (username, password) => {
  return axios.post(
    `${API_URL}/login`,
    new URLSearchParams({ username, password }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: true }
  );
};

export const logout = async () => {
  return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export const checkAuthService = async () => {
  const response = await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
  return response.data;
};
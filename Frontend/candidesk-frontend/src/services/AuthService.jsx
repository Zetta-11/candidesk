import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
  const token = response.data;
  localStorage.setItem("token", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkAuthService = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await axios.get(`${API_URL}/api/auth/check`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data)
    return response.data;
  } catch {
    return false;
  }
};

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/users';

export const listUsers = () => axios.get(REST_API_BASE_URL, { withCredentials: true });
import axios from "axios";

const API_BASE = 'http://localhost:8080/api/profile';

export const getProfile = () => axios.get(API_BASE);
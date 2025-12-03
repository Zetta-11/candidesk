import axios from "axios";

const API_BASE = 'http://localhost:8080/api/profile';

export const getProfile = () => axios.get(API_BASE);
export const requestAccountDeletion = () => axios.post(API_BASE + "/delete-request");
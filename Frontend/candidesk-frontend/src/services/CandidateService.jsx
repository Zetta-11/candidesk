import axios from "axios";

const API_BASE = 'http://localhost:8080/api/candidates';

export const getCandidates = () => axios.get(API_BASE);
export const deleteCandidate = (id) => axios.delete(`${API_BASE}/${id}`);
export const createCandidate = (candidate) => axios.post(API_BASE, candidate);
export const updateCandidate = (id, candidate) => axios.put(`${API_BASE}/${id}`, candidate);
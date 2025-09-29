import axios from "axios";

const API_URL = "http://localhost:8080/api/vacancies";

export const getVacancies = () => axios.get(API_URL);
export const createVacancy = (vacancy) => axios.post(API_URL, vacancy);
export const updateVacancy = (id, vacancy) => axios.put(`${API_URL}/${id}`, vacancy);
export const deleteVacancy = (id) => axios.delete(`${API_URL}/${id}`);
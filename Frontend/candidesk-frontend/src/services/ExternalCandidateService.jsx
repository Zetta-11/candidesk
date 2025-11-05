import axios from "axios";

const API_BASE = "http://localhost:8080/api/external/workua/search";

export const searchWorkUaCandidates = async ({ query, page = 1 }) => {
  const response = await axios.post(API_BASE, { query, page });
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const register = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        
        throw err.response.data;
      }
      throw err;
    }
  };

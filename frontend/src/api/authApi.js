// authApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5432/api';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { email, password });
    const { user, token } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    return { user, token };
  } catch (error) {
    // console.error('Error message:', error.message); 
    throw error.response?.data?.message || error.message;
  }
};

const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    const { user, token } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    return { user, token };
  } catch (error) {
    throw error.response?.data?.message || error.message; 
  }
};

export { login, register };

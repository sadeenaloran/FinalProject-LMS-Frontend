// services/authService.js
import api from "../api/api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data; // { token, user }
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  },

  getProfile: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  },

  refresh: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};

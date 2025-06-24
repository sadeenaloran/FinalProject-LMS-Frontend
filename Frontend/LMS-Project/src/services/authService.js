// // services/authService.js
// import api from "../api/api";

// export const authService = {
//   login: async (credentials) => {
//     const response = await api.post("/auth/login", credentials);
//     return response.data; // { token, user }
//   },

//   register: async (userData) => {
//     const response = await api.post("/auth/register", userData);
//     return response.data;
//   },

//   logout: async () => {
//     await api.post("/auth/logout");
//     localStorage.removeItem("token");
//   },

//   getProfile: async () => {
//     const token = localStorage.getItem("token");
//     const response = await api.get("/auth/getme", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.user;
//   },

//   refresh: async () => {
//     const response = await api.post("/auth/refresh");
//     return response.data;
//   },
// };
import api from "./../api/api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  getProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await api.get("/auth/getme"); 
      return response.data?.user || null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  // Add refresh token method
  refreshToken: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },

  // Optional: Add method to link Google account (if you want to use it later)
  linkGoogleAccount: async (googleToken) => {
    const response = await api.post("/auth/link-google", {
      token: googleToken,
    });
    return response.data;
  },
};

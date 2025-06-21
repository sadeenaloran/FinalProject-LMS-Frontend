import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const adminService = {
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        throw new Error("Access token is missing or invalid");
      }

      const response = await api.get(API_ENDPOINTS.ADMIN.GET_ALL_USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle different response structures
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response.data.users)) {
        return response.data.users;
      }
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error("Error in getAllUsers:", error, error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  },

  addUser: async (userData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(API_ENDPOINTS.ADMIN.ADD_USER, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error in addUser:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to add user");
    }
  },

  updateUser: async (userId, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `${API_ENDPOINTS.ADMIN.UPDATE_USER}/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return the full user object that your frontend expects
      return {
        id: userId,
        name: response.data.name || updatedData.name,
        email: response.data.email || updatedData.email,
        role: response.data.role || updatedData.role,
        // Include any other fields your component needs
      };
    } catch (error) {
      console.error("Error in updateUser:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },

  deleteUser: async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(
        `${API_ENDPOINTS.ADMIN.DELETE_USER}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in deleteUser:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },
};

export default adminService;

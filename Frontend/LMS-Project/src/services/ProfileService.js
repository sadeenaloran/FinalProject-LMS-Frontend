// src/services/profileService.js
import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const ProfileService = {
  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PROFILE.GET);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  updateProfile: async (profileData, avatarFile = null) => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      } else if (profileData.avatar) {
        formData.append("avatarUrl", profileData.avatar);
      }

      const response = await api.put(API_ENDPOINTS.PROFILE.UPDATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      const response = await api.delete(API_ENDPOINTS.PROFILE.DELETE);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },
};

export default ProfileService;
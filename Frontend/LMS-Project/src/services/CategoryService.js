import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.CATEGORIES.GET_ALL);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getCategory: async (id) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.CATEGORIES.GET_CATEGORY.replace(":id", id)
      );
      return response.data.category;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  },

  createCategory: async (name) => {
    try {
      const response = await api.post(API_ENDPOINTS.CATEGORIES.CREATE, {
        name,
      });
      return response.data.category;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
};

export default CategoryService;

//   updateCategory: async (id, name) => {
//     try {
//       console.log("Update request payload:", { id, name });
//       const response = await api.put(
//         API_ENDPOINTS.CATEGORIES.UPDATE.replace(":id", id),
//         { name }
//       );
//       const token = localStorage.getItem("access-token");
//       console.log("Current auth token:", token);
//       const res = await api.put(response, { name });
//       return res.data.category;
//       //   return response.data.category;
//     } catch (error) {
//       console.error("Error updating category:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//         throw new Error("You don't have permission to update categories");
//       }
//       throw error;
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       const response = await api.delete(
//         API_ENDPOINTS.CATEGORIES.DELETE.replace(":id", id)
//       );
//       return response.data.success;
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       throw error;
//     }
//   },
// };


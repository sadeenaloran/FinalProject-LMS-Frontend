// import api from "../api/index";
// import { API_ENDPOINTS } from "../constants/ApiEndpoints";

// const CoursesService = {
//   // Get all courses (will filter instructor's courses on frontend)
//   getAllCourses: async () => {
//     try {
//       const token = localStorage.getItem("access-token");
//       const response = await api.get(API_ENDPOINTS.COURSES.GET_ALL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data.data || response.data;
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       throw error;
//     }
//   },

//   // Create new course
//   createCourse: async (courseData) => {
//     try {
//       const token = localStorage.getItem("access-token");
//       const response = await api.post(
//         API_ENDPOINTS.COURSES.CREATE,
//         courseData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },
//   updateCourse: async (id, courseData) => {
//     try {
//       const token = localStorage.getItem("access-token");
//       const endpoint = API_ENDPOINTS.COURSES.UPDATE.replace(":id", id);
//       const response = await api.put(endpoint, courseData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },

//   deleteCourse: async (id) => {
//     try {
//       const token = localStorage.getItem("access-token");
//       const endpoint = API_ENDPOINTS.COURSES.DELETE.replace(":id", id);
//       const response = await api.delete(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       throw error;
//     }
//   },
// };

// export default CoursesService;

import api from "../api/index";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const CoursesService = {
  getAllCourses: async () => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await api.get(API_ENDPOINTS.COURSES.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.error("No token found!");
        return;
      }
      console.log("Token:", token);
      const response = await api.post(
        API_ENDPOINTS.COURSES.CREATE,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating course:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await api.put(
        `${API_ENDPOINTS.COURSES.UPDATE}${courseId}`.replace(":id", ""), // Remove :id from URL
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating course:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await api.delete(
        `${API_ENDPOINTS.COURSES.DELETE}${courseId}`.replace(":id", ""), // Remove :id from URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};

export default CoursesService;

// // EnrollmentService.js
// import api from "../api/index";
// import { API_ENDPOINTS } from "../constants/ApiEndpoints";

// const EnrollmentService = {
//   enrollUser: async (courseId) => {
//     try {
//       const response = await api.post(API_ENDPOINTS.ENROLLMENTS.ENROLL, {
//         courseId,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error enrolling user:", error);
//       throw error;
//     }
//   },

//   getUserEnrollments: async () => {
//     try {
//       const response = await api.get(
//         API_ENDPOINTS.ENROLLMENTS.USER_ENROLLMENTS
//       );
//       return response.data.enrollments;
//     } catch (error) {
//       console.error("Error fetching user enrollments:", error);
//       throw error;
//     }
//   },

//   getCourseProgressDetails: async (enrollmentId) => {
//     try {
//       const response = await api.get(
//         API_ENDPOINTS.ENROLLMENTS.GET_PROGRESS.replace(":id", enrollmentId)
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching progress details:", error);
//       throw error;
//     }
//   },
// };

// export default EnrollmentService;

import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const EnrollmentService = {
  enrollUser: async (courseId) => {
    try {
      console.log("Attempting enrollment with courseId:", courseId);
      console.log("Current token:", localStorage.getItem("access-token"));

      const response = await api.post(
        API_ENDPOINTS.ENROLLMENTS.ENROLL,
        {
          courseId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      console.log("Enrollment successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      throw new Error(error.response?.data?.message || "Failed to enroll");
    }
  },

  getEnrollment: async (enrollmentId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ENROLLMENTS.GET_ENROLLMENT.replace(':id', enrollmentId)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollment:', error);
      throw error;
    }
  },

  getUserEnrollments: async () => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ENROLLMENTS.USER_ENROLLMENTS
      );
      return response.data.enrollments || [];
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
      return [];
    }
  },
  getCourseProgressDetails: async (courseId, userId) => {
    try {
      // 1. First get user's enrollment for this course
      const enrollmentsResponse = await api.get(
              API_ENDPOINTS.ENROLLMENTS.GET_PROGRESS_DETAILS.replace(':id')
      );

      // Handle different response structures
      const enrollments = Array.isArray(enrollmentsResponse.data)
        ? enrollmentsResponse.data
        : enrollmentsResponse.data?.enrollments || [];

      const enrollment = enrollments.find((e) => e.course_id == courseId);

      if (!enrollment) {
        throw new Error("User is not enrolled in this course");
      }

      // 2. Get progress for this enrollment
      const progressResponse = await api.get(
        API_ENDPOINTS.ENROLLMENTS.GET_PROGRESS.replace(":id", enrollment.id),
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      return {
        ...progressResponse.data,
        enrollmentId: enrollment.id,
      };
    } catch (error) {
      console.error("Progress fetch error:", {
        courseId,
        error: error.response?.data || error.message,
        status: error.response?.status,
      });

      // More specific error handling
      if (error.response?.status === 400) {
        throw new Error("Invalid request - please check your parameters");
      } else if (error.response?.status === 401) {
        throw new Error("Authentication required");
      } else {
        throw error;
      }
    }
  },
  getProgressSummary: async (courseId) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await api.get(
        API_ENDPOINTS.ENROLLMENTS.PROGRESS_SUMMARY.replace(":Id", courseId),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching progress summary:", error);
      throw error;
    }
  },

  // markLessonCompleted: async (lessonId) => {
  //   try {
  //     const response = await api.post(
  //       API_ENDPOINTS.ENROLLMENTS.COMPLETE_LESSON,
  //       { lessonId }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error marking lesson complete:", error);
  //     throw error;
  //   }
  // },

  markLessonCompleted: async (lessonId) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.ENROLLMENTS.MARK_LESSON_COMPLETE,
        {
          lessonId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking lesson completed:", error);
      throw error;
    }
  },
};

export default EnrollmentService;

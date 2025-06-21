import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const EnrollmentService = {
  enrollUser: async (courseId) => {
    try {
      console.log("Attempting enrollment with courseId:", courseId);
      console.log("Current token:", localStorage.getItem("token"));

      const response = await api.post(
        API_ENDPOINTS.ENROLLMENTS.ENROLL,
        {
          courseId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  getCourseProgressDetails: async (enrollmentId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ENROLLMENTS.GET_PROGRESS.replace(":id", enrollmentId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return {
        ...response.data,
        enrollmentId,
      };
    } catch (error) {
      console.error("Progress fetch error:", {
        enrollmentId,
        error: error.response?.data || error.message,
        status: error.response?.status,
      });

      throw new Error(
        error.response?.data?.message || "Failed to fetch progress"
      );
    }
  },

  markLessonCompleted: async (lessonId) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.ENROLLMENTS.MARK_LESSON_COMPLETE,
        { lessonId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking lesson complete:", error);
      throw error;
    }
  },

  getProgressSummary: async (courseId) => {
    try {
      const response = await api.get(
        `/enrollments/course/${courseId}/summary`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching progress summary:", error);
      return { summary: { overallProgress: 0 } };
    }
  },
};

export default EnrollmentService;

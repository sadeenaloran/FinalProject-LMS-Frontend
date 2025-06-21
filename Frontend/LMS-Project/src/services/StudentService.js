import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const StudentService = {
  getAllCourses: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.COURSES.GET_ALL);
      return Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  getCourseDetails: async (courseId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.COURSES.GET_COURSE.replace(":id", courseId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
    }
  },

  // Lesson Endpoints
  getLesson: async (lessonId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.LESSONS.GET_LESSON.replace(":id", lessonId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
  },

  getLessonsByModule: async (moduleId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.LESSONS.GET_BY_MODULE.replace(":moduleId", moduleId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching lessons by module:", error);
      throw error;
    }
  },

  // Module Endpoints
  getModulesByCourse: async (courseId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.MODULES.GET_BY_COURSE.replace(":courseId", courseId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching modules by course:", error);
      throw error;
    }
  },

  getAssignment: async (assignmentId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ASSIGNMENTS.GET_ASSIGNMENT.replace(":id", assignmentId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assignment:", error);
      throw error;
    }
  },

  getAssignmentsByLesson: async (lessonId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ASSIGNMENTS.GET_BY_LESSON.replace(":lessonId", lessonId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assignments by lesson:", error);
      throw error;
    }
  },

  // Quiz Endpoints
  getQuizzesByLesson: async (lessonId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.QUIZZES.GET_BY_LESSON.replace(":lesson_id", lessonId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes by lesson:", error);
      throw error;
    }
  },

  submitQuiz: async (quizId, answers) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.QUIZZES.SUBMIT_QUIZ.replace(":id", quizId),
        { answers }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw error;
    }
  },

  getQuizSubmission: async (quizId, submissionId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.QUIZZES.GET_SUBMISSION.replace(":id", quizId).replace(
          ":submission_id",
          submissionId
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz submission:", error);
      throw error;
    }
  },

  getMyQuizSubmission: async (quizId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.QUIZZES.GET_MY_SUBMISSION.replace(":id", quizId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching my quiz submission:", error);
      throw error;
    }
  },
};

export default StudentService;

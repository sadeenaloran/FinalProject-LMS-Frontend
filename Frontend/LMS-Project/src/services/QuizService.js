import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const QuizService = {
  getQuizzesByLesson: async (lessonId) => {
    try {
      const response = await api.get(`/quizzes/lesson/${lessonId}`);
      console.log("API Response:", response.data); 

      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching quizzes by lesson:", error);
      throw error;
    }
  },
  createQuiz: async (lessonId, quizData) => {
    try {
      const response = await api.post(API_ENDPOINTS.QUIZZES.CREATE, {
        ...quizData,
        lesson_id: lessonId,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating quiz:", error);
      throw error;
    }
  },

  // Add question to quiz
  addQuestion: async (quizId, questionData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.QUIZ_QUESTIONS.CREATE.replace(":quizId", quizId),
        questionData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding question:", error);
      throw error;
    }
  },

  getQuizSubmissions: async (quizId) => {
    try {
      const response = await api.get(`/quizzes/${quizId}/submissions`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching submissions:", error);
      throw error;
    }
  },
  // Get quiz details with questions
  getQuizWithQuestions: async (quizId) => {
    try {
      const [quizResponse, questionsResponse] = await Promise.all([
        api.get(API_ENDPOINTS.QUIZZES.GET_ONE.replace(":id", quizId)),
        api.get(
          API_ENDPOINTS.QUIZ_QUESTIONS.GET_BY_QUIZ.replace(":quizId", quizId)
        ),
      ]);

      return {
        quiz: quizResponse.data.data,
        questions: questionsResponse.data.data || [],
      };
    } catch (error) {
      console.error("Error fetching quiz details:", error);
      throw error;
    }
  },

  // Submit quiz answers
  submitQuiz: async (quizId, answers) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.QUIZZES.SUBMIT.replace(":id", quizId),
        { answers }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw error;
    }
  },

  // Get quiz results
  getQuizResults: async (quizId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.QUIZZES.RESULTS.replace(":id", quizId)
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching quiz results:", error);
      throw error;
    }
  },

  // Check if user has already submitted a quiz
  checkQuizSubmission: async (quizId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.QUIZZES.MY_SUBMISSION.replace(":id", quizId)
      );
      return response.data.data || null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; // No submission exists
      }
      console.error("Error checking quiz submission:", error);
      throw error;
    }
  },
};

export default QuizService;

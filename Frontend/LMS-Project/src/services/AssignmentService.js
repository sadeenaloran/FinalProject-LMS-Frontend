import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const AssignmentService = {
  // Get all assignments for a lesson
  getAssignmentsByLesson: async (lessonId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ASSIGNMENTS.GET_BY_LESSON.replace(":lessonId", lessonId)
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching assignments:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get assignment details
  getAssignmentDetails: async (assignmentId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ASSIGNMENTS.GET_ONE.replace(":id", assignmentId)
      );
      return response.data.assignment; 
    } catch (error) {
      console.error(
        "Error fetching assignment details:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get all assignments for a specific course
  getAssignmentsByCourse: async (courseId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.ASSIGNMENTS.GET_BY_COURSE.replace(":courseId", courseId)
      );
      return response.data.data;     
    } catch (error) {
      console.error(
        "Error fetching assignments by course:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Submit an assignment 
  submitAssignment: async (assignmentId, submissionUrl) => {
    try {
      const payload = {
        assignment_id: assignmentId,
        submission_url: submissionUrl,
      };
      console.log("Submitting assignment with payload:", payload);

      const response = await api.post(
        API_ENDPOINTS.SUBMISSIONS.CREATE,
        payload /*, {
        // headers: { Authorization: `Bearer ${token}` }
      }*/
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error submitting assignment:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get user's submissions for an assignment
  getMySubmissions: async (assignmentId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.SUBMISSIONS.GET_BY_ASSIGNMENT.replace(
          ":assignmentId",
          assignmentId
        )
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching submissions:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Upload file to backend (which uploads to Cloudinary)
  uploadAttachment: async (formData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.ATTACHMENTS.UPLOAD,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading attachment:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get submission details by ID
  getSubmissionDetails: async (submissionId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.SUBMISSIONS.GET_ONE.replace(":id", submissionId)
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching submission details:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default AssignmentService;

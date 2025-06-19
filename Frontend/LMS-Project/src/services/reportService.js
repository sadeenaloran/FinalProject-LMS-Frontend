import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const ReportService = {
  /**
   * Fetch user activity data
   * @param {string} timeRange - daily, weekly, monthly, yearly
   * @returns {Promise<{labels: string[], activeUsers: number[], newSignups: number[]}>}
   */
  // In your ReportService.js, update the error handling:

  fetchUserActivity: async (timeRange = "monthly") => {
    try {
      const response = await api.get(API_ENDPOINTS.ADMIN.USER_ACTIVITY, {
        params: { timeRange },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user activity report:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch user activity data"
      );
    }
  },

  /**
   * Fetch course popularity data
   * @returns {Promise<{labels: string[], enrollments: number[]}>}
   */
  fetchCoursePopularity: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ADMIN.COURSE_POPULARITY);
      return response.data;
    } catch (error) {
      console.error("Error fetching course popularity report:", error);
      throw error;
    }
  },

  /**
   * Fetch system performance data
   * @returns {Promise<{labels: string[], responseTimes: number[], uptimePercentages: number[]}>}
   */
  fetchSystemPerformance: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ADMIN.SYSTEM_PERFORMANCE);
      return response.data;
    } catch (error) {
      console.error("Error fetching system performance report:", error);
      throw error;
    }
  },

  /**
   * Export report data
   * @param {string} reportType - user_activity, course_popularity, system_performance
   * @param {string} format - csv, pdf, excel
   * @param {Object} filters - Report specific filters
   * @returns {Promise<Blob>} - File data
   */
  exportReport: async (reportType, format = "pdf", params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.ADMIN.EXPORT_REPORT, {
        params: { reportType, format, ...params },
        responseType: "blob",
      });
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportType}_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return response.data;
    } catch (error) {
      console.error("Error exporting report:", error);
      throw error;
    }
  },
};

export default ReportService;

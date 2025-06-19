import { useState, useEffect } from "react";
import api from "../api/index";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/courses/pending");
      setPendingCourses(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch pending courses");
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (courseId, feedback = "") => {
    try {
      const response = await api.patch(`/admin/courses/${courseId}/approve`, {
        feedback,
      });
      setPendingCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, status: "approved" } : course
        )
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || "Failed to approve course";
    }
  };

  const rejectCourse = async (courseId, feedback = "") => {
    try {
      const response = await api.patch(`/admin/courses/${courseId}/reject`, {
        feedback,
      });
      setPendingCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, status: "rejected" } : course
        )
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || "Failed to reject course";
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchPendingCourses();
  }, []);

  return {
    courses,
    pendingCourses,
    loading,
    error,
    fetchAllCourses,
    fetchPendingCourses,
    approveCourse,
    rejectCourse,
  };
};

export default useCourses;

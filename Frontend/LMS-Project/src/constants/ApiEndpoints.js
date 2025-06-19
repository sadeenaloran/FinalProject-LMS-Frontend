// src/constants/ApiEndpoints.js
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout", // Fixed the typo here
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },
  PROFILE: {
    GET: "/users/profile-jwt",
    UPDATE: "/users/profile-jwt",
    DELETE: "/users/profile-jwt",
  },
  ADMIN: {
    GET_ALL_USERS: "/admin/users",
    ADD_USER: "/admin/users",
    DELETE_USER: "/admin/users",
    UPDATE_USER: "/admin/users",
    PENDING_COURSES: "/admin/courses/pending",
    APPROVE_COURSE: "/admin/courses/:courseId/approve",
    REJECT_COURSE: "/admin/courses/:courseId/reject",
    USER_ACTIVITY: "/admin/reports/user-activity",
    COURSE_POPULARITY: "/admin/reports/course-popularity",
    SYSTEM_PERFORMANCE: "/admin/reports/system-performance",
    EXPORT_REPORT: "/admin/reports/export",
  },
 CATEGORIES: {
    GET_ALL: "/categories",
    GET_CATEGORY: "/categories/:id",
    CREATE: "/categories",
    UPDATE: "/categories/:id",
    DELETE: "/categories/:id",
  },
  COURSES: {
    GET_ALL: "/courses",
    GET_COURSE: "/courses:id",
    CREATE: "/courses",
    // UPDATE: "/courses/:id",
    // DELETE: "/courses/:id",
    GET_COURSE_DETAILS: "/courses/:id",
  },
  ENROLLMENTS: {
    ENROLL: "/enrollments",
     GET_ENROLLMENT: '/enrollments/:id',
    USER_ENROLLMENTS: "/enrollments/user/me",
    GET_PROGRESS: "/enrollments/:id/progress",
    PROGRESS_SUMMARY: "/enrollments/course/:courseId/summary",
    MARK_LESSON_COMPLETE: "/enrollments/complete-lesson",
    GET_PROGRESS_DETAILS: "/enrollments/:id/progress",
  },
    ASSIGNMENTS: {
    GET_ASSIGNMENT: "/assignments/:id",
    GET_BY_LESSON: "/assignments/lesson/:lessonId"
  },
  LESSONS: {
    GET_LESSON: "/lessons/:id",
    GET_BY_MODULE: "/lessons/module/:moduleId"
  },
  MODULES: {
    GET_BY_COURSE: "/modules/:courseId/modules"
  },
  QUIZZES: {
    GET_BY_LESSON: "/quizzes/lesson/:lesson_id",
    SUBMIT_QUIZ: "/quizzes/:id/submit",
    GET_SUBMISSION: "/quizzes/:id/submissions/:submission_id",
    GET_MY_SUBMISSION: "/quizzes/:id/my-submission"
  }  
  
};

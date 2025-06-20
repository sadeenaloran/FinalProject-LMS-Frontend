export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout", 
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
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
 
  COURSES: {
    GET_ALL: "/courses",
    GET_COURSE: "/courses/:id",
    CREATE: "/courses",
    UPDATE: "/courses/:id",
    DELETE: "/courses/:id",
    GET_COURSE_DETAILS: "/courses/:id",
  },
  ENROLLMENTS: {
    ENROLL: "/enrollments",
    USER_ENROLLMENTS: "/enrollments/user/me",
    GET_PROGRESS: "/enrollments/:id/progress",
    COURSE_PROGRESS_SUMMARY: "/enrollments/course/:courseId/summary",
    MARK_LESSON_COMPLETE: "/enrollments/complete-lesson",
    GET_PROGRESS_DETAILS: "/enrollments/:id/progress",
  },
  MODULES: {
    GET_BY_COURSE: "/courses/:courseId/modules", 
    GET_BY_ID: "/courses/modules/:id", 
    CREATE: "/courses/:courseId/modules",
    UPDATE: "/courses/modules/:id", 
    DELETE: "/courses/modules/:id",
  },
  ASSIGNMENTS: {
    GET_ALL: "/assignments",
    GET_ONE: "/assignments/:id",
    GET_BY_LESSON: "/assignments/lesson/:lessonId",
    GET_BY_COURSE: "/assignments/course/:courseId",
    CREATE: "/assignments",
    UPDATE: "/assignments/:id",
    DELETE: "/assignments/:id",
  },
  SUBMISSIONS: {
    CREATE: "/submissions",
    GET_ONE: "/submissions/:id",
    GET_BY_ASSIGNMENT: "/submissions/assignment/:assignmentId",
    GRADE: "/submissions/:id/grade",
    DELETE: "/submissions/:id",
  },
 
  ATTACHMENTS: {
    UPLOAD: "attachments/upload", 
  },
  CATEGORIES: {
    GET_ALL: "/categories",
    GET_GATEGORY: "/categories/:id",
    CREAT: "/categories",
    // UPDATE: "/categories/:id",
    // DELETE: "/categories/:id",
  },
};
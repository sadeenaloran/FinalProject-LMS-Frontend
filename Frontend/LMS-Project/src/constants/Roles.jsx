const ROLES = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "manage_users",
    "manage_courses",
    "view_reports",
    "manage_system",
  ],
  [ROLES.INSTRUCTOR]: [
    "create_courses",
    "manage_own_courses",
    "grade_assignments",
    "view_analytics",
  ],
  [ROLES.STUDENT]: [
    "view_courses",
    "enroll_courses",
    "submit_assignments",
    "view_progress",
  ],
};

export const DEFAULT_REDIRECTS = {
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.INSTRUCTOR]: "/instructor/dashboard",
  [ROLES.STUDENT]: "/student/dashboard",
};

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.ADMIN]: 3,
    [ROLES.INSTRUCTOR]: 2,
    [ROLES.STUDENT]: 1,
  };
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

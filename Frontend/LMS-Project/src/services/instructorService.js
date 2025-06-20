// import api from "../api/index";
// import { API_ENDPOINTS } from "../constants/ApiEndpoints";

// const InstructorService = {
//   // Course Management
//   getCourses: async (status = null) => {
//     try {
//       const endpoint = status
//         ? `${API_ENDPOINTS.COURSES.GET_ALL}?status=${status}`
//         : API_ENDPOINTS.COURSES.GET_ALL;
//       const response = await api.get(endpoint);
//       return response.data || [];
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       throw error;
//     }
//   },

//   getCourseDetails: async (courseId) => {
//     try {
//       const response = await api.get(
//         `${API_ENDPOINTS.COURSES.GET_COURSE_DETAILS.replace(":id", courseId)}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//       throw error;
//     }
//   },

//   createCourse: async (courseData) => {
//     try {
//       const response = await api.post(API_ENDPOINTS.COURSES.CREATE, courseData);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },

//   updateCourse: async (courseId, courseData) => {
//     try {
//       const response = await api.put(
//         `${API_ENDPOINTS.COURSES.UPDATE.replace(":id", courseId)}`,
//         courseData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },

//   deleteCourse: async (courseId) => {
//     try {
//       const response = await api.delete(
//         `${API_ENDPOINTS.COURSES.DELETE.replace(":id", courseId)}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       throw error;
//     }
//   },

//   // Module Management
//   getModules: async (courseId) => {
//     try {
//       const response = await api.get(`/courses/${courseId}/modules`);
//       return response.data || [];
//     } catch (error) {
//       console.error("Error fetching modules:", error);
//       throw error;
//     }
//   },

//   createModule: async (courseId, moduleData) => {
//     try {
//       const response = await api.post(
//         `/courses/${courseId}/modules`,
//         moduleData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating module:", error);
//       throw error;
//     }
//   },

//   updateModule: async (moduleId, moduleData) => {
//     try {
//       const response = await api.put(`/modules/${moduleId}`, moduleData);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating module:", error);
//       throw error;
//     }
//   },

//   deleteModule: async (moduleId) => {
//     try {
//       const response = await api.delete(`/modules/${moduleId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting module:", error);
//       throw error;
//     }
//   },

//   // Lesson Management
//   getLessons: async (moduleId) => {
//     try {
//       const response = await api.get(`/lessons/module/${moduleId}`);
//       return response.data || [];
//     } catch (error) {
//       console.error("Error fetching lessons:", error);
//       throw error;
//     }
//   },

//   createLesson: async (moduleId, lessonData) => {
//     try {
//       const response = await api.post(`/lessons`, {
//         ...lessonData,
//         module_id: moduleId,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error creating lesson:", error);
//       throw error;
//     }
//   },

//   updateLesson: async (lessonId, lessonData) => {
//     try {
//       const response = await api.put(`/lessons/${lessonId}`, lessonData);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating lesson:", error);
//       throw error;
//     }
//   },

//   deleteLesson: async (lessonId) => {
//     try {
//       const response = await api.delete(`/lessons/${lessonId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting lesson:", error);
//       throw error;
//     }
//   },

//   // File Uploads
//   uploadFile: async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await api.post(`/attachments/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   },

//   deleteFile: async (fileId) => {
//     try {
//       const response = await api.delete(`/attachments/file/${fileId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       throw error;
//     }
//   },
// };

// export default InstructorService;
// src/services/instructorService.js

// the most woreked oneee

// import api from "../api/index";
// import { API_ENDPOINTS } from "../constants/ApiEndpoints";

// const InstructorService = {
//   getCourses: async (status = null) => {
//     try {
//       const endpoint = status ? `/courses?status=${status}` : `/courses`;
//       const response = await api.get(endpoint);
//       return response.data.data || []; // لاحظ ان البيانات في `data` داخل `data`
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       throw error;
//     }
//   },

//   getCourseDetails: async (courseId) => {
//     try {
//       const response = await api.get(`/courses/${courseId}`);
//       return response.data.data || null; // البيانات في data.data
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//       throw error;
//     }
//   },

//   // Modules
//   getModulesByCourse: async (courseId) => {
//     try {
//       const response = await api.get(`/courses/${courseId}/modules`);
//       return response.data.data || []; // البيانات في data.data
//     } catch (error) {
//       console.error("Error fetching modules:", error);
//       throw error;
//     }
//   },

//   getModuleById: async (moduleId) => {
//     try {
//       const response = await api.get(`/modules/${moduleId}`);
//       return response.data.module || null; // البيانات في data.module
//     } catch (error) {
//       console.error("Error fetching module details:", error);
//       throw error;
//     }
//   },

//   createModule: async (courseId, moduleData) => {
//     try {
//       const dataToSend = { ...moduleData, course_id: courseId };
//       const response = await api.post(
//         `/courses/${courseId}/modules`,
//         dataToSend
//       );
//       return response.data.module;
//     } catch (error) {
//       console.error("Error creating module:", error);
//       throw error;
//     }
//   },

//   updateModule: async (moduleId, moduleData) => {
//     try {
//       const response = await api.put(`/modules/${moduleId}`, moduleData);
//       return response.data.module;
//     } catch (error) {
//       console.error("Error updating module:", error);
//       throw error;
//     }
//   },

//   deleteModule: async (moduleId) => {
//     try {
//       const response = await api.delete(`/modules/${moduleId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting module:", error);
//       throw error;
//     }
//   },

//   // Lessons
//   getLessonsByModule: async (moduleId) => {
//     try {
//       const response = await api.get(`/lessons/module/${moduleId}`);
//       return response.data.data || []; // data.data للدرس
//     } catch (error) {
//       console.error("Error fetching lessons:", error);
//       throw error;
//     }
//   },

//   getLessonById: async (lessonId) => {
//     try {
//       const response = await api.get(`/lessons/${lessonId}`);
//       return response.data.lesson || null;
//     } catch (error) {
//       console.error("Error fetching lesson details:", error);
//       throw error;
//     }
//   },

//   createLesson: async (lessonData) => {
//     try {
//       const response = await api.post("/lessons", lessonData);
//       return response.data.lesson;
//     } catch (error) {
//       if (error.response) {
//         console.error("Validation error message:", error.response.data);
//       } else {
//         console.error("Error creating lesson:", error);
//       }
//       throw error;
//     }
//   },

//   updateLesson: async (lessonId, lessonData) => {
//     try {
//       const response = await api.put(`/lessons/${lessonId}`, lessonData);
//       return response.data.lesson;
//     } catch (error) {
//       console.error("Error updating lesson:", error);
//       throw error;
//     }
//   },

//   deleteLesson: async (lessonId) => {
//     try {
//       const response = await api.delete(`/lessons/${lessonId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting lesson:", error);
//       throw error;
//     }
//   },
//   // // Course Management
//   // getCourses: async (status = null) => {
//   //   try {
//   //     const endpoint = status
//   //       ? `${API_ENDPOINTS.COURSES.GET_ALL}?status=${status}`
//   //       : API_ENDPOINTS.COURSES.GET_ALL;
//   //     const response = await api.get(endpoint);
//   //     return response.data.data || [];
//   //   } catch (error) {
//   //     console.error("Error fetching courses:", error);
//   //     throw error;
//   //   }
//   // },

//   // getCourseDetails: async (courseId) => {
//   //   try {
//   //     const response = await api.get(
//   //       API_ENDPOINTS.COURSES.GET_COURSE_DETAILS.replace(":id", courseId)
//   //     );
//   //     return response.data.data || [];
//   //   } catch (error) {
//   //     console.error("Error fetching course details:", error);
//   //     throw error;
//   //   }
//   // },

//   createCourse: async (courseData) => {
//     try {
//       const response = await api.post(API_ENDPOINTS.COURSES.CREATE, courseData);
//       return response.data;
//     } catch (error) {
//       console.error("Error creating course:", error);
//       throw error;
//     }
//   },

//   updateCourse: async (courseId, courseData) => {
//     try {
//       const response = await api.put(
//         API_ENDPOINTS.COURSES.UPDATE.replace(":id", courseId),
//         courseData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating course:", error);
//       throw error;
//     }
//   },

//   deleteCourse: async (courseId) => {
//     try {
//       const response = await api.delete(
//         API_ENDPOINTS.COURSES.DELETE.replace(":id", courseId)
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       throw error;
//     }
//   },

//   // Module Management
//   // createModule: async (courseId, moduleData) => {
//   //   try {
//   //     const response = await api.post(
//   //       API_ENDPOINTS.COURSES.GET_COURSE_DETAILS.replace(":id", courseId) +
//   //         "/modules",
//   //       moduleData
//   //     );
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error creating module:", error);
//   //     throw error;
//   //   }
//   // },
//   // createModule: async (courseId, moduleData) => {
//   //   try {
//   //     // اضافة course_id في بيانات الموديول
//   //     const dataToSend = { ...moduleData, course_id: courseId };
//   //     const response = await api.post(
//   //       `/courses/${courseId}/modules`,
//   //       dataToSend
//   //     );
//   //     return response.data.module;
//   //   } catch (error) {
//   //     console.error("Error creating module:", error);
//   //     throw error;
//   //   }
//   // },

//   // updateModule: async (moduleId, moduleData) => {
//   //   try {
//   //     const response = await api.put(`/modules/${moduleId}`, moduleData);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error updating module:", error);
//   //     throw error;
//   //   }
//   // },

//   // deleteModule: async (moduleId) => {
//   //   try {
//   //     const response = await api.delete(`/modules/${moduleId}`);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error deleting module:", error);
//   //     throw error;
//   //   }
//   // },
//   // async getModuleById(moduleId) {
//   //   const response = await api.get(`/api/modules/${moduleId}`);
//   //   return response.data.module; // حسب شكل الرد من الباك
//   // },

//   // getModulesByCourse: async (courseId) => {
//   //   try {
//   //     const response = await api.get(
//   //       API_ENDPOINTS.COURSES.GET_COURSE_DETAILS.replace(":id", courseId) +
//   //         "/modules"
//   //     );
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error fetching modules:", error);
//   //     throw error;
//   //   }
//   // },

//   // // Lesson Management
//   // getLessonsByModule: async (moduleId) => {
//   //   try {
//   //     const response = await api.get(`/lessons/module/${moduleId}`);
//   //     return response.data; // { success, data: [...] }
//   //   } catch (error) {
//   //     console.error("Error fetching lessons:", error);
//   //     throw error;
//   //   }
//   // },
//   // createLesson: async (lessonData) => {
//   //   try {
//   //     const response = await api.post("/lessons", lessonData);
//   //     return response.data.lesson;
//   //   } catch (error) {
//   //     // اطبعي السبب الحقيقي من الباكند
//   //     if (error.response) {
//   //       console.error("Validation error message:", error.response.data);
//   //     } else {
//   //       console.error("Error creating lesson:", error);
//   //     }
//   //     throw error;
//   //   }
//   // },

//   // updateLesson: async (lessonId, lessonData) => {
//   //   try {
//   //     const response = await api.put(`/lessons/${lessonId}`, lessonData);
//   //     return response.data; // { success, lesson }
//   //   } catch (error) {
//   //     console.error("Error updating lesson:", error);
//   //     throw error;
//   //   }
//   // },
//   // deleteLesson: async (lessonId) => {
//   //   try {
//   //     const response = await api.delete(`/lessons/${lessonId}`);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error deleting lesson:", error);
//   //     throw error;
//   //   }
//   // },

//   // File Uploads
//   uploadFile: async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await api.post("/attachments/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   },

//   deleteFile: async (fileId) => {
//     try {
//       const response = await api.delete(`/attachments/file/${fileId}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       throw error;
//     }
//   },
//   getAllCategories: async () => {
//     const response = await api.get("/categories");
//     return response.data.categories;
//   },
// };

// export default InstructorService;
import api from "../api/api";
import { API_ENDPOINTS } from "../constants/ApiEndpoints";

const InstructorService = {
  // ===== Courses =====
  getCourses: async (status = null) => {
    try {
      const endpoint = status
        ? `${API_ENDPOINTS.COURSES.GET_ALL}?status=${status}`
        : API_ENDPOINTS.COURSES.GET_ALL;
      const response = await api.get(endpoint);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  getCourseDetails: async (courseId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.COURSES.GET_COURSE_DETAILS.replace(":id", courseId)
      );
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await api.post(API_ENDPOINTS.COURSES.CREATE, courseData);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.COURSES.UPDATE.replace(":id", courseId),
        courseData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(
        API_ENDPOINTS.COURSES.DELETE.replace(":id", courseId)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },

  // ===== Modules =====
  getModulesByCourse: async (courseId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.MODULES.GET_BY_COURSE.replace(":courseId", courseId)
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw error;
    }
  },

  // getModuleById: async (moduleId) => {
  //   try {
  //     const response = await api.get(
  //       API_ENDPOINTS.MODULES.GET_BY_ID.replace(":id", moduleId)
  //     );
  //     return response.data.module || null;
  //   } catch (error) {
  //     console.error("Error fetching module details:", error);
  //     throw error;
  //   }
  // },
  getModuleById: async (moduleId) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.MODULES.GET_BY_ID.replace(":id", moduleId)
      );
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching module details:", error);
      throw error;
    }
  },

  createModule: async (courseId, moduleData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.MODULES.CREATE.replace(":courseId", courseId),
        { ...moduleData, course_id: courseId }
      );
      return response.data.module;
    } catch (error) {
      console.error("Error creating module:", error);
      throw error;
    }
  },

  updateModule: async (moduleId, moduleData) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.MODULES.UPDATE.replace(":id", moduleId),
        moduleData
      );
      return response.data.module;
    } catch (error) {
      console.error("Error updating module:", error);
      throw error;
    }
  },

  deleteModule: async (moduleId) => {
    try {
      const response = await api.delete(
        API_ENDPOINTS.MODULES.DELETE.replace(":id", moduleId)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting module:", error);
      throw error;
    }
  },

  // ===== Lessons =====
  getLessonsByModule: async (moduleId) => {
    try {
      const response = await api.get(`/lessons/module/${moduleId}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    }
  },

  getLessonById: async (lessonId) => {
    try {
      const response = await api.get(`/lessons/${lessonId}`);
      return response.data.lesson || null;
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      throw error;
    }
  },

  createLesson: async (lessonData) => {
    try {
      const response = await api.post("/lessons", lessonData);
      return response.data.lesson;
    } catch (error) {
      console.error("Error creating lesson:", error.response?.data || error);
      throw error;
    }
  },

  updateLesson: async (lessonId, lessonData) => {
    try {
      const response = await api.put(`/lessons/${lessonId}`, lessonData);
      return response.data.lesson;
    } catch (error) {
      console.error("Error updating lesson:", error);
      throw error;
    }
  },

  deleteLesson: async (lessonId) => {
    try {
      const response = await api.delete(`/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      throw error;
    }
  },

  // ===== Files =====
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/attachments/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  deleteFile: async (fileId) => {
    try {
      const response = await api.delete(`/attachments/file/${fileId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },

  // ===== Categories =====
  getAllCategories: async () => {
    try {
      const response = await api.get("/categories");
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  getInstructorCourses: async () => {
    try {
      const response = await api.get("/courses");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
      throw error;
    }
  },
  getAllEnrollmentsByInstructor: async () => {
    try {
      const response = await api.get("/enrollments/instructor/all");
      return response.data; // أو response.data.enrollments حسب شكل الرد
    } catch (error) {
      console.error("Error fetching enrollments by instructor:", error);
      throw error;
    }
  },
  getCoursesHierarchy: async () => {
    try {
      const response = await api.get("/assignments/instructor/courses");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching courses hierarchy:", error);
      throw error;
    }
  },

  createAssignment: async (assignmentData) => {
    try {
      const response = await api.post("/assignments", assignmentData);
      return response.data.assignment;
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  },

  getInstructorAssignments: async () => {
    try {
      const response = await api.get("/assignments/instructor/all");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching assignments:", error);
      throw error;
    }
  },

  updateAssignment: async (id, data) => {
    try {
      const response = await api.put(`/assignments/${id}`, data);
      return response.data.assignment;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },

  deleteAssignment: async (id) => {
    try {
      const response = await api.delete(`/assignments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting assignment:", error);
      throw error;
    }
  },
};

export default InstructorService;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import CourseCard from "../../components/studant/CourseCard";
// import EnrollmentDialog from "../../components/studant/EnrollmentDialog";
// import ProgressDialog from "../../components/studant/ProgressDialog";
// import StudentSidebar from "../../components/studant/StudentSidebar";
// import CourseService from "../../services/StudentService";
// import EnrollmentService from "../../services/EnrollemtServices";
// import { dashboardStyles } from "../../theme/studentStyle";
// import ProgressComponent from "../../components/studant/ProgressComponent";

// const DashboardContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   minHeight: "100vh",
//   backgroundColor: theme.palette.background.default,
// }));

// const MainContent = styled(Box)({
//   flexGrow: 1,
//   padding: "24px",
// });

// const StudentDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
//   const [progressDialogOpen, setProgressDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [allCoursesResponse, userEnrollmentsResponse] = await Promise.all(
//           [
//             CourseService.getAllCourses(),
//             EnrollmentService.getUserEnrollments(),
//           ]
//         );

//         // Ensure we're working with arrays
//         const allCourses = Array.isArray(allCoursesResponse)
//           ? allCoursesResponse
//           : allCoursesResponse?.data || [];

//         const userEnrollments = Array.isArray(userEnrollmentsResponse)
//           ? userEnrollmentsResponse
//           : userEnrollmentsResponse?.data || [];

//         setCourses(allCourses);
//         setEnrolledCourses(userEnrollments);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//         // Set empty arrays in case of error
//         setCourses([]);
//         setEnrolledCourses([]);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnrollClick = (course) => {
//     setSelectedCourse(course);
//     setEnrollmentDialogOpen(true);
//   };

//   const handleViewProgress = (course) => {
//     setSelectedCourse(course);
//     setProgressDialogOpen(true);
//   };

//   const handleEnroll = async () => {
//     try {
//       // Check if user is authenticated
//       const token = localStorage.getItem("access-token");
//       if (!token) {
//         // Redirect to login or show login modal
//         console.error("No authentication token found");
//         return;
//       }

//       await EnrollmentService.enrollUser(selectedCourse.id);

//       // Refresh enrollments
//       const updatedEnrollments = await EnrollmentService.getUserEnrollments();
//       setEnrolledCourses(updatedEnrollments);

//       setEnrollmentDialogOpen(false);

//       // Optional: Show success message
//       alert("Successfully enrolled in course!");
//     } catch (error) {
//       console.error("Error enrolling:", error);
//       // Show error to user
//       alert(`Enrollment failed: ${error.message}`);
//     }
//   };

//   // Safely filter courses
//   const filteredCourses =
//     activeTab === "enrolled"
//       ? (Array.isArray(courses) ? courses : []).filter((course) =>
//           (Array.isArray(enrolledCourses) ? enrolledCourses : []).some(
//             (enrollment) => enrollment.course_id === course.id
//           )
//         )
//       : Array.isArray(courses)
//       ? courses
//       : [];

//   return (
//     <DashboardContainer>
//       <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <MainContent>
//         <Container maxWidth="xl">
//           <Box sx={dashboardStyles.header}>
//             <Typography variant="h4" component="h1" sx={dashboardStyles.title}>
//               {activeTab === "enrolled" ? "My Courses" : "All Courses"}
//             </Typography>
//           </Box>
//           {/*
//           {loading ? (
//             <Box sx={dashboardStyles.loadingContainer}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={4}>
//               {filteredCourses.length > 0 ? (
//                 filteredCourses.map((course) => {
//                   const isEnrolled = (
//                     Array.isArray(enrolledCourses) ? enrolledCourses : []
//                   ).some((enrollment) => enrollment.course_id === course.id);

//                   return (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//                       <CourseCard
//                         course={course}
//                         isEnrolled={isEnrolled}
//                         onEnrollClick={handleEnrollClick}
//                         onViewProgressClick={handleViewProgress}
//                       />
//                     </Grid>
//                   );
//                 })
//               ) : (
//                 <Grid item xs={12}>
//                   <Typography variant="body1" align="center">
//                     No courses found
//                   </Typography>
//                 </Grid>
//               )}
//             </Grid>
//           )} */}

//           {loading ? (
//             <Box sx={dashboardStyles.loadingContainer}>
//               <CircularProgress />
//             </Box>
//           ) : activeTab === "progress" ? (
//             <ProgressComponent
//               enrolledCourses={enrolledCourses}
//               allCourses={courses}
//             />
//           ) : (
//             <Grid container spacing={4}>
//               {filteredCourses.length > 0 ? (
//                 filteredCourses.map((course) => {
//                   const isEnrolled = (
//                     Array.isArray(enrolledCourses) ? enrolledCourses : []
//                   ).some((enrollment) => enrollment.course_id === course.id);

//                   return (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//                       <CourseCard
//                         course={course}
//                         isEnrolled={isEnrolled}
//                         onEnrollClick={handleEnrollClick}
//                         onViewProgressClick={() =>
//                           handleViewProgress(course.id)
//                         }
//                       />
//                     </Grid>
//                   );
//                 })
//               ) : (
//                 <Grid item xs={12}>
//                   <Typography variant="body1" align="center">
//                     No courses found
//                   </Typography>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         </Container>
//       </MainContent>

//       <EnrollmentDialog
//         open={enrollmentDialogOpen}
//         onClose={() => setEnrollmentDialogOpen(false)}
//         course={selectedCourse}
//         onEnroll={handleEnroll}
//       />

//       {/* <ProgressDialog
//         open={progressDialogOpen}
//         onClose={() => setProgressDialogOpen(false)}
//         course={selectedCourse}
//       /> */}

//       <ProgressDialog
//         open={progressDialogOpen}
//         onClose={() => setProgressDialogOpen(false)}
//         course={selectedCourse}
//       />
//     </DashboardContainer>
//   );
// };

// export default StudentDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   CircularProgress,
//   Chip,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import CourseCard from "../../components/studant/CourseCard";
// import EnrollmentDialog from "../../components/studant/EnrollmentDialog";
// import ProgressDialog from "../../components/studant/ProgressDialog";
// import StudentSidebar from "../../components/studant/StudentSidebar";
// import CourseService from "../../services/StudentService";
// import EnrollmentService from "../../services/EnrollemtServices";
// import { dashboardStyles } from "../../theme/studentStyle";

// const DashboardContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   minHeight: "100vh",
//   backgroundColor: theme.palette.background.default,
// }));

// const MainContent = styled(Box)({
//   flexGrow: 1,
//   padding: "24px",
// });

// const StudentDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
//   const [progressDialogOpen, setProgressDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [allCoursesResponse, userEnrollmentsResponse] = await Promise.all([
//           CourseService.getAllCourses(),
//           EnrollmentService.getUserEnrollments(),
//         ]);

//         setCourses(Array.isArray(allCoursesResponse) ? allCoursesResponse : []);
//         setEnrolledCourses(Array.isArray(userEnrollmentsResponse) ? userEnrollmentsResponse : []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setCourses([]);
//         setEnrolledCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnrollClick = (course) => {
//     setSelectedCourse(course);
//     setEnrollmentDialogOpen(true);
//   };

//   const handleViewProgress = (course) => {
//     setSelectedCourse(course);
//     setProgressDialogOpen(true);
//   };

//   const handleEnroll = async () => {
//     try {
//       const token = localStorage.getItem("access-token");
//       if (!token) {
//         console.error("No authentication token found");
//         return;
//       }

//       await EnrollmentService.enrollUser(selectedCourse.id);
//       const updatedEnrollments = await EnrollmentService.getUserEnrollments();
//       setEnrolledCourses(updatedEnrollments);
//       setEnrollmentDialogOpen(false);
//       alert("Successfully enrolled in course!");
//     } catch (error) {
//       console.error("Error enrolling:", error);
//       alert(`Enrollment failed: ${error.message}`);
//     }
//   };

//   // Filter courses based on active tab
//   const getFilteredCourses = () => {
//     if (loading) return [];

//     switch (activeTab) {
//       case "all":
//         return courses;
//       case "enrolled":
//         return courses.filter(course =>
//           enrolledCourses.some(enrollment => enrollment.course_id === course.id)
//         );
//       case "in-progress":
//         return courses.filter(course => {
//           const enrollment = enrolledCourses.find(e => e.course_id === course.id);
//           return enrollment && enrollment.progress > 0 && enrollment.progress < 100;
//         });
//       case "completed":
//         return courses.filter(course => {
//           const enrollment = enrolledCourses.find(e => e.course_id === course.id);
//           return enrollment && enrollment.progress === 100;
//         });
//       default:
//         return courses;
//     }
//   };

//   const renderCourseCards = () => {
//     const filteredCourses = getFilteredCourses();

//     if (filteredCourses.length === 0) {
//       return (
//         <Grid item xs={12}>
//           <Typography variant="body1" align="center">
//             No courses found
//           </Typography>
//         </Grid>
//       );
//     }

//     return filteredCourses.map((course) => {
//       const enrollment = enrolledCourses.find(e => e.course_id === course.id);
//       const isEnrolled = !!enrollment;
//       const progress = isEnrolled ? enrollment.progress : 0;

//       return (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//           <CourseCard
//             course={course}
//             isEnrolled={isEnrolled}
//             progress={progress}
//             onEnrollClick={() => handleEnrollClick(course)}
//             onViewProgressClick={() => handleViewProgress(course)}
//             showProgressButton={activeTab === "in-progress"}
//           />
//         </Grid>
//       );
//     });
//   };

//   const getPageTitle = () => {
//     switch (activeTab) {
//       case "all":
//         return "All Courses";
//       case "enrolled":
//         return "My Courses";
//       case "in-progress":
//         return "Courses In Progress";
//       case "completed":
//         return "Completed Courses";
//       default:
//         return "Courses";
//     }
//   };

//   return (
//     <DashboardContainer>
//       <StudentSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         enrolledCount={enrolledCourses.length}
//       />

//       <MainContent>
//         <Container maxWidth="xl">
//           <Box sx={dashboardStyles.header}>
//             <Typography variant="h4" component="h1" sx={dashboardStyles.title}>
//               {getPageTitle()}
//               {activeTab !== "all" && (
//                 <Chip
//                   label={`${getFilteredCourses().length} courses`}
//                   size="small"
//                   sx={{ ml: 2 }}
//                 />
//               )}
//             </Typography>
//           </Box>

//           {loading ? (
//             <Box sx={dashboardStyles.loadingContainer}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={4}>
//               {renderCourseCards()}
//             </Grid>
//           )}
//         </Container>
//       </MainContent>

//       <EnrollmentDialog
//         open={enrollmentDialogOpen}
//         onClose={() => setEnrollmentDialogOpen(false)}
//         course={selectedCourse}
//         onEnroll={handleEnroll}
//       />

//       <ProgressDialog
//         open={progressDialogOpen}
//         onClose={() => setProgressDialogOpen(false)}
//         course={selectedCourse}
//       />
//     </DashboardContainer>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Container, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/common/Sidebar/StudentSidebar";
// import StudentHeader from "../../components/common/Sidebar/StudentHeader";
import UserHeader from "../../components/common/Header/UserHeader"
import { useAuth } from "../../contexts/AuthContext";
import AllCourses from "../../components/Dashboard/Studant/CourseManagement/AllCourses";
import MyCourses from "../../components/Dashboard/Studant/CourseManagement/MyCourses";
import CourseProgress from "../../components/Dashboard/Studant/Progress/CourseProgress";
import Assignments from "../../components/Dashboard/Studant/Assignments/Assignments";
import Grades from "../../components/Dashboard/Studant/Grades/Grades";
import Settings from "../../components/common/Settings/Settings";
import DashboardDefaultContent from "../Dashboard/DashboardDefaultContent";
import api from "../../api/api";
import courseService from "../../services/CoursesService";

const StudentDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // State for student data
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user?.role !== "student") {
      navigate("/unauthorized");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching courses..."); // Debug log
      setError(null);

      // Fetch all courses using the service
      const coursesData = await courseService.getAllCourses();
      setCourses(coursesData);

      // Fetch user enrollments
      const enrollmentsResponse = await api.get("/enrollments/user/me");
      setEnrollments(enrollmentsResponse.data.enrollments || []);

      // Fetch assignments
      // You'll need to implement this endpoint in your backend
      // const assignmentsResponse = await api.get("/assignments/user/me");
      // setAssignments(assignmentsResponse.data.assignments || []);

      // Fetch progress for each enrolled course
      const progressData = await Promise.all(
        enrollmentsResponse.data.enrollments.map(async (enrollment) => {
          const progressResponse = await api.get(
            `/courses/${enrollment.course_id}/progress`
          );
          return {
            courseId: enrollment.course_id,
            progress: progressResponse.data.summary,
          };
        })
      );
      setProgress(progressData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      if (!courseId) {
        throw new Error("Course ID is required");
      }

      await api.post("/enrollments", { courseId });
      fetchStudentData(); // Refresh data after enrollment
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleMarkCompleted = async (lessonId) => {
    try {
      await api.post("/progress/complete-lesson", { lessonId });
      fetchStudentData(); // Refresh progress data
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  };

  if (loading || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "all-courses":
        return (
          <AllCourses/>
        );
      case "my-courses":
        return (
          <MyCourses
            enrollments={enrollments}
            courses={courses}
            progress={progress}
          />
        );
      case "progress":
        return (
          <CourseProgress
            enrollments={enrollments}
            courses={courses}
            progress={progress}
            onMarkCompleted={handleMarkCompleted}
          />
        );
      case "assignments":
        return <Assignments assignments={assignments} courses={courses} />;
      case "grades":
        return <Grades enrollments={enrollments} courses={courses} />;
      case "settings":
        return <Settings />;
      case "dashboard":
      default:
        return <DashboardDefaultContent />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <StudentHeader user={user} logout={logout} /> */}
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box component="main" sx={{ flexGrow: 1 }}>
             <UserHeader/>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderActiveTab()}
        </Container>
      </Box>
    </Box>
  );
};

export default StudentDashboard;

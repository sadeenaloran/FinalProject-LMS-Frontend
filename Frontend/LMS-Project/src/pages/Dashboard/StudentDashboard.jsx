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
// import CourseCard from "../../components/Dashboard/Studant/Courses/CourseCard";
// import EnrollmentDialog from "../../components/Dashboard/Studant/Courses/EnrollmentDialog";
// import ProgressDialog from "../../components/Dashboard/Studant/Progress/ProgressDialog";
// import StudentSidebar from "../../components/common/Sidebar/StudentSidebar";
// import CourseService from "../../services/StudentService";
// import EnrollmentService from "../../services/EnrollemtServices";
// import { dashboardStyles } from "../../assets/styles/studentStyle";
// import InProgressCourses from "../../components/Dashboard/Studant/Progress/InProgress";
// import AssignmentList from "../../components/Dashboard/Studant/Assignments/AssignmentList"; // Import the new AssignmentList component

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
//   const [selectedCourseForAssignments, setSelectedCourseForAssignments] =
//     useState(null);

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
//         setCourses([]);
//         setEnrolledCourses([]);
//       }
//     };

//     fetchData();
//   }, []);
//   useEffect(() => {
//     if (selectedCourseForAssignments) {
//       console.log(
//         "✅ Switching to assignments tab for course:",
//         selectedCourseForAssignments
//       );
//       setActiveTab("assignments");
//     }
//   }, [selectedCourseForAssignments]);

//   const handleEnrollClick = (course) => {
//     setSelectedCourse(course);
//     setEnrollmentDialogOpen(true);
//   };

//   const handleViewProgress = (course) => {
//     setSelectedCourse(course);
//     setProgressDialogOpen(true);
//   };
//   const handleViewAssignments = (course) => {
//     setSelectedCourseForAssignments(course);
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
//     } catch (error) {
//       console.error("Error enrolling:", error);
//     }
//   };

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
//               {activeTab === "all"
//                 ? "All Courses"
//                 : activeTab === "enrolled"
//                 ? "My Courses"
//                 : activeTab === "progress"
//                 ? "My Progress"
//                 : activeTab === "assignments"
//                 ? "My Assignments"
//                 : ""}
//             </Typography>
//           </Box>

//           {activeTab === "progress" ? (
//             <InProgressCourses />
//           ) : activeTab === "assignments" ? (
//             <AssignmentList
//               courseId={selectedCourseForAssignments?.id}
//               onBack={() => setActiveTab("enrolled")}
//             />
//           ) : loading ? (
//             <Box sx={dashboardStyles.loadingContainer}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={4}>
//               {filteredCourses.length > 0 ? (
//                 filteredCourses.map((course) => {
//                   const enrollment = (
//                     Array.isArray(enrolledCourses) ? enrolledCourses : []
//                   ).find((enroll) => enroll.course_id === course.id);

//                   const isEnrolled = !!enrollment;

//                   const courseWithEnrollment = {
//                     ...course,
//                     enrollmentId: enrollment?.id || null,
//                   };

//                   return (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//                       <CourseCard
//                         course={courseWithEnrollment}
//                         isEnrolled={isEnrolled}
//                         onEnrollClick={handleEnrollClick}
//                         onViewProgressClick={handleViewProgress}
//                         onViewAssignmentsClick={handleViewAssignments}
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
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import CourseCard from "../../components/Dashboard/Studant/Courses/CourseCard";
import EnrollmentDialog from "../../components/Dashboard/Studant/Courses/EnrollmentDialog";
import ProgressDialog from "../../components/Dashboard/Studant/Progress/ProgressDialog";
import StudentSidebar from "../../components/common/Sidebar/StudentSidebar";
import CourseService from "../../services/StudentService";
import EnrollmentService from "../../services/EnrollemtServices";
import { dashboardStyles } from "../../assets/styles/studentStyle";
import InProgressCourses from "../../components/Dashboard/Studant/Progress/InProgress";
import AssignmentList from "../../components/Dashboard/Studant/Assignments/AssignmentList";
import UserHeader from "../../components/common/Header/UserHeader";
const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50], 
}));

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
  backgroundColor: "#f8fbff", 
});

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCourseForAssignments, setSelectedCourseForAssignments] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allCoursesResponse, userEnrollmentsResponse] = await Promise.all(
          [
            CourseService.getAllCourses(),
            EnrollmentService.getUserEnrollments(),
          ]
        );

        const allCourses = Array.isArray(allCoursesResponse)
          ? allCoursesResponse
          : allCoursesResponse?.data || [];

        const userEnrollments = Array.isArray(userEnrollmentsResponse)
          ? userEnrollmentsResponse
          : userEnrollmentsResponse?.data || [];

        setCourses(allCourses);
        setEnrolledCourses(userEnrollments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setCourses([]);
        setEnrolledCourses([]);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (selectedCourseForAssignments) {
      console.log(
        "✅ Switching to assignments tab for course:",
        selectedCourseForAssignments
      );
      setActiveTab("assignments");
    }
  }, [selectedCourseForAssignments]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setEnrollmentDialogOpen(true);
  };

  const handleViewProgress = (course) => {
    setSelectedCourse(course);
    setProgressDialogOpen(true);
  };
  const handleViewAssignments = (course) => {
    setSelectedCourseForAssignments(course);
  };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      await EnrollmentService.enrollUser(selectedCourse.id);
      const updatedEnrollments = await EnrollmentService.getUserEnrollments();
      setEnrolledCourses(updatedEnrollments);
      setEnrollmentDialogOpen(false);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const filteredCourses =
    activeTab === "enrolled"
      ? (Array.isArray(courses) ? courses : []).filter((course) =>
          (Array.isArray(enrolledCourses) ? enrolledCourses : []).some(
            (enrollment) => enrollment.course_id === course.id
          )
        )
      : Array.isArray(courses)
      ? courses
      : [];

  return (
    <>
    <UserHeader/>
    <DashboardContainer>
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <MainContent>
        <Container maxWidth="xl">
          <Box sx={{ 
            ...dashboardStyles.header,
            backgroundColor: "#e3f2fd", // Light blue header background
            padding: "16px 24px",
            borderRadius: "8px",
            marginBottom: "24px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)"
          }}>
            <Typography variant="h4" component="h1" sx={{ 
              ...dashboardStyles.title,
              color: "#1976d2", // Primary blue color for title
              fontWeight: 600
            }}>
              {activeTab === "all"
                ? "All Courses"
                : activeTab === "enrolled"
                ? "My Courses"
                : activeTab === "progress"
                ? "My Progress"
                : activeTab === "assignments"
                ? "My Assignments"
                : ""}
            </Typography>
          </Box>

          {activeTab === "progress" ? (
            <InProgressCourses />
          ) : activeTab === "assignments" ? (
            <AssignmentList
              courseId={selectedCourseForAssignments?.id}
              onBack={() => setActiveTab("enrolled")}
            />
          ) : loading ? (
            <Box sx={{ 
              ...dashboardStyles.loadingContainer,
              backgroundColor: "rgba(227, 242, 253, 0.5)", // Semi-transparent light blue
              borderRadius: "8px",
              padding: "40px"
            }}>
              <CircularProgress sx={{ color: "#42a5f5" }} /> {/* Light blue progress */}
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const enrollment = (
                    Array.isArray(enrolledCourses) ? enrolledCourses : []
                  ).find((enroll) => enroll.course_id === course.id);

                  const isEnrolled = !!enrollment;

                  const courseWithEnrollment = {
                    ...course,
                    enrollmentId: enrollment?.id || null,
                  };

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                      <CourseCard
                        course={courseWithEnrollment}
                        isEnrolled={isEnrolled}
                        onEnrollClick={handleEnrollClick}
                        onViewProgressClick={handleViewProgress}
                        onViewAssignmentsClick={handleViewAssignments}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Box sx={{
                    backgroundColor: "#e3f2fd",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center"
                  }}>
                    <Typography variant="body1" sx={{ color: "#1565c0" }}>
                      No courses found
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </MainContent>

      <EnrollmentDialog
        open={enrollmentDialogOpen}
        onClose={() => setEnrollmentDialogOpen(false)}
        course={selectedCourse}
        onEnroll={handleEnroll}
      />

      <ProgressDialog
        open={progressDialogOpen}
        onClose={() => setProgressDialogOpen(false)}
        course={selectedCourse}
      />
    </DashboardContainer>
    </>

  );
};

export default StudentDashboard;
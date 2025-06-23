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

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   CircularProgress,
//   Card,
//   CardContent,
//   Avatar,
//   useTheme,
//   Tabs,
//   Tab,
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
// import AssignmentList from "../../components/Dashboard/Studant/Assignments/AssignmentList";
// import QuizDashboard from "./../../components/Dashboard/Studant/Quiz/QuizDashboard";
// import QuizIcon from "@mui/icons-material/Quiz";
// import { useAuth } from "../../contexts/AuthContext";
// import UserHeader from "../../components/common/Header/UserHeader";
// const motivationalQuotes = [
//   "The expert in anything was once a beginner.",
//   "Learning is a treasure that will follow its owner everywhere.",
//   "Education is the most powerful weapon which you can use to change the world.",
// ];

// const DashboardContainer = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   minHeight: "100vh",
//   width: "100%",
//   overflowX: "hidden",
// });

// const ContentWrapper = styled(Box)({
//   display: "flex",
//   flex: 1,
// });

// const MainContent = styled(Box)({
//   flexGrow: 1,
//   padding: "24px",
//   backgroundColor: "#f8fbff",
//   width: "calc(100% - 280px)",
// });

// const StatsCard = styled(Card)({
//   borderRadius: "12px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//   marginBottom: "16px",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     transition: "transform 0.2s ease-in-out",
//   },
// });

// const StudentDashboard = () => {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
//   const [progressDialogOpen, setProgressDialogOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [selectedCourseForAssignments, setSelectedCourseForAssignments] =
//     useState(null);
//   const [randomQuote] = useState(
//     motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
//   );
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [categories, setCategories] = useState([]);

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

//         const uniqueCategories = [
//           "all",
//           ...new Set(allCourses.map((course) => course.category)),
//         ];
//         setCategories(uniqueCategories);

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
//       if (!token) return;

//       await EnrollmentService.enrollUser(selectedCourse.id);
//       const updatedEnrollments = await EnrollmentService.getUserEnrollments();
//       setEnrolledCourses(updatedEnrollments);
//       setEnrollmentDialogOpen(false);
//     } catch (error) {
//       console.error("Error enrolling:", error);
//     }
//   };

//   // Helper functions
//   const enrolledCourseIds = enrolledCourses.map((enroll) => enroll.course_id);
//   const enrolledCoursesCount = enrolledCourseIds.length;
//   const completedCoursesCount = enrolledCourses.filter(
//     (enrollment) => enrollment.isCompleted
//   ).length;

//   const getEnrolledCourses = () => {
//     return courses
//       .filter((course) => enrolledCourseIds.includes(course.id))
//       .filter(
//         (course) =>
//           categoryFilter === "all" || course.category === categoryFilter
//       );
//   };

//   const getNotEnrolledCourses = () => {
//     return courses.filter((course) => !enrolledCourseIds.includes(course.id));
//   };

//   const renderCourses = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" py={4}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     const coursesToShow =
//       activeTab === "all" ? getNotEnrolledCourses() : getEnrolledCourses();

//     return (
//       <Grid container spacing={3}>
//         {coursesToShow.map((course) => {
//           const isEnrolled = enrolledCourseIds.includes(course.id);
//           const enrollment = enrolledCourses.find(
//             (enroll) => enroll.course_id === course.id
//           );

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//               <CourseCard
//                 course={{ ...course, enrollmentId: enrollment?.id || null }}
//                 isEnrolled={isEnrolled}
//                 onEnrollClick={activeTab === "all" ? handleEnrollClick : null}
//                 onViewProgressClick={handleViewProgress}
//                 onViewAssignmentsClick={handleViewAssignments}
//               />
//             </Grid>
//           );
//         })}
//       </Grid>
//     );
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return (
//           <>
//             {/* Welcome Section */}
//             <Card sx={{ mb: 4, p: 3, borderRadius: "12px" }}>
//               <Box display="flex" alignItems="center" gap={3}>
//                 <Avatar
//                   sx={{
//                     width: 64,
//                     height: 64,
//                     bgcolor: theme.palette.primary.main,
//                   }}
//                 >
//                   {user?.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h4" fontWeight={700}>
//                     Welcome, {user?.name || "Student"}!
//                   </Typography>
//                   <Typography color="text.secondary">{randomQuote}</Typography>
//                 </Box>
//               </Box>
//             </Card>

//             {/* Stats Cards */}
//             <Grid container spacing={2} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard>
//                   <CardContent>
//                     <Typography color="text.secondary" gutterBottom>
//                       Enrolled Courses
//                     </Typography>
//                     <Typography variant="h4" fontWeight={700}>
//                       {enrolledCoursesCount}
//                     </Typography>
//                   </CardContent>
//                 </StatsCard>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard>
//                   <CardContent>
//                     <Typography color="text.secondary" gutterBottom>
//                       Completed Courses
//                     </Typography>
//                     <Typography variant="h4" fontWeight={700}>
//                       {completedCoursesCount}
//                     </Typography>
//                   </CardContent>
//                 </StatsCard>
//               </Grid>
//             </Grid>

//             {/* Courses Section */}
//             <Typography variant="h5" mb={2} fontWeight={600}>
//               My Courses
//             </Typography>

//             {categories.length > 1 && (
//               <Tabs
//                 value={categoryFilter}
//                 onChange={(e, newValue) => setCategoryFilter(newValue)}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 sx={{ mb: 3 }}
//               >
//                 {categories.map((category) => (
//                   <Tab
//                     key={category}
//                     label={category}
//                     value={category}
//                     sx={{ textTransform: "capitalize" }}
//                   />
//                 ))}
//               </Tabs>
//             )}

//             {renderCourses()}
//           </>
//         );

//       case "progress":
//         return <InProgressCourses />;

//       case "assignments":
//         return (
//           <AssignmentList
//             courseId={selectedCourseForAssignments?.id}
//             onBack={() => setActiveTab("enrolled")}
//           />
//         );

//       case "quizzes":
//         return <QuizDashboard />;

//       case "all":
//       case "enrolled":
//         return (
//           <>
//             <Typography variant="h5" mb={3} fontWeight={600}>
//               {activeTab === "all" ? "Available Courses" : "My Courses"}
//             </Typography>
//             {renderCourses()}
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <DashboardContainer>
//       <UserHeader/>
//       <ContentWrapper>
//         <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//         <MainContent>
//           <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
//             {renderTabContent()}
//           </Container>
//         </MainContent>
//       </ContentWrapper>

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
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  useTheme,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Paper,
  IconButton,
  Badge,
  Divider,
  alpha,
  styled,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import CourseCard from "../../components/Dashboard/Studant/Courses/CourseCard";
import EnrollmentDialog from "../../components/Dashboard/Studant/Courses/EnrollmentDialog";
import ProgressDialog from "../../components/Dashboard/Studant/Progress/ProgressDialog";
import StudentSidebar from "../../components/common/Sidebar/StudentSidebar";
import StudentService from "../../services/StudentService";
import EnrollmentService from "../../services/EnrollemtServices";
// import { dashboardStyles } from "../../assets/styles/studentStyle";
import InProgressCourses from "../../components/Dashboard/Studant/Progress/InProgress";
import AssignmentList from "../../components/Dashboard/Studant/Assignments/AssignmentList";
import QuizDashboard from "./../../components/Dashboard/Studant/Quiz/QuizDashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import { useAuth } from "../../contexts/AuthContext";
import UserHeader from "../../components/common/Header/UserHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Settings from "../../components/common/Settings/Settings";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const DashboardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  overflowX: "hidden",
  background: (theme) =>
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f8fbff 0%, #e6f2ff 100%)"
      : "linear-gradient(135deg, #121826 0%, #1a2238 100%)",
});

const ContentWrapper = styled(Box)({
  display: "flex",
  flex: 1,
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  width: "calc(100% - 280px)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "16px",
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow:
    theme.palette.mode === "light"
      ? "0 6px 20px rgba(26, 140, 240, 0.1)"
      : "0 6px 20px rgba(0, 0, 0, 0.3)",
  marginBottom: "16px",
  transition: "all 0.3s ease",
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(145deg, #ffffff 0%, #f5f9ff 100%)"
      : "linear-gradient(145deg, #1E293B 0%, #121826 100%)",
  border: `1px solid ${
    theme.palette.mode === "light"
      ? "rgba(26, 140, 240, 0.1)"
      : "rgba(255, 255, 255, 0.05)"
  }`,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 12px 24px rgba(26, 140, 240, 0.15)"
        : "0 12px 24px rgba(0, 0, 0, 0.4)",
  },
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: theme.palette.primary.main,
  },
}));

const AnimatedAvatar = styled(Avatar)({
  animation: `${floatAnimation} 4s ease-in-out infinite`,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  border: "3px solid white",
});

const ProgressPill = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontWeight: 600,
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  backdropFilter: "blur(5px)",
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    height: "4px",
    borderRadius: "2px",
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(90deg, #1A8CF0 0%, #4DABF5 100%)"
        : "linear-gradient(90deg, #4DABF5 0%, #1A8CF0 100%)",
  },
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    minWidth: "unset",
    padding: "12px 16px",
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
  },
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgba(26, 140, 240, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)"
      : "linear-gradient(135deg, rgba(26, 140, 240, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)",
  backdropFilter: "blur(8px)",
  borderRadius: "20px",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: "0 8px 32px rgba(26, 140, 240, 0.1)",
  padding: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "100%",
    height: "200%",
    background: `radial-gradient(circle, ${alpha(
      theme.palette.primary.main,
      0.1
    )} 0%, transparent 70%)`,
    zIndex: 0,
  },
}));

const StudentDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCourseForAssignments, setSelectedCourseForAssignments] =
    useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const motivationalQuotes = [
    "The expert in anything was once a beginner.",
    "Learning is a treasure that will follow its owner everywhere.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The beautiful thing about learning is that no one can take it away from you.",
  ];

  const [randomQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setStatsLoading(true);
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

        const uniqueCategories = [
          "all",
          ...new Set(allCourses.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);

        setCourses(allCourses);
        setEnrolledCourses(userEnrollments);
        setLoading(false);
        setStatsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setStatsLoading(false);
        setCourses([]);
        setEnrolledCourses([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCourseForAssignments) {
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
      if (!token) return;

      await EnrollmentService.enrollUser(selectedCourse.id);
      const updatedEnrollments = await EnrollmentService.getUserEnrollments();
      setEnrolledCourses(updatedEnrollments);
      setEnrollmentDialogOpen(false);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // Helper functions
  const enrolledCourseIds = enrolledCourses.map((enroll) => enroll.course_id);
  const enrolledCoursesCount = enrolledCourseIds.length;
  const completedCoursesCount = enrolledCourses.filter(
    (enrollment) => enrollment.isCompleted
  ).length;
  const inProgressCoursesCount = enrolledCoursesCount - completedCoursesCount;
  const completionPercentage =
    enrolledCoursesCount > 0
      ? Math.round((completedCoursesCount / enrolledCoursesCount) * 100)
      : 0;

  const getEnrolledCourses = () => {
    return courses
      .filter((course) => enrolledCourseIds.includes(course.id))
      .filter(
        (course) =>
          categoryFilter === "all" || course.category === categoryFilter
      );
  };

  const getNotEnrolledCourses = () => {
    return courses.filter((course) => !enrolledCourseIds.includes(course.id));
  };

  const renderCourses = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      );
    }

    const coursesToShow =
      activeTab === "all" ? getNotEnrolledCourses() : getEnrolledCourses();

    if (coursesToShow.length === 0) {
      return (
        <Box textAlign="center" py={6}>
          <SchoolIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {activeTab === "all"
              ? "No available courses at the moment"
              : "You haven't enrolled in any courses yet"}
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3} sx={{display:"flex"}}>
        {coursesToShow.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          const enrollment = enrolledCourses.find(
            (enroll) => enroll.course_id === course.id
          );

          return (
            <Grid item size={4} xs={12} sm={6} md={4} lg={4} key={course.id}>
              <CourseCard
                course={{ ...course, enrollmentId: enrollment?.id || null }}
                isEnrolled={isEnrolled}
                onEnrollClick={activeTab === "all" ? handleEnrollClick : null}
                onViewProgressClick={handleViewProgress}
                onViewAssignmentsClick={handleViewAssignments}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* Welcome Section */}
            <HighlightCard sx={{ mb: 4 }}>
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                position="relative"
                zIndex={1}
              >
                <AnimatedAvatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {user?.name?.charAt(0) || "U"}
                </AnimatedAvatar>
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Welcome back, {user?.name || "Student"}!
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: "600px" }}
                  >
                    <em>"{randomQuote}"</em>
                  </Typography>
                </Box>
              </Box>
            </HighlightCard>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item size={3} xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <SchoolIcon color="primary" fontSize="medium" />
                      <Typography color="text.secondary" variant="subtitle2">
                        ENROLLED COURSES
                      </Typography>
                    </Box>
                    {statsLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Typography variant="h3" fontWeight={700}>
                        {enrolledCoursesCount}
                      </Typography>
                    )}
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item size={3} xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <CheckCircleIcon color="success" fontSize="medium" />
                      <Typography color="text.secondary" variant="subtitle2">
                        COMPLETED
                      </Typography>
                    </Box>
                    {statsLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="success.main"
                      >
                        {completedCoursesCount}
                      </Typography>
                    )}
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item size={3} xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <TrendingUpIcon color="warning" fontSize="medium" />
                      <Typography color="text.secondary" variant="subtitle2">
                        IN PROGRESS
                      </Typography>
                    </Box>
                    {statsLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        color="warning.main"
                      >
                        {inProgressCoursesCount}
                      </Typography>
                    )}
                  </CardContent>
                </StatsCard>
              </Grid>

              <Grid item size={3} xs={12} sm={6} md={3}>
                <StatsCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <EmojiEventsIcon color="secondary" fontSize="medium" />
                      <Typography color="text.secondary" variant="subtitle2">
                        COMPLETION
                      </Typography>
                    </Box>
                    {statsLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <Typography variant="h3" fontWeight={700}>
                          {completionPercentage}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={completionPercentage}
                          sx={{
                            height: 5,
                            borderRadius: 3,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              background:
                                theme.palette.mode === "light"
                                  ? "linear-gradient(90deg, #1A8CF0 0%, #4DABF5 100%)"
                                  : "linear-gradient(90deg, #4DABF5 0%, #1A8CF0 100%)",
                            },
                          }}
                        />
                      </>
                    )}
                  </CardContent>
                </StatsCard>
              </Grid>
            </Grid>

            {/* Courses Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h4" fontWeight={700}>
                  My Learning Journey
                </Typography>
                {categories.length > 1 && (
                  <StyledTabs
                    value={categoryFilter}
                    onChange={(e, newValue) => setCategoryFilter(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {categories.map((category, index) => (
                      <Tab
                        key={`${category}-${index}`}
                        label={category}
                        value={category}
                        sx={{ textTransform: "capitalize" }}
                      />
                    ))}
                  </StyledTabs>
                )}
              </Box>

              {renderCourses()}
            </Box>
          </>
        );

      case "progress":
        return <InProgressCourses />;

      case "assignments":
        return (
          <AssignmentList
            courseId={selectedCourseForAssignments?.id}
            onBack={() => setActiveTab("enrolled")}
          />
        );

      case "quizzes":
        return <QuizDashboard />;

      case "all":
      case "enrolled":
        return (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h4" fontWeight={700}>
                {activeTab === "all" ? "Available Courses" : "My Courses"}
              </Typography>
              {categories.length > 1 && (
                <StyledTabs
                  value={categoryFilter}
                  onChange={(e, newValue) => setCategoryFilter(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      label={category}
                      value={category}
                      sx={{ textTransform: "capitalize" }}
                    />
                  ))}
                </StyledTabs>
              )}
            </Box>
            {renderCourses()}
          </>
        );
 case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <DashboardContainer sx={{ pt: 12 }}>
      <UserHeader />
      <ContentWrapper>
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent>
          <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
            {renderTabContent()}
          </Container>
        </MainContent>
      </ContentWrapper>

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
  );
};

export default StudentDashboard;

// const DashboardContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   minHeight: "100vh",
//   backgroundColor: theme.palette.grey[50],
// }));

// const MainContent = styled(Box)({
//   flexGrow: 1,
//   padding: "24px",
//   backgroundColor: "#f8fbff",
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
//     <>
//     <UserHeader/>
//     <DashboardContainer>
//       <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <MainContent>
//         <Container maxWidth="xl">
//           <Box sx={{
//             ...dashboardStyles.header,
//             backgroundColor: "#e3f2fd", // Light blue header background
//             padding: "16px 24px",
//             borderRadius: "8px",
//             marginBottom: "24px",
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)"
//           }}>
//             <Typography variant="h4" component="h1" sx={{
//               ...dashboardStyles.title,
//               color: "#1976d2", // Primary blue color for title
//               fontWeight: 600
//             }}>
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
//             <Box sx={{
//               ...dashboardStyles.loadingContainer,
//               backgroundColor: "rgba(227, 242, 253, 0.5)", // Semi-transparent light blue
//               borderRadius: "8px",
//               padding: "40px"
//             }}>
//               <CircularProgress sx={{ color: "#42a5f5" }} /> {/* Light blue progress */}
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
//                   <Box sx={{
//                     backgroundColor: "#e3f2fd",
//                     padding: "20px",
//                     borderRadius: "8px",
//                     textAlign: "center"
//                   }}>
//                     <Typography variant="body1" sx={{ color: "#1565c0" }}>
//                       No courses found
//                     </Typography>
//                   </Box>
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
//     </>

//   );
// };

// export default StudentDashboard;

// import React, { useState, useEffect } from "react";import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   styled,
//   Avatar,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Tooltip,
//   Chip,
//   Snackbar,
//   InputAdornment,
//   TextField,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//  Dashboard as DashboardIcon,
//   School as CoursesIcon,
//   People as StudentsIcon,
//   BarChart as AnalyticsIcon,
//   Message as MessagesIcon,
//   Settings as SettingsIcon,
//   School as SchoolIcon,
//   VideoLibrary as VideoLibraryIcon,
//   Article as ArticleIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   Visibility as VisibilityIcon,
//   Schedule as ScheduleIcon,
//   CheckCircle as CheckCircleIcon,
//   Assignment as AssignmentIcon,
// } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import PeopleIcon from "@mui/icons-material/People";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  styled,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Chip,
  Snackbar,
  InputAdornment,
  TextField,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
  Message as MessagesIcon,
  Settings as SettingsIcon,
  School as SchoolIcon,
  VideoLibrary as VideoLibraryIcon,
  Article as ArticleIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InstructorService from "../../services/instructorService";
import StatusChip from "../../components/Dashboard/Instructor/StatusChip";
import StudentEnrollmentDashboard from "../../components/Dashboard/Instructor/EnrollmentStats";
//  import CreateAssignmentDialog from "../../components/Dashboard/Instructor/assignmnet/CreatAssignmentDialog"
// const DashboardContainer = styled(Box)(() => ({
//   display: "flex",
//   minHeight: "100vh",
//   backgroundColor: "#f5f7fa",
// }));
 
// const Sidebar = styled(Paper)(({ theme }) => ({
//   width: 280,
//   padding: theme.spacing(2),
//   borderRadius: 0,
//   boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//   backgroundColor: "#ffffff",
// }));
 
// const MainContent = styled(Box)(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(4),
//   backgroundColor: "#f5f7fa",
// }));
 
// const StatsCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: 12,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//   },
// }));
 
// const CourseCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   borderRadius: 12,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//   },
// }));
 

// const InstructorDashboard = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState({
//     totalCourses: 0,
//     approvedCourses: 0,
//     pendingCourses: 0,
//     rejectedCourses: 0,
//   });
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [recentlyCreatedAssignment, setRecentlyCreatedAssignment] =
//     useState(null);
 
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const data = await InstructorService.getCourses();
//         setCourses(data);
 
//         const approved = data.filter((c) => c.status === "approved").length;
//         const pending = data.filter((c) => c.status === "pending").length;
//         const rejected = data.filter((c) => c.status === "rejected").length;
 
//         setStats({
//           totalCourses: data.length,
//           approvedCourses: approved,
//           pendingCourses: pending,
//           rejectedCourses: rejected,
//         });
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchCourses();
//   }, []);
 
//   const handleDeleteCourse = async (courseId) => {
//     try {
//       await InstructorService.deleteCourse(courseId);
//       setCourses(courses.filter((course) => course.id !== courseId));
//       setStats((prev) => ({
//         ...prev,
//         totalCourses: prev.totalCourses - 1,
//         approvedCourses: courses.filter(
//           (c) => c.id !== courseId && c.status === "approved"
//         ).length,
//         pendingCourses: courses.filter(
//           (c) => c.id !== courseId && c.status === "pending"
//         ).length,
//         rejectedCourses: courses.filter(
//           (c) => c.id !== courseId && c.status === "rejected"
//         ).length,
//       }));
//     } catch (error) {
//       console.error("Failed to delete course:", error);
//     }
//   };
 
//   const handleViewCourse = async (course) => {
//     try {
//       setSelectedCourse(course);
//       setLoadingDetails(true);
//       setDialogOpen(true);
 
//       const modulesData = await InstructorService.getModulesByCourse(
//         course._id || course.id
//       );
//       setModules(modulesData);
//     } catch (error) {
//       console.error("Error fetching course modules:", error);
//     } finally {
//       setLoadingDetails(false);
//     }
//   };
 
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedCourse(null);
//     setModules([]);
//   };
 
//   const filteredCourses = courses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   return (
//     <DashboardContainer>
//       <Sidebar>
//         <Box display="flex" alignItems="center" mb={4}>
//           <Avatar
//             alt="Instructor"
//             src="/path/to/instructor-avatar.jpg"
//             sx={{ width: 56, height: 56, mr: 2 }}
//           />
//           <Box>
//             <Typography variant="h6">Dr. Sarah Johnson</Typography>
//             <Typography variant="body2" color="textSecondary">
//               Computer Science Instructor
//             </Typography>
//           </Box>
//         </Box>
//         <Divider sx={{ my: 2 }} />
//         <List>
//           {[
//             {
//               text: "Dashboard",
//               icon: <DashboardIcon />,
//               path: "/instructor/dashboard",
//             },
//             {
//               text: "My Courses",
//               icon: <CoursesIcon />,
//               path: "/instructor/courses",
//             },
//             {
//               text: "Create Course",
//               icon: <AddIcon />,
//               path: "/instructor/courses/create",
//             },
//             {
//               text: "Enrollment Stats",
//               icon: <PeopleIcon />,
//               path: "/instructor/enrollments",
//             },
//             {
//               text: "Assignment",
//               icon: <StudentsIcon />,
//               path: "/instructor/assignments",
//             },
//             {
//               text: "Visualization",
//               icon: <AnalyticsIcon />,
//               path: "/instructor/Visualization",
//             },
//             {
//               text: "Messages",
//               icon: <MessagesIcon />,
//               path: "/instructor/messages",
//             },
//             {
//               text: "Quizzez",
//               icon: <SettingsIcon />,
//               path: "/instructor/Quizze",
//             },
//           ].map((item) => (
//             <ListItem
//               button
//               key={item.text}
//               component={Link}
//               to={item.path}
//               sx={{
//                 borderRadius: 2,
//                 mb: 0.5,
//                 backgroundColor:
//                   location.pathname === item.path
//                     ? theme.palette.action.selected
//                     : "transparent",
//                 "&:hover": {
//                   backgroundColor: theme.palette.action.hover,
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           ))}
//         </List>
//       </Sidebar>
 
//       <MainContent>
//         <Box mb={4}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Instructor Dashboard
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             Welcome back! Here's what's happening with your courses today.
//           </Typography>
//         </Box>
 
//         <Grid container spacing={3} mb={4}>
//           {[
//             {
//               title: "Total Courses",
//               value: stats.totalCourses,
//               icon: <CoursesIcon fontSize="large" color="primary" />,
//             },
//             {
//               title: "Approved Courses",
//               value: stats.approvedCourses,
//               icon: <SchoolIcon fontSize="large" color="success" />,
//             },
//             {
//               title: "Pending Approval",
//               value: stats.pendingCourses,
//               icon: <ScheduleIcon fontSize="large" color="warning" />,
//             },
//             {
//               title: "Rejected Courses",
//               value: stats.rejectedCourses,
//               icon: <DeleteIcon fontSize="large" color="error" />,
//             },
//           ].map((stat) => (
//             <Grid item xs={12} sm={6} md={3} key={stat.title}>
//               <StatsCard>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box>
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       gutterBottom
//                     >
//                       {stat.title}
//                     </Typography>
//                     <Typography variant="h4" fontWeight="bold">
//                       {stat.value}
//                     </Typography>
//                   </Box>
//                   <Box>{stat.icon}</Box>
//                 </Box>
//               </StatsCard>
//             </Grid>
//           ))}
//         </Grid>
 
//         <Box mb={4}>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={2}
//           >
//             <Typography variant="h5" fontWeight="bold">
//               My Courses
//             </Typography>
//             <Box display="flex" gap={2}>
//               <Button
//                 component={Link}
//                 to="/instructor/courses/create"
//                 variant="contained"
//                 startIcon={<AddIcon />}
//               >
//                 Create Course
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<AssignmentIcon />}
//                 onClick={() => setAssignmentDialogOpen(true)}
//               >
//                 Create Assignment
//               </Button>
//             </Box>
//           </Box>
 
//           <Box mb={3}>
//             <Paper
//               component="form"
//               sx={{
//                 p: "2px 4px",
//                 display: "flex",
//                 alignItems: "center",
//                 width: "100%",
//                 maxWidth: 500,
//               }}
//             >
//               <SearchIcon sx={{ ml: 1, mr: 1 }} />
//               <input
//                 type="text"
//                 placeholder="Search courses..."
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   flex: 1,
//                   padding: "8px",
//                   fontSize: "14px",
//                 }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </Paper>
//           </Box>
 
//           {loading ? (
//             <Box display="flex" justifyContent="center" my={4}>
//               <CircularProgress />
//             </Box>
//           ) : filteredCourses.length === 0 ? (
//             <Paper sx={{ p: 3, textAlign: "center" }}>
//               <Typography variant="body1">
//                 {searchTerm
//                   ? "No courses match your search"
//                   : "You haven't created any courses yet"}
//               </Typography>
//               <Button
//                 component={Link}
//                 to="/instructor/courses/create"
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{ mt: 2 }}
//               >
//                 Create Your First Course
//               </Button>
//             </Paper>
//           ) : (
//             <Grid container spacing={3}>
//               {filteredCourses.map((course) => (
//                 <Grid item xs={12} md={6} lg={4} key={course._id || course.id}>
//                   <CourseCard>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="flex-start"
//                       mb={2}
//                     >
//                       <Typography variant="h6" fontWeight="bold">
//                         {course.title}
//                       </Typography>
//                       <StatusChip status={course.status} />
//                     </Box>
//                     <Typography variant="body2" color="textSecondary" mb={2}>
//                       {course.description.length > 100
//                         ? `${course.description.substring(0, 100)}...`
//                         : course.description}
//                     </Typography>
//                     <Box display="flex" justifyContent="flex-end" mb={2}>
//                       <Tooltip title="View Course">
//                         <IconButton
//                           size="small"
//                           onClick={() => handleViewCourse(course)}
//                           sx={{ mr: 1 }}
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Edit Course">
//                         <IconButton
//                           size="small"
//                           onClick={() =>
//                             navigate(
//                               `/instructor/courses/edit/${
//                                 course._id || course.id
//                               }`
//                             )
//                           }
//                           sx={{ mr: 1 }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete Course">
//                         <IconButton
//                           size="small"
//                           color="error"
//                           onClick={() => handleDeleteCourse(course.id)}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </CourseCard>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
 
//         <Dialog
//           open={dialogOpen}
//           onClose={handleCloseDialog}
//           fullWidth
//           maxWidth="md"
//           PaperProps={{
//             sx: {
//               borderRadius: 3,
//               minHeight: "70vh",
//             },
//           }}
//         >
//           <DialogTitle>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Typography variant="h5" fontWeight="bold">
//                 {selectedCourse?.title || "Course Details"}
//               </Typography>
//               <IconButton onClick={handleCloseDialog}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Box mt={1} display="flex" alignItems="center">
//               <StatusChip status={selectedCourse?.status} />
//             </Box>
//           </DialogTitle>
//           <DialogContent dividers>
//             {loadingDetails ? (
//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 minHeight="200px"
//               >
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 <Box mb={3}>
//                   <Typography variant="body1" paragraph>
//                     {selectedCourse?.description || "No description available"}
//                   </Typography>
//                 </Box>
 
//                 <Box mb={2}>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     Course Content
//                   </Typography>
//                   {modules.length === 0 ? (
//                     <Paper sx={{ p: 2, textAlign: "center" }}>
//                       <Typography variant="body2" color="textSecondary">
//                         No modules added yet
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         startIcon={<AddIcon />}
//                         sx={{ mt: 2 }}
//                         onClick={() => {
//                           handleCloseDialog();
//                           navigate(
//                             `/instructor/courses/edit/${
//                               selectedCourse._id || selectedCourse.id
//                             }`
//                           );
//                         }}
//                       >
//                         Add Modules
//                       </Button>
//                     </Paper>
//                   ) : (
//                     modules.map((module) => (
//                       <Accordion
//                         key={module._id || module.id}
//                         sx={{ mb: 1, borderRadius: 2 }}
//                       >
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                           <Box display="flex" alignItems="center" width="100%">
//                             <VideoLibraryIcon color="primary" sx={{ mr: 2 }} />
//                             <Box flexGrow={1}>
//                               <Typography fontWeight="bold">
//                                 {module.title}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           {module.lessons?.length > 0 ? (
//                             module.lessons.map((lesson) => (
//                               <Box
//                                 key={lesson._id || lesson.id}
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   p: 1.5,
//                                   mb: 1,
//                                   borderRadius: 1,
//                                   bgcolor: "grey.100",
//                                   "&:hover": { bgcolor: "grey.200" },
//                                 }}
//                               >
//                                 <ArticleIcon color="secondary" sx={{ mr: 2 }} />
//                                 <Box flexGrow={1}>
//                                   <Typography>{lesson.title}</Typography>
//                                   <Typography
//                                     variant="caption"
//                                     color="textSecondary"
//                                   >
//                                     {lesson.duration || "No duration set"}
//                                   </Typography>
//                                 </Box>
//                                 <IconButton size="small">
//                                   <EditIcon fontSize="small" />
//                                 </IconButton>
//                               </Box>
//                             ))
//                           ) : (
//                             <Typography variant="body2" color="textSecondary">
//                               No lessons in this module
//                             </Typography>
//                           )}
//                         </AccordionDetails>
//                       </Accordion>
//                     ))
//                   )}
//                 </Box>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ p: 2 }}>
//             <Button
//               variant="outlined"
//               onClick={handleCloseDialog}
//               sx={{ mr: 1 }}
//             >
//               Close
//             </Button>
//             <Button
//               variant="contained"
//               onClick={() => {
//                 handleCloseDialog();
//                 navigate(
//                   `/instructor/courses/edit/${
//                     selectedCourse._id || selectedCourse.id
//                   }`
//                 );
//               }}
//             >
//               Edit Course
//             </Button>
//           </DialogActions>
//         </Dialog>
 
//         <CreateAssignmentDialog
//           open={assignmentDialogOpen}
//           onClose={() => setAssignmentDialogOpen(false)}
//           onAssignmentCreated={(assignment) => {
//             setRecentlyCreatedAssignment(assignment);
//             setSnackbarOpen(true);
//           }}
//         />
 
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//           message="Assignment created successfully!"
//           action={
//             <Button
//               color="secondary"
//               size="small"
//               onClick={() => {
//                 navigate(`/assignments/${recentlyCreatedAssignment?.id}`);
//                 setSnackbarOpen(false);
//               }}
//               startIcon={<VisibilityIcon />}
//             >
//               View
//             </Button>
//           }
//         />
//       </MainContent>
//     </DashboardContainer>
//   );
// };
 
// export default InstructorDashboard;

// Modern styled components
const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(3, 2),
  borderRadius: 0,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

const CourseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: "all 0.3s ease",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
}));

const steps = [
  "Select Course",
  "Select Module",
  "Select Lesson",
  "Assignment Details",
];

const CreateAssignmentDialog = ({ open, onClose, onAssignmentCreated }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    max_score: 100,
  });

  useEffect(() => {
    if (open) {
      fetchCoursesHierarchy();
    }
  }, [open]);

  const fetchCoursesHierarchy = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await InstructorService.getCoursesHierarchy();
      const filteredCourses = data.filter(
        (course) =>
          Array.isArray(course.modules) &&
          course.modules.length > 0 &&
          course.modules.some(
            (module) =>
              Array.isArray(module.lessons) && module.lessons.length > 0
          )
      );
      setCourses(filteredCourses);
    } catch (err) {
      setError("Failed to load courses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCourseChange = (event) => {
    const selected = event.target.value;
    setSelectedCourse(selected);
    setSelectedModule("");
    setSelectedLesson("");
  };

  const handleModuleChange = (event) => {
    const selected = String(event.target.value);
    setSelectedModule(event.target.value);
    setSelectedLesson("");
  };

  const handleLessonChange = (event) => {
    setSelectedLesson(String(event.target.value));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const assignment = {
        lesson_id: selectedLesson,
        ...assignmentData,
      };
      const createdAssignment = await InstructorService.createAssignment(
        assignment
      );
      onAssignmentCreated(createdAssignment);
      onClose();
    } catch (err) {
      setError("Failed to create assignment. Please try again.");
      console.error(err);
    }
  };

  const getSelectedCourse = () =>
    courses.find((c) => String(c.id || c._id) === String(selectedCourse));

  const getSelectedModule = () => {
    const course = getSelectedCourse();
    if (!course) return null;
    return course.modules.find(
      (m) => String(m.id || m._id) === String(selectedModule)
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: theme.shape.borderRadius * 2,
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Create New Assignment
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color: theme.palette.text.secondary,
                    "&.Mui-active": {
                      color: theme.palette.text.primary,
                    },
                    "&.Mui-completed": {
                      color: theme.palette.text.primary,
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper elevation={0} sx={{ p: 2, bgcolor: "error.light" }}>
            <Typography color="error">{error}</Typography>
            <Button onClick={fetchCoursesHierarchy} sx={{ mt: 1 }}>
              Retry
            </Button>
          </Paper>
        ) : (
          <>
            {activeStep === 0 && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    label="Select Course"
                    sx={{ mb: 2 }}
                  >
                    {courses.map((course) => (
                      <MenuItem
                        key={course._id}
                        value={String(course.id || course._id)}
                      >
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedCourse && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: theme.shape.borderRadius,
                      backgroundColor: theme.palette.action.hover,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      Course Description:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getSelectedCourse()?.description ||
                        "No description available"}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Module</InputLabel>
                  <Select
                    value={selectedModule}
                    onChange={handleModuleChange}
                    label="Select Module"
                    disabled={!selectedCourse}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="">
                      <em>Select Module</em>
                    </MenuItem>
                    {getSelectedCourse()?.modules?.map((module) => (
                      <MenuItem
                        key={module.id || module._id}
                        value={String(module.id || module._id)}
                      >
                        {module.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedModule && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: theme.shape.borderRadius,
                      backgroundColor: theme.palette.action.hover,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      Module Details:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getSelectedModule()?.description ||
                        "No description available"}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Lesson</InputLabel>
                  <Select
                    value={selectedLesson}
                    onChange={handleLessonChange}
                    label="Select Lesson"
                    disabled={!selectedModule}
                    sx={{ mb: 2 }}
                  >
                    {getSelectedModule()?.lessons?.map((lesson) => (
                      <MenuItem
                        key={lesson.id || lesson._id}
                        value={String(lesson.id || lesson._id)}
                      >
                        {lesson.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedLesson && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: theme.shape.borderRadius,
                      backgroundColor: theme.palette.action.hover,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      Lesson Details:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getSelectedModule()?.lessons?.find(
                        (l) => String(l.id || l._id) === selectedLesson
                      )?.description || "No description available"}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeStep === 3 && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Assignment Title"
                  name="title"
                  value={assignmentData.title}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={assignmentData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Maximum Score"
                  name="max_score"
                  type="number"
                  value={assignmentData.max_score}
                  onChange={handleInputChange}
                  inputProps={{ min: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CheckCircleIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleBack} disabled={activeStep === 0} sx={{ mr: 1 }}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedLesson || !assignmentData.title}
            startIcon={<AssignmentIcon />}
          >
            Create Assignment
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={
              activeStep === 0 &&
              (!selectedCourse || getSelectedCourse()?.modules?.length === 0)
            }
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const InstructorDashboard = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalCourses: 0,
    approvedCourses: 0,
    pendingCourses: 0,
    rejectedCourses: 0,
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [recentlyCreatedAssignment, setRecentlyCreatedAssignment] =
    useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await InstructorService.getCourses();
        setCourses(data);

        const approved = data.filter((c) => c.status === "approved").length;
        const pending = data.filter((c) => c.status === "pending").length;
        const rejected = data.filter((c) => c.status === "rejected").length;

        setStats({
          totalCourses: data.length,
          approvedCourses: approved,
          pendingCourses: pending,
          rejectedCourses: rejected,
        });
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await InstructorService.deleteCourse(courseId);
      setCourses(courses.filter((course) => course.id !== courseId));
      setStats((prev) => ({
        ...prev,
        totalCourses: prev.totalCourses - 1,
        approvedCourses: courses.filter(
          (c) => c.id !== courseId && c.status === "approved"
        ).length,
        pendingCourses: courses.filter(
          (c) => c.id !== courseId && c.status === "pending"
        ).length,
        rejectedCourses: courses.filter(
          (c) => c.id !== courseId && c.status === "rejected"
        ).length,
      }));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleViewCourse = async (course) => {
    try {
      setSelectedCourse(course);
      setLoadingDetails(true);
      setDialogOpen(true);

      const modulesData = await InstructorService.getModulesByCourse(
        course._id || course.id
      );
      setModules(modulesData);
    } catch (error) {
      console.error("Error fetching course modules:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCourse(null);
    setModules([]);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardContainer>
      <Sidebar>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            alt="Instructor"
            src="/path/to/instructor-avatar.jpg"
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Dr. Sarah Johnson
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Computer Science Instructor
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon />,
              path: "/instructor/dashboard",
            },
            {
              text: "My Courses",
              icon: <CoursesIcon />,
              path: "/instructor/courses",
            },
            {
              text: "Create Course",
              icon: <AddIcon />,
              path: "/instructor/courses/create",
            },
            {
              text: "Enrollment Stats",
              icon: <PeopleIcon />,
              path: "/instructor/enrollments",
            },
            {
              text: "Assignment",
              icon: <StudentsIcon />,
              path: "/instructor/assignments",
            },
            {
              text: "Visualization",
              icon: <AnalyticsIcon />,
              path: "/instructor/Visualization",
            },
            {
              text: "Messages",
              icon: <MessagesIcon />,
              path: "/instructor/messages",
            },
            {
              text: "Quizzez",
              icon: <SettingsIcon />,
              path: "/instructor/Quizze",
            },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: theme.shape.borderRadius,
                mb: 0.5,
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.action.selected
                    : "transparent",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                  color:
                    location.pathname === item.path
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Sidebar>

      <MainContent>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Instructor Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Here's what's happening with your courses today.
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          {[
            {
              title: "Total Courses",
              value: stats.totalCourses,
              icon: <CoursesIcon fontSize="large" />,
              color: theme.palette.primary.main,
            },
            {
              title: "Approved Courses",
              value: stats.approvedCourses,
              icon: <SchoolIcon fontSize="large" />,
              color: theme.palette.success.main,
            },
            {
              title: "Pending Approval",
              value: stats.pendingCourses,
              icon: <ScheduleIcon fontSize="large" />,
              color: theme.palette.warning.main,
            },
            {
              title: "Rejected Courses",
              value: stats.rejectedCourses,
              icon: <DeleteIcon fontSize="large" />,
              color: theme.palette.error.main,
            },
          ].map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatsCard>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color={stat.color}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </StatsCard>
            </Grid>
          ))}
        </Grid>

        <Box mb={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold">
              My Courses
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                component={Link}
                to="/instructor/courses/create"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                Create Course
              </Button>
              <Button
                variant="outlined"
                startIcon={<AssignmentIcon />}
                onClick={() => setAssignmentDialogOpen(true)}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "none",
                }}
              >
                Create Assignment
              </Button>
            </Box>
          </Box>

          <Box mb={3}>
            <SearchInput
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  maxWidth: 500,
                },
              }}
            />
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : filteredCourses.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="body1">
                {searchTerm
                  ? "No courses match your search"
                  : "You haven't created any courses yet"}
              </Typography>
              <Button
                component={Link}
                to="/instructor/courses/create"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Create Your First Course
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map((course) => (
                <Grid item xs={12} md={6} lg={4} key={course._id || course.id}>
                  <CourseCard>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {course.title}
                      </Typography>
                      <StatusChip status={course.status} />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                      <Tooltip title="View Course">
                        <IconButton
                          size="small"
                          onClick={() => handleViewCourse(course)}
                          sx={{
                            mr: 1,
                            "&:hover": {
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Course">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(
                              `/instructor/courses/edit/${
                                course._id || course.id
                              }`
                            )
                          }
                          sx={{
                            mr: 1,
                            "&:hover": {
                              backgroundColor: theme.palette.secondary.light,
                              color: theme.palette.secondary.main,
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Course">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteCourse(course.id)}
                          sx={{
                            "&:hover": {
                              backgroundColor: theme.palette.error.light,
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CourseCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: theme.shape.borderRadius * 2,
              minHeight: "70vh",
              background: theme.palette.background.paper,
            },
          }}
        >
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="bold">
                {selectedCourse?.title || "Course Details"}
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box mt={1} display="flex" alignItems="center">
              <StatusChip status={selectedCourse?.status} />
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {loadingDetails ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box mb={3}>
                  <Typography variant="body1" paragraph>
                    {selectedCourse?.description || "No description available"}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Course Content
                  </Typography>
                  {modules.length === 0 ? (
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.action.hover,
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        No modules added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => {
                          handleCloseDialog();
                          navigate(
                            `/instructor/courses/edit/${
                              selectedCourse._id || selectedCourse.id
                            }`
                          );
                        }}
                      >
                        Add Modules
                      </Button>
                    </Paper>
                  ) : (
                    modules.map((module) => (
                      <Accordion
                        key={module._id || module.id}
                        sx={{
                          mb: 1,
                          borderRadius: theme.shape.borderRadius,
                          "&:before": {
                            display: "none",
                          },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box display="flex" alignItems="center" width="100%">
                            <VideoLibraryIcon color="primary" sx={{ mr: 2 }} />
                            <Box flexGrow={1}>
                              <Typography fontWeight="bold">
                                {module.title}
                              </Typography>
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          {module.lessons?.length > 0 ? (
                            module.lessons.map((lesson) => (
                              <Box
                                key={lesson._id || lesson.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  p: 1.5,
                                  mb: 1,
                                  borderRadius: theme.shape.borderRadius,
                                  bgcolor: theme.palette.action.hover,
                                  "&:hover": {
                                    bgcolor: theme.palette.action.selected,
                                    boxShadow: theme.shadows[1],
                                  },
                                }}
                              >
                                <ArticleIcon color="secondary" sx={{ mr: 2 }} />
                                <Box flexGrow={1}>
                                  <Typography>{lesson.title}</Typography>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {lesson.duration || "No duration set"}
                                  </Typography>
                                </Box>
                                <IconButton
                                  size="small"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor:
                                        theme.palette.secondary.light,
                                      color: theme.palette.secondary.main,
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              No lessons in this module
                            </Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCloseDialog}
              sx={{ mr: 1 }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleCloseDialog();
                navigate(
                  `/instructor/courses/edit/${
                    selectedCourse._id || selectedCourse.id
                  }`
                );
              }}
            >
              Edit Course
            </Button>
          </DialogActions>
        </Dialog>

        <CreateAssignmentDialog
          open={assignmentDialogOpen}
          onClose={() => setAssignmentDialogOpen(false)}
          onAssignmentCreated={(assignment) => {
            setRecentlyCreatedAssignment(assignment);
            setSnackbarOpen(true);
          }}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: theme.shape.borderRadius,
            },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.contrastText,
            }}
          >
            <Box display="flex" alignItems="center">
              <CheckCircleIcon sx={{ mr: 1 }} />
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Assignment created successfully!
              </Typography>
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  navigate(`/assignments/${recentlyCreatedAssignment?.id}`);
                  setSnackbarOpen(false);
                }}
                startIcon={<VisibilityIcon />}
                sx={{ ml: 2 }}
              >
                View
              </Button>
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setSnackbarOpen(false)}
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Snackbar>
      </MainContent>
    </DashboardContainer>
  );
};

export default InstructorDashboard;

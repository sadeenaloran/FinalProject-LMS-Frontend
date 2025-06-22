// // import React, { useState, useEffect } from "react";import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Grid,
// //   styled,
// //   Avatar,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Button,
// //   CircularProgress,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   IconButton,
// //   Accordion,
// //   AccordionSummary,
// //   AccordionDetails,
// //   Tooltip,
// //   Chip,
// //   Snackbar,
// //   InputAdornment,
// //   TextField,
// //   Stepper,
// //   Step,
// //   StepLabel,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// // } from "@mui/material";
// // import {
// //  Dashboard as DashboardIcon,
// //   School as CoursesIcon,
// //   People as StudentsIcon,
// //   BarChart as AnalyticsIcon,
// //   Message as MessagesIcon,
// //   Settings as SettingsIcon,
// //   School as SchoolIcon,
// //   VideoLibrary as VideoLibraryIcon,
// //   Article as ArticleIcon,
// //   Add as AddIcon,
// //   Search as SearchIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// //   ExpandMore as ExpandMoreIcon,
// //   Visibility as VisibilityIcon,
// //   Schedule as ScheduleIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Assignment as AssignmentIcon,
// // } from "@mui/icons-material";
// // import { useTheme } from "@mui/material/styles";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import PeopleIcon from "@mui/icons-material/People";
// // import InstructorService from "../../services/instructorService";
// // import StatusChip from "../../components/Dashboard/Instructor/StatusChip";
// // import StudentEnrollmentDashboard from "../../components/Dashboard/Instructor/EnrollmentStats";
// //  import CreateAssignmentDialog from "../../components/Dashboard/Instructor/assignmnet/CreatAssignmentDialog"
// // const DashboardContainer = styled(Box)(() => ({
// //   display: "flex",
// //   minHeight: "100vh",
// //   backgroundColor: "#f5f7fa",
// // }));

// // const Sidebar = styled(Paper)(({ theme }) => ({
// //   width: 280,
// //   padding: theme.spacing(2),
// //   borderRadius: 0,
// //   boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
// //   backgroundColor: "#ffffff",
// // }));

// // const MainContent = styled(Box)(({ theme }) => ({
// //   flexGrow: 1,
// //   padding: theme.spacing(4),
// //   backgroundColor: "#f5f7fa",
// // }));

// // const StatsCard = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   borderRadius: 12,
// //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //   "&:hover": {
// //     transform: "translateY(-5px)",
// //     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //   },
// // }));

// // const CourseCard = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   marginBottom: theme.spacing(2),
// //   borderRadius: 12,
// //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //   "&:hover": {
// //     transform: "translateY(-5px)",
// //     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //   },
// // }));

// // const InstructorDashboard = () => {
// //   const theme = useTheme();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [stats, setStats] = useState({
// //     totalCourses: 0,
// //     approvedCourses: 0,
// //     pendingCourses: 0,
// //     rejectedCourses: 0,
// //   });
// //   const [selectedCourse, setSelectedCourse] = useState(null);
// //   const [modules, setModules] = useState([]);
// //   const [dialogOpen, setDialogOpen] = useState(false);
// //   const [loadingDetails, setLoadingDetails] = useState(false);
// //   const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [recentlyCreatedAssignment, setRecentlyCreatedAssignment] =
// //     useState(null);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await InstructorService.getCourses();
// //         setCourses(data);

// //         const approved = data.filter((c) => c.status === "approved").length;
// //         const pending = data.filter((c) => c.status === "pending").length;
// //         const rejected = data.filter((c) => c.status === "rejected").length;

// //         setStats({
// //           totalCourses: data.length,
// //           approvedCourses: approved,
// //           pendingCourses: pending,
// //           rejectedCourses: rejected,
// //         });
// //       } catch (error) {
// //         console.error("Failed to fetch courses:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   const handleDeleteCourse = async (courseId) => {
// //     try {
// //       await InstructorService.deleteCourse(courseId);
// //       setCourses(courses.filter((course) => course.id !== courseId));
// //       setStats((prev) => ({
// //         ...prev,
// //         totalCourses: prev.totalCourses - 1,
// //         approvedCourses: courses.filter(
// //           (c) => c.id !== courseId && c.status === "approved"
// //         ).length,
// //         pendingCourses: courses.filter(
// //           (c) => c.id !== courseId && c.status === "pending"
// //         ).length,
// //         rejectedCourses: courses.filter(
// //           (c) => c.id !== courseId && c.status === "rejected"
// //         ).length,
// //       }));
// //     } catch (error) {
// //       console.error("Failed to delete course:", error);
// //     }
// //   };

// //   const handleViewCourse = async (course) => {
// //     try {
// //       setSelectedCourse(course);
// //       setLoadingDetails(true);
// //       setDialogOpen(true);

// //       const modulesData = await InstructorService.getModulesByCourse(
// //         course._id || course.id
// //       );
// //       setModules(modulesData);
// //     } catch (error) {
// //       console.error("Error fetching course modules:", error);
// //     } finally {
// //       setLoadingDetails(false);
// //     }
// //   };

// //   const handleCloseDialog = () => {
// //     setDialogOpen(false);
// //     setSelectedCourse(null);
// //     setModules([]);
// //   };

// //   const filteredCourses = courses.filter(
// //     (course) =>
// //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       course.description.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <DashboardContainer>
// //       <Sidebar>
// //         <Box display="flex" alignItems="center" mb={4}>
// //           <Avatar
// //             alt="Instructor"
// //             src="/path/to/instructor-avatar.jpg"
// //             sx={{ width: 56, height: 56, mr: 2 }}
// //           />
// //           <Box>
// //             <Typography variant="h6">Dr. Sarah Johnson</Typography>
// //             <Typography variant="body2" color="textSecondary">
// //               Computer Science Instructor
// //             </Typography>
// //           </Box>
// //         </Box>
// //         <Divider sx={{ my: 2 }} />
// //         <List>
// //           {[
// //             {
// //               text: "Dashboard",
// //               icon: <DashboardIcon />,
// //               path: "/instructor/dashboard",
// //             },
// //             {
// //               text: "My Courses",
// //               icon: <CoursesIcon />,
// //               path: "/instructor/courses",
// //             },
// //             {
// //               text: "Create Course",
// //               icon: <AddIcon />,
// //               path: "/instructor/courses/create",
// //             },
// //             {
// //               text: "Enrollment Stats",
// //               icon: <PeopleIcon />,
// //               path: "/instructor/enrollments",
// //             },
// //             {
// //               text: "Assignment",
// //               icon: <StudentsIcon />,
// //               path: "/instructor/assignments",
// //             },
// //             {
// //               text: "Visualization",
// //               icon: <AnalyticsIcon />,
// //               path: "/instructor/Visualization",
// //             },
// //             {
// //               text: "Messages",
// //               icon: <MessagesIcon />,
// //               path: "/instructor/messages",
// //             },
// //             {
// //               text: "Quizzez",
// //               icon: <SettingsIcon />,
// //               path: "/instructor/Quizze",
// //             },
// //           ].map((item) => (
// //             <ListItem
// //               button
// //               key={item.text}
// //               component={Link}
// //               to={item.path}
// //               sx={{
// //                 borderRadius: 2,
// //                 mb: 0.5,
// //                 backgroundColor:
// //                   location.pathname === item.path
// //                     ? theme.palette.action.selected
// //                     : "transparent",
// //                 "&:hover": {
// //                   backgroundColor: theme.palette.action.hover,
// //                 },
// //               }}
// //             >
// //               <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
// //               <ListItemText primary={item.text} />
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Sidebar>

// //       <MainContent>
// //         <Box mb={4}>
// //           <Typography variant="h4" fontWeight="bold" gutterBottom>
// //             Instructor Dashboard
// //           </Typography>
// //           <Typography variant="body1" color="textSecondary">
// //             Welcome back! Here's what's happening with your courses today.
// //           </Typography>
// //         </Box>

// //         <Grid container spacing={3} mb={4}>
// //           {[
// //             {
// //               title: "Total Courses",
// //               value: stats.totalCourses,
// //               icon: <CoursesIcon fontSize="large" color="primary" />,
// //             },
// //             {
// //               title: "Approved Courses",
// //               value: stats.approvedCourses,
// //               icon: <SchoolIcon fontSize="large" color="success" />,
// //             },
// //             {
// //               title: "Pending Approval",
// //               value: stats.pendingCourses,
// //               icon: <ScheduleIcon fontSize="large" color="warning" />,
// //             },
// //             {
// //               title: "Rejected Courses",
// //               value: stats.rejectedCourses,
// //               icon: <DeleteIcon fontSize="large" color="error" />,
// //             },
// //           ].map((stat) => (
// //             <Grid item xs={12} sm={6} md={3} key={stat.title}>
// //               <StatsCard>
// //                 <Box
// //                   display="flex"
// //                   justifyContent="space-between"
// //                   alignItems="center"
// //                 >
// //                   <Box>
// //                     <Typography
// //                       variant="body2"
// //                       color="textSecondary"
// //                       gutterBottom
// //                     >
// //                       {stat.title}
// //                     </Typography>
// //                     <Typography variant="h4" fontWeight="bold">
// //                       {stat.value}
// //                     </Typography>
// //                   </Box>
// //                   <Box>{stat.icon}</Box>
// //                 </Box>
// //               </StatsCard>
// //             </Grid>
// //           ))}
// //         </Grid>

// //         <Box mb={4}>
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             mb={2}
// //           >
// //             <Typography variant="h5" fontWeight="bold">
// //               My Courses
// //             </Typography>
// //             <Box display="flex" gap={2}>
// //               <Button
// //                 component={Link}
// //                 to="/instructor/courses/create"
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //               >
// //                 Create Course
// //               </Button>
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<AssignmentIcon />}
// //                 onClick={() => setAssignmentDialogOpen(true)}
// //               >
// //                 Create Assignment
// //               </Button>
// //             </Box>
// //           </Box>

// //           <Box mb={3}>
// //             <Paper
// //               component="form"
// //               sx={{
// //                 p: "2px 4px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 width: "100%",
// //                 maxWidth: 500,
// //               }}
// //             >
// //               <SearchIcon sx={{ ml: 1, mr: 1 }} />
// //               <input
// //                 type="text"
// //                 placeholder="Search courses..."
// //                 style={{
// //                   border: "none",
// //                   outline: "none",
// //                   flex: 1,
// //                   padding: "8px",
// //                   fontSize: "14px",
// //                 }}
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </Paper>
// //           </Box>

// //           {loading ? (
// //             <Box display="flex" justifyContent="center" my={4}>
// //               <CircularProgress />
// //             </Box>
// //           ) : filteredCourses.length === 0 ? (
// //             <Paper sx={{ p: 3, textAlign: "center" }}>
// //               <Typography variant="body1">
// //                 {searchTerm
// //                   ? "No courses match your search"
// //                   : "You haven't created any courses yet"}
// //               </Typography>
// //               <Button
// //                 component={Link}
// //                 to="/instructor/courses/create"
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 sx={{ mt: 2 }}
// //               >
// //                 Create Your First Course
// //               </Button>
// //             </Paper>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {filteredCourses.map((course) => (
// //                 <Grid item xs={12} md={6} lg={4} key={course._id || course.id}>
// //                   <CourseCard>
// //                     <Box
// //                       display="flex"
// //                       justifyContent="space-between"
// //                       alignItems="flex-start"
// //                       mb={2}
// //                     >
// //                       <Typography variant="h6" fontWeight="bold">
// //                         {course.title}
// //                       </Typography>
// //                       <StatusChip status={course.status} />
// //                     </Box>
// //                     <Typography variant="body2" color="textSecondary" mb={2}>
// //                       {course.description.length > 100
// //                         ? `${course.description.substring(0, 100)}...`
// //                         : course.description}
// //                     </Typography>
// //                     <Box display="flex" justifyContent="flex-end" mb={2}>
// //                       <Tooltip title="View Course">
// //                         <IconButton
// //                           size="small"
// //                           onClick={() => handleViewCourse(course)}
// //                           sx={{ mr: 1 }}
// //                         >
// //                           <VisibilityIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Edit Course">
// //                         <IconButton
// //                           size="small"
// //                           onClick={() =>
// //                             navigate(
// //                               `/instructor/courses/edit/${
// //                                 course._id || course.id
// //                               }`
// //                             )
// //                           }
// //                           sx={{ mr: 1 }}
// //                         >
// //                           <EditIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Delete Course">
// //                         <IconButton
// //                           size="small"
// //                           color="error"
// //                           onClick={() => handleDeleteCourse(course.id)}
// //                         >
// //                           <DeleteIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </Box>
// //                   </CourseCard>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </Box>

// //         <Dialog
// //           open={dialogOpen}
// //           onClose={handleCloseDialog}
// //           fullWidth
// //           maxWidth="md"
// //           PaperProps={{
// //             sx: {
// //               borderRadius: 3,
// //               minHeight: "70vh",
// //             },
// //           }}
// //         >
// //           <DialogTitle>
// //             <Box
// //               display="flex"
// //               justifyContent="space-between"
// //               alignItems="center"
// //             >
// //               <Typography variant="h5" fontWeight="bold">
// //                 {selectedCourse?.title || "Course Details"}
// //               </Typography>
// //               <IconButton onClick={handleCloseDialog}>
// //                 <CloseIcon />
// //               </IconButton>
// //             </Box>
// //             <Box mt={1} display="flex" alignItems="center">
// //               <StatusChip status={selectedCourse?.status} />
// //             </Box>
// //           </DialogTitle>
// //           <DialogContent dividers>
// //             {loadingDetails ? (
// //               <Box
// //                 display="flex"
// //                 justifyContent="center"
// //                 alignItems="center"
// //                 minHeight="200px"
// //               >
// //                 <CircularProgress />
// //               </Box>
// //             ) : (
// //               <>
// //                 <Box mb={3}>
// //                   <Typography variant="body1" paragraph>
// //                     {selectedCourse?.description || "No description available"}
// //                   </Typography>
// //                 </Box>

// //                 <Box mb={2}>
// //                   <Typography variant="h6" fontWeight="bold" gutterBottom>
// //                     Course Content
// //                   </Typography>
// //                   {modules.length === 0 ? (
// //                     <Paper sx={{ p: 2, textAlign: "center" }}>
// //                       <Typography variant="body2" color="textSecondary">
// //                         No modules added yet
// //                       </Typography>
// //                       <Button
// //                         variant="outlined"
// //                         startIcon={<AddIcon />}
// //                         sx={{ mt: 2 }}
// //                         onClick={() => {
// //                           handleCloseDialog();
// //                           navigate(
// //                             `/instructor/courses/edit/${
// //                               selectedCourse._id || selectedCourse.id
// //                             }`
// //                           );
// //                         }}
// //                       >
// //                         Add Modules
// //                       </Button>
// //                     </Paper>
// //                   ) : (
// //                     modules.map((module) => (
// //                       <Accordion
// //                         key={module._id || module.id}
// //                         sx={{ mb: 1, borderRadius: 2 }}
// //                       >
// //                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
// //                           <Box display="flex" alignItems="center" width="100%">
// //                             <VideoLibraryIcon color="primary" sx={{ mr: 2 }} />
// //                             <Box flexGrow={1}>
// //                               <Typography fontWeight="bold">
// //                                 {module.title}
// //                               </Typography>
// //                             </Box>
// //                           </Box>
// //                         </AccordionSummary>
// //                         <AccordionDetails>
// //                           {module.lessons?.length > 0 ? (
// //                             module.lessons.map((lesson) => (
// //                               <Box
// //                                 key={lesson._id || lesson.id}
// //                                 sx={{
// //                                   display: "flex",
// //                                   alignItems: "center",
// //                                   p: 1.5,
// //                                   mb: 1,
// //                                   borderRadius: 1,
// //                                   bgcolor: "grey.100",
// //                                   "&:hover": { bgcolor: "grey.200" },
// //                                 }}
// //                               >
// //                                 <ArticleIcon color="secondary" sx={{ mr: 2 }} />
// //                                 <Box flexGrow={1}>
// //                                   <Typography>{lesson.title}</Typography>
// //                                   <Typography
// //                                     variant="caption"
// //                                     color="textSecondary"
// //                                   >
// //                                     {lesson.duration || "No duration set"}
// //                                   </Typography>
// //                                 </Box>
// //                                 <IconButton size="small">
// //                                   <EditIcon fontSize="small" />
// //                                 </IconButton>
// //                               </Box>
// //                             ))
// //                           ) : (
// //                             <Typography variant="body2" color="textSecondary">
// //                               No lessons in this module
// //                             </Typography>
// //                           )}
// //                         </AccordionDetails>
// //                       </Accordion>
// //                     ))
// //                   )}
// //                 </Box>
// //               </>
// //             )}
// //           </DialogContent>
// //           <DialogActions sx={{ p: 2 }}>
// //             <Button
// //               variant="outlined"
// //               onClick={handleCloseDialog}
// //               sx={{ mr: 1 }}
// //             >
// //               Close
// //             </Button>
// //             <Button
// //               variant="contained"
// //               onClick={() => {
// //                 handleCloseDialog();
// //                 navigate(
// //                   `/instructor/courses/edit/${
// //                     selectedCourse._id || selectedCourse.id
// //                   }`
// //                 );
// //               }}
// //             >
// //               Edit Course
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

// //         <CreateAssignmentDialog
// //           open={assignmentDialogOpen}
// //           onClose={() => setAssignmentDialogOpen(false)}
// //           onAssignmentCreated={(assignment) => {
// //             setRecentlyCreatedAssignment(assignment);
// //             setSnackbarOpen(true);
// //           }}
// //         />

// //         <Snackbar
// //           open={snackbarOpen}
// //           autoHideDuration={6000}
// //           onClose={() => setSnackbarOpen(false)}
// //           message="Assignment created successfully!"
// //           action={
// //             <Button
// //               color="secondary"
// //               size="small"
// //               onClick={() => {
// //                 navigate(`/assignments/${recentlyCreatedAssignment?.id}`);
// //                 setSnackbarOpen(false);
// //               }}
// //               startIcon={<VisibilityIcon />}
// //             >
// //               View
// //             </Button>
// //           }
// //         />
// //       </MainContent>
// //     </DashboardContainer>
// //   );
// // };

// // export default InstructorDashboard;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Grid,
// //   styled,
// //   Divider,
// //   Button,
// //   CircularProgress,
// //   Dialog,
// //   IconButton,
// //   Tooltip,
// //   TextField,
// //   InputAdornment,
// //   CssBaseline,
// //   Container,
// //   useTheme,
// //   useMediaQuery,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Snackbar,
// //   Alert,
// // } from "@mui/material";
// // import {
// //   Dashboard as DashboardIcon,
// //   School as CoursesIcon,
// //   People as StudentsIcon,
// //   BarChart as AnalyticsIcon,
// //   Message as MessagesIcon,
// //   Settings as SettingsIcon,
// //   School as SchoolIcon,
// //   Add as AddIcon,
// //   Search as SearchIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Visibility as VisibilityIcon,
// //   Schedule as ScheduleIcon,
// //   Assignment as AssignmentIcon,
// //   CheckCircle as CheckCircleIcon,
// // } from "@mui/icons-material";
// // import { Link, useNavigate } from "react-router-dom";
// // import InstructorService from "../../services/instructorService";
// // import StatusChip from "../../components/Dashboard/Instructor/StatusChip";
// // import StudentEnrollmentDashboard from "../../components/Dashboard/Instructor/EnrollmentStats";
// // import { useAuth } from "../../contexts/AuthContext";
// // import InstructorSidebar from "../../components/common/Sidebar/InstructorSidebar";
// // import CreateAssignmentDialog from "../../components/Dashboard/Instructor/assignmnet/CreatAssignmentDialog";
// // import CloseIcon from "@mui/icons-material/Close";
// // const collapsedWidth = 72;

// // // Styled components
// // const StatsCard = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   borderRadius: theme.shape.borderRadius,
// //   boxShadow: theme.shadows[2],
// //   transition: "all 0.3s ease",
// //   background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
// //   border: `1px solid ${theme.palette.divider}`,
// //   "&:hover": {
// //     transform: "translateY(-5px)",
// //     boxShadow: theme.shadows[6],
// //   },
// // }));

// // const CourseCard = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   marginBottom: theme.spacing(2),
// //   borderRadius: theme.shape.borderRadius,
// //   boxShadow: theme.shadows[1],
// //   transition: "all 0.3s ease",
// //   border: `1px solid ${theme.palette.divider}`,
// //   "&:hover": {
// //     transform: "translateY(-5px)",
// //     boxShadow: theme.shadows[4],
// //     borderColor: theme.palette.primary.main,
// //   },
// // }));

// // const SearchInput = styled(TextField)(({ theme }) => ({
// //   "& .MuiOutlinedInput-root": {
// //     borderRadius: theme.shape.borderRadius,
// //     backgroundColor: theme.palette.background.paper,
// //     "& fieldset": {
// //       borderColor: theme.palette.divider,
// //     },
// //     "&:hover fieldset": {
// //       borderColor: theme.palette.primary.light,
// //     },
// //     "&.Mui-focused fieldset": {
// //       borderColor: theme.palette.primary.main,
// //       borderWidth: 1,
// //     },
// //   },
// // }));

// // const InstructorDashboard = () => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
// //   const { user, logout, loading } = useAuth();
// //   const navigate = useNavigate();
// //   const drawerWidth = 240;

// //   const [courses, setCourses] = useState([]);
// //   const [loadingCourses, setLoadingCourses] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [stats, setStats] = useState({
// //     totalCourses: 0,
// //     approvedCourses: 0,
// //     pendingCourses: 0,
// //     rejectedCourses: 0,
// //   });
// //   const [selectedCourse, setSelectedCourse] = useState(null);
// //   const [modules, setModules] = useState([]);
// //   const [dialogOpen, setDialogOpen] = useState(false);
// //   const [loadingDetails, setLoadingDetails] = useState(false);
// //   const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [recentlyCreatedAssignment, setRecentlyCreatedAssignment] =
// //     useState(null);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [collapsed, setCollapsed] = useState(false);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         setLoadingCourses(true);
// //         const data = await InstructorService.getCourses();
// //         setCourses(data);

// //         const approved = data.filter((c) => c.status === "approved").length;
// //         const pending = data.filter((c) => c.status === "pending").length;
// //         const rejected = data.filter((c) => c.status === "rejected").length;

// //         setStats({
// //           totalCourses: data.length,
// //           approvedCourses: approved,
// //           pendingCourses: pending,
// //           rejectedCourses: rejected,
// //         });
// //       } catch (error) {
// //         console.error("Failed to fetch courses:", error);
// //       } finally {
// //         setLoadingCourses(false);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   const filteredCourses = courses.filter(
// //     (course) =>
// //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       course.description.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const handleViewCourse = (course) => {
// //     setSelectedCourse(course);
// //     setDialogOpen(true);
// //     fetchCourseDetails(course.id);
// //   };

// //   const fetchCourseDetails = async (courseId) => {
// //     try {
// //       setLoadingDetails(true);
// //       const modules = await InstructorService.getCourseModules(courseId);
// //       setModules(modules);
// //     } catch (error) {
// //       console.error("Failed to fetch course details:", error);
// //     } finally {
// //       setLoadingDetails(false);
// //     }
// //   };

// //   const handleDeleteCourse = async (courseId) => {
// //     if (window.confirm("Are you sure you want to delete this course?")) {
// //       try {
// //         await InstructorService.deleteCourse(courseId);
// //         setCourses(courses.filter((course) => course.id !== courseId));
// //         setStats({
// //           ...stats,
// //           totalCourses: stats.totalCourses - 1,
// //         });
// //       } catch (error) {
// //         console.error("Failed to delete course:", error);
// //       }
// //     }
// //   };

// //   const handleCloseDialog = () => {
// //     setDialogOpen(false);
// //     setSelectedCourse(null);
// //     setModules([]);
// //   };

// //   const handleDrawerToggle = () => {
// //     if (isMobile) {
// //       setMobileOpen(!mobileOpen);
// //     } else {
// //       setCollapsed(!collapsed);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "100vh",
// //         }}
// //       >
// //         <CircularProgress size={60} />
// //       </Box>
// //     );
// //   }
// //   // Styled components
// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh" }}>
// //       <CssBaseline />
// //       <InstructorSidebar
// //         mobileOpen={mobileOpen}
// //         handleDrawerToggle={handleDrawerToggle}
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //         isMobile={isMobile}
// //       />

// //       <Box
// //         component="main"
// //         sx={{
// //           flexGrow: 1,
// //           p: 3,
// //           width: {
// //             sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
// //           },
// //           backgroundColor: theme.palette.background.default,
// //           marginLeft: { sm: `${collapsed ? collapsedWidth : drawerWidth}px` },
// //         }}
// //       >
// //         {/* Main content header */}
// //         <Box mb={4}>
// //           <Typography variant="h4" fontWeight="bold" gutterBottom>
// //             Instructor Dashboard
// //           </Typography>
// //           <Typography variant="body1" color="textSecondary">
// //             Welcome back! Here's what's happening with your courses today.
// //           </Typography>
// //         </Box>

// //         {/* Stats cards */}
// //         <Grid container spacing={3} mb={4}>
// //           {[
// //             {
// //               title: "Total Courses",
// //               value: stats.totalCourses,
// //               icon: <CoursesIcon fontSize="large" />,
// //               color: theme.palette.primary.main,
// //             },
// //             {
// //               title: "Approved Courses",
// //               value: stats.approvedCourses,
// //               icon: <SchoolIcon fontSize="large" />,
// //               color: theme.palette.success.main,
// //             },
// //             {
// //               title: "Pending Approval",
// //               value: stats.pendingCourses,
// //               icon: <ScheduleIcon fontSize="large" />,
// //               color: theme.palette.warning.main,
// //             },
// //             {
// //               title: "Rejected Courses",
// //               value: stats.rejectedCourses,
// //               icon: <DeleteIcon fontSize="large" />,
// //               color: theme.palette.error.main,
// //             },
// //           ].map((stat) => (
// //             <Grid item xs={12} sm={6} md={3} key={stat.title}>
// //               <StatsCard>
// //                 <Box
// //                   display="flex"
// //                   justifyContent="space-between"
// //                   alignItems="center"
// //                 >
// //                   <Box>
// //                     <Typography
// //                       variant="body2"
// //                       color="textSecondary"
// //                       gutterBottom
// //                     >
// //                       {stat.title}
// //                     </Typography>
// //                     <Typography
// //                       variant="h4"
// //                       fontWeight="bold"
// //                       color={stat.color}
// //                     >
// //                       {stat.value}
// //                     </Typography>
// //                   </Box>
// //                   <Box
// //                     sx={{
// //                       p: 2,
// //                       borderRadius: "50%",
// //                       backgroundColor: `${stat.color}20`,
// //                       color: stat.color,
// //                     }}
// //                   >
// //                     {stat.icon}
// //                   </Box>
// //                 </Box>
// //               </StatsCard>
// //             </Grid>
// //           ))}
// //         </Grid>

// //         {/* Courses section */}
// //         <Box mb={4}>
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             mb={3}
// //           >
// //             <Typography variant="h5" fontWeight="bold">
// //               My Courses
// //             </Typography>
// //             <Box display="flex" gap={2}>
// //               <Button
// //                 component={Link}
// //                 to="/instructor/courses/create"
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 sx={{
// //                   borderRadius: theme.shape.borderRadius,
// //                   textTransform: "none",
// //                   boxShadow: "none",
// //                   "&:hover": {
// //                     boxShadow: theme.shadows[2],
// //                   },
// //                 }}
// //               >
// //                 Create Course
// //               </Button>
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<AssignmentIcon />}
// //                 onClick={() => setAssignmentDialogOpen(true)}
// //                 sx={{
// //                   borderRadius: theme.shape.borderRadius,
// //                   textTransform: "none",
// //                 }}
// //               >
// //                 Create Assignment
// //               </Button>
// //             </Box>
// //           </Box>

// //           <Box mb={3}>
// //             <SearchInput
// //               fullWidth
// //               placeholder="Search courses..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               InputProps={{
// //                 startAdornment: (
// //                   <InputAdornment position="start">
// //                     <SearchIcon color="action" />
// //                   </InputAdornment>
// //                 ),
// //                 sx: {
// //                   maxWidth: 500,
// //                 },
// //               }}
// //             />
// //           </Box>

// //           {loadingCourses ? (
// //             <Box display="flex" justifyContent="center" my={4}>
// //               <CircularProgress />
// //             </Box>
// //           ) : filteredCourses.length === 0 ? (
// //             <Paper
// //               sx={{
// //                 p: 4,
// //                 textAlign: "center",
// //                 borderRadius: theme.shape.borderRadius,
// //                 backgroundColor: theme.palette.background.paper,
// //               }}
// //             >
// //               <Typography variant="body1">
// //                 {searchTerm
// //                   ? "No courses match your search"
// //                   : "You haven't created any courses yet"}
// //               </Typography>
// //               <Button
// //                 component={Link}
// //                 to="/instructor/courses/create"
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 sx={{ mt: 2 }}
// //               >
// //                 Create Your First Course
// //               </Button>
// //             </Paper>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {filteredCourses.map((course) => (
// //                 <Grid item xs={12} md={6} lg={4} key={course._id || course.id}>
// //                   <CourseCard>
// //                     <Box
// //                       display="flex"
// //                       justifyContent="space-between"
// //                       alignItems="flex-start"
// //                       mb={2}
// //                     >
// //                       <Typography variant="h6" fontWeight="bold">
// //                         {course.title}
// //                       </Typography>
// //                       <StatusChip status={course.status} />
// //                     </Box>
// //                     <Typography variant="body2" color="textSecondary" mb={2}>
// //                       {course.description.length > 100
// //                         ? `${course.description.substring(0, 100)}...`
// //                         : course.description}
// //                     </Typography>
// //                     <Box display="flex" justifyContent="flex-end" mb={2}>
// //                       <Tooltip title="View Course">
// //                         <IconButton
// //                           size="small"
// //                           onClick={() => handleViewCourse(course)}
// //                           sx={{
// //                             mr: 1,
// //                             "&:hover": {
// //                               backgroundColor: theme.palette.primary.light,
// //                               color: theme.palette.primary.main,
// //                             },
// //                           }}
// //                         >
// //                           <VisibilityIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Edit Course">
// //                         <IconButton
// //                           size="small"
// //                           onClick={() =>
// //                             navigate(
// //                               `/instructor/courses/edit/${
// //                                 course._id || course.id
// //                               }`
// //                             )
// //                           }
// //                           sx={{
// //                             mr: 1,
// //                             "&:hover": {
// //                               backgroundColor: theme.palette.secondary.light,
// //                               color: theme.palette.secondary.main,
// //                             },
// //                           }}
// //                         >
// //                           <EditIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Delete Course">
// //                         <IconButton
// //                           size="small"
// //                           color="error"
// //                           onClick={() => handleDeleteCourse(course.id)}
// //                           sx={{
// //                             "&:hover": {
// //                               backgroundColor: theme.palette.error.light,
// //                             },
// //                           }}
// //                         >
// //                           <DeleteIcon fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </Box>
// //                   </CourseCard>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </Box>

// //         {/* Course Details Dialog */}
// //         <Dialog
// //           open={dialogOpen}
// //           onClose={handleCloseDialog}
// //           fullWidth
// //           maxWidth="md"
// //           PaperProps={{
// //             sx: {
// //               borderRadius: theme.shape.borderRadius * 2,
// //               minHeight: "70vh",
// //               background: theme.palette.background.paper,
// //             },
// //           }}
// //         >
// //           {loadingDetails ? (
// //             <Box
// //               display="flex"
// //               justifyContent="center"
// //               alignItems="center"
// //               height="60vh"
// //             >
// //               <CircularProgress size={60} />
// //             </Box>
// //           ) : (
// //             <>
// //               <DialogTitle>
// //                 <Box
// //                   display="flex"
// //                   justifyContent="space-between"
// //                   alignItems="center"
// //                 >
// //                   <Typography variant="h5" fontWeight="bold">
// //                     {selectedCourse?.title}
// //                   </Typography>
// //                   <StatusChip status={selectedCourse?.status} />
// //                 </Box>
// //               </DialogTitle>
// //               <DialogContent dividers>
// //                 <Typography variant="body1" paragraph>
// //                   {selectedCourse?.description}
// //                 </Typography>

// //                 <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
// //                   Course Modules
// //                 </Typography>

// //                 {modules.length === 0 ? (
// //                   <Typography variant="body2" color="textSecondary">
// //                     No modules added yet
// //                   </Typography>
// //                 ) : (
// //                   modules.map((module) => (
// //                     <Accordion key={module.id} sx={{ mb: 1 }}>
// //                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
// //                         <Typography fontWeight={500}>{module.title}</Typography>
// //                       </AccordionSummary>
// //                       <AccordionDetails>
// //                         <Typography
// //                           variant="body2"
// //                           color="textSecondary"
// //                           mb={2}
// //                         >
// //                           {module.description}
// //                         </Typography>
// //                         <Divider sx={{ my: 1 }} />
// //                         <Typography variant="subtitle2" fontWeight={500} mb={1}>
// //                           Lessons:
// //                         </Typography>
// //                         {module.lessons.length === 0 ? (
// //                           <Typography variant="body2" color="textSecondary">
// //                             No lessons added yet
// //                           </Typography>
// //                         ) : (
// //                           module.lessons.map((lesson) => (
// //                             <Box
// //                               key={lesson.id}
// //                               display="flex"
// //                               alignItems="center"
// //                               mb={1}
// //                               px={1}
// //                               py={0.5}
// //                               sx={{
// //                                 borderRadius: 1,
// //                                 "&:hover": {
// //                                   backgroundColor: "action.hover",
// //                                 },
// //                               }}
// //                             >
// //                               {lesson.type === "video" ? (
// //                                 <VideoLibraryIcon
// //                                   color="primary"
// //                                   fontSize="small"
// //                                   sx={{ mr: 1 }}
// //                                 />
// //                               ) : (
// //                                 <ArticleIcon
// //                                   color="secondary"
// //                                   fontSize="small"
// //                                   sx={{ mr: 1 }}
// //                                 />
// //                               )}
// //                               <Typography variant="body2">
// //                                 {lesson.title}
// //                               </Typography>
// //                             </Box>
// //                           ))
// //                         )}
// //                       </AccordionDetails>
// //                     </Accordion>
// //                   ))
// //                 )}
// //               </DialogContent>
// //               <DialogActions>
// //                 <Button onClick={handleCloseDialog}>Close</Button>
// //               </DialogActions>
// //             </>
// //           )}
// //         </Dialog>

// //         {/* Create Assignment Dialog */}
// //         <CreateAssignmentDialog
// //           open={assignmentDialogOpen}
// //           onClose={() => setAssignmentDialogOpen(false)}
// //           onAssignmentCreated={(assignment) => {
// //             setRecentlyCreatedAssignment(assignment);
// //             setSnackbarOpen(true);
// //           }}
// //         />

// //         {/* Snackbar Notification */}
// //         <Snackbar
// //           open={snackbarOpen}
// //           autoHideDuration={6000}
// //           onClose={() => setSnackbarOpen(false)}
// //           anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //           sx={{
// //             "& .MuiPaper-root": {
// //               borderRadius: theme.shape.borderRadius,
// //             },
// //           }}
// //         >
// //           <Paper
// //             elevation={6}
// //             sx={{
// //               p: 2,
// //               backgroundColor: "success.light",
// //               color: "success.contrastText",
// //               display: "flex",
// //               alignItems: "center",
// //             }}
// //           >
// //             <CheckCircleIcon sx={{ mr: 1 }} />
// //             <Typography>
// //               Assignment "{recentlyCreatedAssignment?.title}" created
// //               successfully!
// //             </Typography>
// //             <IconButton
// //               size="small"
// //               color="inherit"
// //               onClick={() => setSnackbarOpen(false)}
// //               sx={{ ml: 2 }}
// //             >
// //               <CloseIcon fontSize="small" />
// //             </IconButton>
// //           </Paper>
// //         </Snackbar>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default InstructorDashboard;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   styled,
//   Divider,
//   Button,
//   CircularProgress,
//   Dialog,
//   IconButton,
//   Tooltip,
//   TextField,
//   InputAdornment,
//   CssBaseline,
//   Container,
//   useTheme,
//   useMediaQuery,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Avatar,
//   Badge,
//   Chip,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Card, CardContent, CardActions,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   School as CoursesIcon,
//   People as StudentsIcon,
//   BarChart as AnalyticsIcon,
//   Message as MessagesIcon,
//   Settings as SettingsIcon,
//   School as SchoolIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Schedule as ScheduleIcon,
//   Assignment as AssignmentIcon,
//   CheckCircle as CheckCircleIcon,
//   ExpandMore as ExpandMoreIcon,
//   VideoLibrary as VideoLibraryIcon,
//   Article as ArticleIcon,
//   Star as StarIcon,
//   Bookmark as BookmarkIcon,
//   MoreVert as MoreVertIcon,
//   Category as CategoryIcon ,
//   MenuBook as MenuBookIcon ,
//   Class as ClassIcon ,
// } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import InstructorService from "../../services/instructorService";
// import StatusChip from "../../components/Dashboard/Instructor/StatusChip";
// import StudentEnrollmentDashboard from "../../components/Dashboard/Instructor/EnrollmentStats";
// import { useAuth } from "../../contexts/AuthContext";
// import InstructorSidebar from "../../components/common/Sidebar/InstructorSidebar";
// import CreateAssignmentDialog from "../../components/Dashboard/Instructor/assignmnet/CreatAssignmentDialog";
// import CloseIcon from "@mui/icons-material/Close";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import { orange } from "@mui/material/colors";
// import UserHeader from "../../components/common/Header/UserHeader";
// const collapsedWidth = 72;

// // Enhanced Styled Components
// const StatsCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: theme.shape.borderRadius * 2,
//   boxShadow: theme.shadows[2],
//   transition: "all 0.3s ease",
//   background: theme.palette.mode === 'light' 
//     ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`
//     : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
//   border: `1px solid ${theme.palette.divider}`,
//   position: 'relative',
//   overflow: 'hidden',
//   '&:before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '4px',
//     height: '100%',
//     background: theme.palette.primary.main,
//   },
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[8],
//   },
// }));

// const CourseCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2.5),
//   marginBottom: theme.spacing(2),
//   borderRadius: theme.shape.borderRadius * 2,
//   boxShadow: theme.shadows[1],
//   transition: "all 0.3s ease",
//   border: `1px solid ${theme.palette.divider}`,
//   position: 'relative',
//   overflow: 'hidden',
//   '&:hover': {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[6],
//     borderColor: theme.palette.primary.main,
//     '& .course-actions': {
//       opacity: 1,
//       transform: 'translateY(0)',
//     }
//   },
//   '& .course-actions': {
//     position: 'absolute',
//     top: theme.spacing(1),
//     right: theme.spacing(1),
//     opacity: 0,
//     transform: 'translateY(-10px)',
//     transition: 'all 0.3s ease',
//     display: 'flex',
//     gap: theme.spacing(0.5),
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: theme.shape.borderRadius,
//     padding: theme.spacing(0.5),
//     boxShadow: theme.shadows[2],
//   }
// }));

// const SearchInput = styled(TextField)(({ theme }) => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: theme.shape.borderRadius * 2,
//     backgroundColor: theme.palette.background.paper,
//     "& fieldset": {
//       borderColor: theme.palette.divider,
//     },
//     "&:hover fieldset": {
//       borderColor: theme.palette.primary.light,
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: theme.palette.primary.main,
//       borderWidth: 1,
//     },
//   },
// }));

// const ProgressBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: 10,
//     top: 10,
//     padding: '0 4px',
//     backgroundColor: theme.palette.success.main,
//     color: theme.palette.success.contrastText,
//   },
// }));

// const InstructorDashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();
//   const drawerWidth = 240;

//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState({
//     totalCourses: 0,
//     approvedCourses: 0,
//     pendingCourses: 0,
//     rejectedCourses: 0,
//   });
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//     const [categories, setCategories] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [recentlyCreatedAssignment, setRecentlyCreatedAssignment] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoadingCourses(true);
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
//         setLoadingCourses(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleViewCourse = (course) => {
//     setSelectedCourse(course);
//     setDialogOpen(true);
//     fetchCourseDetails(course.id);
//   };

//   const fetchCourseDetails = async (courseId) => {
//     try {
//       setLoadingDetails(true);
//       const modules = await InstructorService.getCourseModules(courseId);
//       setModules(modules);
//     } catch (error) {
//       console.error("Failed to fetch course details:", error);
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   const handleDeleteCourse = async (courseId) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await InstructorService.deleteCourse(courseId);
//         setCourses(courses.filter((course) => course.id !== courseId));
//         setStats({
//           ...stats,
//           totalCourses: stats.totalCourses - 1,
//         });
//       } catch (error) {
//         console.error("Failed to delete course:", error);
//       }
//     }
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedCourse(null);
//     setModules([]);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "published":
//         return "success";
//       case "draft":
//         return "warning";
//       case "pending":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "published":
//         return <CheckCircleIcon fontSize="small" />;
//       case "draft":
//         return <EditIcon fontSize="small" />;
//       case "pending":
//         return <ScheduleIcon fontSize="small" />;
//       default:
//         return null;
//     }
//   };

//   const handleDrawerToggle = () => {
//     if (isMobile) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           background: theme.palette.mode === 'light' 
//             ? 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)'
//             : 'linear-gradient(135deg, #121826 0%, #1a2030 100%)',
//         }}
//       >
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       <UserHeader/>
//       <CssBaseline />
//       <InstructorSidebar
//         mobileOpen={mobileOpen}
//         handleDrawerToggle={handleDrawerToggle}
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         isMobile={isMobile}
//       />

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 5,
//           pt:13,
//           width: {
//             sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
//           },
//           backgroundColor: theme.palette.background.default,
//           background: theme.palette.mode === 'light' 
//             ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
//             : 'linear-gradient(135deg, #121826 0%, #0f172a 100%)',
//         }}
//       >
//         {/* Main content header */}
//         <Box mb={4}>
//           <Box display="flex" alignItems="center" mb={1}>
//             <Box>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Welcome back, {user?.displayName || 'Instructor'}!
//               </Typography>
//               <Box display="flex" alignItems="center">
//                 <StarIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
//                 <Typography variant="body1" color="textSecondary">
//                   Instructor since {new Date(user?.metadata?.creationTime).getFullYear() || '2024'}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//           <Typography variant="body1" color="textSecondary">
//             Here's what's happening with your courses today.
//           </Typography>
//         </Box>

//         {/* Stats cards */}
//         <Grid container spacing={3} mb={4}>
//           {[
//             {
//               title: "Total Courses",
//               value: stats.totalCourses,
//               icon: <CoursesIcon fontSize="medium" />,
//               color: theme.palette.primary.main,
//               trend: 'up',
//             },
//             {
//               title: "Approved Courses",
//               value: stats.approvedCourses,
//               icon: <SchoolIcon fontSize="medium" />,
//               color: theme.palette.success.main,
//               trend: 'up',
//             },
//             {
//               title: "Pending Approval",
//               value: stats.pendingCourses,
//               icon: <ScheduleIcon fontSize="medium" />,
//               color: theme.palette.warning.main,
//               trend: 'neutral',
//             },
//             {
//               title: "Rejected Courses",
//               value: stats.rejectedCourses,
//               icon: <DeleteIcon fontSize="medium" />,
//               color: theme.palette.error.main,
//               trend: 'down',
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
//                       sx={{ textTransform: 'uppercase', fontWeight: 500, letterSpacing: 0.5 }}
//                     >
//                       {stat.title}
//                     </Typography>
//                     <Typography
//                       variant="h3"
//                       fontWeight="bold"
//                       color={stat.color}
//                     >
//                       {stat.value}
//                     </Typography>
//                     <Chip 
//                       label={`5% ${stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}`} 
//                       size="small" 
//                       sx={{ 
//                         mt: 1,
//                         backgroundColor: `${stat.color}20`,
//                         color: stat.color,
//                         fontWeight: 600,
//                       }}
//                     />
//                   </Box>
//                   <Box
//                     sx={{
//                       p: 1,
//                       borderRadius: "55%",
//                       backgroundColor: `${stat.color}10`,
//                       color: stat.color,
//                       border: `1px solid ${stat.color}30`,
//                     }}
//                   >
//                     {stat.icon}
//                   </Box>
//                 </Box>
//               </StatsCard>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Courses section */}
//         <Box mb={4}>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={3}
//             sx={{
//               backgroundColor: theme.palette.background.paper,
//               p: 3,
//               borderRadius: theme.shape.borderRadius * 0.3,
//               border: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 My Courses
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Manage and create new courses
//               </Typography>
//             </Box>
//             <Box display="flex" gap={2}>
//               <Button
//                 component={Link}
//                 to="/instructor/courses/create"
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{
//                   borderRadius: theme.shape.borderRadius * 2,
//                   textTransform: "none",
//                   boxShadow: "none",
//                   px: 3,
//                   "&:hover": {
//                     boxShadow: theme.shadows[4],
//                   },
//                 }}
//               >
//                 Create Course
//               </Button>
//               <Button
//                 variant="outlined"
//                 startIcon={<AssignmentIcon />}
//                 onClick={() => setAssignmentDialogOpen(true)}
//                 sx={{
//                   borderRadius: theme.shape.borderRadius * 2,
//                   textTransform: "none",
//                   px: 3,
//                   borderWidth: 2,
//                   '&:hover': {
//                     borderWidth: 2,
//                   }
//                 }}
//               >
//                 New Assignment
//               </Button>
//             </Box>
//           </Box>

//           <Box mb={3}>
//             <SearchInput
//               fullWidth
//               placeholder="Search courses by title or description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon color="action" />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   maxWidth: 500,
//                 },
//               }}
//             />
//           </Box>

//           {loadingCourses ? (
//             <Box display="flex" justifyContent="center" my={4}>
//               <CircularProgress />
//             </Box>
//           ) : filteredCourses.length === 0 ? (
//             <Paper
//               sx={{
//                 p: 4,
//                 textAlign: "center",
//                 // borderRadius: theme.shape.borderRadius * 2,
//                 backgroundColor: theme.palette.background.paper,
//                 border: `1px dashed ${theme.palette.divider}`,
//               }}
//             >
//               <Box sx={{ 
//                 width: 80, 
//                 height: 80, 
//                 mx: 'auto', 
//                 mb: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: `${theme.palette.primary.light}20`,
//                 borderRadius: '50%',
//                 color: theme.palette.primary.main,
//               }}>
//                 <SchoolIcon fontSize="large" />
//               </Box>
//               <Typography variant="h6" gutterBottom>
//                 {searchTerm ? "No courses found" : "No courses created yet"}
//               </Typography>
//               <Typography variant="body1" color="textSecondary" mb={3}>
//                 {searchTerm 
//                   ? "Try adjusting your search query" 
//                   : "Get started by creating your first course"}
//               </Typography>
//               <Button
//                 component={Link}
//                 to="/instructor/courses/create"
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{ 
//                   borderRadius: theme.shape.borderRadius * 2,
//                   px: 3,
//                 }}
//               >
//                 Create Your First Course
//               </Button>
//             </Paper>
//           ) : (
//            <Grid container spacing={3}>
//             {filteredCourses.map((course) => (
//               <Grid item xs={12} sm={6} xl={4} key={course._id || course.id}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "all 0.3s ease",
//                     borderRadius: 3,
//                     border: `1px solid ${theme.palette.divider}`,
//                     boxShadow: "none",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: theme.shadows[6],
//                       borderColor: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       height: 140,
//                       position: "relative",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {course.thumbnail ? (
//                       <Box
//                         component="img"
//                         src={course.thumbnail}
//                         alt={course.title}
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           background:
//                             theme.palette.mode === "light"
//                               ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
//                               : "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
//                         }}
//                       >
//                         <SchoolIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
//                       </Box>
//                     )}
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: 16,
//                         right: 16,
//                       }}
//                     >
//                       <Chip
//                         icon={getStatusIcon(course.status)}
//                         label={course.status}
//                         color={getStatusColor(course.status)}
//                         size="small"
//                         sx={{
//                           fontWeight: 600,
//                           textTransform: "capitalize",
//                           borderRadius: 1,
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h6"
//                       component="h3"
//                       gutterBottom
//                       sx={{ fontWeight: 600 }}
//                     >
//                       {course.title}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       mb={2}
//                       sx={{
//                         display: "-webkit-box",
//                         WebkitLineClamp: 3,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {course.description?.substring(0, 150) ||
//                         "No description available."}
//                       {course.description?.length > 150 && "..."}
//                     </Typography>

//                     <Divider sx={{ my: 2 }} />

//                     <Grid container spacing={1} mb={1}>
//                       <Grid item xs={6}>
//                         <Box display="flex" alignItems="center">
//                           <CategoryIcon
//                             fontSize="small"
//                             color="action"
//                             sx={{ mr: 1 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             {categories.find((c) => c._id === course.category_id)
//                               ?.name || "Uncategorized"}
//                           </Typography>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box display="flex" alignItems="center">
//                           <MenuBookIcon
//                             fontSize="small"
//                             color="action"
//                             sx={{ mr: 1 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             {course.modules?.length || 0} Modules
//                           </Typography>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box display="flex" alignItems="center">
//                           <ClassIcon
//                             fontSize="small"
//                             color="action"
//                             sx={{ mr: 1 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             {course.modules?.reduce(
//                               (acc, module) =>
//                                 acc + (module.lessons?.length || 0),
//                               0
//                             )}{" "}
//                             Lessons
//                           </Typography>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box display="flex" alignItems="center">
//                           <StarIcon
//                             fontSize="small"
//                             color="action"
//                             sx={{ mr: 1 }}
//                           />
//                           <Typography variant="body2" color="text.secondary">
//                             4.8 (24)
//                           </Typography>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </CardContent>

//                   <CardActions
//                     sx={{
//                       justifyContent: "space-between",
//                       p: 2,
//                       borderTop: `1px solid ${theme.palette.divider}`,
//                     }}
//                   >
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<VisibilityIcon />}
//                       onClick={() => handleViewCourse(course)}
//                       sx={{
//                         borderRadius: 2,
//                         px: 2,
//                       }}
//                     >
//                       View
//                     </Button>
//                     <Box>
//                       <Tooltip title="Edit Course">
//                         <IconButton
//                           onClick={() => navigate(`/instructor/courses/edit/${course._id || course.id}`)}
//                           size="small"
//                           sx={{
//                             color: orange[600],
//                             "&:hover": {
//                               bgcolor: `${orange[50]} !important`,
//                             },
//                           }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete Course">
//                         <IconButton
//                           onClick={() => handleDeleteCourse(course.id)}
//                           size="small"
//                           sx={{
//                             color: "error.main",
//                             ml: 1,
//                             "&:hover": {
//                               bgcolor: "rgba(244, 67, 54, 0.08) !important",
//                             },
//                           }}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//         </Box>

//         {/* Course Details Dialog */}
//         <Dialog
//           open={dialogOpen}
//           onClose={handleCloseDialog}
//           fullWidth
//           maxWidth="md"
//           PaperProps={{
//             sx: {
//               borderRadius: theme.shape.borderRadius * 0.2,
//               minHeight: "70vh",
//               background: theme.palette.background.paper,
//               border: `1px solid ${theme.palette.divider}`,
//             },
//           }}
//         >
//           {loadingDetails ? (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               height="60vh"
//             >
//               <CircularProgress size={60} />
//             </Box>
//           ) : (
//             <>
//               <DialogTitle sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box display="flex" alignItems="center">
//                     <Avatar
//                       variant="rounded"
//                       sx={{ 
//                         width: 48, 
//                         height: 48, 
//                         mr: 2,
//                         backgroundColor: `${theme.palette.primary.light}20`,
//                         color: theme.palette.primary.main,
//                       }}
//                     >
//                       <SchoolIcon />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="h5" fontWeight="bold">
//                         {selectedCourse?.title}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         Course ID: {selectedCourse?.id}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <StatusChip status={selectedCourse?.status} />
//                 </Box>
//               </DialogTitle>
//               <DialogContent dividers>
//                 <Typography variant="body1" paragraph>
//                   {selectedCourse?.description}
//                 </Typography>

//                 <Box display="flex" gap={2} mb={3}>
//                   <Chip 
//                     icon={<PeopleIcon fontSize="small" />} 
//                     label={`${Math.floor(Math.random() * 100) + 20} Students`} 
//                     variant="outlined"
//                   />
//                   <Chip 
//                     icon={<AssignmentIcon fontSize="small" />} 
//                     label={`${Math.floor(Math.random() * 10) + 1} Assignments`} 
//                     variant="outlined"
//                   />
//                   <Chip 
//                     icon={<BarChartIcon fontSize="small" />} 
//                     label={`${Math.floor(Math.random() * 100)}% Completion`} 
//                     variant="outlined"
//                     color="success"
//                   />
//                 </Box>

//                 <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
//                   Course Modules
//                 </Typography>

//                 {modules.length === 0 ? (
//                   <Paper
//                     sx={{
//                       p: 3,
//                       textAlign: 'center',
//                       borderRadius: theme.shape.borderRadius,
//                       backgroundColor: theme.palette.background.default,
//                     }}
//                   >
//                     <Typography variant="body2" color="textSecondary">
//                       No modules added yet
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       startIcon={<AddIcon />}
//                       sx={{ mt: 2 }}
//                     >
//                       Add Module
//                     </Button>
//                   </Paper>
//                 ) : (
//                   modules.map((module) => (
//                     <Accordion 
//                       key={module.id} 
//                       sx={{ 
//                         mb: 1,
//                         borderRadius: theme.shape.borderRadius,
//                         '&:before': {
//                           display: 'none',
//                         }
//                       }}
//                     >
//                       <AccordionSummary 
//                         expandIcon={<ExpandMoreIcon />}
//                         sx={{
//                           backgroundColor: theme.palette.background.default,
//                           borderRadius: theme.shape.borderRadius,
//                         }}
//                       >
//                         <Box display="flex" alignItems="center" width="100%">
//                           <Box sx={{ 
//                             width: 36, 
//                             height: 36, 
//                             mr: 2,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: `${theme.palette.secondary.light}20`,
//                             borderRadius: '50%',
//                             color: theme.palette.secondary.main,
//                           }}>
//                             {module.lessons.length > 0 ? (
//                               <VideoLibraryIcon fontSize="small" />
//                             ) : (
//                               <ArticleIcon fontSize="small" />
//                             )}
//                           </Box>
//                           <Typography fontWeight={600}>{module.title}</Typography>
//                           <Box flexGrow={1} />
//                           <Chip 
//                             label={`${module.lessons.length} Lessons`} 
//                             size="small" 
//                             variant="outlined"
//                           />
//                         </Box>
//                       </AccordionSummary>
//                       <AccordionDetails
//                         sx={{
//                           backgroundColor: theme.palette.background.paper,
//                           borderTop: `1px solid ${theme.palette.divider}`,
//                         }}
//                       >
//                         <Typography
//                           variant="body2"
//                           color="textSecondary"
//                           mb={2}
//                         >
//                           {module.description}
//                         </Typography>
                        
//                         {module.lessons.length === 0 ? (
//                           <Typography variant="body2" color="textSecondary">
//                             No lessons added yet
//                           </Typography>
//                         ) : (
//                           <Box>
//                             <Typography variant="subtitle2" fontWeight={600} mb={1}>
//                               Lessons:
//                             </Typography>
//                             {module.lessons.map((lesson) => (
//                               <Box
//                                 key={lesson.id}
//                                 display="flex"
//                                 alignItems="center"
//                                 mb={1}
//                                 px={2}
//                                 py={1}
//                                 sx={{
//                                   borderRadius: theme.shape.borderRadius,
//                                   backgroundColor: theme.palette.background.default,
//                                   "&:hover": {
//                                     backgroundColor: theme.palette.action.hover,
//                                   },
//                                 }}
//                               >
//                                 {lesson.type === "video" ? (
//                                   <VideoLibraryIcon
//                                     color="primary"
//                                     fontSize="small"
//                                     sx={{ mr: 2 }}
//                                   />
//                                 ) : (
//                                   <ArticleIcon
//                                     color="secondary"
//                                     fontSize="small"
//                                     sx={{ mr: 2 }}
//                                   />
//                                 )}
//                                 <Box flexGrow={1}>
//                                   <Typography variant="body2">
//                                     {lesson.title}
//                                   </Typography>
//                                   <Typography variant="caption" color="textSecondary">
//                                     {lesson.duration || '10 min'}
//                                   </Typography>
//                                 </Box>
//                                 <IconButton size="small">
//                                   <MoreVertIcon fontSize="small" />
//                                 </IconButton>
//                               </Box>
//                             ))}
//                           </Box>
//                         )}
//                       </AccordionDetails>
//                     </Accordion>
//                   ))
//                 )}
//               </DialogContent>
//               <DialogActions sx={{ borderTop: `1px solid ${theme.palette.divider}`, p: 2 }}>
//                 <Button 
//                   onClick={handleCloseDialog}
//                   variant="outlined"
//                   sx={{ borderRadius: theme.shape.borderRadius * 2 }}
//                 >
//                   Close
//                 </Button>
//                 <Button 
//                   variant="contained"
//                   sx={{ borderRadius: theme.shape.borderRadius * 2 }}
//                 >
//                   Edit Course
//                 </Button>
//               </DialogActions>
//             </>
//           )}
//         </Dialog>

//         {/* Create Assignment Dialog */}
//         <CreateAssignmentDialog
//           open={assignmentDialogOpen}
//           onClose={() => setAssignmentDialogOpen(false)}
//           onAssignmentCreated={(assignment) => {
//             setRecentlyCreatedAssignment(assignment);
//             setSnackbarOpen(true);
//           }}
//         />

//         {/* Snackbar Notification */}
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           sx={{
//             "& .MuiPaper-root": {
//               borderRadius: theme.shape.borderRadius * 2,
//             },
//           }}
//         >
//           <Alert
//             elevation={6}
//             severity="success"
//             onClose={() => setSnackbarOpen(false)}
//             icon={<CheckCircleIcon fontSize="inherit" />}
//             sx={{
//               width: '100%',
//               alignItems: 'center',
//               '& .MuiAlert-message': {
//                 display: 'flex',
//                 alignItems: 'center',
//               }
//             }}
//           >
//             <Box display="flex" alignItems="center">
//               <Typography>
//                 Assignment <strong>"{recentlyCreatedAssignment?.title}"</strong> created successfully!
//               </Typography>
//             </Box>
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// };

// export default InstructorDashboard;
import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Book as BookIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import InstructorSidebar from "../../components/common/Sidebar/InstructorSidebar";
import UserHeader from "../../components/common/Header/UserHeader"
import InstructorDashboardView from "../../pages/Dashboard/InstructorDashboardView";
import CourseForm from "../../components/Dashboard/Instructor/CourseForm";
import AssignmentsList from "../../components/Dashboard/Instructor/assignmnet/AssignmentsList";
import StudentEnrollmentDashboardd from "../../components/Dashboard/Instructor/EnrollmentStats";
import QuizPage from "../../components/Dashboard/Instructor/assignmnet/QuizPage";
import Settings from "../../components/common/Settings/Settings";
import InstructorService from "../../services/instructorService";
import { useNavigate } from "react-router-dom";
import VisualizationView from "../../components/Dashboard/Instructor/StudantEnrollment";

const InstructorDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 240;
  const collapsedWidth = 72;
  const navigate = useNavigate();

  // State management
  const [currentView, setCurrentView] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses when My Courses view is selected
  useEffect(() => {
    if (currentView === "my-courses") {
      fetchCourses();
    }
  }, [currentView]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await InstructorService.getInstructorCourses();

      // Handle different response structures
      const coursesData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setCourses(coursesData);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to load courses. Please try again.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setCurrentView("create-course");
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCurrentView("create-course");
  };

  const handleBackToDashboard = () => {
    setEditingCourse(null);
    setCurrentView("dashboard");
  };

  const handleViewCourseDetails = (courseId) => {
    navigate(`/instructor/courses/${courseId}`);
  };

  const getStatusColor = (status) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "pending":
        return "info";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const MyCoursesView = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            My Courses
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage all your published and draft courses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCourse}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create New Course
        </Button>
      </Box>

      {error ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <BookIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom color="error">
            {error}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchCourses}
            sx={{ borderRadius: 2 }}
          >
            Retry
          </Button>
        </Paper>
      ) : loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={60} />
        </Box>
      ) : courses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <BookIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            You don't have any courses yet
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Start by creating your first course to see it listed here
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleCreateCourse}
            sx={{ borderRadius: 2 }}
          >
            Create Your First Course
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id || course.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                {course.thumbnail_url && (
                  <Box
                    sx={{
                      height: 160,
                      backgroundImage: `url(${course.thumbnail_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {course.title || "Untitled Course"}
                    </Typography>
                    <Chip
                      label={course.status || "unknown"}
                      size="small"
                      color={getStatusColor(course.status)}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description
                      ? course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description
                      : "No description available"}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                    <PeopleIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.enrolledStudents || 0} students
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() =>
                      handleViewCourseDetails(course._id || course.id)
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon fontSize="small" />}
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const AssignmentsView = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Assignments
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Create and manage course assignments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AssignmentIcon />}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create Assignment
        </Button>
      </Box>
      <AssignmentsList />
    </Box>
  );

  // const VisualizationView = () => (
  //   <Box>
  //     <VisualizationView />
  //   </Box>
  // );

  const QuizzesView = () => (
    <Box>
      <QuizPage />
    </Box>
  );

  const SettingsView = () => (
    <Box>
      <Settings />
    </Box>
  );

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <InstructorDashboardView
            onCreateCourse={handleCreateCourse}
            onEditCourse={handleEditCourse}
          />
        );
      case "my-courses":
        return <MyCoursesView />;
      case "create-course":
        return (
          <CourseForm
            course={editingCourse}
            onBack={handleBackToDashboard}
            onSuccess={() => {
              handleBackToDashboard();
              fetchCourses();
            }}
          />
        );
      case "enrollment-stats":
        return <StudentEnrollmentDashboardd />;
      case "assignments":
        return <AssignmentsView />;
      case "visualization":
        return <VisualizationView />;
      case "quizzes":
        return <QuizzesView />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <InstructorDashboardView
            onCreateCourse={handleCreateCourse}
            onEditCourse={handleEditCourse}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <UserHeader />
      <InstructorSidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          pt: 13,
          width: {
            sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
          },
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {renderView()}
      </Box>
    </Box>
  );
};

export default InstructorDashboard;

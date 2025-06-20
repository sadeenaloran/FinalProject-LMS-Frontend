import React, { useState, useEffect } from "react";import {
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import InstructorService from "../../services/instructorService";
import StatusChip from "../../components/Dashboard/Instructor/StatusChip";
import StudentEnrollmentDashboard from "../../components/Dashboard/Instructor/EnrollmentStats";
 
const DashboardContainer = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa",
}));
 
const Sidebar = styled(Paper)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
  borderRadius: 0,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  backgroundColor: "#ffffff",
}));
 
const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: "#f5f7fa",
}));
 
const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
}));
 
const CourseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
}));
 

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
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">Dr. Sarah Johnson</Typography>
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
                borderRadius: 2,
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
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
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
              icon: <CoursesIcon fontSize="large" color="primary" />,
            },
            {
              title: "Approved Courses",
              value: stats.approvedCourses,
              icon: <SchoolIcon fontSize="large" color="success" />,
            },
            {
              title: "Pending Approval",
              value: stats.pendingCourses,
              icon: <ScheduleIcon fontSize="large" color="warning" />,
            },
            {
              title: "Rejected Courses",
              value: stats.rejectedCourses,
              icon: <DeleteIcon fontSize="large" color="error" />,
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
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box>{stat.icon}</Box>
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
            mb={2}
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
              >
                Create Course
              </Button>
              <Button
                variant="outlined"
                startIcon={<AssignmentIcon />}
                onClick={() => setAssignmentDialogOpen(true)}
              >
                Create Assignment
              </Button>
            </Box>
          </Box>
 
          <Box mb={3}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: 500,
              }}
            >
              <SearchIcon sx={{ ml: 1, mr: 1 }} />
              <input
                type="text"
                placeholder="Search courses..."
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  padding: "8px",
                  fontSize: "14px",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Paper>
          </Box>
 
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : filteredCourses.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
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
                          sx={{ mr: 1 }}
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
                          sx={{ mr: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Course">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteCourse(course.id)}
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
              borderRadius: 3,
              minHeight: "70vh",
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
                    <Paper sx={{ p: 2, textAlign: "center" }}>
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
                        sx={{ mb: 1, borderRadius: 2 }}
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
                                  borderRadius: 1,
                                  bgcolor: "grey.100",
                                  "&:hover": { bgcolor: "grey.200" },
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
                                <IconButton size="small">
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
          message="Assignment created successfully!"
          action={
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate(`/assignments/${recentlyCreatedAssignment?.id}`);
                setSnackbarOpen(false);
              }}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          }
        />
      </MainContent>
    </DashboardContainer>
  );
};
 
export default InstructorDashboard;

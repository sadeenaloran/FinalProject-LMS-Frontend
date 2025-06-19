import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  styled,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Pending as PendingIcon,
  Assignment as AssignmentIcon,
  VideoLibrary as VideoIcon,
  Quiz as QuizIcon,
  BarChart as AnalyticsIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import coursesService from "../../../services/CourseInsServices";
import CourseForm from "../InstructorCourses/CourseForm";
import AuthContext from "../../../contexts/AuthContext/AuthContext"; // Adjust path as needed

// Styled components
const CoursesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f7fa",
}));

const CourseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: "bold",
  backgroundColor:
    status === "approved"
      ? theme.palette.success.light
      : status === "pending"
      ? theme.palette.warning.light
      : theme.palette.error.light,
  color:
    status === "approved"
      ? theme.palette.success.dark
      : status === "pending"
      ? theme.palette.warning.dark
      : theme.palette.error.dark,
}));

const MyCourses = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext); // Get current user from context

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rejectedCourses, setRejectedCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const allCourses = await coursesService.getAllCourses();

        // Filter to only show current instructor's courses
        const myCourses = allCourses.filter(
          (course) => course.instructorId === currentUser?.id
        );

        setCourses(myCourses);

        // Filter by status on the frontend with fallbacks
        const rejected = myCourses.filter(
          (course) => (course.status || "") === "rejected"
        );
        const pending = myCourses.filter(
          (course) => (course.status || "") === "pending"
        );
        const approved = myCourses.filter(
          (course) => (course.status || "") === "approved"
        );

        setRejectedCourses(rejected);
        setPendingCourses(pending);
        setApprovedCourses(approved);
        setFilteredCourses(myCourses);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) {
      fetchCourses();
    }
  }, [currentUser, navigate]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case "all":
        setFilteredCourses(courses);
        break;
      case "approved":
        setFilteredCourses(approvedCourses);
        break;
      case "pending":
        setFilteredCourses(pendingCourses);
        break;
      case "rejected":
        setFilteredCourses(rejectedCourses);
        break;
      default:
        setFilteredCourses(courses);
    }
  };

  // Handle dialog open/close
  const handleOpenDialog = (type, course = null) => {
    setDialogType(type);
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      await coursesService.deleteCourse(courseId);
      setCourses(courses.filter((course) => course.id !== courseId));
      setFilteredCourses(
        filteredCourses.filter((course) => course.id !== courseId)
      );
      setApprovedCourses(
        approvedCourses.filter((course) => course.id !== courseId)
      );
      setPendingCourses(
        pendingCourses.filter((course) => course.id !== courseId)
      );
      setRejectedCourses(
        rejectedCourses.filter((course) => course.id !== courseId)
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Handle course creation/update
  const handleSubmitCourse = async (formData) => {
    try {
      let updatedCourses;

      if (dialogType === "create") {
        const newCourse = await coursesService.createCourse(formData);
        updatedCourses = [newCourse, ...courses];
      } else {
        const updatedCourse = await coursesService.updateCourse(
          selectedCourse.id,
          formData
        );
        updatedCourses = courses.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        );
      }

      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error}</Typography>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Box>
    );
  }

  return (
    <CoursesContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          My Courses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("create")}
        >
          Create New Course
        </Button>
      </Box>

      {/* Tabs for filtering courses */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Courses" value="all" />
          <Tab label="Approved" value="approved" icon={<ApprovedIcon />} />
          <Tab label="Pending" value="pending" icon={<PendingIcon />} />
          <Tab label="Rejected" value="rejected" icon={<RejectedIcon />} />
        </Tabs>
      </Paper>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            No courses found. Create your first course to get started!
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("create")}
            sx={{ mt: 2 }}
          >
            Create Course
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} key={course.id}>
              <CourseCard>
                <Box display="flex" justifyContent="space-between">
                  <Box flexGrow={1}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <StatusChip
                        label={(course.status || "").toUpperCase()}
                        status={course.status || ""}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="h5" fontWeight="bold">
                        {course.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary" mb={2}>
                      {course.description}
                    </Typography>

                    <Box display="flex" gap={2} mb={2}>
                      <Chip
                        icon={<VideoIcon />}
                        label={`${course.lessonsCount || 0} Lessons`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<AssignmentIcon />}
                        label={`${course.assignmentsCount || 0} Assignments`}
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        icon={<QuizIcon />}
                        label={`${course.quizzesCount || 0} Quizzes`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() =>
                        navigate(`/instructor/courses/${course.id}`)
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog("edit", course)}
                      disabled={course.status === "approved"}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteCourse(course.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>

                {course.status === "rejected" && course.rejectionReason && (
                  <Box
                    mt={2}
                    p={2}
                    bgcolor={theme.palette.error.light}
                    borderRadius={1}
                  >
                    <Typography variant="subtitle2" color="error">
                      Rejection Reason: {course.rejectionReason}
                    </Typography>
                  </Box>
                )}
              </CourseCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Course Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "create" ? "Create New Course" : "Edit Course"}
        </DialogTitle>
        <DialogContent dividers>
          <CourseForm
            course={selectedCourse}
            onSubmit={handleSubmitCourse}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </CoursesContainer>
  );
};

export default MyCourses;

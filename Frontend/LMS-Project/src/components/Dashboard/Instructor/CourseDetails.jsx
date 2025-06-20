// src/pages/instructor/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  VideoLibrary as ModulesIcon,
  Article as LessonsIcon,
  Info as InfoIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";
import StatusChip from "../../Dashboard/Instructor/StatusChip";
import ModuleList from "./ModuleDetails";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await InstructorService.getCourseDetails(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    try {
      await InstructorService.deleteCourse(courseId);
      navigate("/instructor/courses");
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate("/instructor/courses")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 1 }}>
          {course.title}
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <StatusChip status={course.status} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Description
            </Typography>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Course Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2">Duration</Typography>
                <Typography>{course.duration} hours</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2">Category</Typography>
                <Typography>Programming</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2">Created</Typography>
                <Typography>
                  {new Date(course.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2">Last Updated</Typography>
                <Typography>
                  {new Date(course.updatedAt).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ mb: 3 }}
            >
              <Tab label="Modules & Lessons" icon={<VideoLibraryIcon />} />
              <Tab label="Students" icon={<StudentsIcon />} />
              <Tab label="Analytics" icon={<AnalyticsIcon />} />
            </Tabs>

            {activeTab === 0 && <ModuleList courseId={courseId} />}
            {activeTab === 1 && <Typography>Students tab content</Typography>}
            {activeTab === 2 && <Typography>Analytics tab content</Typography>}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Actions</Typography>
              <Box>
                <IconButton
                  onClick={() =>
                    navigate(`/instructor/courses/edit/${courseId}`)
                  }
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => setDeleteDialogOpen(true)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              startIcon={<ModulesIcon />}
              onClick={() =>
                navigate(`/instructor/courses/${courseId}/modules/new`)
              }
            >
              Add Module
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              startIcon={<LessonsIcon />}
              onClick={() =>
                navigate(`/instructor/courses/${courseId}/lessons/new`)
              }
            >
              Add Lesson
            </Button>

            {course.status === "pending" && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                <InfoIcon
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Your course is pending approval by the admin.
              </Typography>
            )}

            {course.status === "rejected" && course.feedback && (
              <Box mt={2}>
                <Typography variant="subtitle2">Admin Feedback:</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.feedback}
                </Typography>
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Thumbnail
            </Typography>
            {course.thumbnail_url ? (
              <img
                src={course.thumbnail_url}
                alt="Course thumbnail"
                style={{ width: "100%", borderRadius: 8 }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No thumbnail uploaded
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteCourse}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetails;

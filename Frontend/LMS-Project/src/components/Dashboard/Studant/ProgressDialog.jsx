import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EnrollmentService from "../../services/EnrollemtServices";

const ProgressDialog = ({ open, onClose, course }) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && course) {
      fetchProgressData();
    } else {
      // Reset when dialog closes
      setProgressData(null);
      setError(null);
      setLoading(false);
    }
  }, [open, course]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      setError(null);

      // First get the enrollment ID for this course
      const enrollments = await EnrollmentService.getUserEnrollments();
      const isEnrolled = enrollments.find((e) => e.course_id === course.id);

      if (!isEnrolled) {
        throw new Error("You are not enrolled in this course");
      }

      // Then get detailed progress
      const response = await EnrollmentService.getProgressSummary(course.id);
      setProgressData(response);
    } catch (err) {
      console.error("Error fetching progress:", err);
      // setError(err.message);
      setError(err.response?.data?.message || err.message);

      setLoading(false);
    }
  };

  const handleMarkLessonCompleted = async (lessonId) => {
    try {
      await EnrollmentService.markLessonCompleted(lessonId);
      fetchProgressData(); // Refresh data
    } catch (err) {
      console.error("Error marking lesson completed:", err);
      // setError(err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Course Progress: {course?.title}
        {progressData?.progressPercentage  && (
          <Box display="flex" alignItems="center" mt={1}>
            <LinearProgress
              variant="determinate"
              value={progressData.progressPercentage || 0}
              sx={{ width: "100%", mr: 2 }}
            />
            <Typography variant="body2" color="textSecondary">
              {Math.round(progressData.progressPercentage || 0)}%
              Complete
            </Typography>
          </Box>
        )}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : progressData ? (
          <Box>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Progress Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Total Modules
                  </Typography>
                  <Typography variant="h6">
                    {progressData.summary.totalModules}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Completed Modules
                  </Typography>
                  <Typography variant="h6">
                    {progressData.summary.completedModules}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Total Lessons
                  </Typography>
                  <Typography variant="h6">
                    {progressData.summary.totalLessons}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Completed Lessons
                  </Typography>
                  <Typography variant="h6">
                    {progressData.summary.completedLessons}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Module Progress
            </Typography>

            {progressData.modules?.map((module) => (
              <Accordion key={module.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography sx={{ flex: 1 }}>{module.title}</Typography>
                    <Chip
                      label={`${module.completedLessons}/${module.totalLessons} lessons`}
                      size="small"
                      color={
                        module.completedLessons === module.totalLessons
                          ? "success"
                          : "default"
                      }
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {module.lessons.map((lesson) => (
                      <ListItem key={lesson.id}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={lesson.isCompleted}
                            onChange={() =>
                              handleMarkLessonCompleted(lesson.id)
                            }
                            icon={<CheckCircleIcon color="disabled" />}
                            checkedIcon={<CheckCircleIcon color="success" />}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={lesson.title}
                          secondary={`Duration: ${lesson.duration} min`}
                        />
                        {lesson.isCompleted && (
                          <Chip
                            label="Completed"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ) : (
          <Typography>No progress data available</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgressDialog;

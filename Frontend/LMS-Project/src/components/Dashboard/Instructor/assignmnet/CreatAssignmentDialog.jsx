import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import InstructorService from "../../../../services/instructorService";

const steps = [
  "Select Course",
  "Select Module",
  "Select Lesson",
  "Assignment Details",
];

const CreateAssignmentDialog = ({ open, onClose, onAssignmentCreated }) => {
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
    setSelectedCourse(event.target.value);
    setSelectedModule("");
    setSelectedLesson("");
  };

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
    setSelectedLesson("");
  };

  const handleLessonChange = (event) => {
    setSelectedLesson(event.target.value);
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create New Assignment</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>

      <DialogContent dividers>
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
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">
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
                  >
                    <MenuItem value="">
                      <em>Select a module</em>
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
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Module Details:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getSelectedModule()?.description ||
                        "No description available"}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {getSelectedModule()?.lessons?.length || 0} lessons in
                      this module
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
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Lesson Details:</Typography>
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

      <DialogActions>
        <Button onClick={handleBack} disabled={activeStep === 0}>
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

export default CreateAssignmentDialog;

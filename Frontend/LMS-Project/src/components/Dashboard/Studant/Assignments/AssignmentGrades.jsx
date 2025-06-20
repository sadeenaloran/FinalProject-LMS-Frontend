import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Avatar,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Grade,
  Feedback,
  CheckCircle,
  PendingActions,
} from "@mui/icons-material";
import AssignmentService from "../../../services/AssignmentService";
import { useParams } from "react-router-dom";

const AssignmentGrades = () => {
  const { assignmentId } = useParams();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [assignmentData, submissionsData] = await Promise.all([
          AssignmentService.getAssignmentDetails(assignmentId),
          AssignmentService.getSubmissionsByAssignment(assignmentId),
        ]);
        setAssignment(assignmentData.assignment);
        setSubmissions(submissionsData.data || []);
      } catch (err) {
        setError(err.message || "Failed to load assignment data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignmentId]);

  const handleGradeClick = (submission) => {
    setCurrentSubmission(submission);
    setGrade(submission.grade || "");
    setFeedback(submission.feedback || "");
    setOpenDialog(true);
  };

  const handleGradeSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!grade || isNaN(grade) || grade < 0 || grade > assignment.max_score) {
        throw new Error(
          `Please enter a valid grade between 0 and ${assignment.max_score}`
        );
      }

      const updatedSubmission = await AssignmentService.gradeSubmission(
        currentSubmission.id,
        parseFloat(grade),
        feedback
      );

      setSubmissions(
        submissions.map((sub) =>
          sub.id === currentSubmission.id ? updatedSubmission.submission : sub
        )
      );
      setOpenDialog(false);
    } catch (err) {
      setError(err.message || "Failed to grade submission");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !assignment) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!assignment) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          Assignment not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        {assignment.title} - Submissions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assignment Details
          </Typography>
          <Typography variant="body1" paragraph>
            {assignment.description}
          </Typography>
          <Box display="flex" alignItems="center">
            <Chip
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  {assignment.max_score}
                </Avatar>
              }
              label="Max Score"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Student Submissions ({submissions.length})
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Submission</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 32,
                        height: 32,
                        mr: 1,
                      }}
                    >
                      {submission.student_name.charAt(0)}
                    </Avatar>
                    {submission.student_name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    component="a"
                    href={submission.submission_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    View Submission
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(submission.submitted_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {submission.grade ? (
                    <Chip
                      icon={<CheckCircle />}
                      label="Graded"
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip
                      icon={<PendingActions />}
                      label="Pending"
                      color="warning"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {submission.grade ? (
                    <Typography>
                      {submission.grade}/{assignment.max_score}
                    </Typography>
                  ) : (
                    <Typography color="textSecondary">-</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Grade />}
                    onClick={() => handleGradeClick(submission)}
                  >
                    {submission.grade ? "Update Grade" : "Grade"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentSubmission?.student_name}'s Submission
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="subtitle2">Submission URL:</Typography>
            <Typography
              variant="body2"
              component="a"
              href={currentSubmission?.submission_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.primary.main }}
            >
              {currentSubmission?.submission_url}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Grade"
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            inputProps={{
              min: 0,
              max: assignment.max_score,
              step: 0.1,
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleGradeSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Grade"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignmentGrades;

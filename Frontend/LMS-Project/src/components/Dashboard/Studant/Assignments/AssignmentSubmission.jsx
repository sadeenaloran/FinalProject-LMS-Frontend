import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
  Paper,
  Alert,
  useTheme,
} from "@mui/material";
import {
  Description,
  CloudUpload,
  CheckCircle,
  Assignment,
  Schedule,
  Grade,
} from "@mui/icons-material";
import AssignmentService from "../../../services/AssignmentService";
import { useParams } from "react-router-dom";

const AssignmentSubmission = () => {
  const { assignmentId } = useParams();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [assignmentData, submissionsData] = await Promise.all([
          AssignmentService.getAssignmentDetails(assignmentId),
          AssignmentService.getMySubmissions(assignmentId),
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (!submissionUrl) {
        throw new Error("Please provide a submission URL");
      }

      const response = await AssignmentService.submitAssignment(
        assignmentId,
        submissionUrl
      );
      setSubmissions([response.submission, ...submissions]);
      setSubmissionUrl("");
      setSuccess("Assignment submitted successfully!");
    } catch (err) {
      setError(err.message || "Failed to submit assignment");
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
        {assignment.title}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Description color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Assignment Details</Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {assignment.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" alignItems="center" mb={1}>
                <Schedule color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Due: {new Date(assignment.due_date).toLocaleDateString()}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Grade color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Max Score: {assignment.max_score}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box mt={3}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <CloudUpload color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Submit Your Work</Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="Submission URL (GitHub, Google Drive, etc.)"
                  variant="outlined"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={<CloudUpload />}
                >
                  {loading ? "Submitting..." : "Submit Assignment"}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Assignment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">My Submissions</Typography>
              </Box>

              {submissions.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No submissions yet
                </Typography>
              ) : (
                <Box>
                  {submissions.map((submission) => (
                    <Paper
                      key={submission.id}
                      elevation={1}
                      sx={{
                        p: 2,
                        mb: 2,
                        borderLeft: `4px solid ${
                          submission.grade
                            ? theme.palette.success.main
                            : theme.palette.info.main
                        }`,
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">
                          Submitted:{" "}
                          {new Date(submission.submitted_at).toLocaleString()}
                        </Typography>
                        {submission.grade && (
                          <Chip
                            label={`Grade: ${submission.grade}/${assignment.max_score}`}
                            color="success"
                            size="small"
                          />
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        component="a"
                        href={submission.submission_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.primary.main,
                          display: "block",
                          mt: 1,
                          wordBreak: "break-all",
                        }}
                      >
                        {submission.submission_url}
                      </Typography>

                      {submission.feedback && (
                        <Box mt={1}>
                          <Typography variant="caption" color="textSecondary">
                            Instructor Feedback:
                          </Typography>
                          <Typography variant="body2">
                            {submission.feedback}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssignmentSubmission;

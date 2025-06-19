import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../../api/index"

const AssignmentDetail = () => {
  const { id } = useParams();
//   const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await api.get(`/assignments/${id}`);
        setAssignment(response.data.assignment);
      } catch (err) {
        setError(err.message || "Failed to fetch assignment");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, api]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      // Assuming you have an endpoint to submit assignments
      await api.post(`/assignments/${id}/submit`, { submission });
      // Refresh assignment data after submission
      const response = await api.get(`/assignments/${id}`);
      setAssignment(response.data.assignment);
    } catch (err) {
      setError(err.message || "Failed to submit assignment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!assignment) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Assignment not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {assignment.title}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Assignment Details
        </Typography>
        <Typography variant="body1" paragraph>
          {assignment.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due Date: {assignment.due_date ? new Date(assignment.due_date).toLocaleString() : "No due date"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {assignment.status || "not submitted"}
        </Typography>
      </Paper>

      {assignment.status === "submitted" ? (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Submission
          </Typography>
          <Typography variant="body1" paragraph>
            {assignment.submission}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Submitted on: {new Date(assignment.submitted_at).toLocaleString()}
          </Typography>
          {assignment.grade && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Feedback
              </Typography>
              <Typography variant="body1" paragraph>
                Grade: {assignment.grade}
              </Typography>
              <Typography variant="body1">
                {assignment.feedback}
              </Typography>
            </>
          )}
        </Paper>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Submit Your Work
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="Enter your assignment submission here..."
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !submission.trim()}
          >
            {submitting ? <CircularProgress size={24} /> : "Submit Assignment"}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default AssignmentDetail;
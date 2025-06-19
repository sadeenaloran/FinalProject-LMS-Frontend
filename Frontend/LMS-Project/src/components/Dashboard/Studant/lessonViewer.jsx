import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const LessonViewer = ({ lesson, onComplete, isCompleted }) => {
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">{lesson.title}</Typography>
          {isCompleted && (
            <Chip
              icon={<CheckCircle />}
              label="Completed"
              color="success"
              variant="outlined"
            />
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary">
            Duration: {lesson.duration} minutes
          </Typography>
        </Box>

        {/* Lesson Content Display */}
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            mb: 3,
            borderRadius: 1,
          }}
        >
          {lesson.content_type === "video" ? (
            <video
              controls
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
              }}
            >
              <source src={lesson.content_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Box p={3}>
              <Typography paragraph>
                {lesson.content || "Lesson content will be displayed here."}
              </Typography>
            </Box>
          )}
        </Box>

        {!isCompleted && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<CheckCircle />}
              onClick={onComplete}
              size="large"
            >
              Mark as Completed
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonViewer;

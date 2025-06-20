// import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { School, Assessment, Assignment } from "@mui/icons-material";

const CourseCard = ({
  course,
  isEnrolled,
  onEnrollClick,
  onViewProgressClick,
  onViewAssignmentsClick,
}) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
       component="img"
          height="160"
          image={course.thumbnail_url || "/default-course.jpg"}
          alt={course.title}
          sx={{ 
            objectFit: "cover",
            filter: "brightness(0.95)",}}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip
            label={course.difficulty || "Beginner"}
            size="small"
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`${course.duration || 0} hours`}
            size="small"
            color="secondary"
          />
        </Box>
      </CardContent>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {!isEnrolled ? (
          <Button
            variant="contained"
            fullWidth
            startIcon={<School />}
            onClick={() => onEnrollClick(course)}
          >
            Enroll
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Assessment />}
              onClick={() => onViewProgressClick(course)}
            >
              View Progress
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Assignment />}
              onClick={() => onViewAssignmentsClick(course)}
              sx={{ mt: 1 }}
            >
              Assignments
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default CourseCard;

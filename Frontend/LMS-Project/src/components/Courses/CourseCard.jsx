import React from "react";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { School, PlayArrow } from "@mui/icons-material";

const CourseCard = ({ course, onContinue }) => {
  return (
    <Card
      sx={{
        mb: 2,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-1px)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={course.thumbnail} sx={{ width: 56, height: 56, mr: 2 }}>
            <School />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {course.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              by {course.instructor}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Last accessed: {course.lastAccessed}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => onContinue(course.id)}
            sx={{ mr: 1 }}
          >
            Continue
          </Button>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">
              Progress ({course.completedLessons}/{course.totalLessons} lessons)
            </Typography>
            <Typography variant="body2">{course.progress}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={course.progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

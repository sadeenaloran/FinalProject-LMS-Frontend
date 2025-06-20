import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import CourseCard from "../../components/studant/CourseCard";
import ProgressDialog from "../../components/studant/ProgressDialog";
import { useState } from "react";
const ProgressComponent = ({ enrolledCourses, allCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  // Categorize courses based on progress
  const categorizeCourses = () => {
    const enrolled = [];
    const inProgress = [];
    const completed = [];

    allCourses.forEach((course) => {
      const enrollment = enrolledCourses.find(
        (enroll) => enroll.course_id === course.id
      );

      if (enrollment) {
        if (enrollment.progress === 100) {
          completed.push({ ...course, enrollment });
        } else if (enrollment.progress > 0) {
          inProgress.push({ ...course, enrollment });
        } else {
          enrolled.push({ ...course, enrollment });
        }
      }
    });

    return { enrolled, inProgress, completed };
  };
  const handleViewProgress = (course) => {
    setSelectedCourse(course);
    setProgressDialogOpen(true);
  };
  const { enrolled, inProgress, completed } = categorizeCourses();

  const renderSection = (title, courses, color) => (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        {title} <Chip label={courses.length} color={color} size="small" />
      </Typography>
      {courses.length > 0 ? (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                isEnrolled={true}
                progress={course.enrollment.progress}
                  onViewProgressClick={() => handleViewProgress(course)} 
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No courses in this category
        </Typography>
      )}
    </Box>
  );

  return (
    <Box>
      {renderSection("Enrolled Courses", enrolled, "primary")}
      {renderSection("Courses in Progress", inProgress, "warning")}
      {renderSection("Completed Courses", completed, "success")}

      <ProgressDialog
        open={progressDialogOpen}
        onClose={() => setProgressDialogOpen(false)}
        course={selectedCourse}
      />
    </Box>
  );
};

export default ProgressComponent;

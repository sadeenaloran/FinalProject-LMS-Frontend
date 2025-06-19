// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import CourseCard from "@/components/Courses//CourseCard";

// const CoursesContent = ({ courses, onBrowseCourses }) => {
//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>My Courses</Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//         View and manage all your enrolled courses
//       </Typography>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//         <Button 
//           variant="contained" 
//           color="primary"
//           onClick={onBrowseCourses}
//         >
//           Browse More Courses
//         </Button>
//       </Box>
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           course={course}
//           expandedView
//         />
//       ))}
//     </Box>
//   );
// };

// export default CoursesContent;



import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import CourseCard from "@/components/Courses/CourseCard";

export const CoursesContent = ({ 
  dashboardData, 
  courseFilter, 
  setCourseFilter, 
  handleContinueCourse 
}) => {
  const filteredCourses = dashboardData.recentCourses.filter((course) => {
    if (courseFilter === "all") return true;
    if (courseFilter === "completed") return course.progress === 100;
    if (courseFilter === "in-progress") return course.progress < 100;
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            My Courses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage all your enrolled courses
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Enroll in New Course
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="outlined">
          <Button
            onClick={() => setCourseFilter("all")}
            color={courseFilter === "all" ? "primary" : "inherit"}
          >
            All Courses
          </Button>
          <Button
            onClick={() => setCourseFilter("in-progress")}
            color={courseFilter === "in-progress" ? "primary" : "inherit"}
          >
            In Progress
          </Button>
          <Button
            onClick={() => setCourseFilter("completed")}
            color={courseFilter === "completed" ? "primary" : "inherit"}
          >
            Completed
          </Button>
        </ButtonGroup>
      </Box>

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onContinue={handleContinueCourse}
          />
        ))
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {courseFilter === "all"
              ? "You haven't enrolled in any courses yet"
              : `No ${courseFilter.replace("-", " ")} courses found`}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Browse Courses
          </Button>
        </Box>
      )}
    </Box>
  );
};
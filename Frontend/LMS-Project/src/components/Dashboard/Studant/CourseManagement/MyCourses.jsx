// import React from "react";
// import {
//   Box,
//   Typography,
//   Tabs,
//   Tab,
//   Card,
//   CardContent,
//   LinearProgress,
//   Chip,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const MyCourses = ({ enrollments, courses, progress }) => {
//   const [value, setValue] = React.useState(0);
//   const navigate = useNavigate();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const enrolledCourses = enrollments.map((enrollment) => {
//     const course = courses.find((c) => c.id === enrollment.course_id);
//     const courseProgress = progress.find((p) => p.courseId === enrollment.course_id);
//     return {
//       ...enrollment,
//       ...course,
//       progress: courseProgress ? courseProgress.progress : 0,
//     };
//   });

//   const activeCourses = enrolledCourses.filter((course) => course.status === "in_progress");
//   const completedCourses = enrolledCourses.filter((course) => course.status === "completed");

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Typography variant="h4" gutterBottom>
//         My Courses
//       </Typography>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs value={value} onChange={handleChange} aria-label="course tabs">
//           <Tab label="All" />
//           <Tab label="In Progress" />
//           <Tab label="Completed" />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0}>
//         <Grid container spacing={3}>
//           {enrolledCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <CourseCard course={course} navigate={navigate} />
//             </Grid>
//           ))}
//         </Grid>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Grid container spacing={3}>
//           {activeCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <CourseCard course={course} navigate={navigate} />
//             </Grid>
//           ))}
//         </Grid>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <Grid container spacing={3}>
//           {completedCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <CourseCard course={course} navigate={navigate} />
//             </Grid>
//           ))}
//         </Grid>
//       </TabPanel>
//     </Box>
//   );
// };

// const CourseCard = ({ course, navigate }) => (
//   <Card sx={{ cursor: "pointer" }} onClick={() => navigate(`/course/${course.id}`)}>
//     <CardContent>
//       <Typography variant="h6">{course.title}</Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         {course.instructor}
//       </Typography>
//       <LinearProgress
//         variant="determinate"
//         value={course.progress}
//         sx={{ height: 8, borderRadius: 4, mb: 2 }}
//       />
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="caption">
//           {Math.round(course.progress)}% Complete
//         </Typography>
//         <Chip
//           label={course.status === "completed" ? "Completed" : "In Progress"}
//           size="small"
//           color={course.status === "completed" ? "success" : "primary"}
//         />
//       </Box>
//     </CardContent>
//   </Card>
// );

// export default MyCourses;

import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MyCourses = ({ enrollments = [], courses = [], progress = [] }) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Merge enrollment data with course and progress information
  const enrolledCourses = enrollments.map((enrollment) => {
    const course = courses.find((c) => c.id === enrollment.course_id) || {};
    const courseProgress = progress.find((p) => p.courseId === enrollment.course_id) || {};
    return {
      ...course,
      ...enrollment,
      progress: courseProgress.progress || 0,
      status: enrollment.status || "in_progress", // default to in_progress if not specified
    };
  });

  // Filter courses based on status
  const activeCourses = enrolledCourses.filter((course) => course.status === "in_progress");
  const completedCourses = enrolledCourses.filter((course) => course.status === "completed");

  // Display message when no courses are found
  const NoCoursesMessage = ({ message }) => (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="subtitle1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="course tabs">
          <Tab label={`All (${enrolledCourses.length})`} />
          <Tab label={`In Progress (${activeCourses.length})`} />
          <Tab label={`Completed (${completedCourses.length})`} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {enrolledCourses.length === 0 ? (
          <NoCoursesMessage message="You haven't enrolled in any courses yet." />
        ) : (
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} navigate={navigate} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {activeCourses.length === 0 ? (
          <NoCoursesMessage message="You don't have any courses in progress." />
        ) : (
          <Grid container spacing={3}>
            {activeCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} navigate={navigate} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {completedCourses.length === 0 ? (
          <NoCoursesMessage message="You haven't completed any courses yet." />
        ) : (
          <Grid container spacing={3}>
            {completedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} navigate={navigate} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </Box>
  );
};

const CourseCard = ({ course, navigate }) => {
  const getProgressColor = (progress) => {
    if (progress >= 90) return "success";
    if (progress >= 50) return "info";
    return "primary";
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar
            src={course.image}
            alt={course.title}
            sx={{ width: 56, height: 56 }}
            variant="rounded"
          >
            {course.title.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" noWrap>
              {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.instructor}
            </Typography>
          </Box>
        </Stack>
        
        <LinearProgress
          variant="determinate"
          value={course.progress}
          color={getProgressColor(course.progress)}
          sx={{ height: 8, borderRadius: 4, mb: 2 }}
        />
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption">
            {Math.round(course.progress)}% Complete
          </Typography>
          <Chip
            label={course.status === "completed" ? "Completed" : "In Progress"}
            size="small"
            color={course.status === "completed" ? "success" : "primary"}
            variant={course.status === "completed" ? "filled" : "outlined"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyCourses;
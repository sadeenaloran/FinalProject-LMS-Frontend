// // import { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CircularProgress,
// //   LinearProgress,
// //   Chip,
// //   Avatar,
// //   useTheme,
// //   Divider,
// //   Stack,
// // } from "@mui/material";
// // import {
// //   CheckCircle,
// //   PlayCircle,
// //   School,
// //   CalendarToday,
// // } from "@mui/icons-material";
// // import EnrollmentService from "../../../../services/EnrollemtServices";
// // import CourseService from "../../../../services/StudentService";

// // const InProgressCourses = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [courses, setCourses] = useState([]);
// //   const theme = useTheme();

// //   useEffect(() => {
// //     const fetchEnrolledCourses = async () => {
// //       try {
// //         setLoading(true);

// //         // 1. Get all user enrollments
// //         const enrollments = await EnrollmentService.getUserEnrollments();

// //         // 2. Get details and progress for each enrolled course
// //         const courseDetails = await Promise.all(
// //           enrollments.map(async (enrollment) => {
// //             const [course, progress] = await Promise.all([
// //               CourseService.getCourseDetails(enrollment.course_id),
// //               EnrollmentService.getProgressSummary(enrollment.course_id),
// //             ]);

// //             const totalLessons = progress?.summary?.lessons?.total_lessons || 0;
// //             const completedLessons =
// //               progress?.summary?.lessons?.completed_lessons || 0;
// //             const progressPercentage =
// //               totalLessons > 0
// //                 ? Math.round((completedLessons / totalLessons) * 100)
// //                 : 0;

// //             return {
// //               ...course,
// //               enrollmentId: enrollment.id,
// //               enrolledAt: new Date(enrollment.enrolled_at),
// //               progress: progressPercentage,
// //               totalLessons,
// //               completedLessons,
// //               isCompleted: progressPercentage >= 100,
// //             };
// //           })
// //         );

// //         setCourses(courseDetails);
// //       } catch (error) {
// //         console.error("Error fetching enrolled courses:", error);
// //         setCourses([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEnrolledCourses();
// //   }, []);

// //   const getDaysSinceEnrollment = (enrollDate) => {
// //     return Math.ceil((new Date() - enrollDate) / (1000 * 60 * 60 * 24));
// //   };

// //   const getProgressColor = (progress) => {
// //     if (progress < 30) return "error";
// //     if (progress < 70) return "warning";
// //     return "success";
// //   };

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (courses.length === 0) {
// //     return (
// //       <Box p={3} textAlign="center">
// //         <Typography variant="h6" color="textSecondary">
// //           You haven't enrolled in any courses yet.
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={3}>
// //       <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
// //         My Enrolled Courses
// //       </Typography>

// //       <Grid container spacing={3}>
// //         {courses.map((course) => (
// //           <Grid item xs={12} sm={6} md={4} key={course.enrollmentId}>
// //             <Card
// //               sx={{
// //                 height: "100%",
// //                 borderLeft: `4px solid ${
// //                   course.isCompleted
// //                     ? theme.palette.success.main
// //                     : theme.palette.primary.main
// //                 }`,
// //               }}
// //             >
// //               <CardContent>
// //                 <Stack
// //                   direction="row"
// //                   justifyContent="space-between"
// //                   alignItems="center"
// //                   mb={2}
// //                 >
// //                   <Typography variant="h6" component="div">
// //                     {course.title}
// //                   </Typography>
// //                   <Chip
// //                     label={course.isCompleted ? "Completed" : "In Progress"}
// //                     color={course.isCompleted ? "success" : "primary"}
// //                     size="small"
// //                   />
// //                 </Stack>

// //                 <Box mb={2}>
// //                   <LinearProgress
// //                     variant="determinate"
// //                     value={course.progress}
// //                     color={getProgressColor(course.progress)}
// //                     sx={{ height: 8, borderRadius: 4 }}
// //                   />
// //                   <Typography variant="caption" color="text.secondary">
// //                     {course.progress}% complete
// //                   </Typography>
// //                 </Box>

// //                 <Divider sx={{ my: 2 }} />

// //                 <Stack spacing={1}>
// //                   <Box display="flex" alignItems="center">
// //                     <School fontSize="small" color="action" sx={{ mr: 1 }} />
// //                     <Typography variant="body2">
// //                       {course.completedLessons}/{course.totalLessons} lessons
// //                       completed
// //                     </Typography>
// //                   </Box>

// //                   <Box display="flex" alignItems="center">
// //                     <CalendarToday
// //                       fontSize="small"
// //                       color="action"
// //                       sx={{ mr: 1 }}
// //                     />
// //                     <Typography variant="body2">
// //                       Enrolled {getDaysSinceEnrollment(course.enrolledAt)} days
// //                       ago
// //                     </Typography>
// //                   </Box>
// //                 </Stack>

// //                 {course.isCompleted && (
// //                   <Box mt={2} textAlign="center">
// //                     <Chip
// //                       icon={<CheckCircle />}
// //                       label="Course Completed!"
// //                       color="success"
// //                       variant="outlined"
// //                     />
// //                   </Box>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default InProgressCourses;


// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   LinearProgress,
//   Chip,
//   Avatar,
//   useTheme,
//   Divider,
//   Stack,
//   Button,
//   styled,
// } from "@mui/material";
// import {
//   CheckCircle,
//   PlayCircle,
//   School,
//   CalendarToday,
//   ArrowForward,
// } from "@mui/icons-material";
// import EnrollmentService from "../../../../services/EnrollemtServices";
// import CourseService from "../../../../services/StudentService";

// const ProgressCard = styled(Card)(({ theme }) => ({
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   transition: "all 0.3s ease",
//   background: theme.palette.background.paper,
//   border: `1px solid ${theme.palette.divider}`,
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: theme.shadows[6],
//   },
// }));

// const ProgressBar = styled(LinearProgress)(({ theme, value }) => ({
//   height: 8,
//   borderRadius: 4,
//   backgroundColor: theme.palette.grey[200],
//   "& .MuiLinearProgress-bar": {
//     borderRadius: 4,
//     background: value >= 100 
//       ? theme.palette.success.main 
//       : value >= 70 
//         ? theme.palette.primary.main 
//         : value >= 30 
//           ? theme.palette.warning.main 
//           : theme.palette.error.main,
//   },
// }));

// const StatusChip = styled(Chip)(({ theme, completed }) => ({
//   fontWeight: 600,
//   borderRadius: 12,
//   backgroundColor: completed 
//     ? theme.palette.success.light + "20" 
//     : theme.palette.primary.light + "20",
//   color: completed 
//     ? theme.palette.success.dark 
//     : theme.palette.primary.dark,
//   border: `1px solid ${completed 
//     ? theme.palette.success.main 
//     : theme.palette.primary.main}`,
// }));

// const InProgressCourses = () => {
//   const [loading, setLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         setLoading(true);
//         const enrollments = await EnrollmentService.getUserEnrollments();

//         const courseDetails = await Promise.all(
//           enrollments.map(async (enrollment) => {
//             const [course, progress] = await Promise.all([
//               CourseService.getCourseDetails(enrollment.course_id),
//               EnrollmentService.getProgressSummary(enrollment.course_id),
//             ]);

//             const totalLessons = progress?.summary?.lessons?.total_lessons || 0;
//             const completedLessons =
//               progress?.summary?.lessons?.completed_lessons || 0;
//             const progressPercentage =
//               totalLessons > 0
//                 ? Math.round((completedLessons / totalLessons) * 100)
//                 : 0;

//             return {
//               ...course,
//               enrollmentId: enrollment.id,
//               enrolledAt: new Date(enrollment.enrolled_at),
//               progress: progressPercentage,
//               totalLessons,
//               completedLessons,
//               isCompleted: progressPercentage >= 100,
//             };
//           })
//         );

//         setCourses(courseDetails);
//       } catch (error) {
//         console.error("Error fetching enrolled courses:", error);
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrolledCourses();
//   }, []);

//   const getDaysSinceEnrollment = (enrollDate) => {
//     return Math.ceil((new Date() - enrollDate) / (1000 * 60 * 60 * 24));
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (courses.length === 0) {
//     return (
//       <Box p={3} textAlign="center">
//         <Typography variant="h6" color="textSecondary">
//           You haven't enrolled in any courses yet.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       <Typography 
//         variant="h4" 
//         gutterBottom 
//         sx={{ 
//           fontWeight: 700, 
//           mb: 4,
//           color: theme.palette.text.primary,
//           position: "relative",
//           "&:after": {
//             content: '""',
//             display: "block",
//             width: 60,
//             height: 4,
//             background: theme.palette.primary.main,
//             borderRadius: 2,
//             mt: 1,
//           }
//         }}
//       >
//         My Enrolled Courses
//       </Typography>

//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.enrollmentId}>
//             <ProgressCard
//               sx={{
//                 borderLeft: `4px solid ${
//                   course.isCompleted
//                     ? theme.palette.success.main
//                     : theme.palette.primary.main
//                 }`,
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Stack
//                   direction="row"
//                   justifyContent="space-between"
//                   alignItems="flex-start"
//                   mb={2}
//                 >
//                   <Typography 
//                     variant="h6" 
//                     component="div"
//                     sx={{
//                       fontWeight: 600,
//                       lineHeight: 1.3,
//                       pr: 1
//                     }}
//                   >
//                     {course.title}
//                   </Typography>
//                   <StatusChip
//                     label={course.isCompleted ? "Completed" : "In Progress"}
//                     completed={course.isCompleted}
//                     size="small"
//                   />
//                 </Stack>

//                 <Box mb={3}>
//                   <ProgressBar
//                     variant="determinate"
//                     value={course.progress}
//                   />
//                   <Box display="flex" justifyContent="space-between" mt={0.5}>
//                     <Typography variant="caption" color="text.secondary">
//                       Progress
//                     </Typography>
//                     <Typography variant="caption" fontWeight={600}>
//                       {course.progress}%
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Divider 
//                   sx={{ 
//                     my: 2, 
//                     borderColor: theme.palette.divider,
//                     opacity: 0.5 
//                   }} 
//                 />

//                 <Stack spacing={2} mb={2}>
//                   <Box display="flex" alignItems="center">
//                     <School 
//                       fontSize="small" 
//                       sx={{ 
//                         color: theme.palette.primary.main,
//                         mr: 1.5 
//                       }} 
//                     />
//                     <Typography variant="body2">
//                       <strong>{course.completedLessons}</strong> of{" "}
//                       <strong>{course.totalLessons}</strong> lessons completed
//                     </Typography>
//                   </Box>

//                   <Box display="flex" alignItems="center">
//                     <CalendarToday
//                       fontSize="small"
//                       sx={{ 
//                         color: theme.palette.secondary.main,
//                         mr: 1.5 
//                       }}
//                     />
//                     <Typography variant="body2">
//                       Enrolled <strong>{getDaysSinceEnrollment(course.enrolledAt)} days</strong> ago
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 {course.isCompleted ? (
//                   <Box mt={2} textAlign="center">
//                     <StatusChip
//                       icon={<CheckCircle />}
//                       label="Course Completed!"
//                       completed={true}
//                       variant="outlined"
//                     />
//                   </Box>
//                 ) : (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     endIcon={<ArrowForward />}
//                     sx={{
//                       mt: 1,
//                       borderRadius: 2,
//                       textTransform: "none",
//                       fontWeight: 600,
//                     }}
//                   >
//                     Continue Learning
//                   </Button>
//                 )}
//               </CardContent>
//             </ProgressCard>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default InProgressCourses;


import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Chip,
  Avatar,
  useTheme,
  Divider,
  Stack,
  Button,
  styled,
} from "@mui/material";
import {
  CheckCircle,
  PlayCircle,
  School,
  CalendarToday,
  ArrowForward,
} from "@mui/icons-material";
import EnrollmentService from "../../../../services/EnrollemtServices";
import StudentService from "../../../../services/StudentService";

const ProgressCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
    background:
      value >= 100
        ? theme.palette.success.main
        : value >= 70
        ? theme.palette.primary.main
        : value >= 30
        ? theme.palette.warning.main
        : theme.palette.error.main,
  },
}));

const StatusChip = styled(Chip)(({ theme, completed }) => ({
  fontWeight: 600,
  borderRadius: 12,
  backgroundColor: completed
    ? theme.palette.success.light + "20"
    : theme.palette.primary.light + "20",
  color: completed ? theme.palette.success.dark : theme.palette.primary.dark,
  border: `1px solid ${
    completed ? theme.palette.success.main : theme.palette.primary.main
  }`,
}));

const InProgressCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const enrollments = await EnrollmentService.getUserEnrollments();
        const courseDetails = await Promise.all(
          enrollments.map(async (enrollment) => {
            const [course, progress] = await Promise.all([
              CourseService.getCourseDetails(enrollment.course_id),
              EnrollmentService.getProgressSummary(enrollment.course_id),
            ]);

            const totalLessons = progress?.summary?.lessons?.total_lessons || 0;
            const completedLessons =
              progress?.summary?.lessons?.completed_lessons || 0;
            const isCompleted =
              enrollment.is_completed || completedLessons >= totalLessons;
            const progressPercentage = isCompleted
              ? 100
              : totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;
            return {
              ...course,
              enrollmentId: enrollment.id,
              enrolledAt: new Date(enrollment.enrolled_at),
              progress: progressPercentage,
              totalLessons,
              completedLessons,
              isCompleted,
            };
          })
        );

        setCourses(courseDetails);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const getDaysSinceEnrollment = (enrollDate) => {
    return Math.ceil((new Date() - enrollDate) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="textSecondary">
          You haven't enrolled in any courses yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          color: theme.palette.text.primary,
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: 60,
            height: 4,
            background: theme.palette.primary.main,
            borderRadius: 2,
            mt: 1,
          },
        }}
      >
        My Enrolled Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.enrollmentId}>
            <ProgressCard
              sx={{
                borderLeft: `4px solid ${
                  course.isCompleted
                    ? theme.palette.success.main
                    : theme.palette.primary.main
                }`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                      pr: 1,
                    }}
                  >
                    {course.title}
                  </Typography>
                  <StatusChip
                    label={course.isCompleted ? "Completed" : "In Progress"}
                    completed={course.isCompleted}
                    size="small"
                  />
                </Stack>

                <Box mb={3}>
                  <ProgressBar variant="determinate" value={course.progress} />
                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {course.progress}%
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    borderColor: theme.palette.divider,
                    opacity: 0.5,
                  }}
                />

                <Stack spacing={2} mb={2}>
                  <Box display="flex" alignItems="center">
                    <School
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary.main,
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body2">
                      <strong>{course.completedLessons}</strong> of{" "}
                      <strong>{course.totalLessons}</strong> lessons completed
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <CalendarToday
                      fontSize="small"
                      sx={{
                        color: theme.palette.secondary.main,
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body2">
                      Enrolled{" "}
                      <strong>
                        {getDaysSinceEnrollment(course.enrolledAt)} days
                      </strong>{" "}
                      ago
                    </Typography>
                  </Box>
                </Stack>

                {course.isCompleted ? (
                  <Box mt={2} textAlign="center">
                    <StatusChip
                      icon={<CheckCircle />}
                      label="Course Completed!"
                      completed={true}
                      variant="outlined"
                    />
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForward />}
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Continue Learning
                  </Button>
                )}
              </CardContent>
            </ProgressCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InProgressCourses;

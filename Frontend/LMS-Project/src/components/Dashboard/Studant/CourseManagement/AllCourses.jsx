// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Chip,
//   Box,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const AllCourses = ({ courses, onEnroll, enrollments, loading, error }) => {
//   const navigate = useNavigate();

//   const isEnrolled = (courseId) => {
//     return enrollments.some((enrollment) => enrollment.course_id === courseId);
//   };
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="error"> Failed to load courses: {error}</Alert>
//       </Box>
//     );
//   }

//   if (!courses || courses.length === 0) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="info">No courses available at the moment.</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         All Available Courses
//       </Typography>
//        <Typography variant="body2" color="text.secondary" gutterBottom>
//         Showing {courses.length} courses
//       </Typography>
//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.id}>
//             <Card
//               sx={{ height: "100%", display: "flex", flexDirection: "column" }}
//             >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={course.image || "/default-course.jpg"}
//                 alt={course.title}
//               />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {course.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {course.description}
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <Chip label={course.category} size="small" sx={{ mr: 1 }} />
//                   <Chip
//                     label={`${course.duration} hours`}
//                     size="small"
//                     color="info"
//                   />
//                 </Box>
//               </CardContent>
//               <Box sx={{ p: 2 }}>
//                 {isEnrolled(course.id) ? (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="success"
//                     onClick={() => navigate(`/course/${course.id}`)}
//                   >
//                     Continue Learning
//                   </Button>
//                 ) : (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() => onEnroll(course.id)}
//                   >
//                     Enroll Now
//                   </Button>
//                 )}
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AllCourses;

// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Chip,
//   Box,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../../../api/index"
// const AllCourses = ({ enrollments, onEnroll }) => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all courses when component mounts
//   useEffect(() => {
//     const fetchAllCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/courses');

//         // Check both possible response structures
//         const coursesData = response.data.data || response.data;

//         if (!Array.isArray(coursesData)) {
//           throw new Error('Invalid courses data format');
//         }

//         setCourses(coursesData);
//       } catch (err) {
//         setError(err.message);
//         console.error('Failed to fetch courses:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllCourses();
//   }, []);

//   const isEnrolled = (courseId) => {
//     return enrollments.some((enrollment) => enrollment.course_id === courseId);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="error">Failed to load courses: {error}</Alert>
//       </Box>
//     );
//   }

//   if (!courses || courses.length === 0) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="info">No courses available at the moment.</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         All Available Courses
//       </Typography>
//       <Typography variant="body2" color="text.secondary" gutterBottom>
//         Showing {courses.length} courses
//       </Typography>
//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.id || course._id}>
//             <Card
//               sx={{ height: "100%", display: "flex", flexDirection: "column" }}
//             >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={course.image || "/default-course.jpg"}
//                 alt={course.title}
//               />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {course.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {course.description}
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <Chip label={course.category} size="small" sx={{ mr: 1 }} />
//                   <Chip
//                     label={`${course.duration} hours`}
//                     size="small"
//                     color="info"
//                   />
//                 </Box>
//               </CardContent>
//               <Box sx={{ p: 2 }}>
//                 {isEnrolled(course.id) ? (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="success"
//                     onClick={() => navigate(`/course/${course.id}`)}
//                   >
//                     Continue Learning
//                   </Button>
//                 ) : (
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() => onEnroll(course.id)}
//                   >
//                     Enroll Now
//                   </Button>
//                 )}
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default AllCourses;

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentService from "@/services/StudentService";
import EnrollmentService from "@/services/EnrollemtServices";

const AllCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          StudentService.getAllCourses(),
          EnrollmentService.getUserEnrollments(),
        ]);
        // Ensure courses is always an array
        const coursesData = Array.isArray(coursesResponse)
          ? coursesResponse
          : coursesResponse?.data || [];

        setCourses(coursesData);
        setEnrollments(enrollmentsResponse);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isEnrolled = (courseId) => {
    return enrollments.some((enrollment) => enrollment.course_id === courseId);
  };

  const handleEnroll = async (courseId) => {
    try {
      await EnrollmentService.enrollUser(courseId);
      // Refresh enrollments after successful enrollment
      const updatedEnrollments = await EnrollmentService.getUserEnrollments();
      setEnrollments(updatedEnrollments);

      setSnackbar({
        open: true,
        message: "Successfully enrolled in course!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || error.message,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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
        <Alert severity="error">Failed to load courses: {error}</Alert>
      </Box>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No courses available at the moment.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Available Courses
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Showing {courses.length} courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id || course._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.image || "/default-course.jpg"}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label={course.category} size="small" sx={{ mr: 1 }} />
                  <Chip
                    label={`${course.duration} hours`}
                    size="small"
                    color="info"
                  />
                </Box>
              </CardContent>
              <Box sx={{ p: 2 }}>
                {isEnrolled(course.id) ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll Now
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AllCourses;

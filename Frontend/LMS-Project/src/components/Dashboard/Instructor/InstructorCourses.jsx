// import React, { useState, useEffect, useContext } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   CircularProgress,
//   Chip,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   CheckCircle as ApprovedIcon,
//   Cancel as RejectedIcon,
//   Pending as PendingIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import CoursesService from "../../../services/CourseInsServices";
// import AuthContext from "../../../contexts/AuthContext/AuthContext";

// const InstructorCourses = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tabValue, setTabValue] = useState("all");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const response = await CoursesService.getAllCourses();

//         // Filter courses by current instructor
//         const instructorCourses = response.filter(
//           (course) => course.instructorId === user.id
//         );

//         setCourses(instructorCourses);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.id) {
//       fetchCourses();
//     }
//   }, [user]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const filteredCourses = courses.filter((course) => {
//     if (tabValue === "all") return true;
//     return course.status === tabValue;
//   });

//   const handleDeleteCourse = async (courseId) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;
//     try {
//       setLoading(true);
//       await CoursesService.deleteCourse(courseId);
//       setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));
//     } catch (err) {
//       setError(err.message || "Failed to delete course.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="80vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="80vh"
//       >
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Typography variant="h4">My Courses</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/instructor/courses/new")}
//         >
//           Create Course
//         </Button>
//       </Box>

//       <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="All" value="all" />
//         <Tab label="Approved" value="approved" icon={<ApprovedIcon />} />
//         <Tab label="Pending" value="pending" icon={<PendingIcon />} />
//         <Tab label="Rejected" value="rejected" icon={<RejectedIcon />} />
//       </Tabs>

//       <Grid container spacing={3}>
//         {filteredCourses.length === 0 ? (
//           <Grid item xs={12}>
//             <Paper sx={{ p: 4, textAlign: "center" }}>
//               <Typography>No courses found</Typography>
//             </Paper>
//           </Grid>
//         ) : (
//           filteredCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <Paper sx={{ p: 3, height: "100%" }}>
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                   <Chip
//                     label={course.status}
//                     color={
//                       course.status === "approved"
//                         ? "success"
//                         : course.status === "pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   />
//                 </Box>
//                 <Typography variant="h6" gutterBottom>
//                   {course.title}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" gutterBottom>
//                   {course.description}
//                 </Typography>
//                 <Box mt={2} display="flex" gap={1}>
//                   <Button
//                     size="small"
//                     startIcon={<VisibilityIcon />}
//                     onClick={() => navigate(`/instructor/courses/${course.id}`)}
//                   >
//                     View
//                   </Button>
//                   <Button
//                     size="small"
//                     startIcon={<EditIcon />}
//                     onClick={() =>
//                       navigate(`/instructor/courses/${course.id}/edit`)
//                     }
//                     disabled={course.status === "approved"}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="small"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDeleteCourse(course.id)}
//                     color="error"
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default InstructorCourses;
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CoursesService from "../../../services/CourseInsServices";
import AuthContext from "../../../contexts/AuthContext/AuthContext";

const InstructorCourses = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await CoursesService.getAllCourses();
        const instructorCourses = Array.isArray(response)
          ? response.filter((course) => course.instructor_id === user.id)
          : [];
        setCourses(instructorCourses);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchCourses();
  }, [user]);

  const filteredCourses = courses.filter((course) => {
    if (tabValue === "all") return true;
    return course.status === tabValue;
  });

  const handleDelete = async (courseId) => {
    try {
      await CoursesService.deleteCourse(courseId);
      setCourses(courses.filter((c) => c.id !== courseId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4">My Courses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/instructor/courses/new")}
        >
          Create Course
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)}>
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Approved" value="approved" />
        <Tab label="Rejected" value="rejected" />
      </Tabs>

      <Grid container spacing={3} mt={2}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Paper sx={{ p: 3 }}>
              <Chip
                label={course.status}
                color={
                  course.status === "approved"
                    ? "success"
                    : course.status === "rejected"
                    ? "error"
                    : "warning"
                }
              />
              <Typography variant="h6" mt={1}>
                {course.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {course.description}
              </Typography>
              <Box mt={2} display="flex" gap={1}>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/instructor/courses/${course.id}`)}
                >
                  View
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() =>
                    navigate(`/instructor/courses/${course.id}/edit`)
                  }
                  disabled={course.status === "approved"}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(course.id)}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
              {course.status === "rejected" && course.feedback && (
                <Typography variant="caption" color="error" mt={1}>
                  Feedback: {course.feedback}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InstructorCourses;

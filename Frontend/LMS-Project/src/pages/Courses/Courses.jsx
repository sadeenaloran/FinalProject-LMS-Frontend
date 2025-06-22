import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import CourseService from "../../services/CoursesService";
import EnrollmentService from "../../services/EnrollemtServices";
import CourseCard from "../../components/Dashboard/Studant/Courses/CourseCard";
import EnrollmentDialog from "../../components/Dashboard/Studant/Courses/EnrollmentDialog";
import { useAuth } from "../../contexts/AuthContext";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allCoursesResponse, userEnrollmentsResponse] = await Promise.all(
          [
            CourseService.getAllCourses(),
            EnrollmentService.getUserEnrollments(),
          ]
        );

        const allCourses = Array.isArray(allCoursesResponse)
          ? allCoursesResponse
          : allCoursesResponse?.data || [];

        const userEnrollments = Array.isArray(userEnrollmentsResponse)
          ? userEnrollmentsResponse
          : userEnrollmentsResponse?.data || [];

        const enrolledIds = userEnrollments.map((e) => e.course_id);

        setCourses(allCourses);
        setEnrolledCourseIds(enrolledIds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setEnrollmentDialogOpen(true);
  };

  const handleEnroll = async () => {
    try {
      await EnrollmentService.enrollUser(selectedCourse.id);
      const updatedEnrollments = await EnrollmentService.getUserEnrollments();
      setEnrolledCourseIds(updatedEnrollments.map((e) => e.course_id));
      setEnrollmentDialogOpen(false);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        All Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          return (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                isEnrolled={isEnrolled}
                onEnrollClick={!isEnrolled ? handleEnrollClick : null}
              />
            </Grid>
          );
        })}
      </Grid>

      <EnrollmentDialog
        open={enrollmentDialogOpen}
        onClose={() => setEnrollmentDialogOpen(false)}
        course={selectedCourse}
        onEnroll={handleEnroll}
      />
    </Container>
  );
};

export default AllCoursesPage;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   CircularProgress,
//   Container,
//   Paper,
//   InputAdornment,
//   TextField,
//   Button,
//   Chip,
//   Avatar,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import CourseService from "../../services/CoursesService";
// import EnrollmentService from "../../services/EnrollemtServices";
// import CourseCard from "../../components/Dashboard/Studant/Courses/CourseCard";
// import EnrollmentDialog from "../../components/Dashboard/Studant/Courses/EnrollmentDialog";
// import { useAuth } from "../../contexts/AuthContext";

// const AllCoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [enrollmentDialogOpen, setEnrollmentDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [allCoursesResponse, userEnrollmentsResponse] = await Promise.all(
//           [
//             CourseService.getAllCourses(),
//             EnrollmentService.getUserEnrollments(),
//           ]
//         );

//         const allCourses = Array.isArray(allCoursesResponse)
//           ? allCoursesResponse
//           : allCoursesResponse?.data || [];

//         const userEnrollments = Array.isArray(userEnrollmentsResponse)
//           ? userEnrollmentsResponse
//           : userEnrollmentsResponse?.data || [];

//         const enrolledIds = userEnrollments.map((e) => e.course_id);

//         setCourses(allCourses);
//         setEnrolledCourseIds(enrolledIds);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         setCourses([]);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEnrollClick = (course) => {
//     setSelectedCourse(course);
//     setEnrollmentDialogOpen(true);
//   };

//   const handleEnroll = async () => {
//     try {
//       await EnrollmentService.enrollUser(selectedCourse.id);
//       const updatedEnrollments = await EnrollmentService.getUserEnrollments();
//       setEnrolledCourseIds(updatedEnrollments.map((e) => e.course_id));
//       setEnrollmentDialogOpen(false);
//     } catch (error) {
//       console.error("Enrollment failed:", error);
//     }
//   };

//   const filteredCourses = courses.filter((course) => {
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (activeFilter === "enrolled") {
//       return enrolledCourseIds.includes(course.id) && matchesSearch;
//     } else if (activeFilter === "available") {
//       return !enrolledCourseIds.includes(course.id) && matchesSearch;
//     }
//     return matchesSearch;
//   });

//   if (loading) {
//     return (
//       <Box 
//         display="flex" 
//         justifyContent="center" 
//         alignItems="center" 
//         minHeight="60vh"
//       >
//         <CircularProgress size={60} thickness={4} />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }}>
//       <Box sx={{ mb: 4 }}>
//         <Typography 
//           variant="h3" 
//           gutterBottom 
//           fontWeight={700}
//           sx={{ 
//             color: "primary.main",
//             mb: 2,
//             background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             display: "inline-block"
//           }}
//         >
//           Explore Our Courses
//         </Typography>
        
//         <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
//           Discover and enroll in courses that match your interests and goals
//         </Typography>
        
//         <Box sx={{ 
//           display: "flex", 
//           flexDirection: isMobile ? "column" : "row", 
//           gap: 2,
//           mb: 3,
//           alignItems: isMobile ? "stretch" : "center"
//         }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search courses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="primary" />
//                 </InputAdornment>
//               ),
//               sx: {
//                 borderRadius: 3,
//                 backgroundColor: theme.palette.background.paper,
//                 boxShadow: theme.shadows[1]
//               }
//             }}
//             sx={{ maxWidth: isMobile ? "100%" : 400 }}
//           />
          
//           <Box sx={{ 
//             display: "flex", 
//             gap: 1,
//             flexWrap: "wrap",
//             justifyContent: isMobile ? "center" : "flex-start"
//           }}>
//             <Chip
//               label="All Courses"
//               variant={activeFilter === "all" ? "filled" : "outlined"}
//               color="primary"
//               onClick={() => setActiveFilter("all")}
//               avatar={<Avatar>📚</Avatar>}
//             />
//             <Chip
//               label="My Courses"
//               variant={activeFilter === "enrolled" ? "filled" : "outlined"}
//               color="secondary"
//               onClick={() => setActiveFilter("enrolled")}
//               avatar={<Avatar>🎓</Avatar>}
//             />
//             <Chip
//               label="Available"
//               variant={activeFilter === "available" ? "filled" : "outlined"}
//               color="info"
//               onClick={() => setActiveFilter("available")}
//               avatar={<Avatar>➕</Avatar>}
//             />
//           </Box>
//         </Box>
//       </Box>

//       {filteredCourses.length === 0 ? (
//         <Paper elevation={0} sx={{ 
//           p: 4, 
//           textAlign: "center",
//           backgroundColor: theme.palette.mode === "light" ? 
//             theme.palette.grey[50] : 
//             theme.palette.grey[800],
//           borderRadius: 3
//         }}>
//           <Typography variant="h6" gutterBottom>
//             No courses found
//           </Typography>
//           <Typography color="text.secondary" sx={{ mb: 2 }}>
//             {searchTerm ? 
//               "Try a different search term" : 
//               "There are currently no courses available"}
//           </Typography>
//           <Button 
//             variant="contained" 
//             color="primary"
//             onClick={() => {
//               setSearchTerm("");
//               setActiveFilter("all");
//             }}
//           >
//             Reset Filters
//           </Button>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {filteredCourses.map((course) => {
//             const isEnrolled = enrolledCourseIds.includes(course.id);
//             return (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
//                 <CourseCard
//                   course={course}
//                   isEnrolled={isEnrolled}
//                   onEnrollClick={!isEnrolled ? handleEnrollClick : null}
//                 />
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}

//       <EnrollmentDialog
//         open={enrollmentDialogOpen}
//         onClose={() => setEnrollmentDialogOpen(false)}
//         course={selectedCourse}
//         onEnroll={handleEnroll}
//       />
//     </Container>
//   );
// };

// export default AllCoursesPage;
// // src/pages/instructor/CourseDetails.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Grid,
//   Divider,
//   Tabs,
//   Tab,
//   CircularProgress,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   ArrowBack as ArrowBackIcon,
//   VideoLibrary as ModulesIcon,
//   Article as LessonsIcon,
//   Info as InfoIcon,
//   People as StudentsIcon,
//   BarChart as AnalyticsIcon,
// } from "@mui/icons-material";
// import { useParams, useNavigate } from "react-router-dom";
// import InstructorService from "../../../services/instructorService";
// import StatusChip from "../../Dashboard/Instructor/StatusChip";
// import ModuleList from "./ModuleDetails";

// const CourseDetails = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState(0);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await InstructorService.getCourseDetails(courseId);
//         setCourse(data);
//       } catch (error) {
//         console.error("Failed to fetch course details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId]);

//   const handleDeleteCourse = async () => {
//     try {
//       await InstructorService.deleteCourse(courseId);
//       navigate("/instructor/courses");
//     } catch (error) {
//       console.error("Failed to delete course:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" my={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!course) {
//     return (
//       <Box display="flex" justifyContent="center" my={4}>
//         <Typography variant="h6">Course not found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Box display="flex" alignItems="center" mb={3}>
//         <IconButton onClick={() => navigate("/instructor/courses")}>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h4" sx={{ ml: 1 }}>
//           {course.title}
//         </Typography>
//         <Box sx={{ ml: "auto" }}>
//           <StatusChip status={course.status} />
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Course Description
//             </Typography>
//             <Typography variant="body1" paragraph>
//               {course.description}
//             </Typography>

//             <Divider sx={{ my: 3 }} />

//             <Typography variant="h6" gutterBottom>
//               Course Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2">Duration</Typography>
//                 <Typography>{course.duration} hours</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2">Category</Typography>
//                 <Typography>Programming</Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2">Created</Typography>
//                 <Typography>
//                   {new Date(course.createdAt).toLocaleDateString()}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={3}>
//                 <Typography variant="subtitle2">Last Updated</Typography>
//                 <Typography>
//                   {new Date(course.updatedAt).toLocaleDateString()}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Paper>

//           <Paper sx={{ p: 3 }}>
//             <Tabs
//               value={activeTab}
//               onChange={(e, newValue) => setActiveTab(newValue)}
//               sx={{ mb: 3 }}
//             >
//               <Tab label="Modules & Lessons" icon={<VideoLibraryIcon />} />
//               <Tab label="Students" icon={<StudentsIcon />} />
//               <Tab label="Analytics" icon={<AnalyticsIcon />} />
//             </Tabs>

//             {activeTab === 0 && <ModuleList courseId={courseId} />}
//             {activeTab === 1 && <Typography>Students tab content</Typography>}
//             {activeTab === 2 && <Typography>Analytics tab content</Typography>}
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Box display="flex" justifyContent="space-between" mb={2}>
//               <Typography variant="h6">Actions</Typography>
//               <Box>
//                 <IconButton
//                   onClick={() =>
//                     navigate(`/instructor/courses/edit/${courseId}`)
//                   }
//                   color="primary"
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => setDeleteDialogOpen(true)}
//                   color="error"
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{ mb: 2 }}
//               startIcon={<ModulesIcon />}
//               onClick={() =>
//                 navigate(`/instructor/courses/${courseId}/modules/new`)
//               }
//             >
//               Add Module
//             </Button>

//             <Button
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               startIcon={<LessonsIcon />}
//               onClick={() =>
//                 navigate(`/instructor/courses/${courseId}/lessons/new`)
//               }
//             >
//               Add Lesson
//             </Button>

//             {course.status === "pending" && (
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                 <InfoIcon
//                   fontSize="small"
//                   sx={{ mr: 1, verticalAlign: "middle" }}
//                 />
//                 Your course is pending approval by the admin.
//               </Typography>
//             )}

//             {course.status === "rejected" && course.feedback && (
//               <Box mt={2}>
//                 <Typography variant="subtitle2">Admin Feedback:</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {course.feedback}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>

//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Course Thumbnail
//             </Typography>
//             {course.thumbnail_url ? (
//               <img
//                 src={course.thumbnail_url}
//                 alt="Course thumbnail"
//                 style={{ width: "100%", borderRadius: 8 }}
//               />
//             ) : (
//               <Typography variant="body2" color="textSecondary">
//                 No thumbnail uploaded
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Delete Course</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete this course? This action cannot be
//             undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button
//             onClick={handleDeleteCourse}
//             color="error"
//             variant="contained"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CourseDetails;


// src/pages/instructor/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Badge,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  VideoLibrary as ModulesIcon,
  Article as LessonsIcon,
  Info as InfoIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
  AccessTime as DurationIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
  Update as UpdateIcon,
  Star as StarIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";
import StatusChip from "../../Dashboard/Instructor/StatusChip";
import ModuleList from "./ModuleDetails";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await InstructorService.getCourseDetails(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    try {
      await InstructorService.deleteCourse(courseId);
      navigate("/instructor/courses");
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography variant="h6" color="textSecondary">
          Course not found
        </Typography>
      </Box>
    );
  }

  const getStatusIcon = () => {
    switch (course.status) {
      case "approved":
        return <ApprovedIcon color="success" fontSize="small" />;
      case "rejected":
        return <RejectedIcon color="error" fontSize="small" />;
      case "pending":
        return <StarIcon color="warning" fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", px: isMobile ? 2 : 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(26, 140, 240, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)"
              : "linear-gradient(135deg, rgba(26, 140, 240, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)",
          backdropFilter: "blur(8px)",
          boxShadow: 1,
        }}
      >
        <Tooltip title="Back to courses">
          <IconButton
            onClick={() => navigate("/instructor/courses")}
            sx={{ mr: 2, bgcolor: "background.paper" }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {course.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Chip
              label={course.status}
              icon={getStatusIcon()}
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                px: 1,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} xl={12}>
          {/* Description Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InfoIcon sx={{ mr: 1, color: "primary.main" }} />
                Course Description
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                {course.description}
              </Typography>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InfoIcon sx={{ mr: 1, color: "primary.main" }} />
                Course Details
              </Typography>
              <Grid container spacing={2}>
                {[
                  {
                    icon: <DurationIcon color="primary" />,
                    label: "Duration",
                    value: `${course.duration} hours`,
                  },
                  {
                    icon: <CategoryIcon color="primary" />,
                    label: "Category",
                    value: "Programming",
                  },
                  {
                    icon: <CalendarIcon color="primary" />,
                    label: "Created",
                    value: new Date(course.createdAt).toLocaleDateString(),
                  },
                  {
                    icon: <UpdateIcon color="primary" />,
                    label: "Last Updated",
                    value: new Date(course.updatedAt).toLocaleDateString(),
                  },
                ].map((item, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                          mb: 1,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {item.icon}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Modules & Content */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{
                  mb: 3,
                  "& .MuiTabs-indicator": {
                    height: 4,
                    borderRadius: 2,
                  },
                }}
              >
                <Tab
                  label="Modules & Lessons"
                  icon={<ModulesIcon />}
                  iconPosition="start"
                  sx={{ minHeight: 60 }}
                />
                <Tab
                  label="Students"
                  icon={<StudentsIcon />}
                  iconPosition="start"
                  sx={{ minHeight: 60 }}
                />
                <Tab
                  label="Analytics"
                  icon={<AnalyticsIcon />}
                  iconPosition="start"
                  sx={{ minHeight: 60 }}
                />
              </Tabs>

              {activeTab === 0 && <ModuleList courseId={courseId} />}
              {activeTab === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200,
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Students tab content
                  </Typography>
                </Box>
              )}
              {activeTab === 2 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200,
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Analytics tab content
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} xl={12} >
          {/* Actions Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EditIcon sx={{ mr: 1, color: "primary.main" }} />
                  Course Actions
                </Typography>
                <Box>
                  <Tooltip title="Edit Course">
                    <IconButton
                      onClick={() =>
                        navigate(`/instructor/courses/edit/${courseId}`)
                      }
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Course">
                    <IconButton
                      onClick={() => setDeleteDialogOpen(true)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="gradient"
                sx={{ mb: 2, py: 1.5 }}
                startIcon={<ModulesIcon />}
                onClick={() =>
                  navigate(`/instructor/courses/${courseId}/modules/new`)
                }
              >
                Add Module
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2, py: 1.5 }}
                startIcon={<LessonsIcon />}
                onClick={() =>
                  navigate(`/instructor/courses/${courseId}/lessons/new`)
                }
              >
                Add Lesson
              </Button>

              {course.status === "pending" && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "warning.light",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <InfoIcon
                    fontSize="small"
                    sx={{ mr: 1, mt: 0.5, color: "warning.dark" }}
                  />
                  <Typography variant="body2" color="warning.dark">
                    Your course is pending approval by the admin.
                  </Typography>
                </Box>
              )}

              {course.status === "rejected" && course.feedback && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "error.light",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <InfoIcon
                    fontSize="small"
                    sx={{ mr: 1, mt: 0.5, color: "error.dark" }}
                  />
                  <Box>
                    <Typography variant="subtitle2" color="error.dark">
                      Admin Feedback:
                    </Typography>
                    <Typography variant="body2" color="error.dark">
                      {course.feedback}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Thumbnail Card */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VideoLibraryIcon sx={{ mr: 1, color: "primary.main" }} />
                Course Thumbnail
              </Typography>
              {course.thumbnail_url ? (
                <CardMedia
                  component="img"
                  image={course.thumbnail_url}
                  alt="Course thumbnail"
                  sx={{
                    borderRadius: 2,
                    height: 200,
                    objectFit: "cover",
                    mb: 2,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.default",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No thumbnail uploaded
                  </Typography>
                </Box>
              )}
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() =>
                  navigate(`/instructor/courses/edit/${courseId}`)
                }
              >
                Update Thumbnail
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <DeleteIcon color="error" sx={{ mr: 1 }} />
          Delete Course
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete{" "}
            <Typography component="span" sx={{ fontWeight: 600 }}>
              {course.title}
            </Typography>
            ? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            All modules, lessons, and student progress will be permanently
            removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCourse}
            color="error"
            variant="gradient"
            sx={{ borderRadius: 2, px: 3 }}
            startIcon={<DeleteIcon />}
          >
            Delete Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetails;
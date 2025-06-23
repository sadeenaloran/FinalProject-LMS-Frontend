// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import {
//   Check as ApproveIcon,
//   Close as RejectIcon,
//   Visibility as PreviewIcon,
//   Refresh as RefreshIcon,
// } from "@mui/icons-material";
// import CourseService from "../../../../services/CoursesService";
// import CoursePreviewDialog from "./CoursePreviewDialog";
// import { styled } from "@mui/material/styles";
// import { useAuth } from "../../../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.primary[50],
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
//   "&:hover": {
//     backgroundColor: theme.palette.primary[100],
//   }
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: "bold",
//   backgroundColor:
//     status === "pending"
//       ? theme.palette.warning.light
//       : status === "published"
//       ? theme.palette.success.light
//       : theme.palette.error.light,
//   color:
//     status === "pending"
//       ? theme.palette.warning.dark
//       : status === "published"
//       ? theme.palette.success.dark
//       : theme.palette.error.dark,
// }));

// const CourseManagement = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
//   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
//   const [feedback, setFeedback] = useState("");
//   const [approveFeedback, setApproveFeedback] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (!loading && (!user || user.role !== "admin")) {
//         navigate("/unauthorized");
//       }
//     };
//     checkAuth();
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     fetchPendingCourses();
//   }, []);

//   const fetchPendingCourses = async () => {
//     try {
//       setLoadingCourses(true);
//       setError(null);
//       const pendingCourses = await CourseService.getPendingCourses();
//       setCourses(pendingCourses);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch pending courses"
//       );
//       if (err.response?.status === 401) {
//         navigate("/login");
//       }
//     } finally {
//       setLoadingCourses(false);
//     }
//   };

//   const handleApprove = async (courseId, feedback = "") => {
//     try {
//       setActionLoading(true);
//       await CourseService.approveCourse(courseId, feedback);
//       setSuccessMessage("Course approved successfully!");
//       await fetchPendingCourses();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to approve course");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       setActionLoading(true);
//       await CourseService.rejectCourse(selectedCourse.id, feedback);
//       setSuccessMessage("Course rejected successfully!");
//       setRejectDialogOpen(false);
//       setFeedback("");
//       await fetchPendingCourses();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to reject course");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handlePreview = (course) => {
//     setSelectedCourse(course);
//     setPreviewOpen(true);
//   };

//   const handleClosePreview = () => {
//     setPreviewOpen(false);
//     setSelectedCourse(null);
//   };

//   const handleOpenRejectDialog = (course) => {
//     setSelectedCourse(course);
//     setRejectDialogOpen(true);
//   };

//   const handleCloseRejectDialog = () => {
//     setRejectDialogOpen(false);
//     setFeedback("");
//     setSelectedCourse(null);
//   };

//   return (
//     <Box sx={{ 
//       p: 3,
//       bgcolor: '#f8fafc',
//       minHeight: '100vh'
//     }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ 
//           mb: 3, 
//           color: "primary.dark",
//           fontWeight: 600,
//           textShadow: '0 1px 2px rgba(0,0,0,0.1)'
//         }}
//       >
//         Course Approval Management
//       </Typography>

//       {successMessage && (
//         <Alert
//           severity="success"
//           sx={{ 
//             mb: 3,
//             bgcolor: 'primary.50',
//             color: 'primary.dark',
//             border: '1px solid',
//             borderColor: 'primary.100'
//           }}
//           onClose={() => setSuccessMessage(null)}
//         >
//           {successMessage}
//         </Alert>
//       )}

//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ 
//             mb: 3,
//             bgcolor: 'error.light',
//             color: 'error.dark'
//           }} 
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ 
//         display: "flex", 
//         justifyContent: "flex-end", 
//         mb: 2 
//       }}>
//         <Button
//           variant="outlined"
//           startIcon={<RefreshIcon />}
//           onClick={fetchPendingCourses}
//           disabled={loadingCourses || actionLoading}
//           sx={{
//             borderColor: 'primary.light',
//             color: 'primary.dark',
//             '&:hover': {
//               borderColor: 'primary.main',
//               bgcolor: 'primary.50'
//             }
//           }}
//         >
//           Refresh
//         </Button>
//       </Box>

//       {loadingCourses ? (
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           mt: 4,
//           p: 4,
//           bgcolor: 'primary.50',
//           borderRadius: 2
//         }}>
//           <CircularProgress sx={{ color: 'primary.main' }} />
//         </Box>
//       ) : courses.length === 0 ? (
//         <Paper sx={{ 
//           p: 3, 
//           textAlign: "center",
//           bgcolor: 'primary.50',
//           borderRadius: 2,
//           boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//           border: '1px solid',
//           borderColor: 'primary.100'
//         }}>
//           <Typography variant="h6">No pending courses for approval</Typography>
//         </Paper>
//       ) : (
//         <TableContainer component={Paper} sx={{ 
//           borderRadius: 2,
//           boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//           border: "blue",
//           borderColor: 'primary.100'
//         }}>
//           <Table>
//             <TableHead sx={{ 
//               backgroundColor: 'primary.light',
//               '& .MuiTableCell-root': {
//                 color: 'primary.dark',
//                 fontWeight: 600,
//                 fontSize: '0.875rem',
//                 textAlign:"center",
//               }
//             }}>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Instructor</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Created</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {courses.map((course) => (
//                 <StyledTableRow key={course.id}>
//                   <TableCell sx={{ fontWeight: 500 }}>{course.title}</TableCell>
//                   <TableCell>{course.instructor?.name || "Unknown"}</TableCell>
//                   <TableCell>{course.category}</TableCell>
//                   <TableCell>
//                     <StatusChip
//                       label={course.status}
//                       status={course.status}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Typography>
//                       {new Date(course.createdAt).toLocaleString()}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<PreviewIcon />}
//                         onClick={() => handlePreview(course)}
//                         disabled={actionLoading}
//                         sx={{
//                           borderColor: 'primary.light',
//                           color: 'primary.dark',
//                           '&:hover': {
//                             borderColor: 'primary.main',
//                             bgcolor: 'primary.50'
//                           }
//                         }}
//                       >
//                         Preview
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         size="small"
//                         startIcon={<ApproveIcon />}
//                         onClick={() => {
//                           setSelectedCourse(course);
//                           setApproveDialogOpen(true);
//                         }}
//                         disabled={actionLoading}
//                         sx={{
//                           bgcolor: 'success.light',
//                           color: 'success.dark',
//                           '&:hover': {
//                             bgcolor: 'success.main',
//                             color: 'white'
//                           }
//                         }}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         startIcon={<RejectIcon />}
//                         onClick={() => handleOpenRejectDialog(course)}
//                         disabled={actionLoading}
//                         sx={{
//                           bgcolor: 'error.light',
//                           color: 'error.dark',
//                           '&:hover': {
//                             bgcolor: 'error.main',
//                             color: 'white'
//                           }
//                         }}
//                       >
//                         Reject
//                       </Button>
//                     </Box>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <CoursePreviewDialog
//         open={previewOpen}
//         onClose={handleClosePreview}
//         course={selectedCourse}
//       />

//       <Dialog 
//         open={rejectDialogOpen} 
//         onClose={handleCloseRejectDialog}
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             bgcolor: 'background.paper',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//           }
//         }}
//       >
//         <DialogTitle sx={{ 
//           bgcolor: 'primary.50',
//           color: 'primary.dark',
//           borderBottom: '1px solid',
//           borderColor: 'primary.100'
//         }}>
//           Reject Course
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <Typography gutterBottom>
//             Please provide feedback for rejecting this course:
//           </Typography>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Feedback"
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={4}
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1,
//                 borderColor: 'primary.100'
//               }
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button 
//             onClick={handleCloseRejectDialog} 
//             disabled={actionLoading}
//             sx={{
//               color: 'text.secondary',
//               '&:hover': {
//                 color: 'primary.dark'
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleReject}
//             color="error"
//             variant="contained"
//             disabled={!feedback || actionLoading}
//             startIcon={actionLoading ? <CircularProgress size={20} /> : null}
//             sx={{
//               bgcolor: 'error.light',
//               color: 'error.dark',
//               '&:hover': {
//                 bgcolor: 'error.main',
//                 color: 'white'
//               }
//             }}
//           >
//             Confirm Reject
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={approveDialogOpen}
//         onClose={() => setApproveDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             bgcolor: 'background.paper',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//           }
//         }}
//       >
//         <DialogTitle sx={{ 
//           bgcolor: 'primary.50',
//           color: 'primary.dark',
//           borderBottom: '1px solid',
//           borderColor: 'primary.100'
//         }}>
//           Approve Course
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <Typography gutterBottom>
//             You can provide feedback for approving this course (optional):
//           </Typography>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Feedback"
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={4}
//             value={approveFeedback}
//             onChange={(e) => setApproveFeedback(e.target.value)}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1,
//                 borderColor: 'primary.100'
//               }
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button
//             onClick={() => setApproveDialogOpen(false)}
//             disabled={actionLoading}
//             sx={{
//               color: 'text.secondary',
//               '&:hover': {
//                 color: 'primary.dark'
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={async () => {
//               await handleApprove(selectedCourse.id, approveFeedback);
//               setApproveDialogOpen(false);
//               setApproveFeedback("");
//             }}
//             color="success"
//             variant="contained"
//             disabled={actionLoading}
//             startIcon={actionLoading ? <CircularProgress size={20} /> : null}
//             sx={{
//               bgcolor: 'success.light',
//               color: 'success.dark',
//               '&:hover': {
//                 bgcolor: 'success.main',
//                 color: 'white'
//               }
//             }}
//           >
//             Confirm Approve
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CourseManagement;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
  Badge
} from "@mui/material";
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as PreviewIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  AutoAwesome as AutoAwesomeIcon
} from "@mui/icons-material";
import CourseService from "../../../../services/CoursesService";
import CoursePreviewDialog from "./CoursePreviewDialog";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary[50],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary[100],
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
    transition: "all 0.3s ease",
  },
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    width: "4px",
    height: "100%",
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
  },
  "&:hover::after": {
    backgroundColor: theme.palette.primary.main,
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: "bold",
  borderRadius: "4px",
  backgroundColor:
    status === "pending"
      ? theme.palette.warning.light + "33" // Add transparency
      : status === "published"
      ? theme.palette.success.light + "33"
      : theme.palette.error.light + "33",
  color:
    status === "pending"
      ? theme.palette.warning.dark
      : status === "published"
      ? theme.palette.success.dark
      : theme.palette.error.dark,
  border: `1px solid ${
    status === "pending"
      ? theme.palette.warning.main
      : status === "published"
      ? theme.palette.success.main
      : theme.palette.error.main
  }`,
  boxShadow: theme.shadows[1],
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  textTransform: "none",
  boxShadow: theme.shadows[2],
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    boxShadow: theme.shadows[4],
  },
}));

const CourseManagement = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [approveFeedback, setApproveFeedback] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && (!user || user.role !== "admin")) {
        navigate("/unauthorized");
      }
    };
    checkAuth();
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    try {
      setLoadingCourses(true);
      setError(null);
      const pendingCourses = await CourseService.getPendingCourses();
      setCourses(pendingCourses);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch pending courses"
      );
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleApprove = async (courseId, feedback = "") => {
    try {
      setActionLoading(true);
      await CourseService.approveCourse(courseId, feedback);
      setSuccessMessage("Course approved successfully!");
      await fetchPendingCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve course");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      await CourseService.rejectCourse(selectedCourse.id, feedback);
      setSuccessMessage("Course rejected successfully!");
      setRejectDialogOpen(false);
      setFeedback("");
      await fetchPendingCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject course");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePreview = (course) => {
    setSelectedCourse(course);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedCourse(null);
  };

  const handleOpenRejectDialog = (course) => {
    setSelectedCourse(course);
    setRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setFeedback("");
    setSelectedCourse(null);
  };

  return (
    <Box sx={{ 
      maxWidth:"lg",
      p: 3,
      pt:7,
      bgcolor: 'background.default',
      minHeight: '100vh',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 2,
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        background: 'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
      }}>
        <Box>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 700,
              color: "primary.dark",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <AutoAwesomeIcon fontSize="large" />
            Course Approval Management
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
            Review and manage pending course submissions
          </Typography>
        </Box>
        <Tooltip title="Refresh courses">
          <IconButton
            onClick={fetchPendingCourses}
            disabled={loadingCourses || actionLoading}
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                transform: 'rotate(180deg)',
                transition: 'transform 0.5s ease'
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {successMessage && (
        <Alert
          severity="success"
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: 1,
            bgcolor: 'success.light',
            color: 'success.dark',
            border: '1px solid',
            borderColor: 'success.main',
            '& .MuiAlert-icon': {
              color: 'success.main'
            }
          }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: 1,
            bgcolor: 'error.light',
            color: 'error.dark',
            border: '1px solid',
            borderColor: 'error.main',
            '& .MuiAlert-icon': {
              color: 'error.main'
            }
          }} 
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {loadingCourses ? (
        <Box sx={{ 
          display: "flex", 
          flexDirection: 'column',
          alignItems: "center", 
          justifyContent: "center",
          minHeight: '300px',
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 1,
          textAlign: 'center'
        }}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ 
              color: 'primary.main',
              mb: 3 
            }} 
          />
          <Typography variant="h6" color="text.secondary">
            Loading courses...
          </Typography>
        </Box>
      ) : courses.length === 0 ? (
        <Paper sx={{ 
          p: 4, 
          textAlign: "center",
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 3,
          borderTop: '4px solid',
          borderColor: 'primary.light',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <InfoIcon sx={{ 
            fontSize: 60, 
            color: 'primary.light',
            mb: 2 
          }} />
          <Typography variant="h5" sx={{ mb: 1, color: 'text.primary' }}>
            No pending courses for approval
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            All courses have been reviewed or there are no new submissions.
          </Typography>
          <GradientButton
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={fetchPendingCourses}
            sx={{ mt: 3 }}
          >
            Check Again
          </GradientButton>
        </Paper>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 3,
            boxShadow: 3,
            borderTop: '4px solid',
            borderColor: 'primary.light',
            overflow: 'hidden',
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.light',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'primary.50',
            }
          }}
        >
          <Table>
            <TableHead sx={{ 
              backgroundColor: 'primary.light',
              '& .MuiTableCell-root': {
                color: 'primary.contrastText',
                fontWeight: 600,
                fontSize: '0.875rem',
                textAlign: "center",
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              }
            }}>
              <TableRow>
                <TableCell>Course Details</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <StyledTableRow key={course.id}>
                  <TableCell sx={{ fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={course.thumbnail} 
                        variant="rounded"
                        sx={{ 
                          width: 60, 
                          height: 60,
                          boxShadow: 2,
                          border: '2px solid',
                          borderColor: 'primary.100'
                        }}
                      >
                        {course.title.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.shortDescription?.substring(0, 50)}...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <Avatar 
                        src={course.instructor?.avatar} 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText'
                        }}
                      >
                        {course.instructor?.name?.charAt(0) || 'U'}
                      </Avatar>
                      <Typography>
                        {course.instructor?.name || "Unknown"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={course.category} 
                      size="small"
                      sx={{
                        bgcolor: 'secondary.light',
                        color: 'secondary.dark',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusChip
                      label={course.status.toUpperCase()}
                      status={course.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {new Date(course.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(course.createdAt).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: "flex", 
                      gap: 1,
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}>
                      <Tooltip title="Preview course">
                        <IconButton
                          size="small"
                          onClick={() => handlePreview(course)}
                          disabled={actionLoading}
                          sx={{
                            bgcolor: 'primary.50',
                            color: 'primary.main',
                            border: '1px solid',
                            borderColor: 'primary.100',
                            '&:hover': {
                              bgcolor: 'primary.100',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <PreviewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Approve course">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedCourse(course);
                            setApproveDialogOpen(true);
                          }}
                          disabled={actionLoading}
                          sx={{
                            bgcolor: 'success.light',
                            color: 'success.dark',
                            '&:hover': {
                              bgcolor: 'success.main',
                              color: 'white',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <ApproveIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject course">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenRejectDialog(course)}
                          disabled={actionLoading}
                          sx={{
                            bgcolor: 'error.light',
                            color: 'error.dark',
                            '&:hover': {
                              bgcolor: 'error.main',
                              color: 'white',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <RejectIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CoursePreviewDialog
        open={previewOpen}
        onClose={handleClosePreview}
        course={selectedCourse}
      />

      <Dialog 
        open={rejectDialogOpen} 
        onClose={handleCloseRejectDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: 4,
            borderTop: '4px solid',
            borderColor: 'error.main',
            minWidth: isMobile ? '90%' : '500px'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'error.light',
          color: 'error.dark',
          borderBottom: '1px solid',
          borderColor: 'error.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <RejectIcon color="error" />
          Reject Course Submission
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body1" gutterBottom>
            You're about to reject the course: 
            <Typography component="span" sx={{ fontWeight: 600, ml: 1 }}>
              "{selectedCourse?.title}"
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide constructive feedback to help the instructor improve:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Feedback"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                borderColor: 'error.light',
                '&:hover fieldset': {
                  borderColor: 'error.main',
                },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseRejectDialog} 
            disabled={actionLoading}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.dark',
                bgcolor: 'primary.50'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={!feedback || actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} color="inherit" /> : <RejectIcon />}
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'error.light',
                color: 'error.dark'
              }
            }}
          >
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: 4,
            borderTop: '4px solid',
            borderColor: 'success.main',
            minWidth: isMobile ? '90%' : '500px'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'success.light',
          color: 'success.dark',
          borderBottom: '1px solid',
          borderColor: 'success.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <ApproveIcon color="success" />
          Approve Course Submission
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Typography variant="body1" gutterBottom>
            You're about to approve the course: 
            <Typography component="span" sx={{ fontWeight: 600, ml: 1 }}>
              "{selectedCourse?.title}"
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Optional: Provide feedback or notes about this approval:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Approval Feedback (Optional)"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={approveFeedback}
            onChange={(e) => setApproveFeedback(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                borderColor: 'success.light',
                '&:hover fieldset': {
                  borderColor: 'success.main',
                },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            onClick={() => setApproveDialogOpen(false)}
            disabled={actionLoading}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.dark',
                bgcolor: 'primary.50'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleApprove(selectedCourse?.id, approveFeedback);
              setApproveDialogOpen(false);
              setApproveFeedback("");
            }}
            color="success"
            variant="contained"
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} color="inherit" /> : <ApproveIcon />}
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'success.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'success.light',
                color: 'success.dark'
              }
            }}
          >
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement;
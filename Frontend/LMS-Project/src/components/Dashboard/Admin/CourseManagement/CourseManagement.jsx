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
// import CourseService from "../../../services/CoursesService";
// import CoursePreviewDialog from "./CoursePreviewDialog";
// import { styled } from "@mui/material/styles";
// import { useAuth } from "../../../contexts/AuthContext/AuthContext";
// import { useNavigate } from "react-router-dom";

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
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
//   const [loadingCourses, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
//   const [feedback, setFeedback] = useState("");
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
//       setLoading(true);
//       setError(null);
//       const pendingCourses = await CourseService.getPendingCourses();
//       setCourses(pendingCourses);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch pending courses"
//       );
//       // إذا كان الخطأ 401 (غير مصرح)، أخرج من الصفحة
//       if (err.response?.status === 401) {
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   //   const fetchPendingCourses = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError(null);
//   //       const pendingCourses = await CourseService.getPendingCourses();
//   //       setCourses(pendingCourses);
//   //     } catch (err) {
//   //       setError(err.message || "Failed to fetch pending courses");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   const handleApprove = async (courseId) => {
//     try {
//       setActionLoading(true);
//       await CourseService.approveCourse(courseId);
//       setSuccessMessage("Course approved successfully!");
//       fetchPendingCourses();
//     } catch (err) {
//       setError(err.message || "Failed to approve course");
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
//       fetchPendingCourses();
//     } catch (err) {
//       setError(err.message || "Failed to reject course");
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
//     <Box sx={{ p: 3 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ mb: 3, color: "primary.main" }}
//       >
//         Course Approval Management
//       </Typography>

//       {successMessage && (
//         <Alert
//           severity="success"
//           sx={{ mb: 3 }}
//           onClose={() => setSuccessMessage(null)}
//         >
//           {successMessage}
//         </Alert>
//       )}

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//         <Button
//           variant="outlined"
//           startIcon={<RefreshIcon />}
//           onClick={fetchPendingCourses}
//           disabled={loadingCourses}
//         >
//           Refresh
//         </Button>
//       </Box>

//       {loadingCourses ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : courses.length === 0 ? (
//         <Paper sx={{ p: 3, textAlign: "center" }}>
//           <Typography variant="h6">No pending courses for approval</Typography>
//         </Paper>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "primary.light" }}>
//               <TableRow>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Title
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Instructor
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Category
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Status
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Created
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {courses.map((course) => (
//                 <StyledTableRow key={course.id}>
//                   <TableCell>{course.title}</TableCell>
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
//                     {new Date(course.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<PreviewIcon />}
//                         onClick={() => handlePreview(course)}
//                         disabled={actionLoading}
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

//       {/* Course Preview Dialog */}
//       <CoursePreviewDialog
//         open={previewOpen}
//         onClose={handleClosePreview}
//         course={selectedCourse}
//       />

//       {/* Reject Course Dialog */}
//       <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog}>
//         <DialogTitle>Reject Course</DialogTitle>
//         <DialogContent>
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
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseRejectDialog} disabled={actionLoading}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleReject}
//             color="error"
//             variant="contained"
//             disabled={!feedback || actionLoading}
//             startIcon={actionLoading ? <CircularProgress size={20} /> : null}
//           >
//             Confirm Reject
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
} from "@mui/material";
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as PreviewIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import CourseService from "../../../../services/CoursesService";
import CoursePreviewDialog from "./CoursePreviewDialog";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: "bold",
  backgroundColor:
    status === "pending"
      ? theme.palette.warning.light
      : status === "published"
      ? theme.palette.success.light
      : theme.palette.error.light,
  color:
    status === "pending"
      ? theme.palette.warning.dark
      : status === "published"
      ? theme.palette.success.dark
      : theme.palette.error.dark,
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
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, color: "primary.main" }}
      >
        Course Approval Management
      </Typography>

      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchPendingCourses}
          disabled={loadingCourses || actionLoading}
        >
          Refresh
        </Button>
      </Box>

      {loadingCourses ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">No pending courses for approval</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.light" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Instructor
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Created
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <StyledTableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.instructor?.name || "Unknown"}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={course.status}
                      status={course.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {new Date(course.createdAt).toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PreviewIcon />}
                        onClick={() => handlePreview(course)}
                        disabled={actionLoading}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<ApproveIcon />}
                        onClick={() => {
                          setSelectedCourse(course);
                          setApproveDialogOpen(true);
                        }}
                        disabled={actionLoading}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<RejectIcon />}
                        onClick={() => handleOpenRejectDialog(course)}
                        disabled={actionLoading}
                      >
                        Reject
                      </Button>
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

      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog}>
        <DialogTitle>Reject Course</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please provide feedback for rejecting this course:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog} disabled={actionLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={!feedback || actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : null}
          >
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
      >
        <DialogTitle>Approve Course</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You can provide feedback for approving this course (optional):
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={approveFeedback}
            onChange={(e) => setApproveFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setApproveDialogOpen(false)}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await handleApprove(selectedCourse.id, approveFeedback);
              setApproveDialogOpen(false);
              setApproveFeedback("");
            }}
            color="success"
            variant="contained"
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : null}
          >
            Confirm Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement;

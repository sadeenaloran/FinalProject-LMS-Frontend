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
//   Chip,
//   TextField,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Pagination,
// } from "@mui/material";
// import {
//   Check as ApproveIcon,
//   Close as RejectIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Visibility as ViewIcon,
// } from "@mui/icons-material";
// import { useCourses } from "../../../hooks/useCourses";

// const PendingCourses = () => {
//   const {
//     pendingCourses,
//     loading,
//     error,
//     fetchPendingCourses,
//     approveCourse,
//     rejectCourse,
//   } = useCourses();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [feedback, setFeedback] = useState("");
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchPendingCourses();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(1);
//   };

//   const filteredCourses = pendingCourses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedCourses = filteredCourses.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleApprove = async (courseId) => {
//     await approveCourse(courseId, feedback);
//     setSelectedCourse(null);
//     setFeedback("");
//     fetchPendingCourses();
//   };

//   const handleReject = async (courseId) => {
//     await rejectCourse(courseId, feedback);
//     setSelectedCourse(null);
//     setFeedback("");
//     fetchPendingCourses();
//   };

//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <Typography variant="h4" component="h1">
//           Pending Course Approvals
//         </Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search courses..."
//           size="small"
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: <SearchIcon color="action" />,
//           }}
//         />
//         <Tooltip title="Refresh">
//           <IconButton onClick={fetchPendingCourses}>
//             <RefreshIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       {error && <Alert severity="error">{error}</Alert>}

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Instructor</TableCell>
//                   <TableCell>Created At</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedCourses.map((course) => (
//                   <TableRow key={course.id}>
//                     <TableCell>{course.title}</TableCell>
//                     <TableCell>{course.instructor.name}</TableCell>
//                     <TableCell>
//                       {new Date(course.created_at).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={course.status}
//                         color={
//                           course.status === "pending"
//                             ? "warning"
//                             : course.status === "approved"
//                             ? "success"
//                             : "error"
//                         }
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Tooltip title="View Details">
//                         <IconButton onClick={() => setSelectedCourse(course)}>
//                           <ViewIcon color="info" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Approve">
//                         <IconButton
//                           onClick={() => handleApprove(course.id)}
//                           color="success"
//                         >
//                           <ApproveIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Reject">
//                         <IconButton
//                           onClick={() => handleReject(course.id)}
//                           color="error"
//                         >
//                           <RejectIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//             <Pagination
//               count={Math.ceil(filteredCourses.length / rowsPerPage)}
//               page={page}
//               onChange={(e, value) => setPage(value)}
//               color="primary"
//             />
//           </Box>
//         </>
//       )}

//       <Dialog
//         open={!!selectedCourse}
//         onClose={() => setSelectedCourse(null)}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedCourse && (
//           <>
//             <DialogTitle>{selectedCourse.title}</DialogTitle>
//             <DialogContent dividers>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Instructor:</strong> {selectedCourse.instructor.name}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Description:</strong> {selectedCourse.description}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Created At:</strong>{" "}
//                 {new Date(selectedCourse.created_at).toLocaleString()}
//               </Typography>

//               <TextField
//                 margin="normal"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Feedback (optional)"
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setSelectedCourse(null)}>Cancel</Button>
//               <Button
//                 onClick={() => handleReject(selectedCourse.id)}
//                 color="error"
//                 variant="outlined"
//               >
//                 Reject
//               </Button>
//               <Button
//                 onClick={() => handleApprove(selectedCourse.id)}
//                 color="success"
//                 variant="contained"
//               >
//                 Approve
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default PendingCourses;

// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Grid,
// // //   Card,
// // //   CardContent,
// // //   Button,
// // //   useTheme,
// // //   CircularProgress,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   TextField,
// // //   Alert,
// // // } from "@mui/material";
// // // import { Assignment, Schedule, Grade } from "@mui/icons-material";
// // // import AssignmentService from "../../../services/AssignmentService";

// // // const AssignmentList = ({ courseId }) => {
// // //   const theme = useTheme();
// // //   const [loading, setLoading] = useState(true);
// // //   const [assignments, setAssignments] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   const [openDialog, setOpenDialog] = useState(false);
// // //   const [selectedAssignment, setSelectedAssignment] = useState(null);
// // //   const [loadingDetails, setLoadingDetails] = useState(false);
// // //   const [errorDetails, setErrorDetails] = useState(null);

// // //   // ** states for submission **
// // //   const [submissionUrl, setSubmissionUrl] = useState("");
// // //   const [submitLoading, setSubmitLoading] = useState(false);
// // //   const [submitError, setSubmitError] = useState(null);
// // //   const [submitSuccess, setSubmitSuccess] = useState(null);

// // //   useEffect(() => {
// // //     if (!courseId) {
// // //       setAssignments([]);
// // //       return;
// // //     }

// // //     const fetchAssignments = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const assignmentsData = await AssignmentService.getAssignmentsByCourse(
// // //           courseId
// // //         );
// // //         setAssignments(assignmentsData);
// // //         setError(null);
// // //       } catch (err) {
// // //         setError(err.message || "Failed to load assignments");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAssignments();
// // //   }, [courseId]);

// // //   const handleOpenDialog = async (id) => {
// // //     setOpenDialog(true);
// // //     setLoadingDetails(true);
// // //     setErrorDetails(null);
// // //     setSubmissionUrl("");
// // //     setSubmitError(null);
// // //     setSubmitSuccess(null);

// // //     try {
// // //       const data = await AssignmentService.getAssignmentDetails(id);
// // //       setSelectedAssignment(data);
// // //     } catch (err) {
// // //       setErrorDetails("Failed to load assignment details");
// // //     } finally {
// // //       setLoadingDetails(false);
// // //     }
// // //   };

// // //   const handleCloseDialog = () => {
// // //     setOpenDialog(false);
// // //     setSelectedAssignment(null);
// // //     setErrorDetails(null);
// // //     setSubmissionUrl("");
// // //     setSubmitError(null);
// // //     setSubmitSuccess(null);
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!submissionUrl.trim()) {
// // //       setSubmitError("Please enter a submission URL.");
// // //       return;
// // //     }
// // //     setSubmitLoading(true);
// // //     setSubmitError(null);
// // //     setSubmitSuccess(null);
// // //     try {
// // //       await AssignmentService.submitAssignment(
// // //         selectedAssignment.id,
// // //         submissionUrl
// // //       );
// // //       setSubmitSuccess("Assignment submitted successfully!");
// // //       setSubmissionUrl("");
// // //     } catch (err) {
// // //       setSubmitError("Failed to submit assignment. Please try again.");
// // //     } finally {
// // //       setSubmitLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Box display="flex" justifyContent="center" mt={4}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Box p={3}>
// // //         <Typography variant="h6" color="error" align="center">
// // //           {error}
// // //         </Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   if (assignments.length === 0) {
// // //     return (
// // //       <Box p={3}>
// // //         <Typography variant="h6" align="center">
// // //           No assignments found for this course
// // //         </Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box>
// // //       <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
// // //         Course Assignments
// // //       </Typography>

// // //       <Grid container spacing={3}>
// // //         {assignments.map((assignment) => (
// // //           <Grid item xs={12} sm={6} md={4} key={assignment.id}>
// // //             <Card
// // //               sx={{
// // //                 height: "100%",
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 borderLeft: `4px solid ${theme.palette.primary.main}`,
// // //               }}
// // //             >
// // //               <CardContent sx={{ flexGrow: 1 }}>
// // //                 <Box display="flex" alignItems="center" mb={1}>
// // //                   <Assignment color="primary" sx={{ mr: 1 }} />
// // //                   <Typography variant="h6">{assignment.title}</Typography>
// // //                 </Box>

// // //                 <Typography variant="body2" color="text.secondary" paragraph>
// // //                   {assignment.description?.substring(0, 100) || ""}...
// // //                 </Typography>

// // //                 <Box display="flex" alignItems="center" mb={1}>
// // //                   <Schedule color="action" sx={{ mr: 1, fontSize: 16 }} />
// // //                   <Typography variant="caption">
// // //                     Due:{" "}
// // //                     {assignment.due_date
// // //                       ? new Date(assignment.due_date).toLocaleDateString()
// // //                       : "N/A"}
// // //                   </Typography>
// // //                 </Box>

// // //                 <Box display="flex" alignItems="center">
// // //                   <Grade color="action" sx={{ mr: 1, fontSize: 16 }} />
// // //                   <Typography variant="caption">
// // //                     Max Score: {assignment.max_score ?? "N/A"}
// // //                   </Typography>
// // //                 </Box>
// // //               </CardContent>

// // //               <Box p={2}>
// // //                 <Button
// // //                   variant="contained"
// // //                   fullWidth
// // //                   onClick={() => handleOpenDialog(assignment.id)}
// // //                 >
// // //                   View Assignment
// // //                 </Button>
// // //               </Box>
// // //             </Card>
// // //           </Grid>
// // //         ))}
// // //       </Grid>

// // //       {/* Dialog لعرض التفاصيل + فورم الرفع */}
// // //       <Dialog
// // //         open={openDialog}
// // //         onClose={handleCloseDialog}
// // //         maxWidth="sm"
// // //         fullWidth
// // //       >
// // //         <DialogTitle>Assignment Details</DialogTitle>
// // //         <DialogContent dividers>
// // //           {loadingDetails && <CircularProgress />}
// // //           {errorDetails && (
// // //             <Typography color="error" variant="body2">
// // //               {errorDetails}
// // //             </Typography>
// // //           )}
// // //           {selectedAssignment && !loadingDetails && !errorDetails && (
// // //             <>
// // //               <Typography variant="h6" gutterBottom>
// // //                 {selectedAssignment.title}
// // //               </Typography>
// // //               <Typography variant="body1" paragraph>
// // //                 {selectedAssignment.description}
// // //               </Typography>
// // //               <Typography variant="subtitle1" gutterBottom>
// // //                 Max Score: {selectedAssignment.max_score}
// // //               </Typography>

// // //               <TextField
// // //                 label="Submission URL"
// // //                 fullWidth
// // //                 variant="outlined"
// // //                 value={submissionUrl}
// // //                 onChange={(e) => setSubmissionUrl(e.target.value)}
// // //                 disabled={submitLoading}
// // //                 margin="normal"
// // //               />

// // //               {submitError && (
// // //                 <Alert severity="error" sx={{ mb: 2 }}>
// // //                   {submitError}
// // //                 </Alert>
// // //               )}

// // //               {submitSuccess && (
// // //                 <Alert severity="success" sx={{ mb: 2 }}>
// // //                   {submitSuccess}
// // //                 </Alert>
// // //               )}
// // //             </>
// // //           )}
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleCloseDialog} disabled={submitLoading}>
// // //             Cancel
// // //           </Button>
// // //           <Button
// // //             variant="contained"
// // //             onClick={handleSubmit}
// // //             disabled={submitLoading || !submissionUrl.trim()}
// // //           >
// // //             {submitLoading ? "Submitting..." : "Submit"}
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // };

// // // export default AssignmentList;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Button,
// //   useTheme,
// //   CircularProgress,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Alert,
// // } from "@mui/material";
// // import { Assignment, Schedule, Grade } from "@mui/icons-material";
// // import AssignmentService from "../../../services/AssignmentService";

// // const AssignmentList = ({ courseId }) => {
// //   const theme = useTheme();
// //   const [loading, setLoading] = useState(true);
// //   const [assignments, setAssignments] = useState([]);
// //   const [error, setError] = useState(null);

// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [selectedAssignment, setSelectedAssignment] = useState(null);
// //   const [loadingDetails, setLoadingDetails] = useState(false);
// //   const [errorDetails, setErrorDetails] = useState(null);

// //   // ** states for submission file **
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [submitLoading, setSubmitLoading] = useState(false);
// //   const [submitError, setSubmitError] = useState(null);
// //   const [submitSuccess, setSubmitSuccess] = useState(null);

// //   useEffect(() => {
// //     if (!courseId) {
// //       setAssignments([]);
// //       return;
// //     }

// //     const fetchAssignments = async () => {
// //       try {
// //         setLoading(true);
// //         const assignmentsData = await AssignmentService.getAssignmentsByCourse(
// //           courseId
// //         );
// //         setAssignments(assignmentsData);
// //         setError(null);
// //       } catch (err) {
// //         setError(err.message || "Failed to load assignments");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAssignments();
// //   }, [courseId]);

// //   const handleOpenDialog = async (id) => {
// //     setOpenDialog(true);
// //     setLoadingDetails(true);
// //     setErrorDetails(null);
// //     setSelectedFile(null);
// //     setSubmitError(null);
// //     setSubmitSuccess(null);

// //     try {
// //       const data = await AssignmentService.getAssignmentDetails(id);
// //       setSelectedAssignment(data);
// //     } catch (err) {
// //       setErrorDetails("Failed to load assignment details");
// //     } finally {
// //       setLoadingDetails(false);
// //     }
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setSelectedAssignment(null);
// //     setErrorDetails(null);
// //     setSelectedFile(null);
// //     setSubmitError(null);
// //     setSubmitSuccess(null);
// //   };

// //   const handleFileChange = (event) => {
// //     setSelectedFile(event.target.files[0]);
// //     setSubmitError(null);
// //     setSubmitSuccess(null);
// //   };

// //   const handleSubmit = async () => {
// //     if (!selectedFile) {
// //       setSubmitError("Please select a file to upload.");
// //       return;
// //     }

// //     setSubmitLoading(true);
// //     setSubmitError(null);
// //     setSubmitSuccess(null);

// //     try {
// //       // 1. Upload file to backend -> Cloudinary
// //       const formData = new FormData();
// //       formData.append("file", selectedFile);

// //       const uploadResponse = await AssignmentService.uploadAttachment(formData);
// //       const submissionUrl = uploadResponse.attachment.secure_url;

// //       // 2. Submit assignment with the file URL
// //       await AssignmentService.submitAssignment(
// //         selectedAssignment.id,
// //         submissionUrl
// //       );

// //       setSubmitSuccess("Assignment submitted successfully!");
// //       setSelectedFile(null);
// //     } catch (err) {
// //       console.error("Error:", err);
// //       setSubmitError("Failed to submit assignment. Please try again.");
// //     } finally {
// //       setSubmitLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" mt={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box p={3}>
// //         <Typography variant="h6" color="error" align="center">
// //           {error}
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   if (assignments.length === 0) {
// //     return (
// //       <Box p={3}>
// //         <Typography variant="h6" align="center">
// //           No assignments found for this course
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box>
// //       <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
// //         Course Assignments
// //       </Typography>

// //       <Grid container spacing={3}>
// //         {assignments.map((assignment) => (
// //           <Grid item xs={12} sm={6} md={4} key={assignment.id}>
// //             <Card
// //               sx={{
// //                 height: "100%",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 borderLeft: `4px solid ${theme.palette.primary.main}`,
// //               }}
// //             >
// //               <CardContent sx={{ flexGrow: 1 }}>
// //                 <Box display="flex" alignItems="center" mb={1}>
// //                   <Assignment color="primary" sx={{ mr: 1 }} />
// //                   <Typography variant="h6">{assignment.title}</Typography>
// //                 </Box>

// //                 <Typography variant="body2" color="text.secondary" paragraph>
// //                   {assignment.description?.substring(0, 100) || ""}...
// //                 </Typography>

// //                 <Box display="flex" alignItems="center" mb={1}>
// //                   <Schedule color="action" sx={{ mr: 1, fontSize: 16 }} />
// //                   <Typography variant="caption">
// //                     Due:{" "}
// //                     {assignment.due_date
// //                       ? new Date(assignment.due_date).toLocaleDateString()
// //                       : "N/A"}
// //                   </Typography>
// //                 </Box>

// //                 <Box display="flex" alignItems="center">
// //                   <Grade color="action" sx={{ mr: 1, fontSize: 16 }} />
// //                   <Typography variant="caption">
// //                     Max Score: {assignment.max_score ?? "N/A"}
// //                   </Typography>
// //                 </Box>
// //               </CardContent>

// //               <Box p={2}>
// //                 <Button
// //                   variant="contained"
// //                   fullWidth
// //                   onClick={() => handleOpenDialog(assignment.id)}
// //                 >
// //                   View Assignment
// //                 </Button>
// //               </Box>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Dialog لعرض التفاصيل + رفع ملف */}
// //       <Dialog
// //         open={openDialog}
// //         onClose={handleCloseDialog}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>Assignment Details</DialogTitle>
// //         <DialogContent dividers>
// //           {loadingDetails && <CircularProgress />}
// //           {errorDetails && (
// //             <Typography color="error" variant="body2">
// //               {errorDetails}
// //             </Typography>
// //           )}
// //           {selectedAssignment && !loadingDetails && !errorDetails && (
// //             <>
// //               <Typography variant="h6" gutterBottom>
// //                 {selectedAssignment.title}
// //               </Typography>
// //               <Typography variant="body1" paragraph>
// //                 {selectedAssignment.description}
// //               </Typography>
// //               <Typography variant="subtitle1" gutterBottom>
// //                 Max Score: {selectedAssignment.max_score}
// //               </Typography>

// //               <input
// //                 type="file"
// //                 accept=".doc,.docx,.pdf,image/*"
// //                 onChange={handleFileChange}
// //                 disabled={submitLoading}
// //                 style={{ marginTop: 16 }}
// //               />

// //               {selectedFile && (
// //                 <Typography variant="body2" sx={{ mt: 1 }}>
// //                   Selected file: {selectedFile.name}
// //                 </Typography>
// //               )}

// //               {submitError && (
// //                 <Alert severity="error" sx={{ mt: 2 }}>
// //                   {submitError}
// //                 </Alert>
// //               )}

// //               {submitSuccess && (
// //                 <Alert severity="success" sx={{ mt: 2 }}>
// //                   {submitSuccess}
// //                 </Alert>
// //               )}
// //             </>
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseDialog} disabled={submitLoading}>
// //             Cancel
// //           </Button>
// //           <Button
// //             variant="contained"
// //             onClick={handleSubmit}
// //             disabled={submitLoading || !selectedFile}
// //           >
// //             {submitLoading ? "Submitting..." : "Submit"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default AssignmentList;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   useTheme,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
// } from "@mui/material";
// import { Assignment, Schedule, Grade } from "@mui/icons-material";
// import AssignmentService from "../../../services/AssignmentService";

// const AssignmentList = ({ courseId }) => {
//   const theme = useTheme();
//   const [loading, setLoading] = useState(true);
//   const [assignments, setAssignments] = useState([]);
//   const [error, setError] = useState(null);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [errorDetails, setErrorDetails] = useState(null);

//   // ** states for submission file **
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [submitSuccess, setSubmitSuccess] = useState(null);

//   useEffect(() => {
//     if (!courseId) {
//       setAssignments([]);
//       return;
//     }

//     const fetchAssignments = async () => {
//       try {
//         setLoading(true);
//         const assignmentsData = await AssignmentService.getAssignmentsByCourse(
//           courseId
//         );
//         setAssignments(assignmentsData);
//         setError(null);
//       } catch (err) {
//         setError(err.message || "Failed to load assignments");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   const handleOpenDialog = async (id) => {
//     setOpenDialog(true);
//     setLoadingDetails(true);
//     setErrorDetails(null);
//     setSelectedFile(null);
//     setSubmitError(null);
//     setSubmitSuccess(null);

//     try {
//       const data = await AssignmentService.getAssignmentDetails(id);
//       setSelectedAssignment(data);
//     } catch (err) {
//       setErrorDetails("Failed to load assignment details");
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedAssignment(null);
//     setErrorDetails(null);
//     setSelectedFile(null);
//     setSubmitError(null);
//     setSubmitSuccess(null);
//     setSubmitLoading(false);
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setSubmitError(null);
//     setSubmitSuccess(null);
//   };

//   const uploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     return await AssignmentService.uploadAttachment(formData);
//   };
//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       setSubmitError("Please select a file to upload.");
//       return;
//     }

//     setSubmitLoading(true);
//     setSubmitError(null);
//     setSubmitSuccess(null);

//     try {
//       // 1. رفع الملف للباك (الذي يرفع بدوره إلى Cloudinary)
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       // استدعاء API رفع الملف
//       const uploadResponse = await AssignmentService.uploadAttachment(formData);

//       // استخراج الرابط
//       const submissionUrl = uploadResponse.attachment.secure_url;

//       // 2. تقديم الـ Assignment مع رابط الملف
//       await AssignmentService.submitAssignment(
//         selectedAssignment.id, // رقم الـ assignment
//         submissionUrl // رابط الملف المرفوع
//       );

//       setSubmitSuccess("Assignment submitted successfully!");
//       setSelectedFile(null);
//     } catch (err) {
//       console.error("Error:", err);
//       setSubmitError("Failed to submit assignment. Please try again.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3}>
//         <Typography variant="h6" color="error" align="center">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   if (assignments.length === 0) {
//     return (
//       <Box p={3}>
//         <Typography variant="h6" align="center">
//           No assignments found for this course
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//         Course Assignments
//       </Typography>

//       <Grid container spacing={3}>
//         {assignments.map((assignment) => (
//           <Grid item xs={12} sm={6} md={4} key={assignment.id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 borderLeft: `4px solid ${theme.palette.primary.main}`,
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Assignment color="primary" sx={{ mr: 1 }} />
//                   <Typography variant="h6">{assignment.title}</Typography>
//                 </Box>

//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   {assignment.description?.substring(0, 100) || ""}...
//                 </Typography>

//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Schedule color="action" sx={{ mr: 1, fontSize: 16 }} />
//                   <Typography variant="caption">
//                     Due:{" "}
//                     {assignment.due_date
//                       ? new Date(assignment.due_date).toLocaleDateString()
//                       : "N/A"}
//                   </Typography>
//                 </Box>

//                 <Box display="flex" alignItems="center">
//                   <Grade color="action" sx={{ mr: 1, fontSize: 16 }} />
//                   <Typography variant="caption">
//                     Max Score: {assignment.max_score ?? "N/A"}
//                   </Typography>
//                 </Box>
//               </CardContent>

//               <Box p={2}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => handleOpenDialog(assignment.id)}
//                   disabled={loadingDetails} // منع الفتح أثناء تحميل تفاصيل سابقة
//                 >
//                   View Assignment
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Dialog لعرض التفاصيل + رفع ملف */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Assignment Details</DialogTitle>
//         <DialogContent dividers>
//           {loadingDetails && <CircularProgress />}
//           {errorDetails && (
//             <Typography color="error" variant="body2">
//               {errorDetails}
//             </Typography>
//           )}
//           {selectedAssignment && !loadingDetails && !errorDetails && (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 {selectedAssignment.title}
//               </Typography>
//               <Typography variant="body1" paragraph>
//                 {selectedAssignment.description}
//               </Typography>
//               <Typography variant="subtitle1" gutterBottom>
//                 Max Score: {selectedAssignment.max_score}
//               </Typography>

//               <input
//                 type="file"
//                 accept=".doc,.docx,.pdf,image/*"
//                 onChange={handleFileChange}
//                 disabled={submitLoading}
//                 style={{ marginTop: 16 }}
//               />

//               {selectedFile && (
//                 <Box display="flex" alignItems="center" mt={1}>
//                   <Typography variant="body2">{selectedFile.name}</Typography>
//                   <Button
//                     size="small"
//                     onClick={() => setSelectedFile(null)}
//                     sx={{ ml: 1 }}
//                     disabled={submitLoading}
//                   >
//                     Remove
//                   </Button>
//                 </Box>
//               )}

//               {submitError && (
//                 <Alert severity="error" sx={{ mt: 2 }}>
//                   {submitError}
//                 </Alert>
//               )}

//               {submitSuccess && (
//                 <Alert severity="success" sx={{ mt: 2 }}>
//                   {submitSuccess}
//                 </Alert>
//               )}
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} disabled={submitLoading}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={submitLoading || !selectedFile}
//           >
//             {submitLoading ? "Submitting..." : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AssignmentList;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { Assignment, Schedule, Grade } from "@mui/icons-material";
import AssignmentService from "../../../../services/AssignmentService";
const AssignmentList = ({ courseId }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // ** states for submission file **
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setAssignments([]);
      return;
    }

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const assignmentsData = await AssignmentService.getAssignmentsByCourse(
          courseId
        );
        setAssignments(assignmentsData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleOpenDialog = async (id) => {
    setOpenDialog(true);
    setLoadingDetails(true);
    setErrorDetails(null);
    setSelectedFile(null);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const data = await AssignmentService.getAssignmentDetails(id);
      setSelectedAssignment(data);
    } catch (err) {
      setErrorDetails("Failed to load assignment details");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAssignment(null);
    setErrorDetails(null);
    setSelectedFile(null);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSubmitError("Please select a file to upload.");
      return;
    }

    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // 1. Upload file to backend (attachments/upload)
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await AssignmentService.uploadAttachment(formData);
      const submissionUrl = uploadResponse.attachment.secure_url;

      // 2. Submit assignment with the uploaded file URL
      await AssignmentService.submitAssignment(
        selectedAssignment.id,
        submissionUrl
      );

      setSubmitSuccess("Assignment submitted successfully!");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error:", err);
      setSubmitError("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (assignments.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6" align="center">
          No assignments found for this course
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Course Assignments
      </Typography>

      <Grid container spacing={3}>
        {assignments.map((assignment) => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Assignment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{assignment.title}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {assignment.description?.substring(0, 100) || ""}...
                </Typography>

                <Box display="flex" alignItems="center" mb={1}>
                  <Schedule color="action" sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="caption">
                    Due:{" "}
                    {assignment.due_date
                      ? new Date(assignment.due_date).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <Grade color="action" sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="caption">
                    Max Score: {assignment.max_score ?? "N/A"}
                  </Typography>
                </Box>
              </CardContent>

              <Box p={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOpenDialog(assignment.id)}
                >
                  View Assignment
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog لعرض التفاصيل + رفع ملف */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assignment Details</DialogTitle>
        <DialogContent dividers>
          {loadingDetails && <CircularProgress />}
          {errorDetails && (
            <Typography color="error" variant="body2">
              {errorDetails}
            </Typography>
          )}
          {selectedAssignment && !loadingDetails && !errorDetails && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedAssignment.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAssignment.description}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Max Score: {selectedAssignment.max_score}
              </Typography>

              <input
                type="file"
                accept=".doc,.docx,.pdf,image/*"
                onChange={handleFileChange}
                disabled={submitLoading}
                style={{ marginTop: 16 }}
              />

              {selectedFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {selectedFile.name}
                </Typography>
              )}

              {submitError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {submitError}
                </Alert>
              )}

              {submitSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {submitSuccess}
                </Alert>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitLoading || !selectedFile}
          >
            {submitLoading ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignmentList;

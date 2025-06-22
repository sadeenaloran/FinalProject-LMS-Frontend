// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Box,
// // //   Button,
// // //   CircularProgress,
// // //   Dialog,
// // //   DialogActions,
// // //   DialogContent,
// // //   DialogTitle,
// // //   IconButton,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableHead,
// // //   TableRow,
// // //   TextField,
// // //   Typography,
// // // } from "@mui/material";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteIcon from "@mui/icons-material/Delete";
// // // import CloseIcon from "@mui/icons-material/Close";

// // // import instructorService from "../../services/instructorService";

// // // const AssignmentsList = () => {
// // //   const [assignments, setAssignments] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   const [editDialogOpen, setEditDialogOpen] = useState(false);
// // //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// // //   const [currentAssignment, setCurrentAssignment] = useState(null);

// // //   const [formData, setFormData] = useState({
// // //     title: "",
// // //     description: "",
// // //     max_score: 100,
// // //   });

// // //   useEffect(() => {
// // //     fetchAssignments();
// // //   }, []);
// // //   const fetchAssignments = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const data = await instructorService.getInstructorAssignments();
// // //       setAssignments(data || []);
// // //     } catch (err) {
// // //       setError("Failed to load assignments.");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const openEditDialog = (assignment) => {
// // //     setCurrentAssignment(assignment);
// // //     setFormData({
// // //       title: assignment.title || "",
// // //       description: assignment.description || "",
// // //       max_score: assignment.max_score || 100,
// // //     });
// // //     setEditDialogOpen(true);
// // //   };

// // //   const closeEditDialog = () => {
// // //     setEditDialogOpen(false);
// // //     setCurrentAssignment(null);
// // //   };

// // //   const openDeleteDialog = (assignment) => {
// // //     setCurrentAssignment(assignment);
// // //     setDeleteDialogOpen(true);
// // //   };

// // //   const closeDeleteDialog = () => {
// // //     setDeleteDialogOpen(false);
// // //     setCurrentAssignment(null);
// // //   };

// // //   const handleFormChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleUpdate = async () => {
// // //     try {
// // //       await instructorService.updateAssignment(currentAssignment.id, formData);
// // //       await fetchAssignments();
// // //       closeEditDialog();
// // //     } catch (err) {
// // //       alert("Failed to update assignment.");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleDelete = async () => {
// // //     try {
// // //       await instructorService.deleteAssignment(currentAssignment.id);
// // //       await fetchAssignments();
// // //       closeDeleteDialog();
// // //     } catch (err) {
// // //       alert("Failed to delete assignment.");
// // //       console.error(err);
// // //     }
// // //   };

// // //   if (loading)
// // //     return (
// // //       <Box display="flex" justifyContent="center" p={4}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );

// // //   if (error)
// // //     return (
// // //       <Typography color="error" sx={{ p: 2 }}>
// // //         {error}
// // //       </Typography>
// // //     );

// // //   return (
// // //     <Box p={2}>
// // //       <Typography variant="h5" gutterBottom>
// // //         Assignments List
// // //       </Typography>

// // //       {assignments.length === 0 ? (
// // //         <Typography>No assignments found.</Typography>
// // //       ) : (
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Title</TableCell>
// // //               <TableCell>Description</TableCell>
// // //               <TableCell>Max Score</TableCell>
// // //               <TableCell>Actions</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {assignments.map((assignment) => (
// // //               <TableRow key={assignment.id || assignment._id}>
// // //                 <TableCell>{assignment.title}</TableCell>
// // //                 <TableCell>{assignment.description}</TableCell>
// // //                 <TableCell>{assignment.max_score}</TableCell>
// // //                 <TableCell>
// // //                   <IconButton onClick={() => openEditDialog(assignment)}>
// // //                     <EditIcon />
// // //                   </IconButton>
// // //                   <IconButton onClick={() => openDeleteDialog(assignment)}>
// // //                     <DeleteIcon />
// // //                   </IconButton>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       )}

// // //       {/* Edit Dialog */}
// // //       <Dialog
// // //         open={editDialogOpen}
// // //         onClose={closeEditDialog}
// // //         maxWidth="sm"
// // //         fullWidth
// // //       >
// // //         <DialogTitle>
// // //           Edit Assignment
// // //           <IconButton
// // //             aria-label="close"
// // //             onClick={closeEditDialog}
// // //             sx={{ position: "absolute", right: 8, top: 8 }}
// // //           >
// // //             <CloseIcon />
// // //           </IconButton>
// // //         </DialogTitle>
// // //         <DialogContent dividers>
// // //           <TextField
// // //             margin="normal"
// // //             label="Title"
// // //             name="title"
// // //             fullWidth
// // //             value={formData.title}
// // //             onChange={handleFormChange}
// // //           />
// // //           <TextField
// // //             margin="normal"
// // //             label="Description"
// // //             name="description"
// // //             fullWidth
// // //             multiline
// // //             rows={4}
// // //             value={formData.description}
// // //             onChange={handleFormChange}
// // //           />
// // //           <TextField
// // //             margin="normal"
// // //             label="Max Score"
// // //             name="max_score"
// // //             type="number"
// // //             fullWidth
// // //             inputProps={{ min: 1 }}
// // //             value={formData.max_score}
// // //             onChange={handleFormChange}
// // //           />
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={closeEditDialog}>Cancel</Button>
// // //           <Button variant="contained" onClick={handleUpdate}>
// // //             Save
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Delete Confirmation Dialog */}
// // //       <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
// // //         <DialogTitle>Delete Assignment</DialogTitle>
// // //         <DialogContent dividers>
// // //           <Typography>
// // //             Are you sure you want to delete the assignment:{" "}
// // //             <strong>{currentAssignment?.title}</strong>?
// // //           </Typography>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={closeDeleteDialog}>Cancel</Button>
// // //           <Button color="error" variant="contained" onClick={handleDelete}>
// // //             Delete
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // };

// // // export default AssignmentsList;
// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   CircularProgress,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   IconButton,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Typography,
// //   styled,
// //   useTheme,
// // } from "@mui/material";
// // import {
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// //   Assignment as AssignmentIcon,
// // } from "@mui/icons-material";
// // import { motion, AnimatePresence } from "framer-motion";
// // import instructorService from "../../services/instructorService";

// // Styled components for modern look
// const GlassPaper = styled(Paper)(({ theme }) => ({
//   background: `rgba(${
//     theme.palette.mode === "dark" ? "30, 30, 30" : "255, 255, 255"
//   }, 0.8)`,
//   backdropFilter: "blur(10px)",
//   borderRadius: "16px",
//   boxShadow: theme.shadows[10],
//   border: `1px solid rgba(${
//     theme.palette.mode === "dark" ? "255, 255, 255" : "0, 0, 0"
//   }, 0.1)`,
// }));

// const HoverRow = styled(TableRow)(({ theme }) => ({
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[2],
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const AssignmentsList = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [currentAssignment, setCurrentAssignment] = useState(null);
//   const theme = useTheme();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     max_score: 100,
//   });

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const fetchAssignments = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await instructorService.getInstructorAssignments();
//       setAssignments(data || []);
//     } catch (err) {
//       setError("Failed to load assignments.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openEditDialog = (assignment) => {
//     setCurrentAssignment(assignment);
//     setFormData({
//       title: assignment.title || "",
//       description: assignment.description || "",
//       max_score: assignment.max_score || 100,
//     });
//     setEditDialogOpen(true);
//   };

//   const closeEditDialog = () => {
//     setEditDialogOpen(false);
//     setCurrentAssignment(null);
//   };

//   const openDeleteDialog = (assignment) => {
//     setCurrentAssignment(assignment);
//     setDeleteDialogOpen(true);
//   };

//   const closeDeleteDialog = () => {
//     setDeleteDialogOpen(false);
//     setCurrentAssignment(null);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       await instructorService.updateAssignment(currentAssignment.id, formData);
//       await fetchAssignments();
//       closeEditDialog();
//     } catch (err) {
//       alert("Failed to update assignment.");
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await instructorService.deleteAssignment(currentAssignment.id);
//       await fetchAssignments();
//       closeDeleteDialog();
//     } catch (err) {
//       alert("Failed to delete assignment.");
//       console.error(err);
//     }
//   };

//   if (loading)
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="60vh"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//         >
//           <CircularProgress size={60} thickness={4} />
//         </motion.div>
//       </Box>
//     );

//   if (error)
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Typography
//           color="error"
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: theme.palette.error.background,
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <CloseIcon fontSize="small" />
//           {error}
//         </Typography>
//       </motion.div>
//     );

//   return (
//     <Box sx={{ p: 3 }}>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             mb: 4,
//             background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           <AssignmentIcon fontSize="large" />
//           <Typography variant="h4" component="h1" fontWeight="700">
//             Assignments
//           </Typography>
//         </Box>

//         {assignments.length === 0 ? (
//           <GlassPaper sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h6" color="textSecondary">
//               No assignments found. Create one to get started!
//             </Typography>
//           </GlassPaper>
//         ) : (
//           <TableContainer component={GlassPaper}>
//             <Table>
//               <TableHead>
//                 <TableRow
//                   sx={{ backgroundColor: theme.palette.action.selected }}
//                 >
//                   <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Max Score</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <AnimatePresence>
//                   {assignments.map((assignment) => (
//                     <motion.tr
//                       key={assignment.id || assignment._id}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <HoverRow>
//                         <TableCell>
//                           <Typography fontWeight="500">
//                             {assignment.title}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography
//                             sx={{
//                               display: "-webkit-box",
//                               WebkitLineClamp: 2,
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                             }}
//                           >
//                             {assignment.description}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Box
//                             sx={{
//                               display: "inline-block",
//                               px: 1.5,
//                               py: 0.5,
//                               borderRadius: 4,
//                               backgroundColor: theme.palette.primary.light,
//                               color: theme.palette.primary.contrastText,
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {assignment.max_score}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <IconButton
//                             onClick={() => openEditDialog(assignment)}
//                             sx={{
//                               "&:hover": {
//                                 color: theme.palette.primary.main,
//                                 transform: "scale(1.1)",
//                               },
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => openDeleteDialog(assignment)}
//                             sx={{
//                               "&:hover": {
//                                 color: theme.palette.error.main,
//                                 transform: "scale(1.1)",
//                               },
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </HoverRow>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </motion.div>

//       {/* Edit Dialog */}
//       <Dialog
//         open={editDialogOpen}
//         onClose={closeEditDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             background: `rgba(${
//               theme.palette.mode === "dark" ? "40, 40, 40" : "250, 250, 250"
//             }, 0.9)`,
//             backdropFilter: "blur(12px)",
//             boxShadow: theme.shadows[24],
//           },
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <DialogTitle
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Edit Assignment
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={closeEditDialog}
//               sx={{
//                 "&:hover": {
//                   backgroundColor: theme.palette.action.hover,
//                   transform: "rotate(90deg)",
//                   transition: "transform 0.3s ease",
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers sx={{ py: 3 }}>
//             <TextField
//               margin="normal"
//               label="Title"
//               name="title"
//               fullWidth
//               variant="outlined"
//               value={formData.title}
//               onChange={handleFormChange}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//             <TextField
//               margin="normal"
//               label="Description"
//               name="description"
//               fullWidth
//               multiline
//               rows={4}
//               variant="outlined"
//               value={formData.description}
//               onChange={handleFormChange}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//             <TextField
//               margin="normal"
//               label="Max Score"
//               name="max_score"
//               type="number"
//               fullWidth
//               variant="outlined"
//               inputProps={{ min: 1 }}
//               value={formData.max_score}
//               onChange={handleFormChange}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//           </DialogContent>
//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <Button
//               onClick={closeEditDialog}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleUpdate}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: theme.shadows[2],
//                 },
//               }}
//             >
//               Save Changes
//             </Button>
//           </DialogActions>
//         </motion.div>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={closeDeleteDialog}
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             background: `rgba(${
//               theme.palette.mode === "dark" ? "40, 40, 40" : "250, 250, 250"
//             }, 0.9)`,
//             backdropFilter: "blur(12px)",
//             boxShadow: theme.shadows[24],
//           },
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <DialogTitle
//             sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
//           >
//             <Typography variant="h6" fontWeight="bold" color="error">
//               Confirm Deletion
//             </Typography>
//           </DialogTitle>
//           <DialogContent dividers sx={{ py: 3 }}>
//             <Typography>
//               Are you sure you want to permanently delete the assignment:
//             </Typography>
//             <Typography
//               fontWeight="bold"
//               sx={{
//                 mt: 1,
//                 p: 2,
//                 backgroundColor: theme.palette.error.background,
//                 borderRadius: 2,
//                 color: theme.palette.error.main,
//               }}
//             >
//               "{currentAssignment?.title}"
//             </Typography>
//             <Typography sx={{ mt: 2, color: theme.palette.warning.main }}>
//               This action cannot be undone!
//             </Typography>
//           </DialogContent>
//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <Button
//               onClick={closeDeleteDialog}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               color="error"
//               variant="contained"
//               onClick={handleDelete}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: theme.shadows[2],
//                   backgroundColor: theme.palette.error.dark,
//                 },
//               }}
//             >
//               Delete Permanently
//             </Button>
//           </DialogActions>
//         </motion.div>
//       </Dialog>
//     </Box>
//   );
// };

// export default AssignmentsList;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Snackbar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
//   useTheme,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   Assignment as AssignmentIcon,
//   Visibility as VisibilityIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import instructorService from "../../../../services/instructorService";
// import CreateAssignmentDialog from "./CreatAssignmentDialog";

// // Styled components for modern look
// const GlassPaper = styled(Paper)(({ theme }) => ({
//   background: "#ffffff",
//   backdropFilter: "blur(10px)",
//   borderRadius: "16px",
//   boxShadow: theme.shadows[2],
//   border: "1px solid rgba(0, 0, 0, 0.1)",
// }));

// const HoverRow = styled(TableRow)(({ theme }) => ({
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[1],
//     backgroundColor: "rgba(0, 0, 0, 0.04)",
//   },
// }));

// const AssignmentsList = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [currentAssignment, setCurrentAssignment] = useState(null);
//   const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const theme = useTheme();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     max_score: 100,
//   });

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const fetchAssignments = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await instructorService.getInstructorAssignments();
//       setAssignments(data || []);
//     } catch (err) {
//       setError("Failed to load assignments.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openEditDialog = (assignment) => {
//     setCurrentAssignment(assignment);
//     setFormData({
//       title: assignment.title || "",
//       description: assignment.description || "",
//       max_score: assignment.max_score || 100,
//     });
//     setEditDialogOpen(true);
//   };

//   const closeEditDialog = () => {
//     setEditDialogOpen(false);
//     setCurrentAssignment(null);
//   };

//   const openDeleteDialog = (assignment) => {
//     setCurrentAssignment(assignment);
//     setDeleteDialogOpen(true);
//   };

//   const closeDeleteDialog = () => {
//     setDeleteDialogOpen(false);
//     setCurrentAssignment(null);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       await instructorService.updateAssignment(currentAssignment.id, formData);
//       await fetchAssignments();
//       closeEditDialog();
//     } catch (err) {
//       alert("Failed to update assignment.");
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await instructorService.deleteAssignment(currentAssignment.id);
//       await fetchAssignments();
//       closeDeleteDialog();
//     } catch (err) {
//       alert("Failed to delete assignment.");
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="60vh"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//         >
//           <CircularProgress size={60} thickness={4} />
//         </motion.div>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Typography
//           color="error"
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: "rgba(255, 0, 0, 0.1)",
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <CloseIcon fontSize="small" />
//           {error}
//         </Typography>
//       </motion.div>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 2,
//             mb: 4,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//             }}
//           >
//             <AssignmentIcon fontSize="large" color="primary" />
//             <Typography
//               variant="h4"
//               component="h1"
//               fontWeight="700"
//               color="textPrimary"
//             >
//               Assignments
//             </Typography>
//           </Box>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AssignmentIcon />}
//             onClick={() => setAssignmentDialogOpen(true)}
//           >
//             Create Assignment
//           </Button>
//         </Box>

//         <CreateAssignmentDialog
//           open={assignmentDialogOpen}
//           onClose={() => setAssignmentDialogOpen(false)}
//           onAssignmentCreated={(assignment) => {
//             setAssignments([...assignments, assignment]);
//             setSnackbarOpen(true);
//           }}
//         />

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//           message="Assignment created successfully!"
//           action={
//             <Button
//               color="primary"
//               size="small"
//               onClick={() => setSnackbarOpen(false)}
//               startIcon={<VisibilityIcon />}
//             >
//               View
//             </Button>
//           }
//         />

//         {assignments.length === 0 ? (
//           <GlassPaper sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h6" color="textSecondary">
//               No assignments found. Create one to get started!
//             </Typography>
//           </GlassPaper>
//         ) : (
//           <TableContainer component={GlassPaper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
//                   <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Max Score</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <AnimatePresence>
//                   {assignments.map((assignment) => (
//                     <motion.tr
//                       key={assignment.id || assignment._id}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <HoverRow>
//                         <TableCell>
//                           <Typography fontWeight="500">
//                             {assignment.title}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography
//                             sx={{
//                               display: "-webkit-box",
//                               WebkitLineClamp: 2,
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                             }}
//                           >
//                             {assignment.description}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Box
//                             sx={{
//                               display: "inline-block",
//                               px: 1.5,
//                               py: 0.5,
//                               borderRadius: 4,
//                               backgroundColor: "rgba(25, 118, 210, 0.1)",
//                               color: theme.palette.primary.main,
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {assignment.max_score}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <IconButton
//                             onClick={() => openEditDialog(assignment)}
//                             sx={{
//                               "&:hover": {
//                                 color: theme.palette.primary.main,
//                                 transform: "scale(1.1)",
//                               },
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => openDeleteDialog(assignment)}
//                             sx={{
//                               "&:hover": {
//                                 color: theme.palette.error.main,
//                                 transform: "scale(1.1)",
//                               },
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </HoverRow>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </motion.div>

//       {/* Edit Dialog */}
//       <Dialog
//         open={editDialogOpen}
//         onClose={closeEditDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             background: "#ffffff",
//             boxShadow: theme.shadows[10],
//           },
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <DialogTitle
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Edit Assignment
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={closeEditDialog}
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "rgba(0, 0, 0, 0.04)",
//                   transform: "rotate(90deg)",
//                   transition: "transform 0.3s ease",
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers sx={{ py: 3 }}>
//             <TextField
//               margin="normal"
//               label="Title"
//               name="title"
//               fullWidth
//               variant="outlined"
//               value={formData.title}
//               onChange={handleFormChange}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//             <TextField
//               margin="normal"
//               label="Description"
//               name="description"
//               fullWidth
//               multiline
//               rows={4}
//               variant="outlined"
//               value={formData.description}
//               onChange={handleFormChange}
//               sx={{ mb: 3 }}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//             <TextField
//               margin="normal"
//               label="Max Score"
//               name="max_score"
//               type="number"
//               fullWidth
//               variant="outlined"
//               inputProps={{ min: 1 }}
//               value={formData.max_score}
//               onChange={handleFormChange}
//               InputProps={{
//                 sx: { borderRadius: 2 },
//               }}
//             />
//           </DialogContent>
//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: "1px solid rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Button
//               onClick={closeEditDialog}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUpdate}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: theme.shadows[1],
//                 },
//               }}
//             >
//               Save Changes
//             </Button>
//           </DialogActions>
//         </motion.div>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={closeDeleteDialog}
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             background: "#ffffff",
//             boxShadow: theme.shadows[10],
//           },
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <DialogTitle sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
//             <Typography variant="h6" fontWeight="bold" color="error">
//               Confirm Deletion
//             </Typography>
//           </DialogTitle>
//           <DialogContent dividers sx={{ py: 3 }}>
//             <Typography>
//               Are you sure you want to permanently delete the assignment:
//             </Typography>
//             <Typography
//               fontWeight="bold"
//               sx={{
//                 mt: 1,
//                 p: 2,
//                 backgroundColor: "rgba(255, 0, 0, 0.1)",
//                 borderRadius: 2,
//                 color: theme.palette.error.main,
//               }}
//             >
//               "{currentAssignment?.title}"
//             </Typography>
//             <Typography sx={{ mt: 2, color: theme.palette.warning.main }}>
//               This action cannot be undone!
//             </Typography>
//           </DialogContent>
//           <DialogActions
//             sx={{
//               px: 3,
//               py: 2,
//               borderTop: "1px solid rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Button
//               onClick={closeDeleteDialog}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               color="error"
//               variant="contained"
//               onClick={handleDelete}
//               sx={{
//                 px: 3,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 boxShadow: "none",
//                 "&:hover": {
//                   boxShadow: theme.shadows[1],
//                   backgroundColor: theme.palette.error.dark,
//                 },
//               }}
//             >
//               Delete Permanently
//             </Button>
//           </DialogActions>
//         </motion.div>
//       </Dialog>
//     </Box>
//   );
// };

// export default AssignmentsList;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  useTheme,
  Chip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  Visibility as VisibilityIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  StarOutline as StarOutlineIcon,
  Score as ScoreIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import instructorService from "../../../../services/instructorService";
import CreateAssignmentDialog from "./CreatAssignmentDialog";

// Enhanced styled components with modern effects
const GlassPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light' 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'rgba(30, 41, 59, 0.8)',
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(26, 140, 240, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)'}`,
  overflow: "hidden",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)'
    : 'linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)',
  color: '#FFFFFF',
  fontWeight: 600,
  padding: '10px 24px',
  borderRadius: '12px',
  boxShadow: 'none',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #1565C0 0%, #1A8CF0 100%)'
      : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
  },
}));

const HoverRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.3s ease",
  '& td': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' 
      ? 'rgba(26, 140, 240, 0.1)' 
      : 'rgba(255, 255, 255, 0.1)'}`,
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
    background: theme.palette.mode === 'light'
      ? 'rgba(26, 140, 240, 0.04)'
      : 'rgba(26, 140, 240, 0.1)',
    '& td': {
      borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
  },
}));

const ScoreBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10,
    top: 15,
    padding: '0 8px',
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)'
      : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    color: theme.palette.getContrastText(theme.palette.warning.main),
    fontWeight: 'bold',
    borderRadius: '12px',
    boxShadow: theme.shadows[1],
  },
}));

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    max_score: 100,
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await instructorService.getInstructorAssignments();
      setAssignments(data || []);
    } catch (err) {
      setError("Failed to load assignments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (assignment) => {
    setCurrentAssignment(assignment);
    setFormData({
      title: assignment.title || "",
      description: assignment.description || "",
      max_score: assignment.max_score || 100,
    });
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentAssignment(null);
  };

  const openDeleteDialog = (assignment) => {
    setCurrentAssignment(assignment);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCurrentAssignment(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await instructorService.updateAssignment(currentAssignment.id, formData);
      await fetchAssignments();
      closeEditDialog();
    } catch (err) {
      alert("Failed to update assignment.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await instructorService.deleteAssignment(currentAssignment.id);
      await fetchAssignments();
      closeDeleteDialog();
    } catch (err) {
      alert("Failed to delete assignment.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        
          <CircularProgress 
            size={80} 
            thickness={4} 
            sx={{ 
              color: theme.palette.primary.main,
              filter: `drop-shadow(0 0 8px ${theme.palette.primary.light})`
            }} 
          />
      </Box>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassPaper sx={{ p: 2, mb: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            p={2}
            borderRadius={2}
            sx={{
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(211, 47, 47, 0.2) 100%)',
              borderLeft: `4px solid ${theme.palette.error.main}`,
            }}
          >
            <CloseIcon color="error" />
            <Typography color="error" fontWeight="500">
              {error}
            </Typography>
          </Box>
        </GlassPaper>
      </motion.div>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassPaper sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)'
                    : 'linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)',
                  boxShadow: theme.shadows[2],
                }}
              >
                <AssignmentIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="700"
                  color="textPrimary"
                >
                  Assignments
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <StarOutlineIcon fontSize="small" />
                  {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'} created
                </Typography>
              </Box>
            </Box>
            <GradientButton
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setAssignmentDialogOpen(true)}
            >
              New Assignment
            </GradientButton>
          </Box>
        </GlassPaper>

        <CreateAssignmentDialog
          open={assignmentDialogOpen}
          onClose={() => setAssignmentDialogOpen(false)}
          onAssignmentCreated={(assignment) => {
            setAssignments([...assignments, assignment]);
            setSnackbarOpen(true);
          }}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 6 }}
        >
          <GlassPaper>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(56, 142, 60, 0.2) 100%)',
                borderLeft: `4px solid ${theme.palette.success.main}`,
              }}
            >
              <Box sx={{ mr: 2 }}>
                <AssignmentIcon color="success" />
              </Box>
              <Box>
                <Typography fontWeight="500">Assignment created successfully!</Typography>
                <Typography variant="body2" color="textSecondary">
                  Students can now view and submit their work.
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => setSnackbarOpen(false)}
                sx={{ ml: 2 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </GlassPaper>
        </Snackbar>

        {assignments.length === 0 ? (
          <GlassPaper 
            sx={{ 
              p: 6, 
              textAlign: "center",
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
            }}
          >
            <Box
              component={motion.div}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{ mb: 3 }}
            >
              <AssignmentIcon
                sx={{
                  fontSize: 80,
                  opacity: 0.7,
                  color: theme.palette.text.disabled,
                }}
              />
            </Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No assignments found
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Create your first assignment to get started
            </Typography>
            <GradientButton
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setAssignmentDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Create Assignment
            </GradientButton>
          </GlassPaper>
        ) : (
          <TableContainer component={GlassPaper}>
            <Table>
              <TableHead>
                <TableRow 
                  sx={{ 
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, rgba(26, 140, 240, 0.1) 0%, rgba(77, 171, 245, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(26, 140, 240, 0.2) 0%, rgba(21, 101, 192, 0.2) 100%)',
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", fontSize: '1rem' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '1rem' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '1rem' }}>Max Score</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: '1rem' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {assignments.map((assignment) => (
                    <motion.tr
                      key={assignment.id || assignment._id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HoverRow>
                        <TableCell>
                          <Typography fontWeight="600">
                            {assignment.title}
                          </Typography>
                          <Chip
                            label="Active"
                            size="small"
                            sx={{
                              mt: 1,
                              background: theme.palette.mode === 'light'
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(76, 175, 80, 0.2)',
                              color: theme.palette.success.main,
                              fontWeight: '500',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {assignment.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <ScoreBadge badgeContent={assignment.max_score} color="primary">
                            <ScoreIcon 
                              sx={{ 
                                fontSize: 32,
                                color: theme.palette.mode === 'light'
                                  ? theme.palette.primary.main
                                  : theme.palette.primary.light,
                              }} 
                            />
                          </ScoreBadge>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              onClick={() => openEditDialog(assignment)}
                              sx={{
                                background: theme.palette.mode === 'light'
                                  ? 'rgba(26, 140, 240, 0.1)'
                                  : 'rgba(26, 140, 240, 0.2)',
                                '&:hover': {
                                  background: theme.palette.primary.main,
                                  color: '#fff',
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => openDeleteDialog(assignment)}
                              sx={{
                                background: theme.palette.mode === 'light'
                                  ? 'rgba(244, 67, 54, 0.1)'
                                  : 'rgba(244, 67, 54, 0.2)',
                                '&:hover': {
                                  background: theme.palette.error.main,
                                  color: '#fff',
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </HoverRow>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth
        PaperComponent={GlassPaper}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(26, 140, 240, 0.1) 0%, rgba(77, 171, 245, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(26, 140, 240, 0.2) 0%, rgba(21, 101, 192, 0.2) 100%)',
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Edit Assignment
            </Typography>
            <IconButton
              aria-label="close"
              onClick={closeEditDialog}
              sx={{
                '&:hover': {
                  background: theme.palette.action.hover,
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ py: 3 }}>
            <TextField
              margin="normal"
              label="Title"
              name="title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleFormChange}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                },
              }}
            />
            <TextField
              margin="normal"
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={handleFormChange}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                },
              }}
            />
            <TextField
              margin="normal"
              label="Max Score"
              name="max_score"
              type="number"
              fullWidth
              variant="outlined"
              inputProps={{ min: 1 }}
              value={formData.max_score}
              onChange={handleFormChange}
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                },
                startAdornment: (
                  <ScoreIcon 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      mr: 1,
                    }} 
                  />
                ),
              }}
            />
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              onClick={closeEditDialog}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                color: theme.palette.text.secondary,
              }}
            >
              Cancel
            </Button>
            <GradientButton
              onClick={handleUpdate}
              sx={{ px: 3 }}
            >
              Save Changes
            </GradientButton>
          </DialogActions>
        </motion.div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperComponent={GlassPaper}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogTitle 
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(211, 47, 47, 0.2) 100%)',
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <DeleteIcon color="error" />
              <Typography variant="h6" fontWeight="bold" color="error">
                Confirm Deletion
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers sx={{ py: 3 }}>
            <Typography>
              Are you sure you want to permanently delete this assignment?
            </Typography>
            <GlassPaper
              sx={{
                mt: 2,
                p: 2,
                borderLeft: `4px solid ${theme.palette.error.main}`,
                background: theme.palette.mode === 'light'
                  ? 'rgba(244, 67, 54, 0.05)'
                  : 'rgba(244, 67, 54, 0.1)',
              }}
            >
              <Typography fontWeight="600" color={theme.palette.error.main}>
                {currentAssignment?.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Max score: {currentAssignment?.max_score}
              </Typography>
            </GlassPaper>
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                background: theme.palette.mode === 'light'
                  ? 'rgba(255, 214, 0, 0.1)'
                  : 'rgba(255, 214, 0, 0.2)',
                borderLeft: `4px solid ${theme.palette.warning.main}`,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                <strong>Warning:</strong> This action cannot be undone! All student submissions for this assignment will also be deleted.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              onClick={closeDeleteDialog}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                color: theme.palette.text.secondary,
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 'none',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)'
                  : 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)',
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'
                    : 'linear-gradient(135deg, #B71C1C 0%, #8E0E0E 100%)',
                },
              }}
            >
              Delete Permanently
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default AssignmentsList;
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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import instructorService from "../../../../services/instructorService";
import CreateAssignmentDialog from "./CreatAssignmentDialog";

// Styled components for modern look
const GlassPaper = styled(Paper)(({ theme }) => ({
  background: "#ffffff",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: theme.shadows[2],
  border: "1px solid rgba(0, 0, 0, 0.1)",
}));

const HoverRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[1],
    backgroundColor: "rgba(0, 0, 0, 0.04)",
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CircularProgress size={60} thickness={4} />
        </motion.div>
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
        <Typography
          color="error"
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CloseIcon fontSize="small" />
          {error}
        </Typography>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AssignmentIcon fontSize="large" color="primary" />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="700"
              color="textPrimary"
            >
              Assignments
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AssignmentIcon />}
            onClick={() => setAssignmentDialogOpen(true)}
          >
            Create Assignment
          </Button>
        </Box>

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
          message="Assignment created successfully!"
          action={
            <Button
              color="primary"
              size="small"
              onClick={() => setSnackbarOpen(false)}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          }
        />

        {assignments.length === 0 ? (
          <GlassPaper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              No assignments found. Create one to get started!
            </Typography>
          </GlassPaper>
        ) : (
          <TableContainer component={GlassPaper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Max Score</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
                          <Typography fontWeight="500">
                            {assignment.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {assignment.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 4,
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                              color: theme.palette.primary.main,
                              fontWeight: "bold",
                            }}
                          >
                            {assignment.max_score}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => openEditDialog(assignment)}
                            sx={{
                              "&:hover": {
                                color: theme.palette.primary.main,
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => openDeleteDialog(assignment)}
                            sx={{
                              "&:hover": {
                                color: theme.palette.error.main,
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
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
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: theme.shadows[10],
          },
        }}
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
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Edit Assignment
            </Typography>
            <IconButton
              aria-label="close"
              onClick={closeEditDialog}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  transform: "rotate(90deg)",
                  transition: "transform 0.3s ease",
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
                sx: { borderRadius: 2 },
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
                sx: { borderRadius: 2 },
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
                sx: { borderRadius: 2 },
              }}
            />
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              onClick={closeEditDialog}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: theme.shadows[1],
                },
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogTitle sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h6" fontWeight="bold" color="error">
              Confirm Deletion
            </Typography>
          </DialogTitle>
          <DialogContent dividers sx={{ py: 3 }}>
            <Typography>
              Are you sure you want to permanently delete the assignment:
            </Typography>
            <Typography
              fontWeight="bold"
              sx={{
                mt: 1,
                p: 2,
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: 2,
                color: theme.palette.error.main,
              }}
            >
              "{currentAssignment?.title}"
            </Typography>
            <Typography sx={{ mt: 2, color: theme.palette.warning.main }}>
              This action cannot be undone!
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              onClick={closeDeleteDialog}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              sx={{
                px: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: theme.shadows[1],
                  backgroundColor: theme.palette.error.dark,
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

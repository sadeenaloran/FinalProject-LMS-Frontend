// // src/components/instructor/ModuleList.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Button,
//   IconButton,
//   Collapse,
//   CircularProgress,
// } from "@mui/material";
// import {
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   VideoLibrary as LessonIcon,
// } from "@mui/icons-material";
// import InstructorService from "../../services/instructorService";
// import { useParams, useNavigate } from "react-router-dom";

// const ModuleList = ({ courseId }) => {
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedModule, setExpandedModule] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         setLoading(true);
//         const data = await InstructorService.getModulesByCourse(courseId);
//         setModules(data);
//       } catch (error) {
//         console.error("Failed to fetch modules:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchModules();
//   }, [courseId]);

//   const handleDeleteModule = async (moduleId) => {
//     try {
//       await InstructorService.deleteModule(moduleId);
//       setModules(modules.filter((module) => module.id !== moduleId));
//     } catch (error) {
//       console.error("Failed to delete module:", error);
//     }
//   };

//   const toggleModuleExpand = (moduleId) => {
//     setExpandedModule(expandedModule === moduleId ? null : moduleId);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" my={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h6">Course Modules</Typography>
//         <Button
//           variant="contained"
//           size="small"
//           startIcon={<AddIcon />}
//           onClick={() =>
//             navigate(`/instructor/courses/${courseId}/modules/new`)
//           }
//         >
//           Add Module
//         </Button>
//       </Box>

//       {modules.length === 0 ? (
//         <Paper sx={{ p: 3, textAlign: "center" }}>
//           <Typography variant="body1">No modules created yet</Typography>
//           <Button
//             variant="outlined"
//             sx={{ mt: 2 }}
//             startIcon={<AddIcon />}
//             onClick={() =>
//               navigate(`/instructor/courses/${courseId}/modules/new`)
//             }
//           >
//             Create First Module
//           </Button>
//         </Paper>
//       ) : (
//         <List component="nav">
//           {modules.map((module) => (
//             <Paper key={module._id} sx={{ mb: 2 }}>
//               <ListItem
//                 secondaryAction={
//                   <Box>
//                     <IconButton
//                       edge="end"
//                       onClick={() =>
//                         navigate(`/instructor/modules/${module._id}/edit`)
//                       }
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       edge="end"
//                       onClick={() => handleDeleteModule(module._id)}
//                       color="error"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Box>
//                 }
//               >
//                 <ListItemText
//                   primary={module.title}
//                   secondary={`Duration: ${module.duration} hours | Order: ${module.order}`}
//                 />
//                 <IconButton onClick={() => toggleModuleExpand(module._id)}>
//                   {expandedModule === module._id ? (
//                     <ExpandLessIcon />
//                   ) : (
//                     <ExpandMoreIcon />
//                   )}
//                 </IconButton>
//               </ListItem>

//               <Collapse
//                 in={expandedModule === module._id}
//                 timeout="auto"
//                 unmountOnExit
//               >
//                 <Divider />
//                 <Box sx={{ p: 2 }}>
//                   <Typography variant="body2" paragraph>
//                     {module.description}
//                   </Typography>

//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography variant="subtitle2">Lessons</Typography>
//                     <Button
//                       size="small"
//                       startIcon={<AddIcon />}
//                       onClick={() =>
//                         navigate(
//                           `/instructor/modules/${module._id}/lessons/new`
//                         )
//                       }
//                     >
//                       Add Lesson
//                     </Button>
//                   </Box>

//                   {/* Implement lesson list here */}
//                 </Box>
//               </Collapse>
//             </Paper>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };

// export default ModuleList;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";

const ModuleDetails = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState({
    open: false,
    lesson: null,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    lessonId: null,
  });
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);

        // لو مش موجود getModuleById في الباكند نحذف الاستدعاء التالي:
        // const moduleResponse = await InstructorService.getModuleById(moduleId);
        // setModule(moduleResponse);

        // نعمل مجرد تخزين مؤقت للموديل فارغ مثلاً أو بجزء من البيانات اذا متوفر
        setModule({
          title: "Module Title Placeholder",
          description: "No description available.",
        });

        // جلب الدروس فقط
        const lessonsResponse = await InstructorService.getLessonsByModule(
          moduleId
        );
        setLessons(lessonsResponse.data || []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [moduleId]);

  // useEffect(() => {
  //   const fetchModuleAndLessons = async () => {
  //     try {
  //       setLoading(true);
  //       // Fetch module details
  //       const moduleResponse = await InstructorService.getModuleById(moduleId);
  //       setModule(moduleResponse);

  //       // Fetch lessons for this module
  //       const lessonsResponse = await InstructorService.getLessonsByModule(
  //         moduleId
  //       );
  //       setLessons(lessonsResponse.data || []);
  //     } catch (error) {
  //       console.error("Error fetching module details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchModuleAndLessons();
  // }, [moduleId]);

  const handleEditLesson = (lesson) => {
    setEditDialog({ open: true, lesson });
  };

  const handleDeleteLesson = (lessonId) => {
    setDeleteDialog({ open: true, lessonId });
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      const updatedLesson = await InstructorService.updateLesson(
        editDialog.lesson._id,
        editDialog.lesson
      );

      setLessons(
        lessons.map((lesson) =>
          lesson._id === updatedLesson._id ? updatedLesson : lesson
        )
      );
      setEditDialog({ open: false, lesson: null });
    } catch (error) {
      console.error("Error updating lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await InstructorService.deleteLesson(deleteDialog.lessonId);
      setLessons(
        lessons.filter((lesson) => lesson._id !== deleteDialog.lessonId)
      );
      setDeleteDialog({ open: false, lessonId: null });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewLesson = () => {
    navigate(`/modules/${moduleId}/lessons/new`);
  };

  const handleBackToCourse = () => {
    if (module?.course_id) {
      navigate(`/instructor/courses/${module.course_id}`);
    } else {
      navigate(-1); // Fallback to previous page
    }
  };

  if (loading && !module) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!module) {
    return (
      <Box p={3}>
        <Typography variant="h6">Module not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={handleBackToCourse} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{module.title}</Typography>
      </Box>

      <Typography variant="body1" paragraph>
        {module.description}
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Lessons</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewLesson}
        >
          Add Lesson
        </Button>
      </Box>

      {lessons.length === 0 ? (
        <Typography>No lessons in this module</Typography>
      ) : (
        <Paper elevation={2}>
          <List>
            {lessons.map((lesson, index) => (
              <React.Fragment key={lesson._id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditLesson(lesson)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteLesson(lesson._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={lesson.title}
                    secondary={`Type: ${lesson.content_type} | Duration: ${lesson.duration} minutes`}
                  />
                </ListItem>
                {index < lessons.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Edit Lesson Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, lesson: null })}
      >
        <DialogTitle>Edit Lesson</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={editDialog.lesson?.title || ""}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                lesson: { ...editDialog.lesson, title: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="standard"
            value={editDialog.lesson?.duration || 0}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                lesson: { ...editDialog.lesson, duration: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            label="Content URL"
            fullWidth
            variant="standard"
            value={editDialog.lesson?.content_url || ""}
            onChange={(e) =>
              setEditDialog({
                ...editDialog,
                lesson: { ...editDialog.lesson, content_url: e.target.value },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, lesson: null })}>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, lessonId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this lesson?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, lessonId: null })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModuleDetails;

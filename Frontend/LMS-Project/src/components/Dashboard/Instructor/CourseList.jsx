// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Chip,
//   CircularProgress,
//   MenuItem,
//   Paper,
//   TextField,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Divider,
//   IconButton,
//   Tooltip,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Collapse,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Search as SearchIcon,
//   Visibility as VisibilityIcon,
//   Category as CategoryIcon,
//   MenuBook as MenuBookIcon,
//   Class as ClassIcon,
//   ExpandMore as ExpandMoreIcon,
// } from "@mui/icons-material";
// import { useSnackbar } from "notistack";
// import InstructorService from "../../../services/instructorService";
// import { lightBlue, orange, grey } from "@mui/material/colors";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [expandedModules, setExpandedModules] = useState({});
//   const [newModuleName, setNewModuleName] = useState("");
//   const [newLessonName, setNewLessonName] = useState("");
//   const [addingModuleToCourse, setAddingModuleToCourse] = useState(null);
//   const [addingLessonToModule, setAddingLessonToModule] = useState(null);
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [categoriesData, coursesData] = await Promise.all([
//           InstructorService.getAllCategories(),
//           InstructorService.getCourses(),
//         ]);

//         setCategories(categoriesData || []);

//         const coursesWithDetails = await Promise.all(
//           coursesData.map(async (course) => {
//             try {
//               const modules = await InstructorService.getModulesByCourse(
//                 course.id
//               );

//               const modulesWithLessons = await Promise.all(
//                 modules.map(async (module) => {
//                   try {
//                     const lessons = await InstructorService.getLessonsByModule(
//                       module.id
//                     );
//                     return { ...module, lessons };
//                   } catch (error) {
//                     console.error(
//                       `Error fetching lessons for module ${module.id}:`,
//                       error
//                     );
//                     return { ...module, lessons: [] };
//                   }
//                 })
//               );

//               return { ...course, modules: modulesWithLessons };
//             } catch (error) {
//               console.error(
//                 `Error fetching modules for course ${course.id}:`,
//                 error
//               );
//               return { ...course, modules: [] };
//             }
//           })
//         );

//         setCourses(coursesWithDetails);
//       } catch (error) {
//         console.error("Error loading data:", error);
//         enqueueSnackbar("Failed to load data", { variant: "error" });
//         setCourses([]);
//         setCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [enqueueSnackbar]);

//   const handleDelete = async (courseId) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await InstructorService.deleteCourse(courseId);
//         enqueueSnackbar("Course deleted successfully", { variant: "success" });
//         setCourses((prev) => prev.filter((c) => c.id !== courseId));
//       } catch (error) {
//         enqueueSnackbar(
//           error.response?.data?.message || "Failed to delete course",
//           { variant: "error" }
//         );
//       }
//     }
//   };

//   const openCourseViewDialog = (course) => {
//     setSelectedCourse(course);
//     setViewDialogOpen(true);
//   };

//   const openCourseEditDialog = (course) => {
//     setEditingCourse({ ...course });
//     setEditDialogOpen(true);
//   };

//   const closeCourseEditDialog = () => {
//     setEditingCourse(null);
//     setEditDialogOpen(false);
//   };

//   const closeCourseViewDialog = () => {
//     setSelectedCourse(null);
//     setViewDialogOpen(false);
//     setAddingModuleToCourse(null);
//     setAddingLessonToModule(null);
//   };

//   const handleSaveCourse = async () => {
//     try {
//       const updatedCourse = {
//         ...editingCourse,
//         status: "pending", // Automatically set to pending on edit
//       };

//       await InstructorService.updateCourse(editingCourse.id, updatedCourse);
//       enqueueSnackbar(
//         "Course updated successfully. Waiting for admin approval.",
//         {
//           variant: "success",
//         }
//       );

//       setCourses((prev) =>
//         prev.map((c) => (c.id === editingCourse.id ? updatedCourse : c))
//       );
//       closeCourseEditDialog();
//     } catch (error) {
//       enqueueSnackbar(
//         error.response?.data?.message || "Failed to update course",
//         { variant: "error" }
//       );
//     }
//   };

//   const toggleModuleExpansion = (moduleId) => {
//     setExpandedModules((prev) => ({
//       ...prev,
//       [moduleId]: !prev[moduleId],
//     }));
//   };

//   const handleAddModule = async () => {
//     if (!newModuleName.trim()) {
//       enqueueSnackbar("Module name cannot be empty", { variant: "warning" });
//       return;
//     }

//     try {
//       const newModule = await InstructorService.createModule(
//         addingModuleToCourse,
//         {
//           name: newModuleName,
//           course_id: addingModuleToCourse,
//         }
//       );

//       enqueueSnackbar("Module added successfully", { variant: "success" });

//       setCourses((prev) =>
//         prev.map((course) =>
//           course.id === addingModuleToCourse
//             ? {
//                 ...course,
//                 modules: [...course.modules, { ...newModule, lessons: [] }],
//               }
//             : course
//         )
//       );

//       setNewModuleName("");
//       setAddingModuleToCourse(null);
//     } catch (error) {
//       enqueueSnackbar(error.response?.data?.message || "Failed to add module", {
//         variant: "error",
//       });
//     }
//   };

//   const handleAddLesson = async () => {
//     if (!newLessonName.trim()) {
//       enqueueSnackbar("Lesson name cannot be empty", { variant: "warning" });
//       return;
//     }

//     try {
//       const newLesson = await InstructorService.createLesson({
//         module_id: addingLessonToModule,
//         title: newLessonName,
//         content: "New lesson content", // Required field
//       });

//       enqueueSnackbar("Lesson added successfully", { variant: "success" });

//       setCourses((prev) =>
//         prev.map((course) => ({
//           ...course,
//           modules: course.modules.map((module) =>
//             module.id === addingLessonToModule
//               ? {
//                   ...module,
//                   lessons: [...module.lessons, newLesson],
//                 }
//               : module
//           ),
//         }))
//       );

//       setNewLessonName("");
//       setAddingLessonToModule(null);
//     } catch (error) {
//       enqueueSnackbar(error.response?.data?.message || "Failed to add lesson", {
//         variant: "error",
//       });
//     }
//   };

//   const handleDeleteModule = async (courseId, moduleId) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this module and all its lessons?"
//       )
//     ) {
//       try {
//         await InstructorService.deleteModule(moduleId);
//         enqueueSnackbar("Module deleted successfully", { variant: "success" });

//         setCourses((prev) =>
//           prev.map((course) =>
//             course.id === courseId
//               ? {
//                   ...course,
//                   modules: course.modules.filter(
//                     (module) => module.id !== moduleId
//                   ),
//                 }
//               : course
//           )
//         );
//       } catch (error) {
//         enqueueSnackbar(
//           error.response?.data?.message || "Failed to delete module",
//           { variant: "error" }
//         );
//       }
//     }
//   };

//   const handleDeleteLesson = async (moduleId, lessonId) => {
//     if (window.confirm("Are you sure you want to delete this lesson?")) {
//       try {
//         await InstructorService.deleteLesson(lessonId);
//         enqueueSnackbar("Lesson deleted successfully", { variant: "success" });

//         setCourses((prev) =>
//           prev.map((course) => ({
//             ...course,
//             modules: course.modules.map((module) =>
//               module.id === moduleId
//                 ? {
//                     ...module,
//                     lessons: module.lessons.filter(
//                       (lesson) => lesson.id !== lessonId
//                     ),
//                   }
//                 : module
//             ),
//           }))
//         );
//       } catch (error) {
//         enqueueSnackbar(
//           error.response?.data?.message || "Failed to delete lesson",
//           { variant: "error" }
//         );
//       }
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "published":
//         return "success";
//       case "draft":
//         return "warning";
//       case "pending":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const filteredCourses = courses.filter((course) => {
//     const matchesSearch = course.title
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       !selectedCategory || course.category_id === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="200px"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: grey[50] }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={3}
//         >
//           <Typography variant="h4" component="h1" color="primary">
//             My Courses
//           </Typography>

//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             href="/instructor/courses/new"
//             sx={{
//               bgcolor: lightBlue[600],
//               "&:hover": { bgcolor: lightBlue[700] },
//             }}
//           >
//             New Course
//           </Button>
//         </Box>

//         <Grid container spacing={2} alignItems="center" mb={3}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               size="small"
//               placeholder="Search courses..."
//               InputProps={{
//                 startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
//               }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ bgcolor: "background.paper" }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               select
//               fullWidth
//               label="Filter by category"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               size="small"
//               sx={{ bgcolor: "background.paper" }}
//             >
//               <MenuItem value="">All Categories</MenuItem>
//               {categories?.map((category) => (
//                 <MenuItem key={category._id} value={category._id}>
//                   {category.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//         </Grid>
//       </Paper>

//       {filteredCourses.length === 0 ? (
//         <Paper
//           elevation={0}
//           sx={{ p: 4, textAlign: "center", bgcolor: grey[50] }}
//         >
//           <Typography variant="h6" color="textSecondary">
//             No courses found. Create your first course to get started!
//           </Typography>
//         </Paper>
//       ) : (
//         <Grid container spacing={3}>
//           {filteredCourses.map((course) => (
//             <Grid item xs={12} md={6} lg={4} key={course.id}>
//               <Card
//                 elevation={2}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   transition: "transform 0.2s",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="flex-start"
//                     mb={2}
//                   >
//                     <Typography variant="h6" component="h3" gutterBottom>
//                       {course.title}
//                     </Typography>
//                     <Chip
//                       label={course.status}
//                       color={getStatusColor(course.status)}
//                       size="small"
//                     />
//                   </Box>

//                   <Typography variant="body2" color="text.secondary" mb={2}>
//                     {course.description?.substring(0, 100) ||
//                       "No description available."}
//                     {course.description?.length > 100 && "..."}
//                   </Typography>

//                   <Divider sx={{ my: 2 }} />

//                   <Box display="flex" alignItems="center" mb={1}>
//                     <CategoryIcon
//                       fontSize="small"
//                       color="action"
//                       sx={{ mr: 1 }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       {categories.find((c) => c._id === course.category_id)
//                         ?.name || "Uncategorized"}
//                     </Typography>
//                   </Box>

//                   <Box display="flex" alignItems="center" mb={1}>
//                     <MenuBookIcon
//                       fontSize="small"
//                       color="action"
//                       sx={{ mr: 1 }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       {course.modules?.length || 0} Modules
//                     </Typography>
//                   </Box>

//                   <Box display="flex" alignItems="center">
//                     <ClassIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//                     <Typography variant="body2" color="text.secondary">
//                       {course.modules?.reduce(
//                         (acc, module) => acc + (module.lessons?.length || 0),
//                         0
//                       )}{" "}
//                       Lessons
//                     </Typography>
//                   </Box>
//                 </CardContent>

//                 <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
//                   <Tooltip title="View Course">
//                     <IconButton
//                       onClick={() => openCourseViewDialog(course)}
//                       size="small"
//                       sx={{ color: lightBlue[600] }}
//                     >
//                       <VisibilityIcon />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Edit Course">
//                     <IconButton
//                       onClick={() => openCourseEditDialog(course)}
//                       size="small"
//                       sx={{ color: orange[600] }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Course">
//                     <IconButton
//                       onClick={() => handleDelete(course.id)}
//                       size="small"
//                       sx={{ color: "error.main" }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* View Course Dialog */}
//       <Dialog
//         open={viewDialogOpen}
//         onClose={closeCourseViewDialog}
//         maxWidth="md"
//         fullWidth
//         scroll="paper"
//       >
//         <DialogTitle>
//           {selectedCourse?.title}
//           <Chip
//             label={selectedCourse?.status}
//             color={getStatusColor(selectedCourse?.status)}
//             size="small"
//             sx={{ ml: 2 }}
//           />
//         </DialogTitle>
//         <DialogContent dividers>
//           <Typography variant="body1" paragraph>
//             {selectedCourse?.description}
//           </Typography>

//           <Box display="flex" alignItems="center" mb={2}>
//             <CategoryIcon fontSize="small" color="action" sx={{ mr: 1 }} />
//             <Typography variant="body2" color="text.secondary">
//               Category:{" "}
//               {categories.find((c) => c._id === selectedCourse?.category_id)
//                 ?.name || "Uncategorized"}
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="h6" gutterBottom>
//             Course Modules
//           </Typography>

//           {selectedCourse?.modules?.length === 0 ? (
//             <Typography variant="body2" color="text.secondary">
//               No modules added yet.
//             </Typography>
//           ) : (
//             <List>
//               {selectedCourse?.modules?.map((module) => (
//                 <Accordion
//                   key={module.id}
//                   expanded={expandedModules[module.id] || false}
//                   onChange={() => toggleModuleExpansion(module.id)}
//                 >
//                   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="space-between"
//                       width="100%"
//                     >
//                       <Typography>{module.name}</Typography>
//                       <Chip
//                         label={`${module.lessons?.length || 0} lessons`}
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {module.lessons?.length === 0 ? (
//                       <Typography variant="body2" color="text.secondary">
//                         No lessons in this module.
//                       </Typography>
//                     ) : (
//                       <List>
//                         {module.lessons?.map((lesson) => (
//                           <ListItem key={lesson.id}>
//                             <ListItemText primary={lesson.title} />
//                             <ListItemSecondaryAction>
//                               <IconButton
//                                 edge="end"
//                                 aria-label="delete"
//                                 onClick={() =>
//                                   handleDeleteLesson(module.id, lesson.id)
//                                 }
//                                 color="error"
//                                 size="small"
//                               >
//                                 <DeleteIcon />
//                               </IconButton>
//                             </ListItemSecondaryAction>
//                           </ListItem>
//                         ))}
//                       </List>
//                     )}
//                     {addingLessonToModule === module.id && (
//                       <Box mt={2} display="flex" alignItems="center">
//                         <TextField
//                           fullWidth
//                           size="small"
//                           label="New Lesson Title"
//                           value={newLessonName}
//                           onChange={(e) => setNewLessonName(e.target.value)}
//                           sx={{ mr: 1 }}
//                         />
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={handleAddLesson}
//                         >
//                           Add
//                         </Button>
//                         <Button
//                           size="small"
//                           sx={{ ml: 1 }}
//                           onClick={() => setAddingLessonToModule(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     )}
//                     <Button
//                       startIcon={<AddIcon />}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       onClick={() => setAddingLessonToModule(module.id)}
//                     >
//                       Add Lesson
//                     </Button>
//                   </AccordionDetails>
//                   <Divider />
//                   <Box display="flex" justifyContent="flex-end" p={1}>
//                     <Button
//                       startIcon={<DeleteIcon />}
//                       size="small"
//                       color="error"
//                       onClick={() =>
//                         handleDeleteModule(selectedCourse.id, module.id)
//                       }
//                     >
//                       Delete Module
//                     </Button>
//                   </Box>
//                 </Accordion>
//               ))}
//             </List>
//           )}

//           {addingModuleToCourse === selectedCourse?.id && (
//             <Box mt={2} display="flex" alignItems="center">
//               <TextField
//                 fullWidth
//                 size="small"
//                 label="New Module Name"
//                 value={newModuleName}
//                 onChange={(e) => setNewModuleName(e.target.value)}
//                 sx={{ mr: 1 }}
//               />
//               <Button
//                 variant="contained"
//                 size="small"
//                 onClick={handleAddModule}
//               >
//                 Add
//               </Button>
//               <Button
//                 size="small"
//                 sx={{ ml: 1 }}
//                 onClick={() => setAddingModuleToCourse(null)}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           )}

//           <Button
//             startIcon={<AddIcon />}
//             variant="outlined"
//             sx={{ mt: 2 }}
//             onClick={() => setAddingModuleToCourse(selectedCourse?.id)}
//           >
//             Add Module
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeCourseViewDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Course Dialog */}
//       <Dialog
//         open={editDialogOpen}
//         onClose={closeCourseEditDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Edit Course</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="normal"
//             value={editingCourse?.title || ""}
//             onChange={(e) =>
//               setEditingCourse({
//                 ...editingCourse,
//                 title: e.target.value,
//               })
//             }
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             margin="normal"
//             multiline
//             minRows={3}
//             value={editingCourse?.description || ""}
//             onChange={(e) =>
//               setEditingCourse({
//                 ...editingCourse,
//                 description: e.target.value,
//               })
//             }
//           />
//           <TextField
//             select
//             label="Category"
//             fullWidth
//             margin="normal"
//             value={editingCourse?.category_id || ""}
//             onChange={(e) =>
//               setEditingCourse({
//                 ...editingCourse,
//                 category_id: e.target.value,
//               })
//             }
//           >
//             {categories.map((category) => (
//               <MenuItem key={category._id} value={category._id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             select
//             label="Status"
//             fullWidth
//             margin="normal"
//             value={editingCourse?.status || ""}
//             onChange={(e) =>
//               setEditingCourse({
//                 ...editingCourse,
//                 status: e.target.value,
//               })
//             }
//             disabled={editingCourse?.status === "pending"}
//             helperText={
//               editingCourse?.status === "pending"
//                 ? "Course is pending admin approval"
//                 : "Changing status will require admin approval"
//             }
//           >
//             <MenuItem value="draft">Draft</MenuItem>
//             <MenuItem value="published">Published</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeCourseEditDialog}>Cancel</Button>
//           <Button
//             onClick={handleSaveCourse}
//             variant="contained"
//             color="primary"
//           >
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CourseList;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Avatar,
  Badge,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Category as CategoryIcon,
  MenuBook as MenuBookIcon,
  Class as ClassIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import InstructorService from "../../../services/instructorService";
import { lightBlue, orange, grey } from "@mui/material/colors";

const CourseList = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [newModuleName, setNewModuleName] = useState("");
  const [newLessonName, setNewLessonName] = useState("");
  const [addingModuleToCourse, setAddingModuleToCourse] = useState(null);
  const [addingLessonToModule, setAddingLessonToModule] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, coursesData] = await Promise.all([
          InstructorService.getAllCategories(),
          InstructorService.getCourses(),
        ]);

        setCategories(categoriesData || []);

        const coursesWithDetails = await Promise.all(
          coursesData.map(async (course) => {
            try {
              const modules = await InstructorService.getModulesByCourse(
                course.id
              );

              const modulesWithLessons = await Promise.all(
                modules.map(async (module) => {
                  try {
                    const lessons = await InstructorService.getLessonsByModule(
                      module.id
                    );
                    return { ...module, lessons };
                  } catch (error) {
                    console.error(
                      `Error fetching lessons for module ${module.id}:`,
                      error
                    );
                    return { ...module, lessons: [] };
                  }
                })
              );

              return { ...course, modules: modulesWithLessons };
            } catch (error) {
              console.error(
                `Error fetching modules for course ${course.id}:`,
                error
              );
              return { ...course, modules: [] };
            }
          })
        );

        setCourses(coursesWithDetails);
      } catch (error) {
        console.error("Error loading data:", error);
        enqueueSnackbar("Failed to load data", { variant: "error" });
        setCourses([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [enqueueSnackbar]);

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await InstructorService.deleteCourse(courseId);
        enqueueSnackbar("Course deleted successfully", { variant: "success" });
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Failed to delete course",
          { variant: "error" }
        );
      }
    }
  };

  const openCourseViewDialog = (course) => {
    setSelectedCourse(course);
    setViewDialogOpen(true);
  };

  const openCourseEditDialog = (course) => {
    setEditingCourse({ ...course });
    setEditDialogOpen(true);
  };

  const closeCourseEditDialog = () => {
    setEditingCourse(null);
    setEditDialogOpen(false);
  };

  const closeCourseViewDialog = () => {
    setSelectedCourse(null);
    setViewDialogOpen(false);
    setAddingModuleToCourse(null);
    setAddingLessonToModule(null);
  };

  const handleSaveCourse = async () => {
    try {
      const updatedCourse = {
        ...editingCourse,
        status: "pending", // Automatically set to pending on edit
      };

      await InstructorService.updateCourse(editingCourse.id, updatedCourse);
      enqueueSnackbar(
        "Course updated successfully. Waiting for admin approval.",
        {
          variant: "success",
        }
      );

      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? updatedCourse : c))
      );
      closeCourseEditDialog();
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to update course",
        { variant: "error" }
      );
    }
  };

  const toggleModuleExpansion = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleAddModule = async () => {
    if (!newModuleName.trim()) {
      enqueueSnackbar("Module name cannot be empty", { variant: "warning" });
      return;
    }

    try {
      const newModule = await InstructorService.createModule(
        addingModuleToCourse,
        {
          name: newModuleName,
          course_id: addingModuleToCourse,
        }
      );

      enqueueSnackbar("Module added successfully", { variant: "success" });

      setCourses((prev) =>
        prev.map((course) =>
          course.id === addingModuleToCourse
            ? {
                ...course,
                modules: [...course.modules, { ...newModule, lessons: [] }],
              }
            : course
        )
      );

      setNewModuleName("");
      setAddingModuleToCourse(null);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Failed to add module", {
        variant: "error",
      });
    }
  };

  const handleAddLesson = async () => {
    if (!newLessonName.trim()) {
      enqueueSnackbar("Lesson name cannot be empty", { variant: "warning" });
      return;
    }

    try {
      const newLesson = await InstructorService.createLesson({
        module_id: addingLessonToModule,
        title: newLessonName,
        content: "New lesson content", // Required field
      });

      enqueueSnackbar("Lesson added successfully", { variant: "success" });

      setCourses((prev) =>
        prev.map((course) => ({
          ...course,
          modules: course.modules.map((module) =>
            module.id === addingLessonToModule
              ? {
                  ...module,
                  lessons: [...module.lessons, newLesson],
                }
              : module
          ),
        }))
      );

      setNewLessonName("");
      setAddingLessonToModule(null);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Failed to add lesson", {
        variant: "error",
      });
    }
  };

  const handleDeleteModule = async (courseId, moduleId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this module and all its lessons?"
      )
    ) {
      try {
        await InstructorService.deleteModule(moduleId);
        enqueueSnackbar("Module deleted successfully", { variant: "success" });

        setCourses((prev) =>
          prev.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  modules: course.modules.filter(
                    (module) => module.id !== moduleId
                  ),
                }
              : course
          )
        );
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Failed to delete module",
          { variant: "error" }
        );
      }
    }
  };

  const handleDeleteLesson = async (moduleId, lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await InstructorService.deleteLesson(lessonId);
        enqueueSnackbar("Lesson deleted successfully", { variant: "success" });

        setCourses((prev) =>
          prev.map((course) => ({
            ...course,
            modules: course.modules.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    lessons: module.lessons.filter(
                      (lesson) => lesson.id !== lessonId
                    ),
                  }
                : module
            ),
          }))
        );
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Failed to delete lesson",
          { variant: "error" }
        );
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "pending":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <CheckCircleIcon fontSize="small" />;
      case "draft":
        return <EditIcon fontSize="small" />;
      case "pending":
        return <ScheduleIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || course.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pt:15 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)"
              : "linear-gradient(135deg, #121826 0%, #1E293B 100%)",
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              My Courses
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and organize your teaching materials
            </Typography>
          </Box>

          <Button
            variant="gradient"
            color="primary"
            startIcon={<AddIcon />}
            href="/instructor/courses/new"
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            New Course
          </Button>
        </Box>

        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item size={4} xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search courses..."
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                sx: {
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "background.default",
                  },
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item size={4} xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Filter by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "background.default",
                  },
                },
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {filteredCourses.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "background.default",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            <img
              src={
                theme.palette.mode === "light"
                  ? "/images/empty-state-light.svg"
                  : "/images/empty-state-dark.svg"
              }
              alt="No courses"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
            <Typography variant="h6" gutterBottom>
              No courses found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Create your first course to start sharing your knowledge with
              students
            </Typography>
            <Button
              variant="gradient"
              color="primary"
              startIcon={<AddIcon />}
              href="/instructor/courses/new"
            >
              Create Course
            </Button>
          </Box>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} lg={4} key={course.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "none",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[6],
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {course.thumbnail ? (
                    <Box
                      component="img"
                      src={course.thumbnail}
                      alt={course.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      
                    />
                    
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          theme.palette.mode === "light"
                            ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)"
                            : "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
                      }}
                    >
                      {/* <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: theme.palette.primary.main,
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  >
                    {course.title.charAt(0)}
                  </Avatar> */}
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                    }}
                  >
                    <Chip
                      icon={getStatusIcon(course.status)}
                      label={course.status}
                      color={getStatusColor(course.status)}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {course.description?.substring(0, 150) ||
                      "No description available."}
                    {course.description?.length > 150 && "..."}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={1} mb={1}>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <CategoryIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {categories.find((c) => c._id === course.category_id)
                            ?.name || "Uncategorized"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <MenuBookIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {course.modules?.length || 0} Modules
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <ClassIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {course.modules?.reduce(
                            (acc, module) =>
                              acc + (module.lessons?.length || 0),
                            0
                          )}{" "}
                          Lessons
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <StarIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          4.8 (24)
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    p: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => openCourseViewDialog(course)}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                    }}
                  >
                    View
                  </Button>
                  <Box>
                    <Tooltip title="Edit Course">
                      <IconButton
                        onClick={() => openCourseEditDialog(course)}
                        size="small"
                        sx={{
                          color: orange[600],
                          "&:hover": {
                            bgcolor: `${orange[50]} !important`,
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Course">
                      <IconButton
                        onClick={() => handleDelete(course.id)}
                        size="small"
                        sx={{
                          color: "error.main",
                          ml: 1,
                          "&:hover": {
                            bgcolor: "rgba(244, 67, 54, 0.08) !important",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* View Course Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={closeCourseViewDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 2,
            px: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight={600}>
              {selectedCourse?.title}
            </Typography>
            <Chip
              icon={getStatusIcon(selectedCourse?.status)}
              label={selectedCourse?.status}
              color={getStatusColor(selectedCourse?.status)}
              size="medium"
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                borderRadius: 1,
                color: "primary.contrastText",
                bgcolor: "rgba(255, 255, 255, 0.2)",
              }}
            />
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {selectedCourse?.description}
            </Typography>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.main",
                      mr: 2,
                    }}
                  >
                    <CategoryIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {categories.find(
                        (c) => c._id === selectedCourse?.category_id
                      )?.name || "Uncategorized"}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "secondary.light",
                      color: "secondary.main",
                      mr: 2,
                    }}
                  >
                    <MenuBookIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Modules & Lessons
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {selectedCourse?.modules?.length || 0} Modules •{" "}
                      {selectedCourse?.modules?.reduce(
                        (acc, module) => acc + (module.lessons?.length || 0),
                        0
                      )}{" "}
                      Lessons
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ mt: 3, mb: 2, fontWeight: 600 }}
            >
              Course Content
            </Typography>

            {selectedCourse?.modules?.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: "background.default",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No modules added yet. Start by adding your first module.
                </Typography>
              </Paper>
            ) : (
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {selectedCourse?.modules?.map((module) => (
                  <Accordion
                    key={module.id}
                    expanded={expandedModules[module.id] || false}
                    onChange={() => toggleModuleExpansion(module.id)}
                    elevation={0}
                    sx={{
                      "&:before": {
                        display: "none",
                      },
                      "&:not(:last-child)": {
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: expandedModules[module.id]
                          ? "action.hover"
                          : "background.paper",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box display="flex" alignItems="center">
                          <MenuBookIcon
                            fontSize="small"
                            color="action"
                            sx={{ mr: 2 }}
                          />
                          <Typography fontWeight={500}>
                            {module.name}
                          </Typography>
                        </Box>
                        <Badge
                          badgeContent={module.lessons?.length || 0}
                          color="primary"
                          sx={{
                            "& .MuiBadge-badge": {
                              right: -8,
                              top: 8,
                            },
                          }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ bgcolor: "background.default", p: 0 }}
                    >
                      {module.lessons?.length === 0 ? (
                        <Box sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="body2" color="text.secondary">
                            No lessons in this module.
                          </Typography>
                        </Box>
                      ) : (
                        <List disablePadding>
                          {module.lessons?.map((lesson) => (
                            <ListItem
                              key={lesson.id}
                              sx={{
                                px: 3,
                                py: 1.5,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                "&:last-child": {
                                  borderBottom: "none",
                                },
                              }}
                            >
                              <ListItemText
                                primary={lesson.title}
                                primaryTypographyProps={{ fontWeight: 500 }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() =>
                                    handleDeleteLesson(module.id, lesson.id)
                                  }
                                  color="error"
                                  size="small"
                                  sx={{
                                    "&:hover": {
                                      bgcolor: "rgba(244, 67, 54, 0.08)",
                                    },
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      )}
                      {addingLessonToModule === module.id && (
                        <Box
                          p={2}
                          borderTop={`1px solid ${theme.palette.divider}`}
                        >
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} sm={8}>
                              <TextField
                                fullWidth
                                size="small"
                                label="New Lesson Title"
                                value={newLessonName}
                                onChange={(e) =>
                                  setNewLessonName(e.target.value)
                                }
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 1,
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Box display="flex">
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={handleAddLesson}
                                  sx={{
                                    flex: 1,
                                    borderRadius: 1,
                                    mr: 1,
                                  }}
                                >
                                  Add
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => setAddingLessonToModule(null)}
                                  sx={{
                                    borderRadius: 1,
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                      <Box p={1} display="flex" justifyContent="flex-end">
                        <Button
                          startIcon={<AddIcon />}
                          size="small"
                          onClick={() => setAddingLessonToModule(module.id)}
                          sx={{
                            mr: 1,
                            borderRadius: 1,
                          }}
                        >
                          Add Lesson
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteModule(selectedCourse.id, module.id)
                          }
                          sx={{
                            borderRadius: 1,
                          }}
                        >
                          Delete Module
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {addingModuleToCourse === selectedCourse?.id && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mt: 3,
                  borderRadius: 2,
                  bgcolor: "background.default",
                }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      size="small"
                      label="New Module Name"
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddModule}
                        sx={{
                          flex: 1,
                          borderRadius: 1,
                          mr: 1,
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setAddingModuleToCourse(null)}
                        sx={{
                          borderRadius: 1,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Button
              startIcon={<AddIcon />}
              variant="gradient"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setAddingModuleToCourse(selectedCourse?.id)}
            >
              Add Module
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={closeCourseViewDialog}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeCourseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 2,
            px: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Edit Course
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={editingCourse?.title || ""}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    title: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                minRows={3}
                value={editingCourse?.description || ""}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    description: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                fullWidth
                margin="normal"
                value={editingCourse?.category_id || ""}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    category_id: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                fullWidth
                margin="normal"
                value={editingCourse?.status || ""}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    status: e.target.value,
                  })
                }
                disabled={editingCourse?.status === "pending"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={closeCourseEditDialog}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCourse}
            variant="gradient"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseList;

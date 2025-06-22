// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   ExpandMore as ExpandMoreIcon,
//   VideoFile as VideoIcon,
//   Article as ArticleIcon,
//   Quiz as QuizIcon,
//   Description as DocumentIcon,
//   Image as ImageIcon,
//   CloudUpload as CloudUploadIcon,
//   Category as CategoryIcon,
//   MenuBook as MenuBookIcon,
//   Edit as EditIcon ,
// } from "@mui/icons-material";
// import { useNavigate, useParams } from "react-router-dom";
// import InstructorService from "../../../services/instructorService";
// import FileUpload from "../../Dashboard/Instructor/FileUpload";

// const contentTypes = [
//   { value: "video", label: "Video", accept: "video/*" },
//   { value: "article", label: "Article" },
//   { value: "quiz", label: "Quiz" },
//   { value: "document", label: "Document", accept: ".pdf,.doc,.docx,.txt" },
// ];

// const CourseForm = ({ initialData }) => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   const [courseData, setCourseData] = useState(
//     initialData || {
//       title: "",
//       description: "",
//       category_id: "",
//       thumbnail_url: "",
//       duration: 0,
//       modules: [],
//     }
//   );
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [expandedModule, setExpandedModule] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });
//   const [uploadingFiles, setUploadingFiles] = useState({});
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [thumbnailLoading, setThumbnailLoading] = useState(false);
//   const [videoFiles, setVideoFiles] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [cats, courseDetails] = await Promise.all([
//           InstructorService.getAllCategories(),
//           courseId
//             ? InstructorService.getCourseDetails(courseId)
//             : Promise.resolve(null),
//         ]);
//         setCategories(cats || []);
//         if (courseDetails) {
//           const modulesWithLessons = await Promise.all(
//             courseDetails.modules.map(async (module) => {
//               const lessons = await InstructorService.getLessonsByModule(
//                 module.id
//               );
//               return { ...module, lessons };
//             })
//           );
//           setCourseData({ ...courseDetails, modules: modulesWithLessons });
//         }
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       }
//     };
//     fetchData();
//   }, [courseId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
//   };

//   const handleThumbnailUpload = async (file) => {
//     setThumbnailFile(file);
//     setThumbnailLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await InstructorService.uploadFile(formData);
//       setCourseData((prev) => ({
//         ...prev,
//         thumbnail_url: response.secure_url,
//       }));
//     } catch (error) {
//       console.error("Error uploading thumbnail:", error);
//     } finally {
//       setThumbnailLoading(false);
//     }
//   };
//   const handleVideoUpload = async (moduleId, lessonId, file) => {
//     setVideoFiles((prev) => ({ ...prev, [`${moduleId}-${lessonId}`]: file }));
//     setUploadingFiles((prev) => ({
//       ...prev,
//       [`${moduleId}-${lessonId}`]: true,
//     }));

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await InstructorService.uploadFile(formData);
//       handleLessonChange(
//         moduleId,
//         lessonId,
//         "content_url",
//         response.secure_url
//       );
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     } finally {
//       setUploadingFiles((prev) => ({
//         ...prev,
//         [`${moduleId}-${lessonId}`]: false,
//       }));
//     }
//   };
//   const validateForm = () => {
//     const newErrors = {};
//     if (!courseData.title.trim()) newErrors.title = "Title is required";
//     if (!courseData.description.trim())
//       newErrors.description = "Description is required";
//     if (!courseData.category_id) newErrors.category_id = "Category is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleModuleChange = (moduleId, field, value) => {
//     setCourseData((prev) => ({
//       ...prev,
//       modules: prev.modules.map((mod) =>
//         mod.id === moduleId ? { ...mod, [field]: value } : mod
//       ),
//     }));
//   };

//   const handleLessonChange = (moduleId, lessonId, field, value) => {
//     setCourseData((prev) => ({
//       ...prev,
//       modules: prev.modules.map((mod) =>
//         mod.id === moduleId
//           ? {
//               ...mod,
//               lessons: mod.lessons.map((lesson) =>
//                 lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
//               ),
//             }
//           : mod
//       ),
//     }));
//   };

//   const handleLessonFileUpload = async (moduleId, lessonId, file) => {
//     if (!file) return;

//     setUploadingFiles((prev) => ({
//       ...prev,
//       [`${moduleId}-${lessonId}`]: true,
//     }));

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const uploadResponse = await InstructorService.uploadFile(formData);
//       const videoUrl = uploadResponse.secure_url;

//       // حدّث الفيديو في state
//       handleLessonChange(moduleId, lessonId, "content_url", videoUrl);

//       // بناء بيانات الدرس (تعديل حسب الحقول اللي عندك)
//       const lesson = courseData.modules
//         .find((m) => m.id === moduleId)
//         ?.lessons.find((l) => l.id === lessonId);

//       if (!lesson) throw new Error("Lesson not found");

//       // هنا ضف رابط الفيديو لبيانات الدرس
//       const lessonData = {
//         ...lesson,
//         content_url: videoUrl,
//         module_id: moduleId,
//         duration: Number(lesson.duration),
//         order: Number(lesson.order),
//       };

//       // أنشئ الدرس مع البيانات الجديدة
//       await InstructorService.createLesson(lessonData);

//       // ممكن تضيف أي تحديث إضافي بعد الإنشاء
//     } catch (error) {
//       console.error("File upload or lesson creation error:", error);
//     } finally {
//       setUploadingFiles((prev) => ({
//         ...prev,
//         [`${moduleId}-${lessonId}`]: false,
//       }));
//     }
//   };

//   const addNewModule = () => {
//     const newModule = {
//       id: `temp-${Date.now()}`,
//       title: "New Module",
//       description: "",
//       order: courseData.modules.length + 1,
//       duration: 1,
//       lessons: [],
//     };
//     setCourseData((prev) => ({
//       ...prev,
//       modules: [...prev.modules, newModule],
//     }));
//     setExpandedModule(newModule.id);
//   };

//   const addNewLesson = (moduleId) => {
//     const module = courseData.modules.find((m) => m.id === moduleId);
//     const newLesson = {
//       id: `temp-${Date.now()}`,
//       title: "New Lesson",
//       content_type: "video",
//       content_url: "",
//       duration: 10,
//       order: module.lessons.length + 1,
//     };
//     setCourseData((prev) => ({
//       ...prev,
//       modules: prev.modules.map((mod) =>
//         mod.id === moduleId
//           ? { ...mod, lessons: [...mod.lessons, newLesson] }
//           : mod
//       ),
//     }));
//   };

//   const confirmDelete = (type, id) => {
//     setItemToDelete({ type, id });
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = () => {
//     const { type, id } = itemToDelete;
//     if (type === "module") {
//       setCourseData((prev) => ({
//         ...prev,
//         modules: prev.modules.filter((mod) => mod.id !== id),
//       }));
//     } else if (type === "lesson") {
//       setCourseData((prev) => ({
//         ...prev,
//         modules: prev.modules.map((mod) => ({
//           ...mod,
//           lessons: mod.lessons.filter((les) => les.id !== id),
//         })),
//       }));
//     }
//     setDeleteDialogOpen(false);
//   };
//   const getLessonIcon = (type) => {
//     switch (type) {
//       case "video":
//         return <VideoIcon />;
//       case "article":
//         return <ArticleIcon />;
//       case "quiz":
//         return <QuizIcon />;
//       case "document":
//         return <DocumentIcon />;
//       default:
//         return <ArticleIcon />;
//     }
//   };
//   const renderLessonContentField = (moduleId, lesson) => {
//     const isUploading = uploadingFiles[`${moduleId}-${lesson.id}`];

//     switch (lesson.content_type) {
//       case "video":
//         return (
//           <Box sx={{ mt: 1 }}>
//             <FileUpload
//               accept="video/*"
//               label="Upload Video"
//               onFileUpload={(file) =>
//                 handleVideoUpload(moduleId, lesson.id, file)
//               }
//               disabled={loading || isUploading}
//               currentFileUrl={lesson.content_url}
//               fileType="video"
//             />
//             {lesson.content_url && (
//               <Box mt={2}>
//                 <video
//                   controls
//                   src={lesson.content_url}
//                   style={{ maxWidth: "100%", maxHeight: 200 }}
//                 />
//               </Box>
//             )}
//           </Box>
//         );
//       case "document":
//         return (
//           <Box sx={{ mt: 1 }}>
//             <FileUpload
//               accept=".pdf,.doc,.docx,.txt"
//               label="Upload Document"
//               onFileUpload={(file) => {
//                 const formData = new FormData();
//                 formData.append("file", file);
//                 InstructorService.uploadFile(formData).then((response) => {
//                   handleLessonChange(
//                     moduleId,
//                     lesson.id,
//                     "content_url",
//                     response.secure_url
//                   );
//                 });
//               }}
//               disabled={loading || isUploading}
//               currentFileUrl={lesson.content_url}
//             />
//             {lesson.content_url && (
//               <Box mt={2}>
//                 <Button
//                   variant="outlined"
//                   component="a"
//                   href={lesson.content_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   startIcon={<DescriptionIcon />}
//                 >
//                   View Document
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         );
//       case "article":
//         return (
//           <TextField
//             fullWidth
//             label="Article Content"
//             value={lesson.content_url}
//             onChange={(e) =>
//               handleLessonChange(
//                 moduleId,
//                 lesson.id,
//                 "content_url",
//                 e.target.value
//               )
//             }
//             multiline
//             rows={4}
//             size="small"
//             sx={{ mt: 1 }}
//             disabled={loading}
//           />
//         );
//       case "quiz":
//         return (
//           <Typography variant="body2" color="textSecondary">
//             Quiz content will be configured separately
//           </Typography>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       if (courseId) {
//         await InstructorService.updateCourse(courseId, courseData);

//         await Promise.all(
//           courseData.modules.map(async (module) => {
//             if (
//               typeof module.id === "string" &&
//               module.id.startsWith("temp-")
//             ) {
//               const newModule = await InstructorService.createModule(courseId, {
//                 title: module.title,
//                 description: module.description,
//                 order: module.order,
//                 duration: module.duration,
//               });

//               await Promise.all(
//                 module.lessons.map((lesson) => {
//                   const lessonData = {
//                     module_id: newModule.id,
//                     title: lesson.title,
//                     content_type: lesson.content_type,
//                     content_url: lesson.content_url,
//                     duration: Number(lesson.duration),
//                     order: Number(lesson.order),
//                   };
//                   return InstructorService.createLesson(lessonData);
//                 })
//               );
//             } else {
//               await InstructorService.updateModule(module.id, {
//                 title: module.title,
//                 description: module.description,
//                 order: module.order,
//                 duration: module.duration,
//               });

//               await Promise.all(
//                 module.lessons.map(async (lesson) => {
//                   const lessonData = {
//                     title: lesson.title,
//                     content_type: lesson.content_type,
//                     content_url: lesson.content_url,
//                     duration: Number(lesson.duration),
//                     order: Number(lesson.order),
//                   };

//                   if (
//                     typeof lesson.id === "string" &&
//                     lesson.id.startsWith("temp-")
//                   ) {
//                     await InstructorService.createLesson({
//                       ...lessonData,
//                       module_id: module.id,
//                     });
//                   } else {
//                     await InstructorService.updateLesson(lesson.id, lessonData);
//                   }
//                 })
//               );
//             }
//           })
//         );
//       } else {
//         const response = await InstructorService.createCourse({
//           title: courseData.title,
//           description: courseData.description,
//           category_id: courseData.category_id,
//           thumbnail_url: courseData.thumbnail_url,
//           duration: courseData.duration,
//         });

//         const newCourseId = response.course.id;

//         await Promise.all(
//           courseData.modules.map(async (module) => {
//             const newModule = await InstructorService.createModule(
//               newCourseId,
//               {
//                 title: module.title,
//                 description: module.description,
//                 order: module.order,
//                 duration: module.duration,
//               }
//             );

//             await Promise.all(
//               module.lessons.map((lesson) => {
//                 const lessonData = {
//                   module_id: newModule.id,
//                   title: lesson.title,
//                   content_type: lesson.content_type,
//                   content_url: lesson.content_url,
//                   duration: Number(lesson.duration),
//                   order: Number(lesson.order),
//                 };
//                 return InstructorService.createLesson(lessonData);
//               })
//             );
//           })
//         );
//       }

//       navigate("/instructor/courses");
//     } catch (error) {
//       console.error("Error saving course:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper
//       sx={{
//         p: 3, pt:15 ,
//         borderRadius: 3,
//         boxShadow: (theme) => theme.shadows[4],
//         background: (theme) => theme.palette.background.paper,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           mb: 3,
//           gap: 2,
//         }}
//       >
//         <Avatar
//           sx={{
//             bgcolor: "primary.main",
//             color: "primary.contrastText",
//             width: 56,
//             height: 56,
//           }}
//         >
//           {courseId ? <EditIcon /> : <AddIcon />}
//         </Avatar>

//         <Box>
//           <Typography variant="h4" fontWeight={600}>
//             {courseId ? "Edit Course" : "Create New Course"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {courseId
//               ? "Update your course details"
//               : "Start building your new course"}
//           </Typography>
//         </Box>
//       </Box>
//       <Divider
//         sx={{
//           mb: 4,
//           borderColor: (theme) => theme.palette.divider,
//           borderBottomWidth: 2,
//         }}
//       />
//       <form onSubmit={handleSubmit}>
//         <Grid
//           container
//           spacing={3}
//           sx={{ display: "flex", flexDirection: "column" }}
//         >
//           {/* Title */}
//           <Grid item>
//             <TextField
//               fullWidth
//               label="Course Title"
//               name="title"
//               value={courseData.title}
//               onChange={handleChange}
//               error={!!errors.title}
//               helperText={errors.title}
//               required
//               disabled={loading}
//               variant="filled"
//               InputProps={{
//                 disableUnderline: true,
//                 sx: {
//                   borderRadius: 2,
//                   bgcolor: "background.default",
//                   "&:hover": {
//                     bgcolor: "action.hover",
//                   },
//                   "&.Mui-focused": {
//                     bgcolor: "background.default",
//                     boxShadow: (theme) =>
//                       `0 0 0 2px ${theme.palette.primary.main}`,
//                   },
//                 },
//               }}
//             />
//           </Grid>

//           {/* Description */}
//           <Grid item>
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={courseData.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               error={!!errors.description}
//               helperText={errors.description}
//               required
//               disabled={loading}
//               variant="filled"
//               InputProps={{
//                 disableUnderline: true,
//                 sx: {
//                   borderRadius: 2,
//                   bgcolor: "background.default",
//                   "&:hover": {
//                     bgcolor: "action.hover",
//                   },
//                   "&.Mui-focused": {
//                     bgcolor: "background.default",
//                     boxShadow: (theme) =>
//                       `0 0 0 2px ${theme.palette.primary.main}`,
//                   },
//                 },
//               }}
//             />
//           </Grid>

//           {/* Category */}
//           <Grid
//             item
//             container
//             spacing={3}
//             sx={{ display: "flex" }}
//           >
//             <Grid item>
//               <FormControl
//                 fullWidth
//                 error={!!errors.category_id}
//                 disabled={loading}
//                 variant="filled"
//                 sx={{
//                   minWidth: 200,
//                   "& .MuiFilledInput-root": {
//                     borderRadius: 2,
//                     bgcolor: "background.default",
//                     "&:hover": {
//                       bgcolor: "action.hover",
//                     },
//                     "&.Mui-focused": {
//                       bgcolor: "background.default",
//                       boxShadow: (theme) =>
//                         `0 0 0 2px ${theme.palette.primary.main}`,
//                     },
//                   },
//                 }}
//               >
//                 <InputLabel>Category *</InputLabel>
//                 <Select
//                   name="category_id"
//                   value={courseData.category_id}
//                   onChange={handleChange}
//                   label="Category *"
//                   disableUnderline
//                 >
//                   {categories.map((cat) => (
//                     <MenuItem key={cat.id} value={cat.id}>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <CategoryIcon fontSize="small" />
//                         {cat.name}
//                       </Box>{" "}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.category_id && (
//                   <FormHelperText>{errors.category_id}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>

//             {/* Duration */}
//             <Grid item>
//               <TextField
//                 fullWidth
//                 label="Duration (hours)"
//                 name="duration"
//                 type="number"
//                 value={courseData.duration}
//                 onChange={handleChange}
//                 inputProps={{ min: 0, step: 0.5 }}
//                 disabled={loading}
//                 variant="filled"
//                 InputProps={{
//                   disableUnderline: true,
//                   sx: {
//                     borderRadius: 2,
//                     bgcolor: "background.default",
//                     "&:hover": {
//                       bgcolor: "action.hover",
//                     },
//                     "&.Mui-focused": {
//                       bgcolor: "background.default",
//                       boxShadow: (theme) =>
//                         `0 0 0 2px ${theme.palette.primary.main}`,
//                     },
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* Thumbnail upload */}
//           <Grid item>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 border: (theme) => `1px dashed ${theme.palette.divider}`,
//                 bgcolor: "background.default",
//                 textAlign: "center",
//               }}
//             >
//               <Box sx={{ maxWidth: 400, mx: "auto" }}>
//                 {courseData.thumbnail_url ? (
//                   <Box sx={{ mb: 2 }}>
//                     <img
//                       src={courseData.thumbnail_url}
//                       alt="Course thumbnail"
//                       style={{
//                         maxWidth: "100%",
//                         maxHeight: 200,
//                         borderRadius: 8,
//                         border: (theme) => `1px solid ${theme.palette.divider}`,
//                       }}
//                     />
//                   </Box>
//                 ) : (
//                   <Box
//                     sx={{
//                       width: 120,
//                       height: 120,
//                       mx: "auto",
//                       mb: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bgcolor: "action.hover",
//                       borderRadius: "50%",
//                     }}
//                   >
//                     <ImageIcon fontSize="large" color="disabled" />
//                   </Box>
//                 )}

//                 <Typography variant="h6" gutterBottom>
//                   Course Thumbnail
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 2 }}
//                 >
//                   Upload a high-quality image that represents your course
//                 </Typography>

//                 <FileUpload
//                   accept="image/*"
//                   label="Upload Thumbnail"
//                   onFileUpload={handleThumbnailUpload}
//                   disabled={loading || thumbnailLoading}
//                   currentFileUrl={courseData.thumbnail_url}
//                   fileType="image"
//                   buttonProps={{
//                     variant: "outlined",
//                     startIcon: <CloudUploadIcon />,
//                     sx: { borderRadius: 2 },
//                   }}
//                 />
//               </Box>
//             </Paper>
//           </Grid>

//           {/* Modules and lessons */}
//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 border: (theme) => `1px solid ${theme.palette.divider}`,
//                 bgcolor: "background.default",
//               }}
//             >
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={3}
//               >
//                 <Button
//                   variant="gradient"
//                   startIcon={<AddIcon />}
//                   onClick={addNewModule}
//                   disabled={loading}
//                   sx={{
//                     borderRadius: 2,
//                     px: 3,
//                     py: 1,
//                   }}
//                 >
//                   Add Module
//                 </Button>
//               </Box>

//               {courseData.modules.length === 0 ? (
//                 <Box
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     border: (theme) => `1px dashed ${theme.palette.divider}`,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <MenuBookIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
//                   <Typography variant="h6" gutterBottom>
//                     No Modules Added Yet
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 3 }}
//                   >
//                     Start by adding your first module to structure your course
//                     content
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     startIcon={<AddIcon />}
//                     onClick={addNewModule}
//                     disabled={loading}
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Create First Module
//                   </Button>
//                 </Box>
//               ) : (
//                 courseData.modules.map((module) => (
//                   <Accordion
//                     key={module.id}
//                     expanded={expandedModule === module.id}
//                     onChange={() =>
//                       setExpandedModule(
//                         expandedModule === module.id ? null : module.id
//                       )
//                     }
//                     sx={{
//                       mb: 2,
//                       borderRadius: "12px !important",
//                       overflow: "hidden",
//                       "&:before": {
//                         display: "none",
//                       },
//                     }}
//                   >
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       sx={{
//                         bgcolor:
//                           expandedModule === module.id
//                             ? "action.selected"
//                             : "background.paper",
//                         "&:hover": {
//                           bgcolor: "action.hover",
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 40,
//                           height: 40,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           bgcolor: "primary.light",
//                           color: "primary.main",
//                           borderRadius: 1,
//                         }}
//                       >
//                         <MenuBookIcon fontSize="small" />
//                       </Box>
//                       <TextField
//                         value={module.title}
//                         onChange={(e) =>
//                           handleModuleChange(module.id, "title", e.target.value)
//                         }
//                         onClick={(e) => e.stopPropagation()}
//                         sx={{
//                           flexGrow: 1,
//                           "& .MuiInput-root": {
//                             "&:before, &:after": {
//                               display: "none",
//                             },
//                           },
//                           "& .MuiInput-input": {
//                             fontSize: "1.125rem",
//                             fontWeight: 500,
//                             py: 0,
//                           },
//                         }}
//                         disabled={loading}
//                       />

//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Chip
//                           label={`${module.lessons.length} ${
//                             module.lessons.length === 1 ? "lesson" : "lessons"
//                           }`}
//                           size="small"
//                           color="primary"
//                           variant="outlined"
//                           sx={{ borderRadius: 1 }}
//                         />
//                         <IconButton
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             confirmDelete("module", module.id);
//                           }}
//                           size="small"
//                           disabled={loading}
//                           sx={{
//                             ml: 1,
//                             color: "error.main",
//                             "&:hover": {
//                               bgcolor: "error.light",
//                             },
//                           }}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails sx={{ bgcolor: "background.default" }}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <TextField
//                             fullWidth
//                             label="Module Description"
//                             value={module.description}
//                             onChange={(e) =>
//                               handleModuleChange(
//                                 module.id,
//                                 "description",
//                                 e.target.value
//                               )
//                             }
//                             multiline
//                             rows={3}
//                             disabled={loading}
//                           />
//                         </Grid>
//                         <Grid item xs={6} md={3}>
//                           <TextField
//                             fullWidth
//                             label="Order"
//                             type="number"
//                             value={module.order}
//                             onChange={(e) =>
//                               handleModuleChange(
//                                 module.id,
//                                 "order",
//                                 e.target.value
//                               )
//                             }
//                             inputProps={{ min: 1 }}
//                             disabled={loading}
//                           />
//                         </Grid>
//                         <Grid item xs={6} md={3}>
//                           <TextField
//                             fullWidth
//                             label="Duration (hours)"
//                             type="number"
//                             value={module.duration}
//                             onChange={(e) =>
//                               handleModuleChange(
//                                 module.id,
//                                 "duration",
//                                 e.target.value
//                               )
//                             }
//                             inputProps={{ min: 0.5, step: 0.5 }}
//                             disabled={loading}
//                           />
//                         </Grid>
//                       </Grid>

//                       <Box mt={3}>
//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           mb={2}
//                         >
//                           <Typography variant="subtitle1">Lessons</Typography>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             startIcon={<AddIcon />}
//                             onClick={() => addNewLesson(module.id)}
//                             disabled={loading}
//                           >
//                             Add Lesson
//                           </Button>
//                         </Box>

//                         {module.lessons.length === 0 ? (
//                           <Typography
//                             variant="body2"
//                             color="textSecondary"
//                             sx={{ textAlign: "center", py: 2 }}
//                           >
//                             No lessons in this module yet.
//                           </Typography>
//                         ) : (
//                           <List dense>
//                             {module.lessons.map((lesson) => (
//                               <ListItem
//                                 key={lesson.id}
//                                 secondaryAction={
//                                   <IconButton
//                                     edge="end"
//                                     onClick={() =>
//                                       confirmDelete("lesson", lesson.id)
//                                     }
//                                     disabled={loading}
//                                   >
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 }
//                                 sx={{
//                                   border: "1px solid #eee",
//                                   borderRadius: 1,
//                                   mb: 1,
//                                 }}
//                               >
//                                 <Avatar
//                                   sx={{
//                                     bgcolor: "primary.main",
//                                     mr: 2,
//                                     width: 32,
//                                     height: 32,
//                                   }}
//                                 >
//                                   {getLessonIcon(lesson.content_type)}
//                                 </Avatar>
//                                 <ListItemText
//                                   primary={
//                                     <TextField
//                                       value={lesson.title}
//                                       onChange={(e) =>
//                                         handleLessonChange(
//                                           module.id,
//                                           lesson.id,
//                                           "title",
//                                           e.target.value
//                                         )
//                                       }
//                                       variant="standard"
//                                       InputProps={{ disableUnderline: true }}
//                                       fullWidth
//                                       disabled={loading}
//                                     />
//                                   }
//                                   secondary={
//                                     <Box sx={{ mt: 1 }}>
//                                       <Grid container spacing={2}>
//                                         <Grid item xs={12} md={4}>
//                                           <FormControl
//                                             fullWidth
//                                             size="small"
//                                             disabled={loading}
//                                           >
//                                             <InputLabel>
//                                               Content Type
//                                             </InputLabel>
//                                             <Select
//                                               value={lesson.content_type}
//                                               onChange={(e) =>
//                                                 handleLessonChange(
//                                                   module.id,
//                                                   lesson.id,
//                                                   "content_type",
//                                                   e.target.value
//                                                 )
//                                               }
//                                               label="Content Type"
//                                             >
//                                               {contentTypes.map((type) => (
//                                                 <MenuItem
//                                                   key={type.value}
//                                                   value={type.value}
//                                                 >
//                                                   {type.label}
//                                                 </MenuItem>
//                                               ))}
//                                             </Select>
//                                           </FormControl>
//                                         </Grid>
//                                         <Grid item xs={6} md={3}>
//                                           <TextField
//                                             fullWidth
//                                             label="Duration (min)"
//                                             type="number"
//                                             value={lesson.duration}
//                                             onChange={(e) =>
//                                               handleLessonChange(
//                                                 module.id,
//                                                 lesson.id,
//                                                 "duration",
//                                                 e.target.value
//                                               )
//                                             }
//                                             size="small"
//                                             inputProps={{ min: 1 }}
//                                             disabled={loading}
//                                           />
//                                         </Grid>
//                                         <Grid item xs={6} md={3}>
//                                           <TextField
//                                             fullWidth
//                                             label="Order"
//                                             type="number"
//                                             value={lesson.order}
//                                             onChange={(e) =>
//                                               handleLessonChange(
//                                                 module.id,
//                                                 lesson.id,
//                                                 "order",
//                                                 e.target.value
//                                               )
//                                             }
//                                             size="small"
//                                             inputProps={{ min: 1 }}
//                                             disabled={loading}
//                                           />
//                                         </Grid>
//                                       </Grid>
//                                       {renderLessonContentField(
//                                         module.id,
//                                         lesson
//                                       )}
//                                     </Box>
//                                   }
//                                 />
//                               </ListItem>
//                             ))}
//                           </List>
//                         )}
//                       </Box>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))
//               )}
//             </Paper>
//           </Grid>

//           {/* Buttons */}
//           <Grid item xs={12}>
//             <Box
//               display="flex"
//               justifyContent="flex-end"
//               gap={2}
//               sx={{
//                 pt: 3,
//                 borderTop: (theme) => `1px solid ${theme.palette.divider}`,
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate("/instructor/courses")}
//                 disabled={loading}
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                 }}
//                 endIcon={loading ? <CircularProgress size={20} /> : null}
//               >
//                 {courseId ? "Update Course" : "Create Course"}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>

//       {/* Delete confirmation dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             p: 2,
//           },
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               mb: 2,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: "error.light",
//                 color: "error.main",
//               }}
//             >
//               <DeleteIcon />
//             </Avatar>
//             <Typography>
//               Are you sure you want to delete this {itemToDelete.type}? This
//               action cannot be undone.
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDeleteDialogOpen(false)}
//             sx={{ borderRadius: 2 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDelete}
//             color="error"
//             variant="contained"
//             sx={{ borderRadius: 2 }}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default CourseForm;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  VideoFile as VideoIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  Description as DocumentIcon,
  Image as ImageIcon,
  CloudUpload as CloudUploadIcon,
  Category as CategoryIcon,
  MenuBook as MenuBookIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import InstructorService from "../../../services/instructorService";
import FileUpload from "../../Dashboard/Instructor/FileUpload";

const contentTypes = [
  { value: "video", label: "Video", accept: "video/*" },
  { value: "article", label: "Article" },
  { value: "quiz", label: "Quiz" },
  { value: "document", label: "Document", accept: ".pdf,.doc,.docx,.txt" },
];

const CourseForm = ({ initialData }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(
    initialData || {
      title: "",
      description: "",
      category_id: "",
      thumbnail_url: "",
      duration: 0,
      modules: [],
    }
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [expandedModule, setExpandedModule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [videoFiles, setVideoFiles] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, courseDetails] = await Promise.all([
          InstructorService.getAllCategories(),
          courseId
            ? InstructorService.getCourseDetails(courseId)
            : Promise.resolve(null),
        ]);
        setCategories(cats || []);
        if (courseDetails) {
          const modulesWithLessons = await Promise.all(
            courseDetails.modules.map(async (module) => {
              const lessons = await InstructorService.getLessonsByModule(
                module.id
              );
              return { ...module, lessons };
            })
          );
          setCourseData({ ...courseDetails, modules: modulesWithLessons });
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleThumbnailUpload = async (file) => {
    setThumbnailFile(file);
    setThumbnailLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await InstructorService.uploadFile(formData);
      setCourseData((prev) => ({
        ...prev,
        thumbnail_url: response.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      setThumbnailLoading(false);
    }
  };
  const handleVideoUpload = async (moduleId, lessonId, file) => {
    setVideoFiles((prev) => ({ ...prev, [`${moduleId}-${lessonId}`]: file }));
    setUploadingFiles((prev) => ({
      ...prev,
      [`${moduleId}-${lessonId}`]: true,
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await InstructorService.uploadFile(formData);
      handleLessonChange(
        moduleId,
        lessonId,
        "content_url",
        response.secure_url
      );
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploadingFiles((prev) => ({
        ...prev,
        [`${moduleId}-${lessonId}`]: false,
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!courseData.title.trim()) newErrors.title = "Title is required";
    if (!courseData.description.trim())
      newErrors.description = "Description is required";
    if (!courseData.category_id) newErrors.category_id = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModuleChange = (moduleId, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((mod) =>
        mod.id === moduleId ? { ...mod, [field]: value } : mod
      ),
    }));
  };

  const handleLessonChange = (moduleId, lessonId, field, value) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              lessons: mod.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              ),
            }
          : mod
      ),
    }));
  };

  const handleLessonFileUpload = async (moduleId, lessonId, file) => {
    if (!file) return;

    setUploadingFiles((prev) => ({
      ...prev,
      [`${moduleId}-${lessonId}`]: true,
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await InstructorService.uploadFile(formData);
      const videoUrl = uploadResponse.secure_url;

      // حدّث الفيديو في state
      handleLessonChange(moduleId, lessonId, "content_url", videoUrl);

      // بناء بيانات الدرس (تعديل حسب الحقول اللي عندك)
      const lesson = courseData.modules
        .find((m) => m.id === moduleId)
        ?.lessons.find((l) => l.id === lessonId);

      if (!lesson) throw new Error("Lesson not found");

      // هنا ضف رابط الفيديو لبيانات الدرس
      const lessonData = {
        ...lesson,
        content_url: videoUrl,
        module_id: moduleId,
        duration: Number(lesson.duration),
        order: Number(lesson.order),
      };

      // أنشئ الدرس مع البيانات الجديدة
      await InstructorService.createLesson(lessonData);

      // ممكن تضيف أي تحديث إضافي بعد الإنشاء
    } catch (error) {
      console.error("File upload or lesson creation error:", error);
    } finally {
      setUploadingFiles((prev) => ({
        ...prev,
        [`${moduleId}-${lessonId}`]: false,
      }));
    }
  };

  const addNewModule = () => {
    const newModule = {
      id: `temp-${Date.now()}`,
      title: "New Module",
      description: "",
      order: courseData.modules.length + 1,
      duration: 1,
      lessons: [],
    };
    setCourseData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
    setExpandedModule(newModule.id);
  };

  const addNewLesson = (moduleId) => {
    const module = courseData.modules.find((m) => m.id === moduleId);
    const newLesson = {
      id: `temp-${Date.now()}`,
      title: "New Lesson",
      content_type: "video",
      content_url: "",
      duration: 10,
      order: module.lessons.length + 1,
    };
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((mod) =>
        mod.id === moduleId
          ? { ...mod, lessons: [...mod.lessons, newLesson] }
          : mod
      ),
    }));
  };

  const confirmDelete = (type, id) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    const { type, id } = itemToDelete;
    if (type === "module") {
      setCourseData((prev) => ({
        ...prev,
        modules: prev.modules.filter((mod) => mod.id !== id),
      }));
    } else if (type === "lesson") {
      setCourseData((prev) => ({
        ...prev,
        modules: prev.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.filter((les) => les.id !== id),
        })),
      }));
    }
    setDeleteDialogOpen(false);
  };
  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <VideoIcon />;
      case "article":
        return <ArticleIcon />;
      case "quiz":
        return <QuizIcon />;
      case "document":
        return <DocumentIcon />;
      default:
        return <ArticleIcon />;
    }
  };
  const renderLessonContentField = (moduleId, lesson) => {
    const isUploading = uploadingFiles[`${moduleId}-${lesson.id}`];

    switch (lesson.content_type) {
      case "video":
        return (
          <Box sx={{ mt: 1 }}>
            <FileUpload
              accept="video/*"
              label="Upload Video"
              onFileUpload={(file) =>
                handleVideoUpload(moduleId, lesson.id, file)
              }
              disabled={loading || isUploading}
              currentFileUrl={lesson.content_url}
              fileType="video"
            />
            {lesson.content_url && (
              <Box mt={2}>
                <video
                  controls
                  src={lesson.content_url}
                  style={{ maxWidth: "100%", maxHeight: 200 }}
                />
              </Box>
            )}
          </Box>
        );
      case "document":
        return (
          <Box sx={{ mt: 1 }}>
            <FileUpload
              accept=".pdf,.doc,.docx,.txt"
              label="Upload Document"
              onFileUpload={(file) => {
                const formData = new FormData();
                formData.append("file", file);
                InstructorService.uploadFile(formData).then((response) => {
                  handleLessonChange(
                    moduleId,
                    lesson.id,
                    "content_url",
                    response.secure_url
                  );
                });
              }}
              disabled={loading || isUploading}
              currentFileUrl={lesson.content_url}
            />
            {lesson.content_url && (
              <Box mt={2}>
                <Button
                  variant="outlined"
                  component="a"
                  href={lesson.content_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<DescriptionIcon />}
                >
                  View Document
                </Button>
              </Box>
            )}
          </Box>
        );
      case "article":
        return (
          <TextField
            fullWidth
            label="Article Content"
            value={lesson.content_url}
            onChange={(e) =>
              handleLessonChange(
                moduleId,
                lesson.id,
                "content_url",
                e.target.value
              )
            }
            multiline
            rows={4}
            size="small"
            sx={{ mt: 1 }}
            disabled={loading}
          />
        );
      case "quiz":
        return (
          <Typography variant="body2" color="textSecondary">
            Quiz content will be configured separately
          </Typography>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (courseId) {
        await InstructorService.updateCourse(courseId, courseData);

        await Promise.all(
          courseData.modules.map(async (module) => {
            if (
              typeof module.id === "string" &&
              module.id.startsWith("temp-")
            ) {
              const newModule = await InstructorService.createModule(courseId, {
                title: module.title,
                description: module.description,
                order: module.order,
                duration: module.duration,
              });

              await Promise.all(
                module.lessons.map((lesson) => {
                  const lessonData = {
                    module_id: newModule.id,
                    title: lesson.title,
                    content_type: lesson.content_type,
                    content_url: lesson.content_url,
                    duration: Number(lesson.duration),
                    order: Number(lesson.order),
                  };
                  return InstructorService.createLesson(lessonData);
                })
              );
            } else {
              await InstructorService.updateModule(module.id, {
                title: module.title,
                description: module.description,
                order: module.order,
                duration: module.duration,
              });

              await Promise.all(
                module.lessons.map(async (lesson) => {
                  const lessonData = {
                    title: lesson.title,
                    content_type: lesson.content_type,
                    content_url: lesson.content_url,
                    duration: Number(lesson.duration),
                    order: Number(lesson.order),
                  };

                  if (
                    typeof lesson.id === "string" &&
                    lesson.id.startsWith("temp-")
                  ) {
                    await InstructorService.createLesson({
                      ...lessonData,
                      module_id: module.id,
                    });
                  } else {
                    await InstructorService.updateLesson(lesson.id, lessonData);
                  }
                })
              );
            }
          })
        );
      } else {
        const response = await InstructorService.createCourse({
          title: courseData.title,
          description: courseData.description,
          category_id: courseData.category_id,
          thumbnail_url: courseData.thumbnail_url,
          duration: courseData.duration,
        });

        const newCourseId = response.course.id;

        await Promise.all(
          courseData.modules.map(async (module) => {
            const newModule = await InstructorService.createModule(
              newCourseId,
              {
                title: module.title,
                description: module.description,
                order: module.order,
                duration: module.duration,
              }
            );

            await Promise.all(
              module.lessons.map((lesson) => {
                const lessonData = {
                  module_id: newModule.id,
                  title: lesson.title,
                  content_type: lesson.content_type,
                  content_url: lesson.content_url,
                  duration: Number(lesson.duration),
                  order: Number(lesson.order),
                };
                return InstructorService.createLesson(lessonData);
              })
            );
          })
        );
      }

      navigate("/instructor/courses");
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        pt: 15,
        borderRadius: 3,
        boxShadow: (theme) => theme.shadows[4],
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            width: 56,
            height: 56,
          }}
        >
          {courseId ? <EditIcon /> : <AddIcon />}
        </Avatar>

        <Box>
          <Typography variant="h4" fontWeight={600}>
            {courseId ? "Edit Course" : "Create New Course"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {courseId
              ? "Update your course details"
              : "Start building your new course"}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          mb: 4,
          borderColor: (theme) => theme.palette.divider,
          borderBottomWidth: 2,
        }}
      />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Title */}
          <Grid item>
            <TextField
              fullWidth
              label="Course Title"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
              disabled={loading}
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  borderRadius: 2,
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.Mui-focused": {
                    bgcolor: "background.default",
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.primary.main}`,
                  },
                },
              }}
            />
          </Grid>

          {/* Description */}
          <Grid item>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              required
              disabled={loading}
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  borderRadius: 2,
                  bgcolor: "background.default",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.Mui-focused": {
                    bgcolor: "background.default",
                    boxShadow: (theme) =>
                      `0 0 0 2px ${theme.palette.primary.main}`,
                  },
                },
              }}
            />
          </Grid>

          {/* Category */}
          <Grid item container spacing={3} sx={{ display: "flex" }}>
            <Grid item>
              <FormControl
                fullWidth
                error={!!errors.category_id}
                disabled={loading}
                variant="filled"
                sx={{
                  minWidth: 200,
                  "& .MuiFilledInput-root": {
                    borderRadius: 2,
                    bgcolor: "background.default",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    "&.Mui-focused": {
                      bgcolor: "background.default",
                      boxShadow: (theme) =>
                        `0 0 0 2px ${theme.palette.primary.main}`,
                    },
                  },
                }}
              >
                <InputLabel>Category *</InputLabel>
                <Select
                  name="category_id"
                  value={courseData.category_id}
                  onChange={handleChange}
                  label="Category *"
                  disableUnderline
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CategoryIcon fontSize="small" />
                        {cat.name}
                      </Box>{" "}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category_id && (
                  <FormHelperText>{errors.category_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Duration */}
            <Grid item>
              <TextField
                fullWidth
                label="Duration (hours)"
                name="duration"
                type="number"
                value={courseData.duration}
                onChange={handleChange}
                inputProps={{ min: 0, step: 0.5 }}
                disabled={loading}
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    borderRadius: 2,
                    bgcolor: "background.default",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    "&.Mui-focused": {
                      bgcolor: "background.default",
                      boxShadow: (theme) =>
                        `0 0 0 2px ${theme.palette.primary.main}`,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Thumbnail upload */}
          <Grid item>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: (theme) => `1px dashed ${theme.palette.divider}`,
                bgcolor: "background.default",
                textAlign: "center",
              }}
            >
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                {courseData.thumbnail_url ? (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={courseData.thumbnail_url}
                      alt="Course thumbnail"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      mx: "auto",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "action.hover",
                      borderRadius: "50%",
                    }}
                  >
                    <ImageIcon fontSize="large" color="disabled" />
                  </Box>
                )}

                <Typography variant="h6" gutterBottom>
                  Course Thumbnail
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Upload a high-quality image that represents your course
                </Typography>

                <FileUpload
                  accept="image/*"
                  label="Upload Thumbnail"
                  onFileUpload={handleThumbnailUpload}
                  disabled={loading || thumbnailLoading}
                  currentFileUrl={courseData.thumbnail_url}
                  fileType="image"
                  buttonProps={{
                    variant: "outlined",
                    startIcon: <CloudUploadIcon />,
                    sx: { borderRadius: 2 },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Modules and lessons */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                bgcolor: "background.default",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Button
                  variant="gradient"
                  startIcon={<AddIcon />}
                  onClick={addNewModule}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                  }}
                >
                  Add Module
                </Button>
              </Box>

              {courseData.modules.length === 0 ? (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    border: (theme) => `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}
                >
                  <MenuBookIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No Modules Added Yet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Start by adding your first module to structure your course
                    content
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addNewModule}
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    Create First Module
                  </Button>
                </Box>
              ) : (
                courseData.modules.map((module) => (
                  <Accordion
                    key={module.id}
                    expanded={expandedModule === module.id}
                    onChange={() =>
                      setExpandedModule(
                        expandedModule === module.id ? null : module.id
                      )
                    }
                    sx={{
                      mb: 2,
                      borderRadius: "12px !important",
                      overflow: "hidden",
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor:
                          expandedModule === module.id
                            ? "action.selected"
                            : "background.paper",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "primary.light",
                          color: "primary.main",
                          borderRadius: 1,
                        }}
                      >
                        <MenuBookIcon fontSize="small" />
                      </Box>
                      <TextField
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(module.id, "title", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          flexGrow: 1,
                          "& .MuiInput-root": {
                            "&:before, &:after": {
                              display: "none",
                            },
                          },
                          "& .MuiInput-input": {
                            fontSize: "1.125rem",
                            fontWeight: 500,
                            py: 0,
                          },
                        }}
                        disabled={loading}
                      />

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label={`${module.lessons.length} ${
                            module.lessons.length === 1 ? "lesson" : "lessons"
                          }`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete("module", module.id);
                          }}
                          size="small"
                          disabled={loading}
                          sx={{
                            ml: 1,
                            color: "error.main",
                            "&:hover": {
                              bgcolor: "error.light",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: "background.default" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Module Description"
                            value={module.description}
                            onChange={(e) =>
                              handleModuleChange(
                                module.id,
                                "description",
                                e.target.value
                              )
                            }
                            multiline
                            rows={3}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            fullWidth
                            label="Order"
                            type="number"
                            value={module.order}
                            onChange={(e) =>
                              handleModuleChange(
                                module.id,
                                "order",
                                e.target.value
                              )
                            }
                            inputProps={{ min: 1 }}
                            disabled={loading}
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <TextField
                            fullWidth
                            label="Duration (hours)"
                            type="number"
                            value={module.duration}
                            onChange={(e) =>
                              handleModuleChange(
                                module.id,
                                "duration",
                                e.target.value
                              )
                            }
                            inputProps={{ min: 0.5, step: 0.5 }}
                            disabled={loading}
                          />
                        </Grid>
                      </Grid>

                      <Box mt={3}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Typography variant="subtitle1">Lessons</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => addNewLesson(module.id)}
                            disabled={loading}
                          >
                            Add Lesson
                          </Button>
                        </Box>

                        {module.lessons.length === 0 ? (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ textAlign: "center", py: 2 }}
                          >
                            No lessons in this module yet.
                          </Typography>
                        ) : (
                          <List dense>
                            {module.lessons.map((lesson) => (
                              <ListItem
                                key={lesson.id}
                                secondaryAction={
                                  <IconButton
                                    edge="end"
                                    onClick={() =>
                                      confirmDelete("lesson", lesson.id)
                                    }
                                    disabled={loading}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                }
                                sx={{
                                  border: "1px solid #eee",
                                  borderRadius: 1,
                                  mb: 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    bgcolor: "primary.main",
                                    mr: 2,
                                    width: 32,
                                    height: 32,
                                  }}
                                >
                                  {getLessonIcon(lesson.content_type)}
                                </Avatar>
                                <ListItemText
                                  primary={
                                    <TextField
                                      value={lesson.title}
                                      onChange={(e) =>
                                        handleLessonChange(
                                          module.id,
                                          lesson.id,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      variant="standard"
                                      InputProps={{ disableUnderline: true }}
                                      fullWidth
                                      disabled={loading}
                                    />
                                  }
                                  secondary={
                                    <Box sx={{ mt: 1 }}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                          <FormControl
                                            fullWidth
                                            size="small"
                                            disabled={loading}
                                          >
                                            <InputLabel>
                                              Content Type
                                            </InputLabel>
                                            <Select
                                              value={lesson.content_type}
                                              onChange={(e) =>
                                                handleLessonChange(
                                                  module.id,
                                                  lesson.id,
                                                  "content_type",
                                                  e.target.value
                                                )
                                              }
                                              label="Content Type"
                                            >
                                              {contentTypes.map((type) => (
                                                <MenuItem
                                                  key={type.value}
                                                  value={type.value}
                                                >
                                                  {type.label}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                          <TextField
                                            fullWidth
                                            label="Duration (min)"
                                            type="number"
                                            value={lesson.duration}
                                            onChange={(e) =>
                                              handleLessonChange(
                                                module.id,
                                                lesson.id,
                                                "duration",
                                                e.target.value
                                              )
                                            }
                                            size="small"
                                            inputProps={{ min: 1 }}
                                            disabled={loading}
                                          />
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                          <TextField
                                            fullWidth
                                            label="Order"
                                            type="number"
                                            value={lesson.order}
                                            onChange={(e) =>
                                              handleLessonChange(
                                                module.id,
                                                lesson.id,
                                                "order",
                                                e.target.value
                                              )
                                            }
                                            size="small"
                                            inputProps={{ min: 1 }}
                                            disabled={loading}
                                          />
                                        </Grid>
                                      </Grid>
                                      {renderLessonContentField(
                                        module.id,
                                        lesson
                                      )}
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </Paper>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              sx={{
                pt: 3,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/instructor/courses")}
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
                endIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {courseId ? "Update Course" : "Create Course"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "error.light",
                color: "error.main",
              }}
            >
              <DeleteIcon />
            </Avatar>
            <Typography>
              Are you sure you want to delete this {itemToDelete.type}? This
              action cannot be undone.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CourseForm;
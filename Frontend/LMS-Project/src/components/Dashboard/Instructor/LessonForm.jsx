// // src/pages/instructor/LessonForm.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Divider,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   FormHelperText,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import InstructorService from "../../services/instructorService";
// import FileUpload from "../../pages/instructor/FileUpload";

// const contentTypes = [
//   { value: "video", label: "Video" },
//   { value: "article", label: "Article" },
//   { value: "quiz", label: "Quiz" },
//   { value: "assignment", label: "Assignment" },
// ];

// const LessonForm = () => {
//   const { moduleId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [lessonData, setLessonData] = useState({
//     title: "",
//     content_type: "video",
//     content_url: "",
//     duration: 1,
//     order: 1,
//     module_id: moduleId,
//     attachments: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [newAttachment, setNewAttachment] = useState(null);

//   useEffect(() => {
//     if (lessonId) {
//       const fetchLesson = async () => {
//         try {
//           setLoading(true);
//           const data = await InstructorService.getLessonsByModule(moduleId);
//           const lesson = data.find((l) => l._id === lessonId);
//           if (lesson) {
//             setLessonData({
//               title: lesson.title,
//               content_type: lesson.content_type,
//               content_url: lesson.content_url,
//               duration: lesson.duration,
//               order: lesson.order,
//               module_id: lesson.module_id,
//               attachments: lesson.attachments || [],
//             });
//           }
//         } catch (error) {
//           console.error("Failed to fetch lesson:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchLesson();
//     }
//   }, [lessonId, moduleId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLessonData({
//       ...lessonData,
//       [name]: value,
//     });

//     // Clear error when field is filled
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   const handleContentUpload = (file) => {
//     setLoading(true);
//     InstructorService.uploadFile(file)
//       .then((response) => {
//         setLessonData({
//           ...lessonData,
//           content_url: response.secure_url,
//         });
//       })
//       .catch((error) => {
//         console.error("Error uploading content:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleAddAttachment = (file) => {
//     setLoading(true);
//     InstructorService.uploadFile(file)
//       .then((response) => {
//         setLessonData({
//           ...lessonData,
//           attachments: [...lessonData.attachments, response],
//         });
//       })
//       .catch((error) => {
//         console.error("Error uploading attachment:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleRemoveAttachment = (attachmentId) => {
//     setLessonData({
//       ...lessonData,
//       attachments: lessonData.attachments.filter(
//         (att) => att._id !== attachmentId
//       ),
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!lessonData.title) newErrors.title = "Title is required";
//     if (!lessonData.content_type)
//       newErrors.content_type = "Content type is required";
//     if (lessonData.order < 1) newErrors.order = "Order must be at least 1";
//     if (lessonData.duration < 1)
//       newErrors.duration = "Duration must be at least 1 minute";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       if (lessonId) {
//         await InstructorService.updateLesson(lessonId, lessonData);
//       } else {
//         await InstructorService.createLesson(moduleId, lessonData);
//       }
//       navigate(`/instructor/modules/${moduleId}`);
//     } catch (error) {
//       console.error("Error saving lesson:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ p: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         {lessonId ? "Edit Lesson" : "Create New Lesson"}
//       </Typography>
//       <Divider sx={{ mb: 4 }} />

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={8}>
//             <TextField
//               fullWidth
//               label="Lesson Title"
//               name="title"
//               value={lessonData.title}
//               onChange={handleChange}
//               error={!!errors.title}
//               helperText={errors.title}
//               required
//               disabled={loading}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Order"
//               name="order"
//               type="number"
//               value={lessonData.order}
//               onChange={handleChange}
//               error={!!errors.order}
//               helperText={errors.order}
//               required
//               disabled={loading}
//               inputProps={{ min: 1 }}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth error={!!errors.content_type}>
//               <InputLabel>Content Type *</InputLabel>
//               <Select
//                 name="content_type"
//                 value={lessonData.content_type}
//                 onChange={handleChange}
//                 label="Content Type *"
//                 disabled={loading}
//               >
//                 {contentTypes.map((type) => (
//                   <MenuItem key={type.value} value={type.value}>
//                     {type.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.content_type && (
//                 <FormHelperText>{errors.content_type}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Duration (minutes)"
//               name="duration"
//               type="number"
//               value={lessonData.duration}
//               onChange={handleChange}
//               error={!!errors.duration}
//               helperText={errors.duration}
//               required
//               disabled={loading}
//               inputProps={{ min: 1 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom>
//               Lesson Content
//             </Typography>
//             {lessonData.content_type === "video" && (
//               <>
//                 <FileUpload
//                   onFileUpload={handleContentUpload}
//                   accept="video/*"
//                   disabled={loading}
//                 />
//                 {lessonData.content_url && (
//                   <Box mt={2}>
//                     <video
//                       controls
//                       src={lessonData.content_url}
//                       style={{ maxWidth: "100%", maxHeight: "300px" }}
//                     />
//                   </Box>
//                 )}
//               </>
//             )}
//             {lessonData.content_type === "article" && (
//               <TextField
//                 fullWidth
//                 label="Article Content"
//                 name="content_url"
//                 value={lessonData.content_url}
//                 onChange={handleChange}
//                 multiline
//                 rows={8}
//                 disabled={loading}
//               />
//             )}
//             {(lessonData.content_type === "quiz" ||
//               lessonData.content_type === "assignment") && (
//               <TextField
//                 fullWidth
//                 label={`${
//                   lessonData.content_type === "quiz" ? "Quiz" : "Assignment"
//                 } Instructions`}
//                 name="content_url"
//                 value={lessonData.content_url}
//                 onChange={handleChange}
//                 multiline
//                 rows={4}
//                 disabled={loading}
//               />
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom>
//               Attachments
//             </Typography>
//             <FileUpload
//               onFileUpload={handleAddAttachment}
//               accept="*"
//               disabled={loading}
//             />

//             {lessonData.attachments.length > 0 && (
//               <Box mt={2}>
//                 <Typography variant="body2" gutterBottom>
//                   Current Attachments:
//                 </Typography>
//                 <ul style={{ paddingLeft: 20 }}>
//                   {lessonData.attachments.map((attachment) => (
//                     <li key={attachment._id}>
//                       <Box display="flex" alignItems="center">
//                         <a
//                           href={attachment.secure_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ marginRight: 8 }}
//                         >
//                           {attachment.original_name}
//                         </a>
//                         <Button
//                           size="small"
//                           color="error"
//                           onClick={() => handleRemoveAttachment(attachment._id)}
//                           disabled={loading}
//                         >
//                           Remove
//                         </Button>
//                       </Box>
//                     </li>
//                   ))}
//                 </ul>
//               </Box>
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Box display="flex" justifyContent="flex-end" gap={2}>
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate(`/instructor/modules/${moduleId}`)}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 endIcon={loading && <CircularProgress size={20} />}
//               >
//                 {lessonId ? "Update Lesson" : "Create Lesson"}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default LessonForm;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";

const contentTypes = [
  { value: "video", label: "Video" },
  { value: "article", label: "Article" },
  { value: "quiz", label: "Quiz" },
];

const LessonForm = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: "",
    content_type: "video",
    content_url: "",
    duration: 10,
    order: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lessonId) {
      const fetchLesson = async () => {
        try {
          setLoading(true);
          const response = await InstructorService.getLessonsByModule(moduleId);
          const lesson = response.data.find((l) => l._id === lessonId);
          if (lesson) {
            setLessonData({
              title: lesson.title,
              content_type: lesson.content_type,
              content_url: lesson.content_url,
              duration: lesson.duration,
              order: lesson.order,
            });
          }
        } catch (error) {
          console.error("Failed to fetch lesson:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLesson();
    }
  }, [lessonId, moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  const handleContentUpload = (file) => {
    setLoading(true);
    InstructorService.uploadFile(file)
      .then((response) => {
        setLessonData({
          ...lessonData,
          content_url: response.secure_url,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!lessonData.title) newErrors.title = "Title is required";
    if (!lessonData.content_url) newErrors.content_url = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (lessonId) {
        await InstructorService.updateLesson(lessonId, lessonData);
      } else {
        await InstructorService.createLesson({
          ...lessonData,
          module_id: moduleId,
        });
      }
      navigate(`/instructor/modules/${moduleId}`);
    } catch (error) {
      console.error("Error saving lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {lessonId ? "Edit Lesson" : "Create New Lesson"}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lesson Title"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                name="content_type"
                value={lessonData.content_type}
                onChange={handleChange}
                label="Content Type"
              >
                {contentTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={lessonData.duration}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Lesson Content
            </Typography>
            {lessonData.content_type === "video" && (
              <>
                <TextField
                  fullWidth
                  label="Video URL"
                  name="content_url"
                  value={lessonData.content_url}
                  onChange={handleChange}
                  error={!!errors.content_url}
                  helperText={errors.content_url}
                  required
                />
                {lessonData.content_url && (
                  <Box mt={2}>
                    <video
                      controls
                      src={lessonData.content_url}
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  </Box>
                )}
              </>
            )}
            {lessonData.content_type === "article" && (
              <TextField
                fullWidth
                label="Article Content"
                name="content_url"
                value={lessonData.content_url}
                onChange={handleChange}
                multiline
                rows={8}
                error={!!errors.content_url}
                helperText={errors.content_url}
                required
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/instructor/modules/${moduleId}`)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={loading && <CircularProgress size={20} />}
              >
                {lessonId ? "Update Lesson" : "Create Lesson"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LessonForm;

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
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import InstructorService from "../../../services/instructorService";

// const contentTypes = [
//   { value: "video", label: "Video" },
//   { value: "article", label: "Article" },
//   { value: "quiz", label: "Quiz" },
// ];

// const LessonForm = () => {
//   const { moduleId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [lessonData, setLessonData] = useState({
//     title: "",
//     content_type: "video",
//     content_url: "",
//     duration: 10,
//     order: 1,
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (lessonId) {
//       const fetchLesson = async () => {
//         try {
//           setLoading(true);
//           const response = await InstructorService.getLessonsByModule(moduleId);
//           const lesson = response.data.find((l) => l._id === lessonId);
//           if (lesson) {
//             setLessonData({
//               title: lesson.title,
//               content_type: lesson.content_type,
//               content_url: lesson.content_url,
//               duration: lesson.duration,
//               order: lesson.order,
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
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!lessonData.title) newErrors.title = "Title is required";
//     if (!lessonData.content_url) newErrors.content_url = "Content is required";
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
//         await InstructorService.createLesson({
//           ...lessonData,
//           module_id: moduleId,
//         });
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
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Lesson Title"
//               name="title"
//               value={lessonData.title}
//               onChange={handleChange}
//               error={!!errors.title}
//               helperText={errors.title}
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Content Type</InputLabel>
//               <Select
//                 name="content_type"
//                 value={lessonData.content_type}
//                 onChange={handleChange}
//                 label="Content Type"
//               >
//                 {contentTypes.map((type) => (
//                   <MenuItem key={type.value} value={type.value}>
//                     {type.label}
//                   </MenuItem>
//                 ))}
//               </Select>
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
//               inputProps={{ min: 1 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom>
//               Lesson Content
//             </Typography>
//             {lessonData.content_type === "video" && (
//               <>
//                 <TextField
//                   fullWidth
//                   label="Video URL"
//                   name="content_url"
//                   value={lessonData.content_url}
//                   onChange={handleChange}
//                   error={!!errors.content_url}
//                   helperText={errors.content_url}
//                   required
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
//                 error={!!errors.content_url}
//                 helperText={errors.content_url}
//                 required
//               />
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
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  LinearProgress
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";
import {
  VideoLibrary,
  Article,
  Quiz,
  Close,
  CloudUpload,
  Save,
  Edit,
  Add,
  Schedule
} from "@mui/icons-material";

const contentTypes = [
  { value: "video", label: "Video", icon: <VideoLibrary />, color: "#1A8CF0" },
  { value: "article", label: "Article", icon: <Article />, color: "#4CAF50" },
  { value: "quiz", label: "Quiz", icon: <Quiz />, color: "#FF9800" },
];

const LessonForm = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
    setUploadProgress(0);
    
    InstructorService.uploadFile(file, (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(progress);
    })
      .then((response) => {
        setLessonData({
          ...lessonData,
          content_url: response.secure_url,
        });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setUploadProgress(0);
      });
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

  const currentContentType = contentTypes.find(
    (type) => type.value === lessonData.content_type
  );

  return (
    <Card sx={{ p: 0, borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ 
        bgcolor: currentContentType?.color || 'primary.main',
        color: 'white',
        p: 3,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Avatar sx={{ 
          bgcolor: 'rgba(255,255,255,0.2)', 
          mr: 2,
          width: 48,
          height: 48
        }}>
          {React.cloneElement(currentContentType?.icon || <Add />, { fontSize: 'large' })}
        </Avatar>
        <Box>
          <Typography variant="h5" component="h1">
            {lessonId ? "Edit Lesson" : "Create New Lesson"}
          </Typography>
          <Typography variant="subtitle1">
            {currentContentType?.label || 'Lesson'} Content
          </Typography>
        </Box>
      </Box>

      <CardContent>
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
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Edit color="action" sx={{ mr: 1 }} />
                  ),
                }}
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
                  renderValue={(selected) => {
                    const type = contentTypes.find(t => t.value === selected);
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {React.cloneElement(type?.icon || <Add />, { sx: { mr: 1 } })}
                        <Typography sx={{ ml: 1 }}>{type?.label}</Typography>
                      </Box>
                    );
                  }}
                >
                  {contentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: type.color + '22', 
                          color: type.color,
                          width: 24,
                          height: 24,
                          mr: 2
                        }}>
                          {React.cloneElement(type.icon, { sx: { fontSize: 16 } })}
                        </Avatar>
                        {type.label}
                      </Box>
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
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Schedule color="action" sx={{ mr: 1 }} />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ 
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                backgroundColor: 'background.paper'
              }}>
                <Typography variant="subtitle1" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  {React.cloneElement(currentContentType?.icon || <Add />, { sx: { mr: 1 } })}
                  {currentContentType?.label || 'Lesson'} Content
                </Typography>

                {lessonData.content_type === "video" && (
                  <>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Video URL"
                        name="content_url"
                        value={lessonData.content_url}
                        onChange={handleChange}
                        error={!!errors.content_url}
                        helperText={errors.content_url}
                        required
                        variant="outlined"
                      />
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleContentUpload(e.target.files[0])}
                          accept="video/*"
                        />
                      </Button>
                    </Box>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <Box sx={{ width: '100%', mb: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress} 
                          color="primary"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Uploading: {uploadProgress}%
                        </Typography>
                      </Box>
                    )}
                    {lessonData.content_url && (
                      <Box mt={2} sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 1
                      }}>
                        <video
                          controls
                          src={lessonData.content_url}
                          style={{ 
                            width: '100%',
                            maxHeight: '400px',
                            backgroundColor: '#000'
                          }}
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
                    variant="outlined"
                  />
                )}

                {lessonData.content_type === "quiz" && (
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Quiz color="action" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Quiz content will be managed separately
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/instructor/quiz-builder`)}
                    >
                      Go to Quiz Builder
                    </Button>
                  </Paper>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  variant="text"
                  onClick={() => navigate(`/instructor/modules/${moduleId}`)}
                  disabled={loading}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
                <Box display="flex" gap={2}>
                  {lessonId && (
                    <Tooltip title="Preview lesson">
                      <Button
                        variant="outlined"
                        disabled={!lessonData.content_url || loading}
                        onClick={() => window.open(lessonData.content_url, '_blank')}
                      >
                        Preview
                      </Button>
                    </Tooltip>
                  )}
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    sx={{ minWidth: 180 }}
                  >
                    {lessonId ? "Update Lesson" : "Create Lesson"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default LessonForm;
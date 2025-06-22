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
//   FormHelperText,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import InstructorService from "../../../services/instructorService";

// const ModuleForm = () => {
//   const { courseId, moduleId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [moduleData, setModuleData] = useState({
//     title: "",
//     description: "",
//     order: 1,
//     duration: 1,
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (moduleId) {
//       const fetchModule = async () => {
//         try {
//           setLoading(true);
//           const response = await InstructorService.getModulesByCourse(courseId);
//           const module = response.data.find((m) => m._id === moduleId);
//           if (module) {
//             setModuleData({
//               title: module.title,
//               description: module.description,
//               order: module.order,
//               duration: module.duration,
//             });
//           }
//         } catch (error) {
//           console.error("Failed to fetch module:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchModule();
//     }
//   }, [moduleId, courseId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setModuleData({
//       ...moduleData,
//       [name]: value,
//     });
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!moduleData.title) newErrors.title = "Title is required";
//     if (!moduleData.description)
//       newErrors.description = "Description is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       if (moduleId) {
//         await InstructorService.updateModule(moduleId, moduleData);
//         navigate(`/instructor/courses/${courseId}`);
//       } else {
//         const module = await InstructorService.createModule(
//           courseId,
//           moduleData
//         );
//         console.log("Response from createModule:", module);
//         const newModuleId = module.id; // تصحيح هنا: استعمل module.id وليس response.id
//         navigate(`/instructor/modules/${newModuleId}/lessons/new`);
//       }
//     } catch (error) {
//       console.error("Error saving module:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ p: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         {moduleId ? "Edit Module" : "Create New Module"}
//       </Typography>
//       <Divider sx={{ mb: 4 }} />

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Module Title"
//               name="title"
//               value={moduleData.title}
//               onChange={handleChange}
//               error={!!errors.title}
//               helperText={errors.title}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={moduleData.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               error={!!errors.description}
//               helperText={errors.description}
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Order"
//               name="order"
//               type="number"
//               value={moduleData.order}
//               onChange={handleChange}
//               inputProps={{ min: 1 }}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Duration (hours)"
//               name="duration"
//               type="number"
//               value={moduleData.duration}
//               onChange={handleChange}
//               inputProps={{ min: 0.5, step: 0.5 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Box display="flex" justifyContent="flex-end" gap={2}>
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate(`/instructor/courses/${courseId}`)}
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
//                 {moduleId ? "Update Module" : "Create Module"}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default ModuleForm;
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
  FormHelperText,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Slide,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import InstructorService from "../../../services/instructorService";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Schedule as ScheduleIcon,
  Numbers as NumbersIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const ModuleForm = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    order: 1,
    duration: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (moduleId) {
      const fetchModule = async () => {
        try {
          setLoading(true);
          const response = await InstructorService.getModulesByCourse(courseId);
          const module = response.data.find((m) => m._id === moduleId);
          if (module) {
            setModuleData({
              title: module.title,
              description: module.description,
              order: module.order,
              duration: module.duration,
            });
          }
        } catch (error) {
          console.error("Failed to fetch module:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchModule();
    }
  }, [moduleId, courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!moduleData.title) newErrors.title = "Title is required";
    if (!moduleData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (moduleId) {
        await InstructorService.updateModule(moduleId, moduleData);
        navigate(`/instructor/courses/${courseId}`);
      } else {
        const module = await InstructorService.createModule(
          courseId,
          moduleData
        );
        console.log("Response from createModule:", module);
        const newModuleId = module.id;
        navigate(`/instructor/modules/${newModuleId}/lessons/new`);
      }
    } catch (error) {
      console.error("Error saving module:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Card sx={{ 
        maxWidth: 800, 
        mx: 'auto', 
        mt: 4,
        boxShadow: 3,
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {moduleId ? <EditIcon /> : <AddIcon />}
            </Avatar>
          }
          title={
            <Typography variant="h5" component="div">
              {moduleId ? "Edit Module" : "Create New Module"}
            </Typography>
          }
          subheader={moduleId ? "Update your module details" : "Fill in the details for your new module"}
          action={
            <Tooltip title="Back to course">
              <IconButton 
                onClick={() => navigate(`/instructor/courses/${courseId}`)}
                color="inherit"
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        />
        
        <CardContent>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  fullWidth
                  label="Module Title"
                  name="title"
                  value={moduleData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'text.secondary',
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={moduleData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                />
              </Grid>

              <Grid >
                <TextField
                  fullWidth
                  label="Order"
                  name="order"
                  type="number"
                  value={moduleData.order}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <NumbersIcon color="action" sx={{ mr: 1 }} />
                    ),
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid>
                <TextField
                  fullWidth
                  label="Duration (hours)"
                  name="duration"
                  type="number"
                  value={moduleData.duration}
                  onChange={handleChange}
                  inputProps={{ min: 0.5, step: 0.5 }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <ScheduleIcon color="action" sx={{ mr: 1 }} />
                    ),
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/instructor/courses/${courseId}`)}
                    disabled={loading}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      px: 3,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                    sx={{
                      px: 3,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0px 4px 8px rgba(26, 140, 240, 0.2)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    {moduleId ? "Update Module" : "Create Module"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default ModuleForm;
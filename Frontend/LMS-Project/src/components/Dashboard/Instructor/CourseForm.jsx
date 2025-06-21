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
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {courseId ? "Edit Course" : "Create New Course"}
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Title */}
          <Grid item xs={12}>
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
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
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
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={!!errors.category_id}
              disabled={loading}
            >
              <InputLabel>Category *</InputLabel>
              <Select
                name="category_id"
                value={courseData.category_id}
                onChange={handleChange}
                label="Category *"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category_id && (
                <FormHelperText>{errors.category_id}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Duration */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Duration (hours)"
              name="duration"
              type="number"
              value={courseData.duration}
              onChange={handleChange}
              inputProps={{ min: 0, step: 0.5 }}
              disabled={loading}
            />
          </Grid>

          {/* Thumbnail upload */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Course Thumbnail (Images Only)
            </Typography>
            <FileUpload
              accept="image/*"
              label="Upload Course Thumbnail"
              onFileUpload={handleThumbnailUpload}
              disabled={loading || thumbnailLoading}
              currentFileUrl={courseData.thumbnail_url}
              fileType="image"
            />
          </Grid>

          {/* Modules and lessons */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Modules & Lessons</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addNewModule}
                disabled={loading}
              >
                Add Module
              </Button>
            </Box>

            {courseData.modules.length === 0 ? (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No modules added yet. Click "Add Module" to get started.
              </Typography>
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
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <TextField
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(module.id, "title", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        sx={{ flexGrow: 1, mr: 2 }}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        disabled={loading}
                      />
                      <Chip
                        label={`${module.lessons.length} ${
                          module.lessons.length === 1 ? "lesson" : "lessons"
                        }`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete("module", module.id);
                        }}
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={loading}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                                          <InputLabel>Content Type</InputLabel>
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
          </Grid>

          {/* Buttons */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => navigate("/instructor/courses")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
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
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this {itemToDelete.type}? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CourseForm;

// // const CourseForm = ({ initialData }) => {
// //   const { courseId } = useParams();
// //   const navigate = useNavigate();
// //   const [courseData, setCourseData] = useState(
// //     initialData || {
// //       title: "",
// //       description: "",
// //       category_id: "",
// //       thumbnail_url: "",
// //       duration: 0,
// //       modules: [],
// //     }
// //   );
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [expandedModule, setExpandedModule] = useState(null);
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// //   const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [categoriesData, courseDetails] = await Promise.all([
// //           InstructorService.getAllCategories(),
// //           courseId ? InstructorService.getCourseDetails(courseId) : null,
// //         ]);

// //         setCategories(categoriesData || []);

// //         if (courseDetails) {
// //           // Fetch modules and lessons for existing course
// //           const modulesWithLessons = await Promise.all(
// //             courseDetails.modules.map(async (module) => {
// //               const lessons = await InstructorService.getLessonsByModule(
// //                 module.id
// //               );
// //               return { ...module, lessons };
// //             })
// //           );
// //           setCourseData({
// //             ...courseDetails,
// //             modules: modulesWithLessons,
// //           });
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch data", error);
// //       }
// //     };
// //     fetchData();
// //   }, [courseId]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCourseData({
// //       ...courseData,
// //       [name]: value,
// //     });
// //     if (errors[name]) {
// //       setErrors({
// //         ...errors,
// //         [name]: null,
// //       });
// //     }
// //   };

// //   const handleThumbnailUpload = (file) => {
// //     setLoading(true);
// //     InstructorService.uploadFile(file)
// //       .then((response) => {
// //         setCourseData({
// //           ...courseData,
// //           thumbnail_url: response.secure_url,
// //         });
// //       })
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!courseData.title) newErrors.title = "Title is required";
// //     if (!courseData.description)
// //       newErrors.description = "Description is required";
// //     if (!courseData.category_id) newErrors.category_id = "Category is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleModuleChange = (moduleId, field, value) => {
// //     setCourseData({
// //       ...courseData,
// //       modules: courseData.modules.map((module) =>
// //         module.id === moduleId ? { ...module, [field]: value } : module
// //       ),
// //     });
// //   };

// //   const handleLessonChange = (moduleId, lessonId, field, value) => {
// //     setCourseData({
// //       ...courseData,
// //       modules: courseData.modules.map((module) => {
// //         if (module.id === moduleId) {
// //           return {
// //             ...module,
// //             lessons: module.lessons.map((lesson) =>
// //               lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
// //             ),
// //           };
// //         }
// //         return module;
// //       }),
// //     });
// //   };

// //   const addNewModule = () => {
// //     const newModule = {
// //       id: `temp-${Date.now()}`,
// //       title: "New Module",
// //       description: "",
// //       order: courseData.modules.length + 1,
// //       duration: 1,
// //       lessons: [],
// //     };
// //     setCourseData({
// //       ...courseData,
// //       modules: [...courseData.modules, newModule],
// //     });
// //     setExpandedModule(newModule.id);
// //   };

// //   const addNewLesson = (moduleId) => {
// //     setCourseData({
// //       ...courseData,
// //       modules: courseData.modules.map((module) => {
// //         if (module.id === moduleId) {
// //           return {
// //             ...module,
// //             lessons: [
// //               ...module.lessons,
// //               {
// //                 id: `temp-${Date.now()}`,
// //                 title: "New Lesson",
// //                 content_type: "video",
// //                 content_url: "",
// //                 duration: 10,
// //                 order: module.lessons.length + 1,
// //               },
// //             ],
// //           };
// //         }
// //         return module;
// //       }),
// //     });
// //   };

// //   const confirmDelete = (type, id) => {
// //     setItemToDelete({ type, id });
// //     setDeleteDialogOpen(true);
// //   };

// //   const handleDelete = () => {
// //     const { type, id } = itemToDelete;
// //     if (type === "module") {
// //       setCourseData({
// //         ...courseData,
// //         modules: courseData.modules.filter((module) => module.id !== id),
// //       });
// //     } else if (type === "lesson") {
// //       setCourseData({
// //         ...courseData,
// //         modules: courseData.modules.map((module) => ({
// //           ...module,
// //           lessons: module.lessons.filter((lesson) => lesson.id !== id),
// //         })),
// //       });
// //     }
// //     setDeleteDialogOpen(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     setLoading(true);
// //     try {
// //       let response;
// //       if (courseId) {
// //         // Update existing course
// //         response = await InstructorService.updateCourse(courseId, courseData);

// //         // Process modules and lessons updates
// //         await Promise.all(
// //           courseData.modules.map(async (module) => {
// //             if (module.id.startsWith("temp-")) {
// //               // Create new module
// //               const newModule = await InstructorService.createModule(courseId, {
// //                 title: module.title,
// //                 description: module.description,
// //                 order: module.order,
// //                 duration: module.duration,
// //               });

// //               // Create lessons for new module
// //               await Promise.all(
// //                 module.lessons.map((lesson) =>
// //                   InstructorService.createLesson({
// //                     module_id: newModule.id,
// //                     title: lesson.title,
// //                     content_type: lesson.content_type,
// //                     content_url: lesson.content_url,
// //                     duration: lesson.duration,
// //                     order: lesson.order,
// //                   })
// //                 )
// //               );
// //             } else {
// //               // Update existing module
// //               await InstructorService.updateModule(module.id, {
// //                 title: module.title,
// //                 description: module.description,
// //                 order: module.order,
// //                 duration: module.duration,
// //               });

// //               // Process lessons updates
// //               await Promise.all(
// //                 module.lessons.map(async (lesson) => {
// //                   if (lesson.id.startsWith("temp-")) {
// //                     // Create new lesson
// //                     await InstructorService.createLesson({
// //                       module_id: module.id,
// //                       title: lesson.title,
// //                       content_type: lesson.content_type,
// //                       content_url: lesson.content_url,
// //                       duration: lesson.duration,
// //                       order: lesson.order,
// //                     });
// //                   } else {
// //                     // Update existing lesson
// //                     await InstructorService.updateLesson(lesson.id, {
// //                       title: lesson.title,
// //                       content_type: lesson.content_type,
// //                       content_url: lesson.content_url,
// //                       duration: lesson.duration,
// //                       order: lesson.order,
// //                     });
// //                   }
// //                 })
// //               );
// //             }
// //           })
// //         );
// //       } else {
// //         // Create new course
// //         response = await InstructorService.createCourse({
// //           title: courseData.title,
// //           description: courseData.description,
// //           category_id: courseData.category_id,
// //           thumbnail_url: courseData.thumbnail_url,
// //           duration: courseData.duration,
// //         });

// //         const newCourseId = response.course.id;

// //         // Create modules and lessons for new course
// //         await Promise.all(
// //           courseData.modules.map(async (module) => {
// //             const newModule = await InstructorService.createModule(
// //               newCourseId,
// //               {
// //                 title: module.title,
// //                 description: module.description,
// //                 order: module.order,
// //                 duration: module.duration,
// //               }
// //             );

// //             await Promise.all(
// //               module.lessons.map((lesson) =>
// //                 InstructorService.createLesson({
// //                   module_id: newModule.id,
// //                   title: lesson.title,
// //                   content_type: lesson.content_type,
// //                   content_url: lesson.content_url,
// //                   duration: lesson.duration,
// //                   order: lesson.order,
// //                 })
// //               )
// //             );
// //           })
// //         );
// //       }

// //       navigate("/instructor/courses");
// //     } catch (error) {
// //       console.error("Error saving course:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getLessonIcon = (type) => {
// //     switch (type) {
// //       case "video":
// //         return <VideoIcon />;
// //       case "article":
// //         return <ArticleIcon />;
// //       case "quiz":
// //         return <QuizIcon />;
// //       default:
// //         return <ArticleIcon />;
// //     }
// //   };

// //   return (
// //     <Paper sx={{ p: 4 }}>
// //       <Typography variant="h5" gutterBottom>
// //         {courseId ? "Edit Course" : "Create New Course"}
// //       </Typography>
// //       <Divider sx={{ mb: 4 }} />

// //       <form onSubmit={handleSubmit}>
// //         <Grid container spacing={3}>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Course Title"
// //               name="title"
// //               value={courseData.title}
// //               onChange={handleChange}
// //               error={!!errors.title}
// //               helperText={errors.title}
// //               required
// //             />
// //           </Grid>

// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Description"
// //               name="description"
// //               value={courseData.description}
// //               onChange={handleChange}
// //               multiline
// //               rows={4}
// //               error={!!errors.description}
// //               helperText={errors.description}
// //               required
// //             />
// //           </Grid>

// //           <Grid item xs={12} md={6}>
// //             <FormControl fullWidth error={!!errors.category_id}>
// //               <InputLabel>Category *</InputLabel>
// //               <Select
// //                 name="category_id"
// //                 value={courseData.category_id}
// //                 onChange={handleChange}
// //                 label="Category *"
// //               >
// //                 {categories.map((category) => (
// //                   <MenuItem key={category.id} value={category.id}>
// //                     {category.name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               {errors.category_id && (
// //                 <FormHelperText>{errors.category_id}</FormHelperText>
// //               )}
// //             </FormControl>
// //           </Grid>

// //           <Grid item xs={12} md={6}>
// //             <TextField
// //               fullWidth
// //               label="Duration (hours)"
// //               name="duration"
// //               type="number"
// //               value={courseData.duration}
// //               onChange={handleChange}
// //               inputProps={{ min: 0, step: 0.5 }}
// //             />
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Typography variant="subtitle1" gutterBottom>
// //               Course Thumbnail
// //             </Typography>
// //             <FileUpload
// //               onFileUpload={handleThumbnailUpload}
// //               accept="image/*"
// //               disabled={loading}
// //             />
// //             {courseData.thumbnail_url && (
// //               <Box mt={2}>
// //                 <img
// //                   src={courseData.thumbnail_url}
// //                   alt="Course thumbnail"
// //                   style={{ maxWidth: "100%", maxHeight: "200px" }}
// //                 />
// //               </Box>
// //             )}
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Box
// //               display="flex"
// //               justifyContent="space-between"
// //               alignItems="center"
// //               mb={2}
// //             >
// //               <Typography variant="h6">Modules & Lessons</Typography>
// //               <Button
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 onClick={addNewModule}
// //               >
// //                 Add Module
// //               </Button>
// //             </Box>

// //             {courseData.modules.length === 0 ? (
// //               <Typography
// //                 variant="body2"
// //                 color="textSecondary"
// //                 sx={{ textAlign: "center", py: 4 }}
// //               >
// //                 No modules added yet. Click "Add Module" to get started.
// //               </Typography>
// //             ) : (
// //               <Box>
// //                 {courseData.modules.map((module) => (
// //                   <Accordion
// //                     key={module.id}
// //                     expanded={expandedModule === module.id}
// //                     onChange={() =>
// //                       setExpandedModule(
// //                         expandedModule === module.id ? null : module.id
// //                       )
// //                     }
// //                     sx={{ mb: 2 }}
// //                   >
// //                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
// //                       <Box
// //                         sx={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           width: "100%",
// //                         }}
// //                       >
// //                         <TextField
// //                           value={module.title}
// //                           onChange={(e) =>
// //                             handleModuleChange(
// //                               module.id,
// //                               "title",
// //                               e.target.value
// //                             )
// //                           }
// //                           onClick={(e) => e.stopPropagation()}
// //                           sx={{ flexGrow: 1, mr: 2 }}
// //                           variant="standard"
// //                           InputProps={{ disableUnderline: true }}
// //                         />
// //                         <Chip
// //                           label={`${module.lessons.length} ${
// //                             module.lessons.length === 1 ? "lesson" : "lessons"
// //                           }`}
// //                           size="small"
// //                           color="primary"
// //                           variant="outlined"
// //                         />
// //                         <IconButton
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             confirmDelete("module", module.id);
// //                           }}
// //                           size="small"
// //                           sx={{ ml: 1 }}
// //                         >
// //                           <DeleteIcon fontSize="small" />
// //                         </IconButton>
// //                       </Box>
// //                     </AccordionSummary>
// //                     <AccordionDetails>
// //                       <Grid container spacing={2}>
// //                         <Grid item xs={12}>
// //                           <TextField
// //                             fullWidth
// //                             label="Module Description"
// //                             value={module.description}
// //                             onChange={(e) =>
// //                               handleModuleChange(
// //                                 module.id,
// //                                 "description",
// //                                 e.target.value
// //                               )
// //                             }
// //                             multiline
// //                             rows={3}
// //                           />
// //                         </Grid>
// //                         <Grid item xs={6} md={3}>
// //                           <TextField
// //                             fullWidth
// //                             label="Order"
// //                             type="number"
// //                             value={module.order}
// //                             onChange={(e) =>
// //                               handleModuleChange(
// //                                 module.id,
// //                                 "order",
// //                                 e.target.value
// //                               )
// //                             }
// //                             inputProps={{ min: 1 }}
// //                           />
// //                         </Grid>
// //                         <Grid item xs={6} md={3}>
// //                           <TextField
// //                             fullWidth
// //                             label="Duration (hours)"
// //                             type="number"
// //                             value={module.duration}
// //                             onChange={(e) =>
// //                               handleModuleChange(
// //                                 module.id,
// //                                 "duration",
// //                                 e.target.value
// //                               )
// //                             }
// //                             inputProps={{ min: 0.5, step: 0.5 }}
// //                           />
// //                         </Grid>
// //                       </Grid>

// //                       <Box mt={3}>
// //                         <Box
// //                           display="flex"
// //                           justifyContent="space-between"
// //                           alignItems="center"
// //                           mb={2}
// //                         >
// //                           <Typography variant="subtitle1">Lessons</Typography>
// //                           <Button
// //                             variant="outlined"
// //                             size="small"
// //                             startIcon={<AddIcon />}
// //                             onClick={() => addNewLesson(module.id)}
// //                           >
// //                             Add Lesson
// //                           </Button>
// //                         </Box>

// //                         {module.lessons.length === 0 ? (
// //                           <Typography
// //                             variant="body2"
// //                             color="textSecondary"
// //                             sx={{ textAlign: "center", py: 2 }}
// //                           >
// //                             No lessons in this module yet.
// //                           </Typography>
// //                         ) : (
// //                           <List dense>
// //                             {module.lessons.map((lesson) => (
// //                               <ListItem
// //                                 key={lesson.id}
// //                                 secondaryAction={
// //                                   <IconButton
// //                                     edge="end"
// //                                     onClick={() =>
// //                                       confirmDelete("lesson", lesson.id)
// //                                     }
// //                                   >
// //                                     <DeleteIcon />
// //                                   </IconButton>
// //                                 }
// //                                 sx={{
// //                                   border: "1px solid #eee",
// //                                   borderRadius: 1,
// //                                   mb: 1,
// //                                 }}
// //                               >
// //                                 <Avatar
// //                                   sx={{
// //                                     bgcolor: "primary.main",
// //                                     mr: 2,
// //                                     width: 32,
// //                                     height: 32,
// //                                   }}
// //                                 >
// //                                   {getLessonIcon(lesson.content_type)}
// //                                 </Avatar>
// //                                 <ListItemText
// //                                   primary={
// //                                     <TextField
// //                                       value={lesson.title}
// //                                       onChange={(e) =>
// //                                         handleLessonChange(
// //                                           module.id,
// //                                           lesson.id,
// //                                           "title",
// //                                           e.target.value
// //                                         )
// //                                       }
// //                                       variant="standard"
// //                                       InputProps={{ disableUnderline: true }}
// //                                       fullWidth
// //                                     />
// //                                   }
// //                                   secondary={
// //                                     <Box sx={{ mt: 1 }}>
// //                                       <Grid container spacing={2}>
// //                                         <Grid item xs={12} md={4}>
// //                                           <FormControl fullWidth size="small">
// //                                             <InputLabel>
// //                                               Content Type
// //                                             </InputLabel>
// //                                             <Select
// //                                               value={lesson.content_type}
// //                                               onChange={(e) =>
// //                                                 handleLessonChange(
// //                                                   module.id,
// //                                                   lesson.id,
// //                                                   "content_type",
// //                                                   e.target.value
// //                                                 )
// //                                               }
// //                                               label="Content Type"
// //                                             >
// //                                               <MenuItem value="video">
// //                                                 Video
// //                                               </MenuItem>
// //                                               <MenuItem value="article">
// //                                                 Article
// //                                               </MenuItem>
// //                                               <MenuItem value="quiz">
// //                                                 Quiz
// //                                               </MenuItem>
// //                                             </Select>
// //                                           </FormControl>
// //                                         </Grid>
// //                                         <Grid item xs={6} md={3}>
// //                                           <TextField
// //                                             fullWidth
// //                                             label="Duration (min)"
// //                                             type="number"
// //                                             value={lesson.duration}
// //                                             onChange={(e) =>
// //                                               handleLessonChange(
// //                                                 module.id,
// //                                                 lesson.id,
// //                                                 "duration",
// //                                                 e.target.value
// //                                               )
// //                                             }
// //                                             size="small"
// //                                             inputProps={{ min: 1 }}
// //                                           />
// //                                         </Grid>
// //                                         <Grid item xs={6} md={3}>
// //                                           <TextField
// //                                             fullWidth
// //                                             label="Order"
// //                                             type="number"
// //                                             value={lesson.order}
// //                                             onChange={(e) =>
// //                                               handleLessonChange(
// //                                                 module.id,
// //                                                 lesson.id,
// //                                                 "order",
// //                                                 e.target.value
// //                                               )
// //                                             }
// //                                             size="small"
// //                                             inputProps={{ min: 1 }}
// //                                           />
// //                                         </Grid>
// //                                       </Grid>
// //                                       <TextField
// //                                         fullWidth
// //                                         label="Content URL"
// //                                         value={lesson.content_url}
// //                                         onChange={(e) =>
// //                                           handleLessonChange(
// //                                             module.id,
// //                                             lesson.id,
// //                                             "content_url",
// //                                             e.target.value
// //                                           )
// //                                         }
// //                                         size="small"
// //                                         sx={{ mt: 1 }}
// //                                       />
// //                                     </Box>
// //                                   }
// //                                 />
// //                               </ListItem>
// //                             ))}
// //                           </List>
// //                         )}
// //                       </Box>
// //                     </AccordionDetails>
// //                   </Accordion>
// //                 ))}
// //               </Box>
// //             )}
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Box display="flex" justifyContent="flex-end" gap={2}>
// //               <Button
// //                 variant="outlined"
// //                 onClick={() => navigate("/instructor/courses")}
// //                 disabled={loading}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 disabled={loading}
// //                 endIcon={loading && <CircularProgress size={20} />}
// //               >
// //                 {courseId ? "Update Course" : "Create Course"}
// //               </Button>
// //             </Box>
// //           </Grid>
// //         </Grid>
// //       </form>

// //       {/* Delete confirmation dialog */}
// //       <Dialog
// //         open={deleteDialogOpen}
// //         onClose={() => setDeleteDialogOpen(false)}
// //       >
// //         <DialogTitle>Confirm Delete</DialogTitle>
// //         <DialogContent>
// //           <Typography>
// //             Are you sure you want to delete this {itemToDelete.type}? This
// //             action cannot be undone.
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
// //           <Button onClick={handleDelete} color="error" variant="contained">
// //             Delete
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Paper>
// //   );
// // };

// // export default CourseForm;

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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesData, courseDetails] = await Promise.all([
//           InstructorService.getAllCategories(),
//           courseId ? InstructorService.getCourseDetails(courseId) : null,
//         ]);

//         setCategories(categoriesData || []);

//         if (courseDetails) {
//           // Fetch modules and lessons for existing course
//           const modulesWithLessons = await Promise.all(
//             courseDetails.modules.map(async (module) => {
//               const lessons = await InstructorService.getLessonsByModule(
//                 module.id
//               );
//               return { ...module, lessons };
//             })
//           );
//           setCourseData({
//             ...courseDetails,
//             modules: modulesWithLessons,
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch data", error);
//       }
//     };
//     fetchData();
//   }, [courseId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData({
//       ...courseData,
//       [name]: value,
//     });
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   // const handleThumbnailUpload = (file) => {
//   //   setLoading(true);
//   //   InstructorService.uploadFile(file)
//   //     .then((response) => {
//   //       setCourseData({
//   //         ...courseData,
//   //         thumbnail_url: response.secure_url,
//   //       });
//   //     })
//   //     .catch(console.error)
//   //     .finally(() => setLoading(false));
//   // };
//   const handleThumbnailUpload = (secureUrl) => {
//     setCourseData((prev) => ({
//       ...prev,
//       thumbnail_url: secureUrl,
//     }));
//   };
//   const validateForm = () => {
//     const newErrors = {};
//     if (!courseData.title) newErrors.title = "Title is required";
//     if (!courseData.description)
//       newErrors.description = "Description is required";
//     if (!courseData.category_id) newErrors.category_id = "Category is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleModuleChange = (moduleId, field, value) => {
//     setCourseData({
//       ...courseData,
//       modules: courseData.modules.map((module) =>
//         module.id === moduleId ? { ...module, [field]: value } : module
//       ),
//     });
//   };

//   const handleLessonChange = (moduleId, lessonId, field, value) => {
//     setCourseData({
//       ...courseData,
//       modules: courseData.modules.map((module) => {
//         if (module.id === moduleId) {
//           return {
//             ...module,
//             lessons: module.lessons.map((lesson) =>
//               lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
//             ),
//           };
//         }
//         return module;
//       }),
//     });
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
//     setCourseData({
//       ...courseData,
//       modules: [...courseData.modules, newModule],
//     });
//     setExpandedModule(newModule.id);
//   };

//   const addNewLesson = (moduleId) => {
//     setCourseData({
//       ...courseData,
//       modules: courseData.modules.map((module) => {
//         if (module.id === moduleId) {
//           return {
//             ...module,
//             lessons: [
//               ...module.lessons,
//               {
//                 id: `temp-${Date.now()}`,
//                 title: "New Lesson",
//                 content_type: "video",
//                 content_url: "",
//                 duration: 10,
//                 order: module.lessons.length + 1,
//               },
//             ],
//           };
//         }
//         return module;
//       }),
//     });
//   };

//   const confirmDelete = (type, id) => {
//     setItemToDelete({ type, id });
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = () => {
//     const { type, id } = itemToDelete;
//     if (type === "module") {
//       setCourseData({
//         ...courseData,
//         modules: courseData.modules.filter((module) => module.id !== id),
//       });
//     } else if (type === "lesson") {
//       setCourseData({
//         ...courseData,
//         modules: courseData.modules.map((module) => ({
//           ...module,
//           lessons: module.lessons.filter((lesson) => lesson.id !== id),
//         })),
//       });
//     }
//     setDeleteDialogOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       let response;
//       if (courseId) {
//         // Update existing course
//         response = await InstructorService.updateCourse(courseId, courseData);

//         // Process modules and lessons updates
//         await Promise.all(
//           courseData.modules.map(async (module) => {
//             // 🔴 عدلي هذا السطر
//             if (
//               typeof module.id === "string" &&
//               module.id.startsWith("temp-")
//             ) {
//               // Create new module

//               // Create new module
//               const newModule = await InstructorService.createModule(courseId, {
//                 title: module.title,
//                 description: module.description,
//                 order: module.order,
//                 duration: module.duration,
//               });

//               // Create lessons for new module
//               await Promise.all(
//                 module.lessons.map((lesson) =>
//                   InstructorService.createLesson({
//                     module_id: newModule.id,
//                     title: lesson.title,
//                     content_type: lesson.content_type,
//                     content_url: lesson.content_url,
//                     duration: lesson.duration,
//                     order: lesson.order,
//                   })
//                 )
//               );
//             } else {
//               // Update existing module
//               await InstructorService.updateModule(module.id, {
//                 title: module.title,
//                 description: module.description,
//                 order: module.order,
//                 duration: module.duration,
//               });

//               // Process lessons updates
//               await Promise.all(
//                 module.lessons.map(async (lesson) => {
//                   if (
//                     typeof lesson.id === "string" &&
//                     lesson.id.startsWith("temp-")
//                   ) {
//                     // create
//                     // Create new lesson
//                     await InstructorService.createLesson({
//                       module_id: module.id,
//                       title: lesson.title,
//                       content_type: lesson.content_type,
//                       content_url: lesson.content_url,
//                       duration: lesson.duration,
//                       order: lesson.order,
//                     });
//                   } else {
//                     // Update existing lesson
//                     await InstructorService.updateLesson(lesson.id, {
//                       title: lesson.title,
//                       content_type: lesson.content_type,
//                       content_url: lesson.content_url,
//                       duration: lesson.duration,
//                       order: lesson.order,
//                     });
//                   }
//                 })
//               );
//             }
//           })
//         );
//       } else {
//         // Create new course
//         response = await InstructorService.createCourse({
//           title: courseData.title,
//           description: courseData.description,
//           category_id: courseData.category_id,
//           thumbnail_url: courseData.thumbnail_url,
//           duration: courseData.duration,
//         });

//         const newCourseId = response.course.id;

//         // Create modules and lessons for new course
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
//               module.lessons.map((lesson) =>
//                 InstructorService.createLesson({
//                   module_id: newModule.id,
//                   title: lesson.title,
//                   content_type: lesson.content_type,
//                   content_url: lesson.content_url,
//                   duration: lesson.duration,
//                   order: lesson.order,
//                 })
//               )
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

//   const getLessonIcon = (type) => {
//     switch (type) {
//       case "video":
//         return <VideoIcon />;
//       case "article":
//         return <ArticleIcon />;
//       case "quiz":
//         return <QuizIcon />;
//       default:
//         return <ArticleIcon />;
//     }
//   };

//   return (
//     <Paper sx={{ p: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         {courseId ? "Edit Course" : "Create New Course"}
//       </Typography>
//       <Divider sx={{ mb: 4 }} />

//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Course Title"
//               name="title"
//               value={courseData.title}
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
//               value={courseData.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               error={!!errors.description}
//               helperText={errors.description}
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth error={!!errors.category_id}>
//               <InputLabel>Category *</InputLabel>
//               <Select
//                 name="category_id"
//                 value={courseData.category_id}
//                 onChange={handleChange}
//                 label="Category *"
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category.id} value={category.id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.category_id && (
//                 <FormHelperText>{errors.category_id}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Duration (hours)"
//               name="duration"
//               type="number"
//               value={courseData.duration}
//               onChange={handleChange}
//               inputProps={{ min: 0, step: 0.5 }}
//             />
//           </Grid>

//           {/* <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom>
//               Course Thumbnail
//             </Typography>
//             <FileUpload
//               onFileUpload={handleThumbnailUpload}
//               accept="image/*"
//               disabled={loading}
//             />
//             {courseData.thumbnail_url && (
//               <Box mt={2}>
//                 <img
//                   src={courseData.thumbnail_url}
//                   alt="Course thumbnail"
//                   style={{ maxWidth: "100%", maxHeight: "200px" }}
//                 />
//               </Box>
//             )}
//           </Grid> */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom>
//               Course Thumbnail
//             </Typography>
//             <FileUpload
//               onFileUpload={handleThumbnailUpload}
//               disabled={loading}
//               currentFileUrl={courseData.thumbnail_url}
//               label="Upload Course Thumbnail"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               mb={2}
//             >
//               <Typography variant="h6">Modules & Lessons</Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={addNewModule}
//               >
//                 Add Module
//               </Button>
//             </Box>

//             {courseData.modules.length === 0 ? (
//               <Typography
//                 variant="body2"
//                 color="textSecondary"
//                 sx={{ textAlign: "center", py: 4 }}
//               >
//                 No modules added yet. Click "Add Module" to get started.
//               </Typography>
//             ) : (
//               <Box>
//                 {courseData.modules.map((module) => (
//                   <Accordion
//                     key={module.id}
//                     expanded={expandedModule === module.id}
//                     onChange={() =>
//                       setExpandedModule(
//                         expandedModule === module.id ? null : module.id
//                       )
//                     }
//                     sx={{ mb: 2 }}
//                   >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           width: "100%",
//                         }}
//                       >
//                         <TextField
//                           value={module.title}
//                           onChange={(e) =>
//                             handleModuleChange(
//                               module.id,
//                               "title",
//                               e.target.value
//                             )
//                           }
//                           onClick={(e) => e.stopPropagation()}
//                           sx={{ flexGrow: 1, mr: 2 }}
//                           variant="standard"
//                           InputProps={{ disableUnderline: true }}
//                         />
//                         <Chip
//                           label={`${module.lessons.length} ${
//                             module.lessons.length === 1 ? "lesson" : "lessons"
//                           }`}
//                           size="small"
//                           color="primary"
//                           variant="outlined"
//                         />
//                         <IconButton
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             confirmDelete("module", module.id);
//                           }}
//                           size="small"
//                           sx={{ ml: 1 }}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
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
//                                     />
//                                   }
//                                   secondary={
//                                     <Box sx={{ mt: 1 }}>
//                                       <Grid container spacing={2}>
//                                         <Grid item xs={12} md={4}>
//                                           <FormControl fullWidth size="small">
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
//                                               <MenuItem value="video">
//                                                 Video
//                                               </MenuItem>
//                                               <MenuItem value="article">
//                                                 Article
//                                               </MenuItem>
//                                               <MenuItem value="quiz">
//                                                 Quiz
//                                               </MenuItem>
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
//                                           />
//                                         </Grid>
//                                       </Grid>
//                                       <TextField
//                                         fullWidth
//                                         label="Content URL"
//                                         value={lesson.content_url}
//                                         onChange={(e) =>
//                                           handleLessonChange(
//                                             module.id,
//                                             lesson.id,
//                                             "content_url",
//                                             e.target.value
//                                           )
//                                         }
//                                         size="small"
//                                         sx={{ mt: 1 }}
//                                       />
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
//                 ))}
//               </Box>
//             )}
//           </Grid>

//           <Grid item xs={12}>
//             <Box display="flex" justifyContent="flex-end" gap={2}>
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate("/instructor/courses")}
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
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete this {itemToDelete.type}? This
//             action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default CourseForm;

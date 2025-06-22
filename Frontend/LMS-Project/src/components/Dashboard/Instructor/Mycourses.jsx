import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  MenuBook as ModuleIcon,
  PlayCircleOutline as LessonIcon,
} from "@mui/icons-material";
import InstructorService from "../../../services/instructorService";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoursesWithDetails = async () => {
      try {
        setLoading(true);
        const coursesData = await InstructorService.getCourses();

        const coursesWithModules = await Promise.all(
          coursesData.map(async (course) => {
            const modules = await InstructorService.getModulesByCourse(
              course.id
            );

            const modulesWithLessons = await Promise.all(
              modules.map(async (module) => {
                const lessons = await InstructorService.getLessonsByModule(
                  module.id
                );
                return {
                  ...module,
                  lessons,
                };
              })
            );

            return {
              ...course,
              modules: modulesWithLessons,
            };
          })
        );

        setCourses(coursesWithModules);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses/modules/lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesWithDetails();
  }, []);

  const toggleModule = (courseId, moduleId) => {
    const key = `${courseId}-${moduleId}`;
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box p={3}>
        <Typography>No courses found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} key={course.id}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {course.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                {course.description}
              </Typography>

              {course.modules.length > 0 ? (
                <List disablePadding>
                  {course.modules.map((module) => {
                    const key = `${course.id}-${module.id}`;
                    const open = expandedModules[key] || false;
                    return (
                      <Box key={key}>
                        <ListItem
                          button
                          onClick={() => toggleModule(course.id, module.id)}
                          sx={{
                            backgroundColor: "#f9f9f9",
                            mb: 1,
                            borderRadius: 1,
                          }}
                        >
                          <ModuleIcon sx={{ mr: 2 }} />
                          <ListItemText primary={module.title} />
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding sx={{ pl: 4 }}>
                            {module.lessons.length > 0 ? (
                              module.lessons.map((lesson) => (
                                <ListItem key={lesson.id} sx={{ pl: 2 }}>
                                  <LessonIcon sx={{ mr: 2 }} />
                                  <ListItemText
                                    primary={lesson.title}
                                    secondary={`Type: ${lesson.content_type} | Duration: ${lesson.duration} mins`}
                                  />
                                </ListItem>
                              ))
                            ) : (
                              <ListItem sx={{ pl: 2 }}>
                                <ListItemText primary="No lessons in this module." />
                              </ListItem>
                            )}
                          </List>
                        </Collapse>
                      </Box>
                    );
                  })}
                </List>
              ) : (
                <Typography>No modules in this course.</Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCourses;

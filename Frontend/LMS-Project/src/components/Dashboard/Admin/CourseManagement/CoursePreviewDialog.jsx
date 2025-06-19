import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";
import {
  Person as InstructorIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Event as DateIcon,
  School as ModuleIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const CoursePreviewDialog = ({ open, onClose, course }) => {
  if (!course) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{course.title}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Course Overview
          </Typography>
          <StyledPaper elevation={0}>
            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Chip
                avatar={<Avatar>L</Avatar>}
                label={`Level: ${course.level || "All"}`}
                variant="outlined"
              />
              <Chip
                avatar={<Avatar>D</Avatar>}
                label={`Duration: ${course.duration || "N/A"}`}
                variant="outlined"
              />
            </Box>
          </StyledPaper>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Course Details
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <InstructorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Instructor"
                secondary={course.instructor?.name || "Unknown"}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" secondary={course.category} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Created"
                secondary={new Date(course.createdAt).toLocaleString()}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Course Content
          </Typography>
          {course.modules && course.modules.length > 0 ? (
            <StyledPaper elevation={0}>
              <List>
                {course.modules.map((module, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <ModuleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Module ${index + 1}: ${module.title}`}
                        secondary={`${module.lessons?.length || 0} lessons`}
                      />
                    </ListItem>
                    {module.lessons && (
                      <List component="div" disablePadding dense>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <ListItem key={lessonIndex} sx={{ pl: 4 }}>
                            <ListItemText
                              primary={`Lesson ${lessonIndex + 1}: ${
                                lesson.title
                              }`}
                              secondary={lesson.type}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </StyledPaper>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No modules added yet.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoursePreviewDialog;

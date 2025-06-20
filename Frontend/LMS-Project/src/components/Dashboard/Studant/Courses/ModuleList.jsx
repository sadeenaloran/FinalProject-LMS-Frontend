import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  Collapse,
} from "@mui/material";
import {
  CheckCircle,
  PlayCircle,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

const ModuleList = ({
  modules,
  completedLessons = [],
  onLessonSelect,
  onMarkComplete,
}) => {
  const [expandedModules, setExpandedModules] = React.useState({});

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <Box>
      {modules.map((module) => (
        <Box key={module.id} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              p: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
            }}
            onClick={() => toggleModule(module.id)}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", flexGrow: 1 }}
            >
              {module.title}
            </Typography>
            {expandedModules[module.id] ? <ExpandLess /> : <ExpandMore />}
          </Box>

          <Collapse in={expandedModules[module.id]}>
            <List dense sx={{ pl: 2 }}>
              {module.lessons?.map((lesson) => {
                const isCompleted = completedLessons.some(
                  (l) => l.lesson_id === lesson.id
                );

                return (
                  <ListItem
                    key={lesson.id}
                    sx={{
                      pl: 3,
                      backgroundColor: isCompleted ? "#e8f5e9" : "inherit",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: isCompleted ? "#d0e9d6" : "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemIcon>
                      {isCompleted ? (
                        <CheckCircle color="success" />
                      ) : (
                        <PlayCircle color="primary" />
                      )}
                    </ListItemIcon>

                    <ListItemText
                      primary={lesson.title}
                      secondary={`${lesson.duration} minutes`}
                      onClick={() => onLessonSelect(lesson)}
                      sx={{ cursor: "pointer" }}
                    />

                    {!isCompleted && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkComplete(lesson.id);
                        }}
                        sx={{ ml: 2 }}
                      >
                        Complete
                      </Button>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default ModuleList;

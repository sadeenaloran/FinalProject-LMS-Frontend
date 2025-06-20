import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Mock data (could be in a separate file)
const mockCourses = [
  {
    id: "course-1",
    title: "React Fundamentals",
    modules: [
      {
        id: "module-1",
        title: "Core Concepts",
        lessons: [
          {
            id: "lesson-1",
            title: "Components",
            questions: [
              {
                id: "q1",
                text: "What is a React component?",
                type: "mcq",
                options: [
                  "A function",
                  "An object",
                  "A class",
                  "All of the above",
                ],
                answer: "All of the above",
              },
            ],
          },
          {
            id: "lesson-2",
            title: "Props",
            questions: [
              {
                id: "q2",
                text: "Props are ______ in React",
                type: "short",
                answer: "immutable",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Advanced JavaScript",
    modules: [
      {
        id: "module-2",
        title: "ES6 Features",
        lessons: [
          {
            id: "lesson-3",
            title: "Arrow Functions",
            questions: [
              {
                id: "q3",
                text: 'Arrow functions bind their own "this" context',
                type: "truefalse",
                answer: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

const QuizPage = () => {
  // State for form
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [createdQuizzes, setCreatedQuizzes] = useState([]);

  // Get filtered data based on selections
  const availableModules = selectedCourse
    ? mockCourses.find((c) => c.id === selectedCourse)?.modules || []
    : [];

  const availableLessons = selectedModule
    ? availableModules.find((m) => m.id === selectedModule)?.lessons || []
    : [];

  const availableQuestions = selectedLesson
    ? availableLessons.find((l) => l.id === selectedLesson)?.questions || []
    : [];

  // Handlers
  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleCreateQuiz = () => {
    if (!quizTitle || selectedQuestions.length === 0) return;

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: quizTitle,
      course: selectedCourse,
      module: selectedModule,
      lesson: selectedLesson,
      questionIds: selectedQuestions,
      createdAt: new Date().toISOString(),
    };

    setCreatedQuizzes((prev) => [...prev, newQuiz]);
    resetForm();
  };

  const resetForm = () => {
    setQuizTitle("");
    setSelectedQuestions([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Builder
      </Typography>

      {/* Quiz Creation Form */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create New Quiz
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedModule("");
                setSelectedLesson("");
              }}
              label="Course"
            >
              {mockCourses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedCourse}>
            <InputLabel>Module</InputLabel>
            <Select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setSelectedLesson("");
              }}
              label="Module"
            >
              {availableModules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedModule}>
            <InputLabel>Lesson</InputLabel>
            <Select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              label="Lesson"
            >
              {availableLessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {availableQuestions.length > 0 && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Select Questions ({selectedQuestions.length} selected)
            </Typography>

            <List
              dense
              sx={{
                maxHeight: 200,
                overflow: "auto",
                border: "1px solid #eee",
                mb: 2,
              }}
            >
              {availableQuestions.map((question) => (
                <ListItem key={question.id} disablePadding>
                  <Checkbox
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleQuestionToggle(question.id)}
                  />
                  <ListItemText
                    primary={question.text}
                    secondary={`Type: ${question.type}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl fullWidth>
            <InputLabel>Quiz Title</InputLabel>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Enter quiz title"
              style={{
                padding: "16px 14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </FormControl>

          <Button
            variant="contained"
            onClick={handleCreateQuiz}
            disabled={!quizTitle || selectedQuestions.length === 0}
          >
            Create Quiz
          </Button>
        </Box>
      </Card>

      {/* Created Quizzes List */}
      <Typography variant="h5" gutterBottom>
        Your Quizzes
      </Typography>

      {createdQuizzes.length === 0 ? (
        <Typography>No quizzes created yet</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {createdQuizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                <Typography color="textSecondary">
                  Course: {mockCourses.find((c) => c.id === quiz.course)?.title}
                </Typography>
                <Typography color="textSecondary">
                  Questions: {quiz.questionIds.length}
                </Typography>
                <Typography color="textSecondary">
                  Created: {new Date(quiz.createdAt).toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button variant="outlined" size="small">
                    Edit
                  </Button>
                  <Button variant="outlined" size="small">
                    Preview
                  </Button>
                  <Button variant="outlined" size="small">
                    Assign
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default QuizPage;

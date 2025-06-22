// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Card,
//   CardContent,
//   Checkbox,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Chip,
//   Avatar,
//   Divider,
//   Paper,
//   IconButton,
//   Tooltip
// } from "@mui/material";
// import {
//   AddCircleOutline,
//   EditOutlined,
//   VisibilityOutlined,
//   SendOutlined,
//   DeleteOutline,
//   QuizOutlined,
//   LibraryBooksOutlined,
//   MenuBookOutlined
// } from "@mui/icons-material";

// // Mock data (could be in a separate file)
// const mockCourses = [
//   {
//     id: "course-1",
//     title: "React Fundamentals",
//     color: "#1A8CF0",
//     icon: "⚛️",
//     modules: [
//       {
//         id: "module-1",
//         title: "Core Concepts",
//         lessons: [
//           {
//             id: "lesson-1",
//             title: "Components",
//             questions: [
//               {
//                 id: "q1",
//                 text: "What is a React component?",
//                 type: "mcq",
//                 options: [
//                   "A function",
//                   "An object",
//                   "A class",
//                   "All of the above",
//                 ],
//                 answer: "All of the above",
//               },
//             ],
//           },
//           {
//             id: "lesson-2",
//             title: "Props",
//             questions: [
//               {
//                 id: "q2",
//                 text: "Props are ______ in React",
//                 type: "short",
//                 answer: "immutable",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "course-2",
//     title: "Advanced JavaScript",
//     color: "#FF9800",
//     icon: "📜",
//     modules: [
//       {
//         id: "module-2",
//         title: "ES6 Features",
//         lessons: [
//           {
//             id: "lesson-3",
//             title: "Arrow Functions",
//             questions: [
//               {
//                 id: "q3",
//                 text: 'Arrow functions bind their own "this" context',
//                 type: "truefalse",
//                 answer: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const QuizPage = () => {
//   // State for form
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedModule, setSelectedModule] = useState("");
//   const [selectedLesson, setSelectedLesson] = useState("");
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [quizTitle, setQuizTitle] = useState("");
//   const [createdQuizzes, setCreatedQuizzes] = useState([]);

//   // Get filtered data based on selections
//   const availableModules = selectedCourse
//     ? mockCourses.find((c) => c.id === selectedCourse)?.modules || []
//     : [];

//   const availableLessons = selectedModule
//     ? availableModules.find((m) => m.id === selectedModule)?.lessons || []
//     : [];

//   const availableQuestions = selectedLesson
//     ? availableLessons.find((l) => l.id === selectedLesson)?.questions || []
//     : [];

//   const selectedCourseData = mockCourses.find(c => c.id === selectedCourse);

//   // Handlers
//   const handleQuestionToggle = (questionId) => {
//     setSelectedQuestions((prev) =>
//       prev.includes(questionId)
//         ? prev.filter((id) => id !== questionId)
//         : [...prev, questionId]
//     );
//   };

//   const handleCreateQuiz = () => {
//     if (!quizTitle || selectedQuestions.length === 0) return;

//     const newQuiz = {
//       id: `quiz-${Date.now()}`,
//       title: quizTitle,
//       course: selectedCourse,
//       module: selectedModule,
//       lesson: selectedLesson,
//       questionIds: selectedQuestions,
//       createdAt: new Date().toISOString(),
//     };

//     setCreatedQuizzes((prev) => [...prev, newQuiz]);
//     resetForm();
//   };

//   const handleDeleteQuiz = (quizId) => {
//     setCreatedQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
//   };

//   const resetForm = () => {
//     setQuizTitle("");
//     setSelectedQuestions([]);
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <QuizOutlined color="primary" sx={{ fontSize: 40, mr: 2 }} />
//         <Typography variant="h4" component="h1">
//           Quiz Builder
//         </Typography>
//       </Box>

//       {/* Quiz Creation Form */}
//       <Card sx={{ mb: 4, p: 3, borderRadius: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <AddCircleOutline color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6" component="h2">
//             Create New Quiz
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: 'wrap' }}>
//           <FormControl fullWidth sx={{ minWidth: 200 }}>
//             <InputLabel>Course</InputLabel>
//             <Select
//               value={selectedCourse}
//               onChange={(e) => {
//                 setSelectedCourse(e.target.value);
//                 setSelectedModule("");
//                 setSelectedLesson("");
//               }}
//               label="Course"
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   {selected && (
//                     <Avatar sx={{ 
//                       bgcolor: mockCourses.find(c => c.id === selected)?.color || 'default',
//                       width: 24, 
//                       height: 24,
//                       mr: 1,
//                       fontSize: 14
//                     }}>
//                       {mockCourses.find(c => c.id === selected)?.icon}
//                     </Avatar>
//                   )}
//                   {selected ? mockCourses.find(c => c.id === selected)?.title : ''}
//                 </Box>
//               )}
//             >
//               {mockCourses.map((course) => (
//                 <MenuItem key={course.id} value={course.id}>
//                   <Avatar sx={{ 
//                     bgcolor: course.color, 
//                     width: 24, 
//                     height: 24,
//                     mr: 1,
//                     fontSize: 14
//                   }}>
//                     {course.icon}
//                   </Avatar>
//                   {course.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ minWidth: 200 }} disabled={!selectedCourse}>
//             <InputLabel>Module</InputLabel>
//             <Select
//               value={selectedModule}
//               onChange={(e) => {
//                 setSelectedModule(e.target.value);
//                 setSelectedLesson("");
//               }}
//               label="Module"
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <LibraryBooksOutlined color="action" sx={{ mr: 1 }} />
//                   {selected ? availableModules.find(m => m.id === selected)?.title : ''}
//                 </Box>
//               )}
//             >
//               {availableModules.map((module) => (
//                 <MenuItem key={module.id} value={module.id}>
//                   <LibraryBooksOutlined color="action" sx={{ mr: 1 }} />
//                   {module.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ minWidth: 200 }} disabled={!selectedModule}>
//             <InputLabel>Lesson</InputLabel>
//             <Select
//               value={selectedLesson}
//               onChange={(e) => setSelectedLesson(e.target.value)}
//               label="Lesson"
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <MenuBookOutlined color="action" sx={{ mr: 1 }} />
//                   {selected ? availableLessons.find(l => l.id === selected)?.title : ''}
//                 </Box>
//               )}
//             >
//               {availableLessons.map((lesson) => (
//                 <MenuItem key={lesson.id} value={lesson.id}>
//                   <MenuBookOutlined color="action" sx={{ mr: 1 }} />
//                   {lesson.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {availableQuestions.length > 0 && (
//           <>
//             <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
//               Select Questions ({selectedQuestions.length} selected)
//             </Typography>

//             <Paper variant="outlined" sx={{ maxHeight: 250, overflow: "auto", mb: 2 }}>
//               <List dense>
//                 {availableQuestions.map((question) => (
//                   <React.Fragment key={question.id}>
//                     <ListItem 
//                       secondaryAction={
//                         <Checkbox
//                           edge="end"
//                           checked={selectedQuestions.includes(question.id)}
//                           onChange={() => handleQuestionToggle(question.id)}
//                         />
//                       }
//                       sx={{
//                         '&:hover': {
//                           bgcolor: 'action.hover',
//                         }
//                       }}
//                     >
//                       <ListItemText
//                         primary={question.text}
//                         secondary={
//                           <Chip 
//                             label={question.type} 
//                             size="small" 
//                             sx={{ 
//                               mt: 0.5,
//                               textTransform: 'capitalize',
//                               bgcolor: selectedQuestions.includes(question.id) 
//                                 ? (selectedCourseData?.color || 'primary.main') + '22' 
//                                 : 'default'
//                             }} 
//                           />
//                         }
//                       />
//                     </ListItem>
//                     <Divider component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//             </Paper>
//           </>
//         )}

//         <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
//           <TextField
//             fullWidth
//             label="Quiz Title"
//             variant="outlined"
//             value={quizTitle}
//             onChange={(e) => setQuizTitle(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <QuizOutlined color="action" sx={{ mr: 1 }} />
//               ),
//             }}
//           />

//           <Button
//             variant="gradient"
//             onClick={handleCreateQuiz}
//             disabled={!quizTitle || selectedQuestions.length === 0}
//             startIcon={<AddCircleOutline />}
//             sx={{ height: 56, minWidth: 180 }}
//           >
//             Create Quiz
//           </Button>
//         </Box>
//       </Card>

//       {/* Created Quizzes List */}
//       <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//         <QuizOutlined color="primary" sx={{ mr: 1 }} />
//         <Typography variant="h5" component="h2">
//           Your Quizzes
//         </Typography>
//       </Box>

//       {createdQuizzes.length === 0 ? (
//         <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
//           <Typography color="text.secondary">
//             No quizzes created yet. Start by creating one above!
//           </Typography>
//         </Paper>
//       ) : (
//         <Box sx={{ display: "grid", gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' }, gap: 3 }}>
//           {createdQuizzes.map((quiz) => {
//             const course = mockCourses.find((c) => c.id === quiz.course);
//             return (
//               <Card key={quiz.id} sx={{ 
//                 borderRadius: 3,
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                 }
//               }}>
//                 <CardContent>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'flex-start',
//                     mb: 1
//                   }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ 
//                         bgcolor: course?.color || 'primary.main', 
//                         width: 32, 
//                         height: 32,
//                         mr: 1.5,
//                         fontSize: 14
//                       }}>
//                         {course?.icon || 'Q'}
//                       </Avatar>
//                       <Typography variant="h6" noWrap sx={{ maxWidth: 200 }}>
//                         {quiz.title}
//                       </Typography>
//                     </Box>
//                     <Tooltip title="Delete quiz">
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleDeleteQuiz(quiz.id)}
//                         color="error"
//                       >
//                         <DeleteOutline fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>

//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                     {course?.title}
//                   </Typography>

//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     mb: 2
//                   }}>
//                     <Chip 
//                       label={`${quiz.questionIds.length} ${quiz.questionIds.length === 1 ? 'question' : 'questions'}`}
//                       size="small"
//                       color="info"
//                       variant="outlined"
//                     />
//                     <Typography variant="caption" color="text.secondary">
//                       {new Date(quiz.createdAt).toLocaleDateString()}
//                     </Typography>
//                   </Box>

//                   <Divider sx={{ my: 1 }} />

//                   <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
//                     <Tooltip title="Edit quiz">
//                       <Button 
//                         variant="outlined" 
//                         size="small" 
//                         startIcon={<EditOutlined fontSize="small" />}
//                         sx={{ flex: 1 }}
//                       >
//                         Edit
//                       </Button>
//                     </Tooltip>
//                     <Tooltip title="Preview quiz">
//                       <Button 
//                         variant="outlined" 
//                         size="small" 
//                         startIcon={<VisibilityOutlined fontSize="small" />}
//                         sx={{ flex: 1 }}
//                       >
//                         Preview
//                       </Button>
//                     </Tooltip>
//                     <Tooltip title="Assign quiz">
//                       <Button 
//                         variant="outlined" 
//                         size="small" 
//                         startIcon={<SendOutlined fontSize="small" />}
//                         sx={{ flex: 1 }}
//                       >
//                         Assign
//                       </Button>
//                     </Tooltip>
//                   </Box>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default QuizPage;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import InstructorService from "../../../../services/instructorService";
// import QuizService from "../../../../services/ProfileService";
// import api from "../../../../api/api";

// const QuizPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [lessons, setLessons] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedModule, setSelectedModule] = useState("");
//   const [selectedLesson, setSelectedLesson] = useState("");
//   const [quizTitle, setQuizTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuizId, setEditingQuizId] = useState(null);
//   const [editingQuestionIds, setEditingQuestionIds] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctAnswer: 0,
//     score: 1,
//   });
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const data = await InstructorService.getInstructorCourses();
//         setCourses(data.data || []);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     const fetchModules = async () => {
//       if (selectedCourse) {
//         try {
//           const data = await InstructorService.getModulesByCourse(
//             selectedCourse
//           );
//           setModules(data);
//           setSelectedModule("");
//           setSelectedLesson("");
//         } catch (error) {
//           console.error("Error fetching modules:", error);
//         }
//       }
//     };
//     fetchModules();
//   }, [selectedCourse]);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       if (selectedModule) {
//         try {
//           const data = await InstructorService.getLessonsByModule(
//             selectedModule
//           );
//           setLessons(data);
//           setSelectedLesson("");
//         } catch (error) {
//           console.error("Error fetching lessons:", error);
//         }
//       }
//     };
//     fetchLessons();
//   }, [selectedModule]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       if (selectedLesson) {
//         try {
//           const data = await QuizService.getQuizzesByLesson(selectedLesson);
//           const quizzesWithDetails = await Promise.all(
//             data.map(async (quiz) => {
//               const questions = await api.get(`/questions/quiz/${quiz.id}`);
//               const submissions = await QuizService.getQuizSubmissions(quiz.id);
//               return {
//                 ...quiz,
//                 questions: questions.data.data || [],
//                 submissions: submissions.submissions || [],
//               };
//             })
//           );
//           setQuizzes(quizzesWithDetails);
//         } catch (error) {
//           console.error("Error fetching quizzes:", error);
//         }
//       }
//     };
//     fetchQuizzes();
//   }, [selectedLesson]);

//   const handleAddQuestion = () => {
//     if (!currentQuestion.text || currentQuestion.options.some((opt) => !opt)) {
//       alert("Please fill all question fields");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
//     setCurrentQuestion({
//       text: "",
//       options: ["", "", "", ""],
//       correctAnswer: 0,
//       score: 1,
//     });
//   };

//   const handleRemoveQuestion = (index) => {
//     const newQuestions = [...questions];
//     newQuestions.splice(index, 1);
//     setQuestions(newQuestions);

//     // If editing, remove the corresponding ID if it exists
//     if (editingQuestionIds[index]) {
//       const newEditingQuestionIds = [...editingQuestionIds];
//       newEditingQuestionIds.splice(index, 1);
//       setEditingQuestionIds(newEditingQuestionIds);
//     }
//   };

//   const handleEditQuiz = (quiz) => {
//     setQuizTitle(quiz.title);
//     setSelectedLesson(quiz.lesson_id);
//     setQuestions(
//       quiz.questions.map((q) => ({
//         text: q.question,
//         options: q.options,
//         correctAnswer: q.options.indexOf(q.correct_answer),
//         score: q.score,
//       }))
//     );
//     setEditingQuestionIds(quiz.questions.map((q) => q.id));
//     setEditingQuizId(quiz.id);
//     setOpenDialog(true);
//   };

//   const handleDeleteQuiz = async (quizId) => {
//     if (!window.confirm("Are you sure you want to delete this quiz?")) return;
//     try {
//       await api.delete(`/quizzes/${quizId}`);
//       setQuizzes(quizzes.filter((q) => q.id !== quizId));
//     } catch (error) {
//       console.error("Failed to delete quiz", error);
//       alert("Failed to delete quiz");
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     if (!selectedLesson || !quizTitle || questions.length === 0) {
//       alert(
//         "Please select a lesson, enter quiz title and add at least one question"
//       );
//       return;
//     }

//     try {
//       // Update or create quiz
//       let quizId = editingQuizId;
//       if (editingQuizId) {
//         await api.put(`/quizzes/${editingQuizId}`, {
//           title: quizTitle,
//           lesson_id: selectedLesson,
//         });
//       } else {
//         const quiz = await QuizService.createQuiz(selectedLesson, {
//           title: quizTitle,
//         });
//         quizId = quiz.id;
//       }

//       // Handle questions
//       for (let i = 0; i < questions.length; i++) {
//         const question = questions[i];
//         const questionData = {
//           question: question.text,
//           options: question.options,
//           correct_answer: question.options[question.correctAnswer],
//           score: question.score,
//           quiz_id: quizId,
//         };

//         if (editingQuestionIds[i]) {
//           // Update existing question
//           await api.put(`/questions/${editingQuestionIds[i]}`, questionData);
//         } else {
//           // Create new question
//           await api.post(`/quizzes/${quizId}/questions`, questionData);
//         }
//       }

//       // Delete questions that were removed during editing
//       if (editingQuizId) {
//         const currentQuestionIds =
//           quizzes
//             .find((q) => q.id === editingQuizId)
//             ?.questions.map((q) => q.id) || [];
//         const newQuestionIds = editingQuestionIds.filter((id) => id);
//         const questionsToDelete = currentQuestionIds.filter(
//           (id) => !newQuestionIds.includes(id)
//         );

//         for (const questionId of questionsToDelete) {
//           await api.delete(`/quizzes/questions/${questionId}`);
//         }
//       }

//       alert(`Quiz ${editingQuizId ? "updated" : "created"} successfully!`);
//       resetForm();
//       // Refresh quizzes list
//       const data = await QuizService.getQuizzesByLesson(selectedLesson);
//       const quizzesWithDetails = await Promise.all(
//         data.map(async (quiz) => {
//           const questions = await api.get(`/questions/quiz/${quiz.id}`);
//           const submissions = await QuizService.getQuizSubmissions(quiz.id);
//           return {
//             ...quiz,
//             questions: questions.data.data || [],
//             submissions: submissions.submissions || [],
//           };
//         })
//       );
//       setQuizzes(quizzesWithDetails);
//     } catch (error) {
//       console.error("Error saving quiz:", error);
//       alert("Failed to save quiz");
//     }
//   };

//   const resetForm = () => {
//     setQuizTitle("");
//     setQuestions([]);
//     setEditingQuizId(null);
//     setEditingQuestionIds([]);
//     setOpenDialog(false);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Quizzes
//       </Typography>

//       <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//         <FormControl fullWidth>
//           <InputLabel>Course</InputLabel>
//           <Select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             label="Course"
//           >
//             {courses.map((course) => (
//               <MenuItem key={course.id} value={course.id}>
//                 {course.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Module</InputLabel>
//           <Select
//             value={selectedModule}
//             onChange={(e) => setSelectedModule(e.target.value)}
//             label="Module"
//             disabled={!selectedCourse}
//           >
//             {modules.map((module) => (
//               <MenuItem key={module.id} value={module.id}>
//                 {module.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Lesson</InputLabel>
//           <Select
//             value={selectedLesson}
//             onChange={(e) => setSelectedLesson(e.target.value)}
//             label="Lesson"
//             disabled={!selectedModule}
//           >
//             {lessons.map((lesson) => (
//               <MenuItem key={lesson.id} value={lesson.id}>
//                 {lesson.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Button
//         variant="contained"
//         startIcon={<AddIcon />}
//         onClick={() => setOpenDialog(true)}
//         disabled={!selectedLesson}
//       >
//         Create New Quiz
//       </Button>

//       <Dialog
//         open={openDialog}
//         onClose={() => resetForm()}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Quiz Title"
//             fullWidth
//             value={quizTitle}
//             onChange={(e) => setQuizTitle(e.target.value)}
//             sx={{ mt: 2 }}
//           />

//           <Typography variant="h6" sx={{ mt: 3 }}>
//             Questions
//           </Typography>

//           <Box sx={{ mt: 2 }}>
//             {questions.map((q, index) => (
//               <Paper key={index} sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1">
//                   Question {index + 1}
//                   <IconButton
//                     onClick={() => handleRemoveQuestion(index)}
//                     sx={{ float: "right" }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Typography>
//                 <TextField
//                   label="Question Text"
//                   fullWidth
//                   value={q.text}
//                   onChange={(e) => {
//                     const newQuestions = [...questions];
//                     newQuestions[index].text = e.target.value;
//                     setQuestions(newQuestions);
//                   }}
//                   sx={{ mb: 2 }}
//                 />
//                 {q.options.map((option, optIndex) => (
//                   <Box
//                     key={optIndex}
//                     sx={{ display: "flex", alignItems: "center", mb: 1 }}
//                   >
//                     <input
//                       type="radio"
//                       checked={q.correctAnswer === optIndex}
//                       onChange={() => {
//                         const newQuestions = [...questions];
//                         newQuestions[index].correctAnswer = optIndex;
//                         setQuestions(newQuestions);
//                       }}
//                     />
//                     <TextField
//                       label={`Option ${optIndex + 1}`}
//                       fullWidth
//                       value={option}
//                       onChange={(e) => {
//                         const newQuestions = [...questions];
//                         newQuestions[index].options[optIndex] = e.target.value;
//                         setQuestions(newQuestions);
//                       }}
//                       sx={{ ml: 1 }}
//                     />
//                   </Box>
//                 ))}
//                 <TextField
//                   label="Score"
//                   type="number"
//                   value={q.score}
//                   onChange={(e) => {
//                     const newQuestions = [...questions];
//                     newQuestions[index].score = parseInt(e.target.value) || 0;
//                     setQuestions(newQuestions);
//                   }}
//                   sx={{ mt: 1, width: 100 }}
//                 />
//               </Paper>
//             ))}
//           </Box>

//           <Typography variant="h6" sx={{ mt: 3 }}>
//             Add New Question
//           </Typography>
//           <Paper sx={{ p: 2, mt: 2 }}>
//             <TextField
//               label="Question Text"
//               fullWidth
//               value={currentQuestion.text}
//               onChange={(e) =>
//                 setCurrentQuestion({ ...currentQuestion, text: e.target.value })
//               }
//               sx={{ mb: 2 }}
//             />
//             {currentQuestion.options.map((option, index) => (
//               <Box
//                 key={index}
//                 sx={{ display: "flex", alignItems: "center", mb: 1 }}
//               >
//                 <input
//                   type="radio"
//                   checked={currentQuestion.correctAnswer === index}
//                   onChange={() =>
//                     setCurrentQuestion({
//                       ...currentQuestion,
//                       correctAnswer: index,
//                     })
//                   }
//                 />
//                 <TextField
//                   label={`Option ${index + 1}`}
//                   fullWidth
//                   value={option}
//                   onChange={(e) => {
//                     const newOptions = [...currentQuestion.options];
//                     newOptions[index] = e.target.value;
//                     setCurrentQuestion({
//                       ...currentQuestion,
//                       options: newOptions,
//                     });
//                   }}
//                   sx={{ ml: 1 }}
//                 />
//               </Box>
//             ))}
//             <TextField
//               label="Score"
//               type="number"
//               value={currentQuestion.score}
//               onChange={(e) =>
//                 setCurrentQuestion({
//                   ...currentQuestion,
//                   score: parseInt(e.target.value) || 0,
//                 })
//               }
//               sx={{ mt: 1, width: 100 }}
//             />
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddQuestion}
//               sx={{ mt: 2 }}
//             >
//               Add Question
//             </Button>
//           </Paper>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => resetForm()}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmitQuiz}>
//             {editingQuizId ? "Update Quiz" : "Create Quiz"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {quizzes.length > 0 && (
//         <Paper sx={{ p: 3, mt: 4 }}>
//           <Typography variant="h5">Existing Quizzes</Typography>
//           {quizzes.map((quiz) => (
//             <Accordion key={quiz.id} sx={{ mt: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography variant="h6">{quiz.title}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="subtitle1">Questions:</Typography>
//                 <List>
//                   {quiz.questions.map((q, i) => (
//                     <ListItem key={q.id} divider>
//                       <ListItemText
//                         primary={`${i + 1}. ${q.question}`}
//                         secondary={`Correct: ${q.correct_answer} | Score: ${q.score}`}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//                 <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                   Student Submissions:
//                 </Typography>
//                 {quiz.submissions.length === 0 ? (
//                   <Typography>No submissions yet</Typography>
//                 ) : (
//                   <List>
//                     {quiz.submissions.map((sub) => (
//                       <ListItem key={sub.id} divider>
//                         <ListItemText
//                           primary={`Student: ${sub.student?.name || "Unknown"}`}
//                           secondary={`Score: ${sub.score}`}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 )}
//                 <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEditQuiz(quiz)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteQuiz(quiz.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default QuizPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  Paper,
  Tooltip,
  Badge
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  LibraryBooks as LibraryBooksIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  Send as SendIcon,
  InsertDriveFile as InsertDriveFileIcon,
  QuestionAnswer as QuestionAnswerIcon
} from "@mui/icons-material";
import InstructorService from "../../../../services/instructorService";
import QuizService from "../../../../services/ProfileService";
import api from "../../../../api/api";
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1A8CF0 30%, #4FC3F7 90%)',
  color: 'white',
  height: 56,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1565C0 30%, #42A5F5 90%)',
  },
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const QuizPage = () => {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [editingQuestionIds, setEditingQuestionIds] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    score: 1,
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await InstructorService.getInstructorCourses();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      if (selectedCourse) {
        try {
          const data = await InstructorService.getModulesByCourse(
            selectedCourse
          );
          setModules(data);
          setSelectedModule("");
          setSelectedLesson("");
        } catch (error) {
          console.error("Error fetching modules:", error);
        }
      }
    };
    fetchModules();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchLessons = async () => {
      if (selectedModule) {
        try {
          const data = await InstructorService.getLessonsByModule(
            selectedModule
          );
          setLessons(data);
          setSelectedLesson("");
        } catch (error) {
          console.error("Error fetching lessons:", error);
        }
      }
    };
    fetchLessons();
  }, [selectedModule]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (selectedLesson) {
        try {
          const data = await QuizService.getQuizzesByLesson(selectedLesson);
          const quizzesWithDetails = await Promise.all(
            data.map(async (quiz) => {
              const questions = await api.get(`/questions/quiz/${quiz.id}`);
              const submissions = await QuizService.getQuizSubmissions(quiz.id);
              return {
                ...quiz,
                questions: questions.data.data || [],
                submissions: submissions.submissions || [],
              };
            })
          );
          setQuizzes(quizzesWithDetails);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      }
    };
    fetchQuizzes();
  }, [selectedLesson]);

  const handleAddQuestion = () => {
    if (!currentQuestion.text || currentQuestion.options.some((opt) => !opt)) {
      alert("Please fill all question fields");
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      score: 1,
    });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    if (editingQuestionIds[index]) {
      const newEditingQuestionIds = [...editingQuestionIds];
      newEditingQuestionIds.splice(index, 1);
      setEditingQuestionIds(newEditingQuestionIds);
    }
  };

  const handleEditQuiz = (quiz) => {
    setQuizTitle(quiz.title);
    setSelectedLesson(quiz.lesson_id);
    setQuestions(
      quiz.questions.map((q) => ({
        text: q.question,
        options: q.options,
        correctAnswer: q.options.indexOf(q.correct_answer),
        score: q.score,
      }))
    );
    setEditingQuestionIds(quiz.questions.map((q) => q.id));
    setEditingQuizId(quiz.id);
    setOpenDialog(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await api.delete(`/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((q) => q.id !== quizId));
    } catch (error) {
      console.error("Failed to delete quiz", error);
      alert("Failed to delete quiz");
    }
  };

  const handleSubmitQuiz = async () => {
    if (!selectedLesson || !quizTitle || questions.length === 0) {
      alert(
        "Please select a lesson, enter quiz title and add at least one question"
      );
      return;
    }

    try {
      let quizId = editingQuizId;
      if (editingQuizId) {
        await api.put(`/quizzes/${editingQuizId}`, {
          title: quizTitle,
          lesson_id: selectedLesson,
        });
      } else {
        const quiz = await QuizService.createQuiz(selectedLesson, {
          title: quizTitle,
        });
        quizId = quiz.id;
      }

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionData = {
          question: question.text,
          options: question.options,
          correct_answer: question.options[question.correctAnswer],
          score: question.score,
          quiz_id: quizId,
        };

        if (editingQuestionIds[i]) {
          await api.put(`/questions/${editingQuestionIds[i]}`, questionData);
        } else {
          await api.post(`/quizzes/${quizId}/questions`, questionData);
        }
      }

      if (editingQuizId) {
        const currentQuestionIds =
          quizzes
            .find((q) => q.id === editingQuizId)
            ?.questions.map((q) => q.id) || [];
        const newQuestionIds = editingQuestionIds.filter((id) => id);
        const questionsToDelete = currentQuestionIds.filter(
          (id) => !newQuestionIds.includes(id)
        );

        for (const questionId of questionsToDelete) {
          await api.delete(`/quizzes/questions/${questionId}`);
        }
      }

      alert(`Quiz ${editingQuizId ? "updated" : "created"} successfully!`);
      resetForm();
      
      const data = await QuizService.getQuizzesByLesson(selectedLesson);
      const quizzesWithDetails = await Promise.all(
        data.map(async (quiz) => {
          const questions = await api.get(`/questions/quiz/${quiz.id}`);
          const submissions = await QuizService.getQuizSubmissions(quiz.id);
          return {
            ...quiz,
            questions: questions.data.data || [],
            submissions: submissions.submissions || [],
          };
        })
      );
      setQuizzes(quizzesWithDetails);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz");
    }
  };

  const resetForm = () => {
    setQuizTitle("");
    setQuestions([]);
    setEditingQuizId(null);
    setEditingQuestionIds([]);
    setOpenDialog(false);
  };

  const getCourseColor = (courseId) => {
    const colors = ['#1A8CF0', '#FF9800', '#4CAF50', '#9C27B0', '#F44336'];
    return colors[courseId % colors.length];
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <QuizIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Quiz Management
        </Typography>
      </Box>

      <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
            Select Course Content
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              label="Course"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selected && (
                    <Avatar sx={{ 
                      bgcolor: getCourseColor(selected),
                      width: 24, 
                      height: 24,
                      mr: 1,
                      fontSize: 14
                    }}>
renderValue={(selected) =>
  typeof selected === "string"
    ? selected.charAt(0).toUpperCase() + selected.slice(1)
    : String(selected)
}
                    </Avatar>
                  )}
                  {selected ? courses.find(c => c.id === selected)?.title : ''}
                </Box>
              )}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  <Avatar sx={{ 
                    bgcolor: getCourseColor(course.id),
                    width: 24, 
                    height: 24,
                    mr: 1,
                    fontSize: 14
                  }}>
                    {course.title.charAt(0).toUpperCase()}
                  </Avatar>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 200 }} disabled={!selectedCourse}>
            <InputLabel>Module</InputLabel>
            <Select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              label="Module"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LibraryBooksIcon color="action" sx={{ mr: 1 }} />
                  {selected ? modules.find(m => m.id === selected)?.title : ''}
                </Box>
              )}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  <LibraryBooksIcon color="action" sx={{ mr: 1 }} />
                  {module.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: 200 }} disabled={!selectedModule}>
            <InputLabel>Lesson</InputLabel>
            <Select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              label="Lesson"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MenuBookIcon color="action" sx={{ mr: 1 }} />
                  {selected ? lessons.find(l => l.id === selected)?.title : ''}
                </Box>
              )}
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  <MenuBookIcon color="action" sx={{ mr: 1 }} />
                  {lesson.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <ColorButton
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          disabled={!selectedLesson}
        >
          Create New Quiz
        </ColorButton>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => resetForm()}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <QuizIcon sx={{ mr: 1 }} />
            {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            label="Quiz Title"
            fullWidth
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InsertDriveFileIcon color="action" sx={{ mr: 1 }} />
              ),
            }}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
            <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
            Questions
          </Typography>

          <Box sx={{ mt: 2 }}>
            {questions.map((q, index) => (
              <QuestionCard key={index} elevation={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Question {index + 1}
                  </Typography>
                  <Tooltip title="Remove question">
                    <IconButton
                      onClick={() => handleRemoveQuestion(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TextField
                  label="Question Text"
                  fullWidth
                  value={q.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  sx={{ mb: 2, mt: 1 }}
                />
                {q.options.map((option, optIndex) => (
                  <Box
                    key={optIndex}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <IconButton
                      onClick={() => {
                        const newQuestions = [...questions];
                        newQuestions[index].correctAnswer = optIndex;
                        setQuestions(newQuestions);
                      }}
                      size="small"
                    >
                      {q.correctAnswer === optIndex ? (
                        <CheckCircleIcon color="primary" />
                      ) : (
                        <RadioButtonUncheckedIcon color="action" />
                      )}
                    </IconButton>
                    <TextField
                      label={`Option ${optIndex + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options[optIndex] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                ))}
                <TextField
                  label="Score"
                  type="number"
                  value={q.score}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].score = parseInt(e.target.value) || 0;
                    setQuestions(newQuestions);
                  }}
                  sx={{ mt: 1, width: 100 }}
                  InputProps={{
                    startAdornment: <StarIcon color="action" sx={{ mr: 1 }} fontSize="small" />,
                  }}
                />
              </QuestionCard>
            ))}
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
            <AddIcon color="primary" sx={{ mr: 1 }} />
            Add New Question
          </Typography>
          <QuestionCard elevation={1}>
            <TextField
              label="Question Text"
              fullWidth
              value={currentQuestion.text}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            {currentQuestion.options.map((option, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <IconButton
                  onClick={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: index,
                    })
                  }
                  size="small"
                >
                  {currentQuestion.correctAnswer === index ? (
                    <CheckCircleIcon color="primary" />
                  ) : (
                    <RadioButtonUncheckedIcon color="action" />
                  )}
                </IconButton>
                <TextField
                  label={`Option ${index + 1}`}
                  fullWidth
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions,
                    });
                  }}
                  sx={{ ml: 1 }}
                />
              </Box>
            ))}
            <TextField
              label="Score"
              type="number"
              value={currentQuestion.score}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  score: parseInt(e.target.value) || 0,
                })
              }
              sx={{ mt: 1, width: 100 }}
              InputProps={{
                startAdornment: <StarIcon color="action" sx={{ mr: 1 }} fontSize="small" />,
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
              sx={{ mt: 2 }}
            >
              Add Question
            </Button>
          </QuestionCard>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => resetForm()} variant="outlined">
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitQuiz}
            startIcon={editingQuizId ? <EditIcon /> : <AddIcon />}
          >
            {editingQuizId ? "Update Quiz" : "Create Quiz"}
          </Button>
        </DialogActions>
      </Dialog>

      {quizzes.length > 0 && (
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <QuizIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
              Existing Quizzes
            </Typography>
          </Box>
          {quizzes.map((quiz) => (
            <Accordion key={quiz.id} sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Avatar sx={{ 
                    bgcolor: getCourseColor(selectedCourse),
                    width: 32, 
                    height: 32,
                    mr: 2
                  }}>
                    <QuizIcon fontSize="small" />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quiz.questions.length} questions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit quiz">
                      <IconButton onClick={(e) => { e.stopPropagation(); handleEditQuiz(quiz); }}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete quiz">
                      <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteQuiz(quiz.id); }}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <QuestionAnswerIcon color="action" sx={{ mr: 1 }} />
                  Questions:
                </Typography>
                <List dense>
                  {quiz.questions.map((q, i) => (
                    <ListItem key={q.id} divider sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={`${i + 1}. ${q.question}`}
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Chip 
                              label={`Correct: ${q.correct_answer}`} 
                              size="small" 
                              color="success"
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                            <Chip 
                              label={`Score: ${q.score}`} 
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon color="action" sx={{ mr: 1 }} />
                  Student Submissions:
                </Typography>
                {quiz.submissions.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 3 }}>
                    No submissions yet
                  </Typography>
                ) : (
                  <List dense>
                    {quiz.submissions.map((sub) => (
                      <ListItem key={sub.id} divider sx={{ py: 1.5 }}>
                        <ListItemText
                          primary={`Student: ${sub.student?.name || "Unknown"}`}
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Chip 
                                label={`Score: ${sub.score}`} 
                                size="small" 
                                color="info"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default QuizPage;
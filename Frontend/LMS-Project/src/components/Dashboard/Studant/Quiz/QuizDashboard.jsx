// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActionArea,
//   Button,
//   CircularProgress,
//   Stepper,
//   Step,
//   StepLabel,
//   Divider,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Alert,
//   Chip,
//   Grid,
//   Paper,
//   Avatar,
//   LinearProgress,
//   Badge,
// } from "@mui/material";
// import {
//   Quiz as QuizIcon,
//   CheckCircle,
//   Cancel,
//   EmojiEvents,
//   AssignmentTurnedIn,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import QuizService from "../../../../services/QuizService";

// const StyledCard = styled(Card)(({ theme }) => ({
//   transition: "transform 0.3s, box-shadow 0.3s",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: theme.shadows[8],
//   },
//   borderRadius: "12px",
//   borderLeft: "4px solid",
//   borderLeftColor: theme.palette.primary.main,
// }));

// const QuizDashboard = ({ selectedLessonId }) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [quizDetails, setQuizDetails] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submission, setSubmission] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch quizzes by lesson ID
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         setLoading(true);
//         const quizzes = await QuizService.getQuizzesByLesson(selectedLessonId);
//         console.log("Fetched Quizzes:", quizzes); // Debug log

//         setQuizzes(quizzes);
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//         setError("Failed to load quizzes.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedLessonId) {
//       fetchQuizzes();
//     }
//   }, [selectedLessonId]);

//   const handleQuizSelect = async (quiz) => {
//     try {
//       setLoading(true);
//       setSelectedQuiz(quiz);
//       setActiveStep(1);

//       // Check if user already submitted this quiz
//       const existingSubmission = await QuizService.checkQuizSubmission(quiz.id);
//       if (existingSubmission) {
//         setSubmission(existingSubmission);
//         setActiveStep(2);
//         return;
//       }

//       // Get quiz details with questions
//       const data = await QuizService.getQuizWithQuestions(quiz.id);
//       setQuizDetails(data);

//       // Initialize empty answers
//       const initialAnswers = {};
//       data.questions.forEach((q) => {
//         initialAnswers[q.id] = null;
//       });
//       setAnswers(initialAnswers);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (questionId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       setLoading(true);
//       const result = await QuizService.submitQuiz(selectedQuiz.id, answers);
//       setSubmission(result);
//       setActiveStep(2);

//       // Refresh quizzes list to update completion status
//       const updatedQuizzes = await QuizService.getQuizzesByLesson(
//         selectedLessonId
//       );
//       setQuizzes(updatedQuizzes);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToQuizzes = () => {
//     setSelectedQuiz(null);
//     setQuizDetails(null);
//     setAnswers({});
//     setSubmission(null);
//     setActiveStep(0);
//   };

//   const calculateScore = () => {
//     if (!submission || !quizDetails) return 0;

//     let correctCount = 0;
//     quizDetails.questions.forEach((question) => {
//       if (submission.answers[question.id] === question.correct_answer) {
//         correctCount++;
//       }
//     });

//     return Math.round((correctCount / quizDetails.questions.length) * 100);
//   };

//   const steps = ["Select Quiz", "Take Quiz", "Results"];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       {loading && (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {activeStep === 0 && (
//         <Box>
//           <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
//             Available Quizzes
//           </Typography>

//           {quizzes.length === 0 && !loading && (
//             <Alert severity="info">No quizzes available for this lesson.</Alert>
//           )}

//           <Grid container spacing={3}>
//             {quizzes.map((quiz) => (
//               <Grid item xs={12} sm={6} md={4} key={quiz.id}>
//                 <StyledCard>
//                   <CardActionArea onClick={() => handleQuizSelect(quiz)}>
//                     <CardContent>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", mb: 1 }}
//                       >
//                         <QuizIcon color="primary" sx={{ mr: 1 }} />
//                         <Typography variant="h6" component="div">
//                           {quiz.title}
//                         </Typography>
//                       </Box>
//                       <Typography variant="body2" color="text.secondary">
//                         Max Score: {quiz.max_score}
//                       </Typography>
//                       <Box sx={{ mt: 2 }}>
//                         <Chip
//                           label={
//                             quiz.submission_id ? "Completed" : "Not Attempted"
//                           }
//                           color={quiz.submission_id ? "success" : "warning"}
//                           size="small"
//                         />
//                       </Box>
//                     </CardContent>
//                   </CardActionArea>
//                 </StyledCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {activeStep === 1 && quizDetails && (
//         <Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//             <Typography variant="h5">{quizDetails.quiz.title}</Typography>
//             <Button variant="outlined" onClick={handleBackToQuizzes}>
//               Back to Quizzes
//             </Button>
//           </Box>

//           {quizDetails.questions.map((question, index) => (
//             <Paper key={question.id} sx={{ p: 3, mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Question {index + 1}: {question.question_text}
//               </Typography>
//               <FormControl component="fieldset" sx={{ mt: 2 }}>
//                 <RadioGroup
//                   value={answers[question.id] || ""}
//                   onChange={(e) =>
//                     handleAnswerChange(question.id, e.target.value)
//                   }
//                 >
//                   {question.options.map((option, i) => (
//                     <FormControlLabel
//                       key={i}
//                       value={option}
//                       control={<Radio />}
//                       label={option}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             </Paper>
//           ))}

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
//             <Button
//               variant="contained"
//               onClick={handleSubmitQuiz}
//               disabled={
//                 loading ||
//                 Object.values(answers).some((a) => a === null) ||
//                 Object.values(answers).length === 0
//               }
//               endIcon={<AssignmentTurnedIn />}
//             >
//               {loading ? "Submitting..." : "Submit Quiz"}
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {activeStep === 2 && submission && (
//         <Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//             <Typography variant="h4" gutterBottom>
//               Quiz Results: {selectedQuiz.title}
//             </Typography>
//             <Button variant="outlined" onClick={handleBackToQuizzes}>
//               Back to Quizzes
//             </Button>
//           </Box>

//           <Box sx={{ textAlign: "center", mb: 4 }}>
//             <Avatar
//               sx={{
//                 width: 120,
//                 height: 120,
//                 mx: "auto",
//                 mb: 2,
//                 bgcolor: calculateScore() >= 70 ? "success.main" : "error.main",
//               }}
//             >
//               <Typography variant="h2">{calculateScore()}%</Typography>
//             </Avatar>
//             <Typography variant="h5" gutterBottom>
//               {calculateScore() >= 70 ? "Congratulations!" : "Keep Practicing!"}
//             </Typography>
//             <Typography color="text.secondary">
//               You scored {calculateScore()}% on this quiz
//             </Typography>
//           </Box>

//           <Divider sx={{ my: 3 }} />

//           <Typography variant="h6" gutterBottom>
//             Detailed Results:
//           </Typography>
//           {quizDetails.questions.map((question, index) => {
//             const userAnswer = submission.answers[question.id];
//             const isCorrect = userAnswer === question.correct_answer;

//             return (
//               <Paper key={question.id} sx={{ p: 3, mb: 2 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
//                     Question {index + 1}: {question.question_text}
//                   </Typography>
//                   {isCorrect ? (
//                     <CheckCircle color="success" />
//                   ) : (
//                     <Cancel color="error" />
//                   )}
//                 </Box>
//                 <Typography variant="body2" color="text.secondary">
//                   Your answer: {userAnswer || "Not answered"}
//                 </Typography>
//                 {!isCorrect && (
//                   <Typography variant="body2" color="text.secondary">
//                     Correct answer: {question.correct_answer}
//                   </Typography>
//                 )}
//               </Paper>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default QuizDashboard;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActionArea,
//   Button,
//   CircularProgress,
//   Stepper,
//   Step,
//   StepLabel,
//   Divider,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Alert,
//   Chip,
//   Grid,
//   Paper,
//   Avatar,
//   Badge,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import {
//   Quiz as QuizIcon,
//   CheckCircle,
//   Cancel,
//   EmojiEvents,
//   AssignmentTurnedIn,
//   ArrowBack,
//   Star,
//   StarBorder,
//   Timer,
//   HelpOutline,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import QuizService from "../../../../services/QuizService";

// const StyledCard = styled(Card)(({ theme }) => ({
//   transition: "transform 0.3s, box-shadow 0.3s",
//   "&:hover": {
//     transform: "translateY(-8px)",
//     boxShadow: theme.shadows[10],
//   },
//   borderRadius: "16px",
//   background: theme.palette.mode === 'light' 
//     ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
//     : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
//   border: `1px solid ${theme.palette.divider}`,
//   position: "relative",
//   overflow: "visible",
// }));

// const QuizBadge = styled(Chip)(({ theme }) => ({
//   position: "absolute",
//   top: -10,
//   right: 20,
//   fontWeight: 700,
//   fontSize: "0.75rem",
//   height: 24,
//   borderRadius: 12,
//   boxShadow: theme.shadows[2],
// }));

// const QuestionCard = styled(Paper)(({ theme, correct }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(3),
//   borderRadius: "12px",
//   background: correct 
//     ? theme.palette.mode === 'light'
//       ? `linear-gradient(145deg, ${theme.palette.success.light}20 0%, ${theme.palette.success.light}10 100%)`
//       : `linear-gradient(145deg, ${theme.palette.success.dark}20 0%, ${theme.palette.success.dark}10 100%)`
//     : theme.palette.mode === 'light'
//       ? `linear-gradient(145deg, ${theme.palette.error.light}20 0%, ${theme.palette.error.light}10 100%)`
//       : `linear-gradient(145deg, ${theme.palette.error.dark}20 0%, ${theme.palette.error.dark}10 100%)`,
//   borderLeft: `4px solid ${correct ? theme.palette.success.main : theme.palette.error.main}`,
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: theme.shadows[4],
//   },
// }));

// const OptionRadio = styled(Radio)(({ theme, correct, selected }) => ({
//   color: correct 
//     ? theme.palette.success.main 
//     : selected 
//       ? theme.palette.error.main 
//       : theme.palette.text.secondary,
//   '&.Mui-checked': {
//     color: correct ? theme.palette.success.main : theme.palette.error.main,
//   },
// }));

// const ProgressAvatar = styled(Avatar)(({ theme, score }) => ({
//   width: 140,
//   height: 140,
//   background: score >= 70
//     ? `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
//     : `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
//   boxShadow: theme.shadows[6],
//   position: "relative",
//   "&:after": {
//     content: '""',
//     position: "absolute",
//     inset: -5,
//     borderRadius: "50%",
//     border: `2px dashed ${score >= 70 ? theme.palette.success.light : theme.palette.error.light}`,
//     animation: "spin 10s linear infinite",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// }));

// const QuizDashboard = ({ selectedLessonId }) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [quizDetails, setQuizDetails] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submission, setSubmission] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const theme = useTheme();

//   // Timer effect for active quiz
//   useEffect(() => {
//     let interval;
//     if (activeStep === 1 && quizDetails) {
//       interval = setInterval(() => {
//         setTimer(prev => prev + 1);
//       }, 1000);
//     } else {
//       setTimer(0);
//     }
//     return () => clearInterval(interval);
//   }, [activeStep, quizDetails]);

//   // Format timer to MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Fetch quizzes by lesson ID
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         setLoading(true);
//         const quizzes = await QuizService.getQuizzesByLesson(selectedLessonId);
//         setQuizzes(quizzes);
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//         setError("Failed to load quizzes.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedLessonId) {
//       fetchQuizzes();
//     }
//   }, [selectedLessonId]);

//   const handleQuizSelect = async (quiz) => {
//     try {
//       setLoading(true);
//       setSelectedQuiz(quiz);
//       setActiveStep(1);

//       // Check if user already submitted this quiz
//       const existingSubmission = await QuizService.checkQuizSubmission(quiz.id);
//       if (existingSubmission) {
//         setSubmission(existingSubmission);
//         setActiveStep(2);
//         return;
//       }

//       // Get quiz details with questions
//       const data = await QuizService.getQuizWithQuestions(quiz.id);
//       setQuizDetails(data);

//       // Initialize empty answers
//       const initialAnswers = {};
//       data.questions.forEach((q) => {
//         initialAnswers[q.id] = null;
//       });
//       setAnswers(initialAnswers);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (questionId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       setLoading(true);
//       const result = await QuizService.submitQuiz(selectedQuiz.id, answers);
//       setSubmission(result);
//       setActiveStep(2);

//       // Refresh quizzes list to update completion status
//       const updatedQuizzes = await QuizService.getQuizzesByLesson(
//         selectedLessonId
//       );
//       setQuizzes(updatedQuizzes);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToQuizzes = () => {
//     setSelectedQuiz(null);
//     setQuizDetails(null);
//     setAnswers({});
//     setSubmission(null);
//     setActiveStep(0);
//   };

//   const calculateScore = () => {
//     if (!submission || !quizDetails) return 0;

//     let correctCount = 0;
//     quizDetails.questions.forEach((question) => {
//       if (submission.answers[question.id] === question.correct_answer) {
//         correctCount++;
//       }
//     });

//     return Math.round((correctCount / quizDetails.questions.length) * 100);
//   };

//   const steps = ["Select Quiz", "Take Quiz", "Results"];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stepper 
//         activeStep={activeStep} 
//         alternativeLabel 
//         sx={{ 
//           mb: 4,
//           "& .MuiStepLabel-label": {
//             fontWeight: 600,
//           },
//           "& .Mui-active .MuiStepLabel-label": {
//             color: theme.palette.primary.main,
//           },
//           "& .Mui-completed .MuiStepLabel-label": {
//             color: theme.palette.success.main,
//           },
//         }}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel 
//               StepIconProps={{
//                 style: {
//                   color: activeStep >= steps.indexOf(label) 
//                     ? steps.indexOf(label) < activeStep 
//                       ? theme.palette.success.main 
//                       : theme.palette.primary.main
//                     : theme.palette.text.disabled,
//                 }
//               }}
//             >
//               {label}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ 
//             mb: 3,
//             borderRadius: 2,
//             boxShadow: theme.shadows[1],
//           }} 
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       )}

//       {loading && (
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           my: 4,
//           "& .MuiCircularProgress-root": {
//             color: theme.palette.primary.main,
//           }
//         }}>
//           <CircularProgress size={60} thickness={4} />
//         </Box>
//       )}

//       {activeStep === 0 && (
//         <Box>
//           <Typography 
//             variant="h4" 
//             gutterBottom 
//             sx={{ 
//               mb: 3,
//               fontWeight: 700,
//               color: theme.palette.mode === 'light' 
//                 ? theme.palette.primary.dark 
//                 : theme.palette.primary.light,
//             }}
//           >
//             Available Quizzes
//           </Typography>

//           {quizzes.length === 0 && !loading && (
//             <Alert 
//               severity="info" 
//               sx={{ 
//                 borderRadius: 2,
//                 boxShadow: theme.shadows[1],
//               }}
//             >
//               No quizzes available for this lesson.
//             </Alert>
//           )}

//           <Grid container spacing={3}>
//             {quizzes.map((quiz) => (
//               <Grid item xs={12} sm={6} md={4} key={quiz.id}>
//                 <StyledCard elevation={3}>
//                   <QuizBadge
//                     label={`${quiz.max_score} pts`}
//                     color="primary"
//                     size="small"
//                   />
//                   <CardActionArea onClick={() => handleQuizSelect(quiz)}>
//                     <CardContent sx={{ pt: 3 }}>
//                       <Box
//                         sx={{ 
//                           display: "flex", 
//                           alignItems: "center", 
//                           mb: 1,
//                         }}
//                       >
//                         <QuizIcon 
//                           color="primary" 
//                           sx={{ 
//                             mr: 1,
//                             fontSize: 32,
//                           }} 
//                         />
//                         <Typography 
//                           variant="h6" 
//                           component="div"
//                           sx={{
//                             fontWeight: 600,
//                           }}
//                         >
//                           {quiz.title}
//                         </Typography>
//                       </Box>
//                       <Typography 
//                         variant="body2" 
//                         color="text.secondary"
//                         sx={{ mb: 2 }}
//                       >
//                         {quiz.description || "Test your knowledge on this topic"}
//                       </Typography>
//                       <Box sx={{ 
//                         display: "flex", 
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}>
//                         <Chip
//                           label={
//                             quiz.submission_id ? "Completed" : "Not Attempted"
//                           }
//                           color={quiz.submission_id ? "success" : "warning"}
//                           size="small"
//                           variant="outlined"
//                         />
//                         <Box sx={{ display: "flex" }}>
//                           {[...Array(3)].map((_, i) => (
//                             quiz.difficulty > i ? (
//                               <Star key={i} color="warning" fontSize="small" />
//                             ) : (
//                               <StarBorder key={i} color="disabled" fontSize="small" />
//                             )
//                           ))}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </CardActionArea>
//                 </StyledCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {activeStep === 1 && quizDetails && (
//         <Box>
//           <Box sx={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             mb: 3,
//             p: 2,
//             borderRadius: 2,
//             background: theme.palette.mode === 'light'
//               ? `linear-gradient(90deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`
//               : `linear-gradient(90deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.default} 100%)`,
//             boxShadow: theme.shadows[1],
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton onClick={handleBackToQuizzes} sx={{ mr: 1 }}>
//                 <ArrowBack />
//               </IconButton>
//               <Typography 
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                 }}
//               >
//                 {quizDetails.quiz.title}
//               </Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Timer color="action" sx={{ mr: 1 }} />
//               <Typography variant="body1" color="text.secondary">
//                 {formatTime(timer)}
//               </Typography>
//             </Box>
//           </Box>

//           {quizDetails.questions.map((question, index) => (
//             <Paper 
//               key={question.id} 
//               sx={{ 
//                 p: 3, 
//                 mb: 3,
//                 borderRadius: "12px",
//                 borderLeft: `4px solid ${theme.palette.primary.main}`,
//                 background: theme.palette.mode === 'light'
//                   ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
//                   : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: theme.shadows[4],
//                 },
//               }}
//             >
//               <Typography 
//                 variant="h6" 
//                 gutterBottom
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: 600,
//                 }}
//               >
//                 <HelpOutline 
//                   color="primary" 
//                   sx={{ 
//                     mr: 1,
//                     fontSize: 24,
//                   }} 
//                 />
//                 Question {index + 1}: {question.question_text}
//               </Typography>
//               <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
//                 <RadioGroup
//                   value={answers[question.id] || ""}
//                   onChange={(e) =>
//                     handleAnswerChange(question.id, e.target.value)
//                   }
//                 >
//                   {question.options.map((option, i) => (
//                     <FormControlLabel
//                       key={i}
//                       value={option}
//                       control={<Radio color="primary" />}
//                       label={option}
//                       sx={{
//                         mb: 1,
//                         p: 1,
//                         borderRadius: 1,
//                         transition: "all 0.2s ease",
//                         "&:hover": {
//                           background: theme.palette.action.hover,
//                         },
//                         "&.Mui-checked": {
//                           background: theme.palette.action.selected,
//                         },
//                       }}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             </Paper>
//           ))}

//           <Box sx={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             mt: 4,
//             p: 2,
//             borderRadius: 2,
//             background: theme.palette.mode === 'light'
//               ? `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
//               : `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[800]} 100%)`,
//             boxShadow: theme.shadows[1],
//           }}>
//             <Typography variant="body2" color="text.secondary">
//               {Object.values(answers).filter(a => a !== null).length} / {quizDetails.questions.length} questions answered
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={handleSubmitQuiz}
//               disabled={
//                 loading ||
//                 Object.values(answers).some((a) => a === null) ||
//                 Object.values(answers).length === 0
//               }
//               endIcon={<AssignmentTurnedIn />}
//               sx={{
//                 fontWeight: 700,
//                 px: 4,
//                 py: 1.5,
//                 borderRadius: 2,
//                 boxShadow: theme.shadows[2],
//                 "&:hover": {
//                   boxShadow: theme.shadows[4],
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               {loading ? "Submitting..." : "Submit Quiz"}
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {activeStep === 2 && submission && (
//         <Box>
//           <Box sx={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             mb: 3,
//             p: 2,
//             borderRadius: 2,
//             background: theme.palette.mode === 'light'
//               ? `linear-gradient(90deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`
//               : `linear-gradient(90deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.default} 100%)`,
//             boxShadow: theme.shadows[1],
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton onClick={handleBackToQuizzes} sx={{ mr: 1 }}>
//                 <ArrowBack />
//               </IconButton>
//               <Typography 
//                 variant="h4" 
//                 gutterBottom
//                 sx={{
//                   fontWeight: 700,
//                 }}
//               >
//                 Quiz Results: {selectedQuiz.title}
//               </Typography>
//             </Box>
//             <Button 
//               variant="outlined" 
//               onClick={handleBackToQuizzes}
//               sx={{
//                 fontWeight: 600,
//               }}
//             >
//               Back to Quizzes
//             </Button>
//           </Box>

//           <Box sx={{ 
//             textAlign: "center", 
//             mb: 4,
//             p: 4,
//             borderRadius: 4,
//             background: theme.palette.mode === 'light'
//               ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
//               : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
//             boxShadow: theme.shadows[2],
//           }}>
//             <ProgressAvatar score={calculateScore()}>
//               <Typography variant="h2" sx={{ fontWeight: 700 }}>
//                 {calculateScore()}%
//               </Typography>
//             </ProgressAvatar>
//             <Typography 
//               variant="h4" 
//               gutterBottom
//               sx={{
//                 mt: 3,
//                 fontWeight: 700,
//                 color: calculateScore() >= 70 
//                   ? theme.palette.success.main 
//                   : theme.palette.error.main,
//               }}
//             >
//               {calculateScore() >= 70 ? "Congratulations!" : "Keep Practicing!"}
//             </Typography>
//             <Typography 
//               variant="body1" 
//               color="text.secondary"
//               sx={{
//                 maxWidth: "600px",
//                 mx: "auto",
//               }}
//             >
//               You scored {calculateScore()}% on this quiz. 
//               {calculateScore() >= 70 
//                 ? " Great job! You've demonstrated a strong understanding of this material."
//                 : " Review the questions below to improve your understanding."}
//             </Typography>
            
//             {calculateScore() >= 70 && (
//               <Box sx={{ mt: 2 }}>
//                 <EmojiEvents 
//                   color="warning" 
//                   sx={{ 
//                     fontSize: 48,
//                     animation: "bounce 1s infinite alternate",
//                     "@keyframes bounce": {
//                       "0%": { transform: "translateY(0)" },
//                       "100%": { transform: "translateY(-10px)" },
//                     }
//                   }} 
//                 />
//               </Box>
//             )}
//           </Box>

//           <Divider 
//             sx={{ 
//               my: 3,
//               borderColor: theme.palette.divider,
//               borderWidth: 1,
//             }} 
//           />

//           <Typography 
//             variant="h5" 
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               mb: 3,
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <EmojiEvents color="warning" sx={{ mr: 1 }} />
//             Detailed Results:
//           </Typography>
//           {quizDetails.questions.map((question, index) => {
//             const userAnswer = submission.answers[question.id];
//             const isCorrect = userAnswer === question.correct_answer;

//             return (
//               <QuestionCard 
//                 key={question.id} 
//                 correct={isCorrect}
//                 elevation={1}
//               >
//                 <Box sx={{ 
//                   display: "flex", 
//                   alignItems: "center", 
//                   mb: 1,
//                 }}>
//                   <Typography 
//                     variant="subtitle1" 
//                     sx={{ 
//                       flexGrow: 1,
//                       fontWeight: 600,
//                     }}
//                   >
//                     Question {index + 1}: {question.question_text}
//                   </Typography>
//                   {isCorrect ? (
//                     <CheckCircle color="success" fontSize="large" />
//                   ) : (
//                     <Cancel color="error" fontSize="large" />
//                   )}
//                 </Box>
//                 <Typography 
//                   variant="body2" 
//                   color="text.secondary"
//                   sx={{ 
//                     mb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span style={{ 
//                     fontWeight: 600, 
//                     color: theme.palette.text.primary,
//                     marginRight: 8,
//                   }}>
//                     Your answer:
//                   </span> 
//                   {userAnswer || "Not answered"}
//                 </Typography>
//                 {!isCorrect && (
//                   <Typography 
//                     variant="body2" 
//                     color="text.secondary"
//                     sx={{ 
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span style={{ 
//                       fontWeight: 600, 
//                       color: theme.palette.text.primary,
//                       marginRight: 8,
//                     }}>
//                       Correct answer:
//                     </span> 
//                     {question.correct_answer}
//                   </Typography>
//                 )}
//               </QuestionCard>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default QuizDashboard;




import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  Chip,
  Grid,
  Paper,
  Avatar,
  Badge,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  CheckCircle,
  Cancel,
  EmojiEvents,
  AssignmentTurnedIn,
  ArrowBack,
  Star,
  StarBorder,
  Timer,
  HelpOutline,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import QuizService from "../../../../services/QuizService";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[10],
  },
  borderRadius: "16px",
  background: theme.palette.mode === 'light' 
    ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "visible",
}));

const QuizBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: -10,
  right: 20,
  fontWeight: 700,
  fontSize: "0.75rem",
  height: 24,
  borderRadius: 12,
  boxShadow: theme.shadows[2],
}));

const QuestionCard = styled(Paper)(({ theme, correct }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  background: correct 
    ? theme.palette.mode === 'light'
      ? `linear-gradient(145deg, ${theme.palette.success.light}20 0%, ${theme.palette.success.light}10 100%)`
      : `linear-gradient(145deg, ${theme.palette.success.dark}20 0%, ${theme.palette.success.dark}10 100%)`
    : theme.palette.mode === 'light'
      ? `linear-gradient(145deg, ${theme.palette.error.light}20 0%, ${theme.palette.error.light}10 100%)`
      : `linear-gradient(145deg, ${theme.palette.error.dark}20 0%, ${theme.palette.error.dark}10 100%)`,
  borderLeft: `4px solid ${correct ? theme.palette.success.main : theme.palette.error.main}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const OptionRadio = styled(Radio)(({ theme, correct, selected }) => ({
  color: correct 
    ? theme.palette.success.main 
    : selected 
      ? theme.palette.error.main 
      : theme.palette.text.secondary,
  '&.Mui-checked': {
    color: correct ? theme.palette.success.main : theme.palette.error.main,
  },
}));

const ProgressAvatar = styled(Avatar)(({ theme, score }) => ({
  width: 140,
  height: 140,
  background: score >= 70
    ? `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
    : `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
  boxShadow: theme.shadows[6],
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    inset: -5,
    borderRadius: "50%",
    border: `2px dashed ${score >= 70 ? theme.palette.success.light : theme.palette.error.light}`,
    animation: "spin 10s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const QuizDashboard = ({ selectedLessonId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizDetails, setQuizDetails] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const theme = useTheme();

  // Timer effect for active quiz
  useEffect(() => {
    let interval;
    if (activeStep === 1 && quizDetails) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeStep, quizDetails]);

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch quizzes by lesson ID
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const quizzes = await QuizService.getQuizzesByLesson(selectedLessonId);
        setQuizzes(quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedLessonId) {
      fetchQuizzes();
    }
  }, [selectedLessonId]);

  const handleQuizSelect = async (quiz) => {
    try {
      setLoading(true);
      setSelectedQuiz(quiz);
      setActiveStep(1);

      // Check if user already submitted this quiz
      const existingSubmission = await QuizService.checkQuizSubmission(quiz.id);
      if (existingSubmission) {
        setSubmission(existingSubmission);
        setActiveStep(2);
        return;
      }

      // Get quiz details with questions
      const data = await QuizService.getQuizWithQuestions(quiz.id);
      setQuizDetails(data);

      // Initialize empty answers
      const initialAnswers = {};
      data.questions.forEach((q) => {
        initialAnswers[q.id] = null;
      });
      setAnswers(initialAnswers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      setLoading(true);
      const result = await QuizService.submitQuiz(selectedQuiz.id, answers);
      setSubmission(result);
      setActiveStep(2);

      // Refresh quizzes list to update completion status
      const updatedQuizzes = await QuizService.getQuizzesByLesson(
        selectedLessonId
      );
      setQuizzes(updatedQuizzes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizDetails(null);
    setAnswers({});
    setSubmission(null);
    setActiveStep(0);
  };

  const calculateScore = () => {
    if (!submission || !quizDetails) return 0;

    let correctCount = 0;
    quizDetails.questions.forEach((question) => {
      if (submission.answers[question.id] === question.correct_answer) {
        correctCount++;
      }
    });

    return Math.round((correctCount / quizDetails.questions.length) * 100);
  };

  const steps = ["Select Quiz", "Take Quiz", "Results"];

  return (
    <Box sx={{ p: 3 }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel 
        sx={{ 
          mb: 4,
          "& .MuiStepLabel-label": {
            fontWeight: 600,
          },
          "& .Mui-active .MuiStepLabel-label": {
            color: theme.palette.primary.main,
          },
          "& .Mui-completed .MuiStepLabel-label": {
            color: theme.palette.success.main,
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel 
              StepIconProps={{
                style: {
                  color: activeStep >= steps.indexOf(label) 
                    ? steps.indexOf(label) < activeStep 
                      ? theme.palette.success.main 
                      : theme.palette.primary.main
                    : theme.palette.text.disabled,
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
          }} 
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          my: 4,
          "& .MuiCircularProgress-root": {
            color: theme.palette.primary.main,
          }
        }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}

      {activeStep === 0 && (
        <Box>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              color: theme.palette.mode === 'light' 
                ? theme.palette.primary.dark 
                : theme.palette.primary.light,
            }}
          >
            Available Quizzes
          </Typography>

          {quizzes.length === 0 && !loading && (
            <Alert 
              severity="info" 
              sx={{ 
                borderRadius: 2,
                boxShadow: theme.shadows[1],
              }}
            >
              No quizzes available for this lesson.
            </Alert>
          )}

          <Grid container spacing={3}>
            {quizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                <StyledCard elevation={3}>
                  <QuizBadge
                    label={`${quiz.max_score} pts`}
                    color="primary"
                    size="small"
                  />
                  <CardActionArea onClick={() => handleQuizSelect(quiz)}>
                    <CardContent sx={{ pt: 3 }}>
                      <Box
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          mb: 1,
                        }}
                      >
                        <QuizIcon 
                          color="primary" 
                          sx={{ 
                            mr: 1,
                            fontSize: 32,
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          component="div"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {quiz.title}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {quiz.description || "Test your knowledge on this topic"}
                      </Typography>
                      <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <Chip
                          label={
                            quiz.submission_id ? "Completed" : "Not Attempted"
                          }
                          color={quiz.submission_id ? "success" : "warning"}
                          size="small"
                          variant="outlined"
                        />
                        <Box sx={{ display: "flex" }}>
                          {[...Array(3)].map((_, i) => (
                            quiz.difficulty > i ? (
                              <Star key={i} color="warning" fontSize="small" />
                            ) : (
                              <StarBorder key={i} color="disabled" fontSize="small" />
                            )
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeStep === 1 && quizDetails && (
        <Box>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 3,
            p: 2,
            borderRadius: 2,
            background: theme.palette.mode === 'light'
              ? `linear-gradient(90deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`
              : `linear-gradient(90deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: theme.shadows[1],
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleBackToQuizzes} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {quizDetails.quiz.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Timer color="action" sx={{ mr: 1 }} />
              <Typography variant="body1" color="text.secondary">
                {formatTime(timer)}
              </Typography>
            </Box>
          </Box>

          {quizDetails.questions.map((question, index) => (
            <Paper 
              key={question.id} 
              sx={{ 
                p: 3, 
                mb: 3,
                borderRadius: "12px",
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                background: theme.palette.mode === 'light'
                  ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
                  : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                <HelpOutline 
                  color="primary" 
                  sx={{ 
                    mr: 1,
                    fontSize: 24,
                  }} 
                />
                Question {index + 1}: {question.question_text}
              </Typography>
              <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                >
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio color="primary" />}
                      label={option}
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: theme.palette.action.hover,
                        },
                        "&.Mui-checked": {
                          background: theme.palette.action.selected,
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          ))}

          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mt: 4,
            p: 2,
            borderRadius: 2,
            background: theme.palette.mode === 'light'
              ? `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
              : `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[800]} 100%)`,
            boxShadow: theme.shadows[1],
          }}>
            <Typography variant="body2" color="text.secondary">
              {Object.values(answers).filter(a => a !== null).length} / {quizDetails.questions.length} questions answered
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmitQuiz}
              disabled={
                loading ||
                Object.values(answers).some((a) => a === null) ||
                Object.values(answers).length === 0
              }
              endIcon={<AssignmentTurnedIn />}
              sx={{
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                  transform: "translateY(-1px)",
                },
              }}
            >
              {loading ? "Submitting..." : "Submit Quiz"}
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && submission && (
        <Box>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 3,
            p: 2,
            borderRadius: 2,
            background: theme.palette.mode === 'light'
              ? `linear-gradient(90deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`
              : `linear-gradient(90deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: theme.shadows[1],
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleBackToQuizzes} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                }}
              >
                Quiz Results: {selectedQuiz.title}
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              onClick={handleBackToQuizzes}
              sx={{
                fontWeight: 600,
              }}
            >
              Back to Quizzes
            </Button>
          </Box>

          <Box sx={{ 
            textAlign: "center", 
            mb: 4,
            p: 4,
            borderRadius: 4,
            background: theme.palette.mode === 'light'
              ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
              : `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
            boxShadow: theme.shadows[2],
          }}>
            <ProgressAvatar score={calculateScore()}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                {calculateScore()}%
              </Typography>
            </ProgressAvatar>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                mt: 3,
                fontWeight: 700,
                color: calculateScore() >= 70 
                  ? theme.palette.success.main 
                  : theme.palette.error.main,
              }}
            >
              {calculateScore() >= 70 ? "Congratulations!" : "Keep Practicing!"}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              You scored {calculateScore()}% on this quiz. 
              {calculateScore() >= 70 
                ? " Great job! You've demonstrated a strong understanding of this material."
                : " Review the questions below to improve your understanding."}
            </Typography>
            
            {calculateScore() >= 70 && (
              <Box sx={{ mt: 2 }}>
                <EmojiEvents 
                  color="warning" 
                  sx={{ 
                    fontSize: 48,
                    animation: "bounce 1s infinite alternate",
                    "@keyframes bounce": {
                      "0%": { transform: "translateY(0)" },
                      "100%": { transform: "translateY(-10px)" },
                    }
                  }} 
                />
              </Box>
            )}
          </Box>

          <Divider 
            sx={{ 
              my: 3,
              borderColor: theme.palette.divider,
              borderWidth: 1,
            }} 
          />

          <Typography 
            variant="h5" 
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <EmojiEvents color="warning" sx={{ mr: 1 }} />
            Detailed Results:
          </Typography>
          {quizDetails.questions.map((question, index) => {
            const userAnswer = submission.answers[question.id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <QuestionCard 
                key={question.id} 
                correct={isCorrect}
                elevation={1}
              >
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  mb: 1,
                }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      flexGrow: 1,
                      fontWeight: 600,
                    }}
                  >
                    Question {index + 1}: {question.question_text}
                  </Typography>
                  {isCorrect ? (
                    <CheckCircle color="success" fontSize="large" />
                  ) : (
                    <Cancel color="error" fontSize="large" />
                  )}
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    marginRight: 8,
                  }}>
                    Your answer:
                  </span> 
                  {userAnswer || "Not answered"}
                </Typography>
                {!isCorrect && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ 
                      fontWeight: 600, 
                      color: theme.palette.text.primary,
                      marginRight: 8,
                    }}>
                      Correct answer:
                    </span> 
                    {question.correct_answer}
                  </Typography>
                )}
              </QuestionCard>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default QuizDashboard;
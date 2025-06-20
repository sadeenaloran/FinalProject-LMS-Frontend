// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   LinearProgress,
// // //   Typography,
// // //   Box,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Divider,
// // //   Chip,
// // //   Button,
// // //   CircularProgress,
// // // } from "@mui/material";
// // // import { styled } from "@mui/system";
// // // import EnrollmentService from "../../services/EnrollemtServices";
// // // import { progressDialogStyles } from "../../theme/studentStyle";

// // // const ProgressContainer = styled(Box)(({ theme }) => ({
// // //   display: "flex",
// // //   flexDirection: "column",
// // //   gap: theme.spacing(3),
// // // }));

// // // const ProgressDialog = ({ open, onClose, course }) => {
// // //   const [progress, setProgress] = useState({
// // //     modules: [], // Initialize with empty modules array
// // //     overallProgress: 0,
// // //   });
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (open && course) {
// // //       const fetchProgress = async () => {
// // //         try {
// // //           setLoading(true);
// // //           const progressData = await EnrollmentService.getCourseProgressDetails(
// // //             course.id
// // //           );
// // //           // Ensure modules array exists in response
// // //           setProgress({
// // //             ...progressData,
// // //             modules: progressData?.modules || [], // Fallback to empty array
// // //           });
// // //         } catch (error) {
// // //           console.error("Error fetching progress:", error);
// // //           setProgress((prev) => ({ ...prev, modules: [] })); // Reset to empty on error
// // //         } finally {
// // //           setLoading(false);
// // //         }
// // //       };

// // //       fetchProgress();
// // //     }
// // //   }, [open, course]);

// // //   return (
// // //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// // //       <DialogTitle sx={progressDialogStyles.title}>
// // //         Progress for {course?.title}
// // //       </DialogTitle>
// // //       <DialogContent>
// // //         {loading ? (
// // //           <Box sx={progressDialogStyles.loadingContainer}>
// // //             <CircularProgress />
// // //           </Box>
// // //         ) : (
// // //           <ProgressContainer>
// // //             <Box sx={progressDialogStyles.progressBarContainer}>
// // //               <Typography variant="subtitle1" gutterBottom>
// // //                 Overall Progress: {progress.overallProgress}%
// // //               </Typography>
// // //               <LinearProgress
// // //                 variant="determinate"
// // //                 value={progress.overallProgress}
// // //                 sx={progressDialogStyles.progressBar}
// // //               />
// // //             </Box>

// // //             <Divider />

// // //             <Box>
// // //               <Typography variant="h6" sx={progressDialogStyles.sectionTitle}>
// // //                 Modules
// // //               </Typography>
// // //               {progress.modules.length > 0 ? (
// // //                 <List>
// // //                   {progress.modules.map((module) => (
// // //                     <Box
// // //                       key={module.id}
// // //                       sx={progressDialogStyles.moduleContainer}
// // //                     >
// // //                       <ListItem>
// // //                         <ListItemText
// // //                           primary={module.title}
// // //                           secondary={`${module.completedLessons}/${module.totalLessons} lessons completed`}
// // //                         />
// // //                         <Chip
// // //                           label={`${module.progress}%`}
// // //                           color={
// // //                             module.progress === 100 ? "success" : "primary"
// // //                           }
// // //                         />
// // //                       </ListItem>
// // //                       <LinearProgress
// // //                         variant="determinate"
// // //                         value={module.progress}
// // //                         sx={progressDialogStyles.moduleProgress}
// // //                       />
// // //                     </Box>
// // //                   ))}
// // //                 </List>
// // //               ) : (
// // //                 <Typography
// // //                   variant="body2"
// // //                   color="textSecondary"
// // //                   sx={{ mt: 2 }}
// // //                 >
// // //                   No modules found for this course
// // //                 </Typography>
// // //               )}
// // //             </Box>
// // //           </ProgressContainer>
// // //         )}
// // //       </DialogContent>
// // //       <Box sx={progressDialogStyles.dialogActions}>
// // //         <Button onClick={onClose} sx={progressDialogStyles.closeButton}>
// // //           Close
// // //         </Button>
// // //       </Box>
// // //     </Dialog>
// // //   );
// // // };

// // // export default ProgressDialog;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   LinearProgress,
// //   Typography,
// //   Box,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Divider,
// //   Chip,
// //   Button,
// //   CircularProgress,
// //   Alert,
// // } from "@mui/material";
// // import { styled } from "@mui/system";
// // import EnrollmentService from "../../services/EnrollemtServices";
// // import { progressDialogStyles } from "../../theme/studentStyle";

// // const ProgressContainer = styled(Box)(({ theme }) => ({
// //   display: "flex",
// //   flexDirection: "column",
// //   gap: theme.spacing(3),
// // }));

// // const ProgressDialog = ({ open, onClose, course }) => {
// //   const [progress, setProgress] = useState({
// //     modules: [],
// //     overallProgress: 0,
// //     completedLessons: [],
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchProgress = async () => {
// //       if (!open || !course?.id) return;

// //       try {
// //         setLoading(true);
// //         setError(null);
// //         console.log(`Fetching progress for course ID: ${course.id}`);

// //         const progressData = await EnrollmentService.getCourseProgressDetails(
// //           course.id
// //         );
// //         console.log("Received progress data:", progressData);

// //         setProgress({
// //           modules: Array.isArray(progressData?.modules)
// //             ? progressData.modules
// //             : [],
// //           overallProgress: progressData?.overallProgress || 0,
// //           completedLessons: Array.isArray(progressData?.completedLessons)
// //             ? progressData.completedLessons
// //             : [],
// //         });
// //       } catch (err) {
// //         console.error("Failed to fetch progress:", {
// //           error: err,
// //           response: err.response?.data,
// //         });
// //         setError(err.response?.data?.message || "Failed to load progress data");
// //         setProgress((prev) => ({
// //           ...prev,
// //           modules: [],
// //           completedLessons: [],
// //         }));
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Add a small delay to prevent rapid successive calls
// //     const timer = setTimeout(fetchProgress, 300);
// //     return () => clearTimeout(timer);
// //   }, [open, course]);

// //   const handleClose = () => {
// //     setError(null);
// //     onClose();
// //   };

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={handleClose}
// //       maxWidth="md"
// //       fullWidth
// //       sx={{
// //         "& .MuiDialog-paper": {
// //           borderRadius: 2,
// //           minHeight: "60vh",
// //         },
// //       }}
// //     >
// //       <DialogTitle sx={progressDialogStyles.title}>
// //         {course?.title || "Course"} Progress
// //         <Typography variant="subtitle2" color="text.secondary">
// //           Track your learning journey
// //         </Typography>
// //       </DialogTitle>

// //       <DialogContent dividers>
// //         {loading ? (
// //           <Box sx={progressDialogStyles.loadingContainer}>
// //             <CircularProgress size={60} />
// //             <Typography variant="body1" sx={{ mt: 2 }}>
// //               Loading your progress...
// //             </Typography>
// //           </Box>
// //         ) : error ? (
// //           <Alert severity="error" sx={{ my: 2 }}>
// //             {error}
// //             <Box sx={{ mt: 1 }}>
// //               <Button
// //                 variant="outlined"
// //                 size="small"
// //                 onClick={() => window.location.reload()}
// //               >
// //                 Try Again
// //               </Button>
// //             </Box>
// //           </Alert>
// //         ) : (
// //           <ProgressContainer>
// //             {/* Overall Progress Section */}
// //             <Box sx={progressDialogStyles.progressBarContainer}>
// //               <Box display="flex" justifyContent="space-between" mb={1}>
// //                 <Typography variant="subtitle1">Your Progress</Typography>
// //                 <Typography variant="subtitle1" fontWeight="bold">
// //                   {progress.overallProgress}% Complete
// //                 </Typography>
// //               </Box>
// //               <LinearProgress
// //                 variant="determinate"
// //                 value={progress.overallProgress}
// //                 sx={{
// //                   height: 10,
// //                   borderRadius: 5,
// //                   backgroundColor: "#f0f0f0",
// //                   "& .MuiLinearProgress-bar": {
// //                     borderRadius: 5,
// //                   },
// //                 }}
// //               />
// //             </Box>

// //             <Divider sx={{ my: 2 }} />

// //             {/* Modules Section */}
// //             <Box>
// //               <Typography variant="h6" sx={progressDialogStyles.sectionTitle}>
// //                 Course Modules
// //               </Typography>

// //               {progress.modules.length > 0 ? (
// //                 <List sx={{ py: 0 }}>
// //                   {progress.modules.map((module) => {
// //                     const completedCount = module.completedLessons || 0;
// //                     const totalCount = module.totalLessons || 1;
// //                     const moduleProgress = Math.round(
// //                       (completedCount / totalCount) * 100
// //                     );

// //                     return (
// //                       <Box key={module.id} sx={{ mb: 3 }}>
// //                         <Box
// //                           sx={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             justifyContent: "space-between",
// //                             p: 1.5,
// //                             backgroundColor: "#f9f9f9",
// //                             borderRadius: 1,
// //                             mb: 1,
// //                           }}
// //                         >
// //                           <Typography variant="subtitle1" fontWeight="medium">
// //                             {module.title}
// //                           </Typography>
// //                           <Chip
// //                             label={`${completedCount}/${totalCount} lessons`}
// //                             size="small"
// //                             variant="outlined"
// //                           />
// //                         </Box>

// //                         <LinearProgress
// //                           variant="determinate"
// //                           value={moduleProgress}
// //                           sx={{
// //                             height: 6,
// //                             mb: 2,
// //                             backgroundColor: "#e0e0e0",
// //                             "& .MuiLinearProgress-bar": {
// //                               backgroundColor:
// //                                 moduleProgress === 100 ? "#4caf50" : "#1976d2",
// //                             },
// //                           }}
// //                         />

// //                         {module.lessons?.length > 0 && (
// //                           <List dense sx={{ pl: 2 }}>
// //                             {module.lessons.map((lesson) => {
// //                               const isCompleted =
// //                                 progress.completedLessons.some(
// //                                   (l) => l.lesson_id === lesson.id
// //                                 );

// //                               return (
// //                                 <ListItem
// //                                   key={lesson.id}
// //                                   sx={{
// //                                     pl: 2,
// //                                     borderRadius: 1,
// //                                     backgroundColor: isCompleted
// //                                       ? "#e8f5e9"
// //                                       : "transparent",
// //                                     "&:hover": {
// //                                       backgroundColor: isCompleted
// //                                         ? "#d0e9d6"
// //                                         : "#f5f5f5",
// //                                     },
// //                                   }}
// //                                 >
// //                                   <ListItemText
// //                                     primary={lesson.title}
// //                                     secondary={`${lesson.duration} minutes`}
// //                                     sx={{
// //                                       "& .MuiListItemText-primary": {
// //                                         fontWeight: isCompleted ? 500 : 400,
// //                                       },
// //                                     }}
// //                                   />
// //                                   {isCompleted ? (
// //                                     <Chip
// //                                       icon={<CheckCircle fontSize="small" />}
// //                                       label="Completed"
// //                                       size="small"
// //                                       color="success"
// //                                       variant="outlined"
// //                                     />
// //                                   ) : (
// //                                     <Button
// //                                       size="small"
// //                                       variant="outlined"
// //                                       onClick={() =>
// //                                         console.log("Mark complete:", lesson.id)
// //                                       }
// //                                     >
// //                                       Mark Complete
// //                                     </Button>
// //                                   )}
// //                                 </ListItem>
// //                               );
// //                             })}
// //                           </List>
// //                         )}
// //                       </Box>
// //                     );
// //                   })}
// //                 </List>
// //               ) : (
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     alignItems: "center",
// //                     py: 4,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <Typography variant="body1" color="text.secondary">
// //                     No modules found for this course
// //                   </Typography>
// //                   <Typography
// //                     variant="body2"
// //                     color="text.secondary"
// //                     sx={{ mt: 1 }}
// //                   >
// //                     The course content appears to be empty
// //                   </Typography>
// //                 </Box>
// //               )}
// //             </Box>
// //           </ProgressContainer>
// //         )}
// //       </DialogContent>

// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "flex-end",
// //           p: 2,
// //           borderTop: "1px solid rgba(0, 0, 0, 0.12)",
// //         }}
// //       >
// //         <Button
// //           onClick={handleClose}
// //           variant="contained"
// //           sx={{
// //             px: 3,
// //             borderRadius: 1,
// //           }}
// //         >
// //           Close
// //         </Button>
// //       </Box>
// //     </Dialog>
// //   );
// // };

// // export default ProgressDialog;

// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   LinearProgress,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Chip,
//   Button,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useAuth } from "../../contexts/AuthContext/AuthContext";
// import EnrollmentService from "../../services/EnrollemtServices";
// import { progressDialogStyles } from "../../theme/studentStyle";

// const ProgressContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: theme.spacing(3),
// }));

// const ProgressDialog = ({ open, onClose, course }) => {
//   const { user } = useAuth();
//   const [state, setState] = useState({
//     progress: null,
//     loading: false,
//     error: null,
//     enrollmentId: null,
//   });

//   useEffect(() => {
//     const fetchProgress = async () => {
//       if (!open || !course?.enrollmentId || !user?.id) return;

//       setState((prev) => ({ ...prev, loading: true, error: null }));

//       try {
//         const progressData = await EnrollmentService.getCourseProgressDetails(
//           course.enrollmentId // تمرير enrollmentId وليس course.id
//         );

//         setState({
//           progress: {
//             modules: progressData.modules || [],
//             overallProgress: progressData.overallProgress || 0,
//             completedLessons: progressData.completedLessons || [],
//           },
//           enrollmentId: progressData.enrollmentId,
//           loading: false,
//           error: null,
//         });
//       } catch (error) {
//         setState({
//           progress: null,
//           enrollmentId: null,
//           loading: false,
//           error: error.message || "Failed to load progress data",
//         });
//       }
//     };

//     const timer = setTimeout(fetchProgress, 300);
//     return () => clearTimeout(timer);
//   }, [open, course, user]);

//   const handleMarkComplete = async (lessonId) => {
//     try {
//       await EnrollmentService.markLessonCompleted(
//         state.enrollmentId,
//         lessonId,
//         user.id
//       );

//       // Optimistic UI update
//       setState((prev) => ({
//         ...prev,
//         progress: {
//           ...prev.progress,
//           completedLessons: [
//             ...prev.progress.completedLessons,
//             { lesson_id: lessonId },
//           ],
//         },
//       }));
//     } catch (error) {
//       console.error("Completion error:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={progressDialogStyles.title}>
//         {course?.title} Progress
//       </DialogTitle>

//       <DialogContent dividers>
//         {state.loading ? (
//           <Box sx={progressDialogStyles.loadingContainer}>
//             <CircularProgress size={60} />
//           </Box>
//         ) : state.error ? (
//           <Alert severity="error" sx={{ my: 2 }}>
//             {state.error}
//           </Alert>
//         ) : state.progress ? (
//           <ProgressContainer>
//             {/* Progress bars and module list */}
//             {/* ... (keep your existing JSX here) ... */}
//           </ProgressContainer>
//         ) : (
//           <Typography>No progress data available</Typography>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProgressDialog;
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../../../contexts/AuthContext";
import EnrollmentService from "../../../../services/EnrollemtServices";
import { progressDialogStyles } from "../../../../assets/styles/studentStyle";

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const ProgressDialog = ({ open, onClose, course }) => {
  const { user } = useAuth();
  const [state, setState] = useState({
    progress: null,
    loading: false,
    error: null,
    enrollmentId: null,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!open || !course?.enrollmentId || !user?.id) return;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // نطلب بيانات التقدم حسب enrollmentId وليس course.id
        const progressData = await EnrollmentService.getCourseProgressDetails(
          course.enrollmentId
        );

        setState({
          progress: {
            modules: progressData.modules || [],
            overallProgress: progressData.overallProgress || 0,
            completedLessons: progressData.completedLessons || [],
          },
          enrollmentId: progressData.enrollmentId,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          progress: null,
          enrollmentId: null,
          loading: false,
          error: error.message || "Failed to load progress data",
        });
      }
    };

    fetchProgress();
  }, [open, course, user]);
  const handleMarkComplete = async (lessonId) => {
    try {
      const response = await EnrollmentService.markLessonCompleted(lessonId);
      setState((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          completedLessons: [
            ...prev.progress.completedLessons,
            { lesson_id: lessonId },
          ],
          modules: prev.progress.modules.map((module) => ({
            ...module,
            lessons: module.lessons.map((lesson) =>
              lesson.id === lessonId
                ? { ...lesson, is_completed: true }
                : lesson
            ),
          })),
          overallProgress: response.progress,
        },
      }));
    } catch (error) {
      console.error("Completion error:", error);
    }
  };

  // دالة لمساعدة في التحقق هل درس مكتمل
  const isLessonCompleted = (lessonId) => {
    return state.progress?.completedLessons.some(
      (l) => l.lesson_id === lessonId
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={progressDialogStyles.title}>
        {course?.title} Progress
      </DialogTitle>

      <DialogContent dividers>
        {state.loading ? (
          <Box sx={progressDialogStyles.loadingContainer}>
            <CircularProgress size={60} />
          </Box>
        ) : state.error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {state.error}
          </Alert>
        ) : state.progress ? (
          <ProgressContainer>
            <Box>
              <Typography variant="h6" gutterBottom>
                Overall Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={state.progress.overallProgress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography sx={{ mt: 1 }}>
                {state.progress.overallProgress}% Complete
              </Typography>
            </Box>

            {/* قائمة Modules والدروس */}
            {state.progress.modules.map((module) => (
              <Box key={module.id}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Module: {module.title}
                </Typography>
                <List dense>
                  {module.lessons.map((lesson) => (
                    <ListItem
                      key={lesson.id}
                      secondaryAction={
                        !isLessonCompleted(lesson.id) && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleMarkComplete(lesson.id)}
                          >
                            Mark Complete
                          </Button>
                        )
                      }
                    >
                      <ListItemText
                        primary={lesson.title}
                        secondary={`Duration: ${lesson.duration} min`}
                      />
                      {isLessonCompleted(lesson.id) && (
                        <Chip label="Completed" color="success" />
                      )}
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </ProgressContainer>
        ) : (
          <Typography>No progress data available</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProgressDialog;

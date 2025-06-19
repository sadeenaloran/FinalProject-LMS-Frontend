// import React from "react";
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
//   ListItemText,
//   Checkbox,
//   LinearProgress,
//   Chip,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

// const CourseProgress = ({ enrollments, courses, progress, onMarkCompleted }) => {
//   const enrolledCourses = enrollments.map((enrollment) => {
//     const course = courses.find((c) => c.id === enrollment.course_id);
//     const courseProgress = progress.find((p) => p.courseId === enrollment.course_id);
//     return {
//       ...enrollment,
//       ...course,
//       progress: courseProgress ? courseProgress.progress : 0,
//     };
//   });

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         My Progress
//       </Typography>
//       {enrolledCourses.map((course) => (
//         <Box key={course.id} sx={{ mb: 4 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">{course.title}</Typography>
//             <Chip
//               label={`${Math.round(course.progress)}% Complete`}
//               color="primary"
//             />
//           </Box>
//           <LinearProgress
//             variant="determinate"
//             value={course.progress}
//             sx={{ height: 8, borderRadius: 4, mb: 3 }}
//           />
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography>Course Modules</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               {/* This would be populated with actual module data from your backend */}
//               <List>
//                 {course.modules?.map((module) => (
//                   <Accordion key={module.id}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                       <Typography>{module.title}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <List>
//                         {module.lessons?.map((lesson) => (
//                           <ListItem key={lesson.id}>
//                             <Checkbox
//                               icon={<RadioButtonUnchecked />}
//                               checkedIcon={<CheckCircle color="success" />}
//                               checked={lesson.completed}
//                               onChange={() => onMarkCompleted(lesson.id)}
//                             />
//                             <ListItemText primary={lesson.title} />
//                           </ListItem>
//                         ))}
//                       </List>
//                     </AccordionDetails>
//                   </Accordion>
//                 ))}
//               </List>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default CourseProgress;




import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  LinearProgress,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import StudentService from "@/services/StudentService";

const CourseProgress = ({ enrollments, courses, progress, onMarkCompleted }) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course details including modules and lessons
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = {};
        
        for (const enrollment of enrollments) {
          const courseId = enrollment.course_id;
          
          try {
            // Fetch course modules - corrected endpoint
            const modules = await StudentService.getModulesByCourse(courseId);
            
            // Fetch lessons for each module
            for (const module of modules) {
              try {
                const lessons = await StudentService.getLessonsByModule(module.id);
                module.lessons = lessons.map(lesson => ({
                  ...lesson,
                  // Ensure each lesson has a unique key
                  key: `lesson-${lesson.id}`
                }));
                
                // Fetch assignments for each lesson if needed
                for (const lesson of module.lessons) {
                  try {
                    const assignments = await StudentService.getAssignmentsByLesson(lesson.id);
                    lesson.assignments = assignments.map(assignment => ({
                      ...assignment,
                      // Ensure each assignment has a unique key
                      key: `assignment-${assignment.id}`
                    }));
                  } catch (err) {
                    console.error(`Error fetching assignments for lesson ${lesson.id}:`, err);
                    lesson.assignments = [];
                  }
                }
              } catch (err) {
                console.error(`Error fetching lessons for module ${module.id}:`, err);
                module.lessons = [];
              }
            }
            
            details[courseId] = {
              ...courses.find(c => c.id === courseId),
              modules: modules.map(module => ({
                ...module,
                // Ensure each module has a unique key
                key: `module-${module.id}`
              }))
            };
          } catch (err) {
            console.error(`Error fetching modules for course ${courseId}:`, err);
            details[courseId] = {
              ...courses.find(c => c.id === courseId),
              modules: []
            };
          }
        }
        
        setCourseDetails(details);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (enrollments.length > 0 && courses.length > 0) {
      fetchCourseDetails();
    }
  }, [enrollments, courses]);

  const enrolledCourses = enrollments.map((enrollment) => {
    const course = courses.find((c) => c.id === enrollment.course_id);
    const courseProgress = progress.find((p) => p.courseId === enrollment.course_id);
    const details = courseDetails[enrollment.course_id] || {};
    
    return {
      ...enrollment,
      ...course,
      ...details,
      progress: courseProgress ? courseProgress.progress : 0,
      // Ensure each course has a unique key
      key: `course-${enrollment.course_id}`
    };
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Progress
      </Typography>
      {enrolledCourses.map((course) => (
        <Box key={course.key} sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">{course.title}</Typography>
            <Chip
              label={`${Math.round(course.progress)}% Complete`}
              color="primary"
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={course.progress}
            sx={{ height: 8, borderRadius: 4, mb: 3 }}
          />
          
          {course.modules && course.modules.length > 0 ? (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Course Modules</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {course.modules.map((module) => (
                    <Accordion key={module.key}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{module.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {module.lessons && module.lessons.length > 0 ? (
                          <List>
                            {module.lessons.map((lesson) => (
                              <ListItem key={lesson.key}>
                                <Checkbox
                                  icon={<RadioButtonUnchecked />}
                                  checkedIcon={<CheckCircle color="success" />}
                                  checked={lesson.completed}
                                  onChange={() => onMarkCompleted(lesson.id)}
                                />
                                <ListItemText 
                                  primary={lesson.title} 
                                  secondary={lesson.description} 
                                />
                                {lesson.assignments && lesson.assignments.length > 0 && (
                                  <Chip 
                                    label={`${lesson.assignments.length} assignment(s)`} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ ml: 2 }}
                                  />
                                )}
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No lessons in this module yet.
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No modules available for this course yet.
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CourseProgress;


// const CourseProgress = ({ enrollments, courses, progress, onMarkCompleted }) => {
//   const [courseDetails, setCourseDetails] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch course details including modules and lessons
//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         const details = {};
        
//         for (const enrollment of enrollments) {
//           const courseId = enrollment.course_id;
          
//           // Fetch course modules
//           const modules = await StudentService.getModulesByCourse(courseId);
          
//           // Fetch lessons for each module
//           for (const module of modules) {
//             const lessons = await StudentService.getLessonsByModule(module.id);
//             module.lessons = lessons;
            
//             // Fetch assignments for each lesson if needed
//             for (const lesson of lessons) {
//               const assignments = await StudentService.getAssignmentsByLesson(lesson.id);
//               lesson.assignments = assignments;
//             }
//           }
          
//           details[courseId] = {
//             ...courses.find(c => c.id === courseId),
//             modules
//           };
//         }
        
//         setCourseDetails(details);
//       } catch (err) {
//         console.error("Error fetching course details:", err);
//         setError("Failed to load course details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (enrollments.length > 0) {
//       fetchCourseDetails();
//     }
//   }, [enrollments, courses]);

//   const enrolledCourses = enrollments.map((enrollment) => {
//     const course = courses.find((c) => c.id === enrollment.course_id);
//     const courseProgress = progress.find((p) => p.courseId === enrollment.course_id);
//     const details = courseDetails[enrollment.course_id] || {};
    
//     return {
//       ...enrollment,
//       ...course,
//       ...details,
//       progress: courseProgress ? courseProgress.progress : 0,
//     };
//   });

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ mb: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         My Progress
//       </Typography>
//       {enrolledCourses.map((course) => (
//         <Box key={course.id} sx={{ mb: 4 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">{course.title}</Typography>
//             <Chip
//               label={`${Math.round(course.progress)}% Complete`}
//               color="primary"
//             />
//           </Box>
//           <LinearProgress
//             variant="determinate"
//             value={course.progress}
//             sx={{ height: 8, borderRadius: 4, mb: 3 }}
//           />
          
//           {course.modules && course.modules.length > 0 ? (
//             <Accordion defaultExpanded>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography>Course Modules</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <List>
//                   {course.modules.map((module) => (
//                     <Accordion key={module.id}>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography>{module.title}</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         {module.lessons && module.lessons.length > 0 ? (
//                           <List>
//                             {module.lessons.map((lesson) => (
//                               <ListItem key={lesson.id}>
//                                 <Checkbox
//                                   icon={<RadioButtonUnchecked />}
//                                   checkedIcon={<CheckCircle color="success" />}
//                                   checked={lesson.completed}
//                                   onChange={() => onMarkCompleted(lesson.id)}
//                                 />
//                                 <ListItemText 
//                                   primary={lesson.title} 
//                                   secondary={lesson.description} 
//                                 />
//                                 {lesson.assignments && lesson.assignments.length > 0 && (
//                                   <Chip 
//                                     label={`${lesson.assignments.length} assignment(s)`} 
//                                     size="small" 
//                                     variant="outlined" 
//                                     sx={{ ml: 2 }}
//                                   />
//                                 )}
//                               </ListItem>
//                             ))}
//                           </List>
//                         ) : (
//                           <Typography variant="body2" color="text.secondary">
//                             No lessons in this module yet.
//                           </Typography>
//                         )}
//                       </AccordionDetails>
//                     </Accordion>
//                   ))}
//                 </List>
//               </AccordionDetails>
//             </Accordion>
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               No modules available for this course yet.
//             </Typography>
//           )}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default CourseProgress;
// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Assignments = ({ assignments, courses }) => {
//   const navigate = useNavigate();

//   const getCourseName = (courseId) => {
//     const course = courses.find((c) => c.id === courseId);
//     return course ? course.title : "Unknown Course";
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         My Assignments
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Assignment</TableCell>
//               <TableCell>Course</TableCell>
//               <TableCell>Due Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assignments.map((assignment) => (
//               <TableRow key={assignment.id}>
//                 <TableCell>{assignment.title}</TableCell>
//                 <TableCell>{getCourseName(assignment.course_id)}</TableCell>
//                 <TableCell>
//                   {new Date(assignment.due_date).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={assignment.status}
//                     color={
//                       assignment.status === "submitted"
//                         ? "success"
//                         : assignment.status === "pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     size="small"
//                     onClick={() => navigate(`/assignment/${assignment.id}`)}
//                   >
//                     {assignment.status === "pending" ? "Submit" : "View"}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Assignments;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";
const Assignments = ({ courses }) => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // First get all enrolled courses and their lessons
        const enrollmentsResponse = await api.get("/enrollments/user/me");
        const enrollments = enrollmentsResponse.data.enrollments || [];

        // Then get assignments for each lesson in enrolled courses
        const assignmentsPromises = enrollments.map(async (enrollment) => {
          // Get course modules (assuming this endpoint exists)
          const modulesResponse = await api.get(
            `/courses/${enrollment.course_id}/modules`
          );
          const modules = modulesResponse.data.data || [];

          // Get assignments for each lesson in each module
          const moduleAssignments = await Promise.all(
            modules.flatMap(async (module) => {
              const lessonsResponse = await api.get(
                `/lessons/module/${module.id}`
              );
              const lessons = lessonsResponse.data.data || [];

              return Promise.all(
                lessons.map(async (lesson) => {
                  try {
                    const assignmentsResponse = await api.get(
                      `/assignments/lesson/${lesson.id}`
                    );
                    return assignmentsResponse.data.data.map((assignment) => ({
                      ...assignment,
                      course_id: enrollment.course_id,
                      lesson_title: lesson.title,
                      module_title: module.title,
                    }));
                  } catch (error) {
                    return []; // No assignments for this lesson
                  }
                })
              );
            })
          );

          return moduleAssignments.flat();
        });

        const allAssignments = (await Promise.all(assignmentsPromises)).flat();
        setAssignments(allAssignments);
      } catch (err) {
        setError(err.message || "Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [api]);

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.title : "Unknown Course";
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Assignments
      </Typography>
      {assignments.length === 0 ? (
        <Typography>No assignments found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Lesson</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{getCourseName(assignment.course_id)}</TableCell>
                  <TableCell>{assignment.module_title}</TableCell>
                  <TableCell>{assignment.lesson_title}</TableCell>
                  <TableCell>
                    {assignment.due_date
                      ? new Date(assignment.due_date).toLocaleDateString()
                      : "No due date"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={assignment.status || "not submitted"}
                      color={
                        assignment.status === "submitted"
                          ? "success"
                          : assignment.status === "pending"
                          ? "warning"
                          : "error"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => navigate(`/assignment/${assignment.id}`)}
                    >
                      {assignment.status === "submitted" ? "View" : "Submit"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Assignments;

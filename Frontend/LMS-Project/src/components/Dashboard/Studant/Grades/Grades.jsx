import React from "react";
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
  LinearProgress,
} from "@mui/material";

const Grades = ({ enrollments, courses }) => {
  const gradedCourses = enrollments.filter(
    (enrollment) => enrollment.status === "completed"
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Grades
      </Typography>
      {gradedCourses.length === 0 ? (
        <Typography>You haven't completed any courses yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Completion Date</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradedCourses.map((enrollment) => {
                const course = courses.find((c) => c.id === enrollment.course_id);
                return (
                  <TableRow key={enrollment.id}>
                    <TableCell>{course?.title || "Unknown Course"}</TableCell>
                    <TableCell>{course?.instructor || "Unknown"}</TableCell>
                    <TableCell>
                      {new Date(enrollment.completed_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {enrollment.grade || "Not Graded"}
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Grades;
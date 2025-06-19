import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const GradesContent = ({ dashboardData }) => {
  const grades = dashboardData.grades || [];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          My Grades
        </Typography>
        {grades.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No grades available yet.
          </Typography>
        ) : (
          grades.map((grade) => (
            <Box key={grade.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{grade.course}</Typography>
              <Typography variant="body2" color="text.secondary">
                Grade: {grade.score}%
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default GradesContent;

export const GradesTabContent = ({ dashboardData }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Grades
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track your performance in all courses.
      </Typography>
      <GradesContent dashboardData={dashboardData} />
    </Box>
  );
};

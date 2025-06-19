import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

const QuizzesContent = ({ dashboardData, pendingQuizzes }) => {
  const quizzes = dashboardData.quizzes || [];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          My Quizzes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You have {pendingQuizzes} pending quizzes.
        </Typography>
        {quizzes.map((quiz) => (
          <Box key={quiz.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{quiz.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {quiz.description}
            </Typography>
            <Chip
              label={quiz.completed ? "Completed" : "Pending"}
              color={quiz.completed ? "success" : "warning"}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuizzesContent;

export const QuizzesTabContent = ({ dashboardData, pendingQuizzes }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Quizzes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Review your quiz status and deadlines.
      </Typography>
      <QuizzesContent dashboardData={dashboardData} pendingQuizzes={pendingQuizzes} />
    </Box>
  );
};

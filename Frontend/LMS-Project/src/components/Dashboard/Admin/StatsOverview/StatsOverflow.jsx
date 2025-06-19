import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import useAuth from "../../../hooks/UseAuth";

const StatCard = ({ icon, title, value, color }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
        borderLeft: `4px solid ${theme.palette[color].main}`,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: theme.palette[color].light,
            color: theme.palette[color].main,
            borderRadius: "50%",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const StatsOverview = () => {
  const { user } = useAuth();

  // These would normally come from API calls
  const stats = [
    {
      title: "Total Users",
      value: "1,024",
      icon: <PeopleIcon fontSize="large" />,
      color: "primary",
    },
    {
      title: "Active Students",
      value: "856",
      icon: <SchoolIcon fontSize="large" />,
      color: "secondary",
    },
    {
      title: "Instructors",
      value: "42",
      icon: <SchoolIcon fontSize="large" />,
      color: "info",
    },
    {
      title: "Total Courses",
      value: "128",
      icon: <BookIcon fontSize="large" />,
      color: "success",
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: <PendingIcon fontSize="large" />,
      color: "warning",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Admin Dashboard Overview
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsOverview;

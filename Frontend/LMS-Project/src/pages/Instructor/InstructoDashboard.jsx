import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  styled,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  Assignment as AssignmentsIcon,
  Quiz as QuizzesIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
  Notifications as NotificationsIcon,
  VideoLibrary as LessonsIcon,
  Schedule as ScheduleIcon,
  Message as MessagesIcon,
  Grade as GradesIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

// Styled components
const DashboardContainer = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa",
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
  borderRadius: 0,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  backgroundColor: "#ffffff",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: "#f5f7fa",
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
}));

const RecentActivityItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
}));

const InstructorDashboard = () => {
  const theme = useTheme();
  const location = useLocation();

  const stats = [
    {
      title: "Active Courses",
      value: 5,
      icon: <CoursesIcon fontSize="large" color="primary" />,
    },
    {
      title: "Total Students",
      value: 128,
      icon: <StudentsIcon fontSize="large" color="secondary" />,
    },
    {
      title: "Assignments to Grade",
      value: 23,
      icon: <GradesIcon fontSize="large" color="error" />,
    },
    {
      title: "Unread Messages",
      value: 7,
      icon: <MessagesIcon fontSize="large" color="action" />,
    },
  ];

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            alt="Instructor"
            src="/path/to/instructor-avatar.jpg"
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">Dr. Sarah Johnson</Typography>
            <Typography variant="body2" color="textSecondary">
              Computer Science Instructor
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon />,
              path: "/instructor/dashboard",
            },
            {
              text: "My Courses",
              icon: <CoursesIcon />,
              path: "/instructor/courses",
            },
            {
              text: "Lessons",
              icon: <LessonsIcon />,
              path: "/instructor/lessons",
            },
            {
              text: "Assignments",
              icon: <AssignmentsIcon />,
              path: "/instructor/assignments",
            },
            {
              text: "Quizzes",
              icon: <QuizzesIcon />,
              path: "/instructor/quizzes",
            },
            {
              text: "Students",
              icon: <StudentsIcon />,
              path: "/instructor/students",
            },
            {
              text: "Analytics",
              icon: <AnalyticsIcon />,
              path: "/instructor/analytics",
            },
            {
              text: "Schedule",
              icon: <ScheduleIcon />,
              path: "/instructor/schedule",
            },
            {
              text: "Messages",
              icon: <MessagesIcon />,
              path: "/instructor/messages",
            },
            {
              text: "Notifications",
              icon: <NotificationsIcon />,
              path: "/instructor/notifications",
            },
            {
              text: "Settings",
              icon: <SettingsIcon />,
              path: "/instructor/settings",
            },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.action.selected
                    : "transparent",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Sidebar>

      {/* Main Dashboard Content */}
      <MainContent>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Instructor Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Here's what's happening with your courses today.
          </Typography>
        </Box>

        {/* View All Courses Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            component={Link}
            to="/instructor/courses"
            variant="outlined"
            startIcon={<CoursesIcon />}
          >
            View All Courses
          </Button>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box>{stat.icon}</Box>
                </Box>
              </StatsCard>
            </Grid>
          ))}
        </Grid>

        {/* Continue with the rest of your dashboard content as before */}
      </MainContent>
    </DashboardContainer>
  );
};

export default InstructorDashboard;

import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import Header from "@components/common/Header/Header";
import Footer from "@components/common/Footer/Footer";
import UserHeader from "../../components/common/Header/UserHeader"; 
const Home = () => {
  const features = [
    {
      icon: <SchoolIcon color="primary" fontSize="large" />,
      title: "Interactive Courses",
      description:
        "Engage with dynamic course content including videos, quizzes, and hands-on assignments",
    },
    {
      icon: <TrendingUpIcon color="primary" fontSize="large" />,
      title: "Progress Tracking",
      description:
        "Monitor your learning progress and achievements with detailed analytics and insights",
    },
    {
      icon: <PeopleIcon color="primary" fontSize="large" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals and certified educators with real-world experience",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Expert Instructors" },
    { number: "1,200+", label: "Course Library" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <>
      <Header/>
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Lernix 📚
        </Typography>
        <Typography variant="h6" gutterBottom>
          Transform your learning journey with our comprehensive online learning
          management system. Access courses, track progress, and achieve your
          educational goals.
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" component={Link} to="/login">
            Get started
          </Button>
          <Button variant="outlined" component={Link} to="/register">
            New Account
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ mt: 10 }}>
          <Grid container  spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} xl={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    transition: "transform 0.3s ease",
                    animation: "fadeIn 0.5s ease",
                    animationDelay: `${index * 0.3}s`,
                    animationFillMode: "both",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            mt: 8,
            mb: 8,
            p: 4,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            maxWidth: "1000px",
            mx: "auto",
          }}
        >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ textAlign: "center", m: 2 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {stat.number}
              </Typography>
              <Typography variant="body2">{stat.label}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h3" gutterBottom>
          Ready to Start Learning?
        </Typography>
        <Typography variant="h6" gutterBottom>
          Join thousands of learners who are already advancing their careers
          with EduLearn
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" component={Link} to="/login">
            Sign In to Continue
          </Button>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default Home;

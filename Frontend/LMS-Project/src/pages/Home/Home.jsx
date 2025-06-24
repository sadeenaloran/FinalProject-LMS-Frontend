import { Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Header from "@components/common/Header/Header";
import HomeImage from "../../assets/images/HomeImage.png";
// import Footer from "@components/common/Footer/Footer";

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
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          mt: { xs: 4, sm: 6, md: 10 },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            alignItems: "center",
            pt: 10,
            px: { xs: 2, md: 8 },
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          {/* Text Content - Left on large screens, bottom on small */}
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pr: { md: 4 },
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                color: "primary.main",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Welcome to Lernix LMS Platform
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                color: "text.secondary",
                mb: 4,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Easily transform your learning journey with our simple online
              learning management system. Access courses, track your progress,
              and reach your goals. Start learning today!
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/Courses"
                size="large"
                sx={{
                  bgcolor: "primary",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              >
                Explore Courses
                <ArrowOutwardIcon />
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/register"
                size="large"
                sx={{
                  color: "primary.main",
                  borderColor: "primary.light",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                New Account
              </Button>
            </Box>
          </Grid>

          {/* Image - Right on large screens, top on small */}
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: "100%",
                width: { xs: "100%", sm: "80%", md: "400px" },
                height: "auto",
                aspectRatio: "1/1",
              }}
            >
              <img
                src={HomeImage}
                alt="Students learning online"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {/* Features Section */}
        <Box sx={{ mt: { xs: 6, md: 20 } }}>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
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
                    bgcolor: "primary.50",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                      bgcolor: "primary.100",
                    },
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    {feature.icon}
                    <Typography
                      variant="h6"
                      sx={{ mt: 2, mb: 1, color: "primary.dark" }}
                    >
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
            mt: { xs: 6, md: 8 },
            mb: { xs: 4, md: 8 },
            p: { xs: 2, md: 4 },
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            border: "1px solid",
            borderColor: "primary.100",
            borderRadius: 2,
            maxWidth: "1000px",
            mx: "auto",
            bgcolor: "primary.50",
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                m: { xs: 1, md: 2 },
                width: { xs: "45%", sm: "auto" },
              }}
            >
              <Typography variant="h5" color="primary" fontWeight="bold">
                {stat.number}
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.dark" }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            color: "primary.main",
            mt: { xs: 4, md: 6 },
          }}
        >
          Ready to Start Learning?
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            color: "text.secondary",
            mb: 4,
          }}
        >
          Join thousands of learners who are already advancing their careers
          with Lernix
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/login"
            size="large"
            sx={{
              bgcolor: "primary",
              "&:hover": { bgcolor: "primary.main" },
            }}
          >
            Sign In to Continue
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;

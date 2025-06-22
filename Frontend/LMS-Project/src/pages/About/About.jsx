import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScienceIcon from "@mui/icons-material/Science";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Header from "@components/common/Header/Header";
// import Footer from "@components/common/Footer/Footer";
// import Contact from "../../assets/images/Contact"
const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={1} alignItems="center">
          {/* Image Section - Left */}
          {/* <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[4],
              height: '100%',
              minHeight: 300,
              backgroundColor: theme.palette.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Placeholder for your image - replace with your actual image component */}
          {/* <img
                src={AboutImage}
                alt="LMS aboutimage"
                width={500}
                height={500}
              /> */}
          {/* </Box>
        </Grid>  */}

          {/* Content Section - Right */}
          <Grid item xs={12} md={6} alignItems="center">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              About Lernix LMs
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ mb: 2, fontSize: "1.1rem" }}
            >
              Lernix is an AI-powered Learning Management System designed to
              revolutionize the way students and professionals engage with
              technology education. Through personalized learning paths,
              real-time progress tracking, and interactive content, Lernix
              empowers learners to master coding, data science, AI/ML, and more.
              With an intuitive interface and hands-on projects, Lernix bridges
              the gap between theory and practice—turning knowledge into
              real-world skills.
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ my: 3 }}>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    12+
                  </Typography>
                  <Typography variant="body2">Tech Domains</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    5K+
                  </Typography>
                  <Typography variant="body2">Developers Learning</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    50+
                  </Typography>
                  <Typography variant="body2">Hands-on Projects</Typography>
                </Box>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/courses")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 1,
              }}
            >
              Explore Tech Courses
            </Button>
          </Grid>
        </Grid>

        {/* Tech Domains Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Our Tech Focus Areas
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3, ml: 26 }}>
            {[
              {
                icon: <CodeIcon fontSize="large" />,
                title: "Programming",
                desc: "From Python to Rust",
              },
              {
                icon: <SmartToyIcon fontSize="large" />,
                title: "AI/ML",
                desc: "Machine Learning to Deep Learning",
              },
              {
                icon: <ScienceIcon fontSize="large" />,
                title: "Data Science",
                desc: "Analytics to Visualization",
              },
            ].map((domain, index) => (
              <Grid item xs={12} md={4} xl={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    {domain.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {domain.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {domain.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Core Principles Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Why Tech Professionals Choose Lernix
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              {
                title: "Project-Based Learning",
                description: "97% of learners build portfolio-worthy projects",
              },
              {
                title: "Cutting-Edge Content",
                description:
                  "Curriculum updated quarterly with latest tech trends",
              },
              {
                title: "AI-Powered Mentorship",
                description: "Our LMs provide 24/7 code review and guidance",
              },
              {
                title: "Tech Community",
                description:
                  "Collaborate with 5K+ developers and data scientists",
              },
              {
                title: "Career Pathways",
                description: "Clear roadmaps for every tech career track",
              },
              {
                title: "Hands-On Labs",
                description: "Cloud-based environments for real-world practice",
              },
            ].map((principle, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Chip
                    label={`0${index + 1}`}
                    color="primary"
                    sx={{ mb: 2, fontWeight: 600 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {principle.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {principle.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            p: 6,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Ready to Master Cutting-Edge Tech?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ mb: 4, fontSize: "1.1rem" }}
          >
            Join our community of developers and scientists learning with
            AI-powered LMs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/courses")}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 1,
              bgcolor: "white",
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: "white",
                opacity: 0.9,
              },
            }}
          >
            Start Learning Now
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default About;

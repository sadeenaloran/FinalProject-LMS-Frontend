import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} xl={4} >
          {/* About Column */}
          <Grid size={16} item xs={12} md={12} xl={12}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Lernix
            </Typography>
            <Typography variant="body2" sx={{ mb: 2}}>
              The AI-powered learning engine for tech professionals and
              scientists. Revolutionizing education through adaptive learning
              technologies.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook" sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="GitHub" sx={{ color: "white" }}>
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Column */}
            <Grid item xs={12} md={12} xl={4} >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">Home</Typography>
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">Courses</Typography>
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">About</Typography>
              </Link>
            </Grid>

            {/* Tech Domains Column */}
            <Grid item xs={12} md={12} xl={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Tech Domains
              </Typography>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">Programming</Typography>
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">AI/ML</Typography>
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">Data Science</Typography>
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                sx={{ mb: 1 }}
              >
                <Typography variant="body2">Cloud Computing</Typography>
              </Link>
            </Grid>

            {/* Contact Column */}
            <Grid item xs={12} md={12} xl={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> support@lernix.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Address:</strong> 123 Tech Lane, Silicon Valley, CA
                94025
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Subscribe to our newsletter for tech updates
              </Typography>
            </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Lernix LMs. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit" underline="hover">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover">
              <Typography variant="body2">Cookie Policy</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

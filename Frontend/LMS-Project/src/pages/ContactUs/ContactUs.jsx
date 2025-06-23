import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  TextField,
  Divider,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from "@mui/icons-material";
import Header from "@components/common/Header/Header";
import Footer from "@components/common/Footer/Footer";
import { useState, useEffect } from "react";
 
const Contact = () => {
   const [ setScrolled] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setChecked(true);
  }, []);

  const contactMethods = [
    {
      icon: <Email color="primary" fontSize="large" />,
      title: "Email Us",
      description: "Have questions? Send us an email and we'll get back to you promptly.",
      details: "support@lernix.com",
      action: "Send Message"
    },
    {
      icon: <Phone color="primary" fontSize="large" />,
      title: "Call Us",
      description: "Prefer to talk? Our support team is available during business hours.",
      details: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: <LocationOn color="primary" fontSize="large" />,
      title: "Visit Us",
      description: "Our headquarters is open for scheduled visits and consultations.",
      details: "123 Learning St, Edutown, 10101",
      action: "Get Directions"
    }
  ];

  return (
    <>
    <Header/>
    <Container maxWidth="lg" sx={{ 
      textAlign: "center", 
      mt: { xs: 4, sm: 6, md: 16 },
      px: { xs: 2, sm: 3, md: 4 },
      pt:7,
    }}>
      <Typography variant="h3" gutterBottom sx={{ 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        color: 'primary.main'
      }}>
        Contact Lernix 📬
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ 
        fontSize: { xs: '1rem', sm: '1.25rem' },
        color: 'text.secondary',
        mb: 4
      }}>
        We're here to help and answer any questions you might have about our platform.
      </Typography>

      {/* Contact Methods Section */}
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center">
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                  bgcolor: 'primary.50',
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    bgcolor: 'primary.100'
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  {method.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1, color: 'primary.dark' }}>
                    {method.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {method.description}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                    {method.details}
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="medium"
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.light',
                    '&:hover': { borderColor: 'primary.main' }
                  }}
                >
                  {method.action}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Form Section */}
      <Box
  sx={{
    mt: { xs: 6, md: 8 },
    mb: { xs: 4, md: 6 },
    p: { xs: 2, md: 4 },
    border: "1px solid",
    boxShadow: "inherit",
    borderColor: 'primary.100',
    borderRadius: 2,
    maxWidth: "800px",
    mx: "auto",
    bgcolor: 'primary.50',
    textAlign: 'left',
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 6,
      bgcolor: 'primary.100',
    },
  }}
>

        <Typography variant="h5" sx={{ 
          color: 'primary.main',
          mb: 3,
          textAlign: 'center'
        }}>
          Send Us a Message
        </Typography>
        
        <Grid container spacing={3} sx={{display:"flex", flexDirection:"column"}}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Message"
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              bgcolor: 'primary.light',
              '&:hover': { bgcolor: 'primary.main' },
              px: 4
            }}
          >
            Submit Message
          </Button>
        </Box>
      </Box>

      {/* Floating Contact Button */}
      <Fade in={checked} timeout={2000}>
        <Box sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000
        }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Email />}
            sx={{
              borderRadius: 50,
              px: 3,
              py: 1.5,
              boxShadow: 6,
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              animation: 'pulse 2s infinite'
            }}
          >
            Need Help?
          </Button>
        </Box>
      </Fade>
      {/* Social Media Section
      <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
          Connect With Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <IconButton aria-label="Facebook" color="primary">
            <Facebook fontSize="large" />
          </IconButton>
          <IconButton aria-label="Twitter" color="primary">
            <Twitter fontSize="large" />
          </IconButton>
          <IconButton aria-label="LinkedIn" color="primary">
            <LinkedIn fontSize="large" />
          </IconButton>
          <IconButton aria-label="Instagram" color="primary">
            <Instagram fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          Follow us for updates, tips, and learning resources
        </Typography>
      </Box> */}
    </Container>
  </>
  );
};

export default Contact;
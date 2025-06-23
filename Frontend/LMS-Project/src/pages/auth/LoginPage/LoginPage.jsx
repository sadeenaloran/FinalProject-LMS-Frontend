import LoginForm from "../../../components/auth/LoginForm";
import { Box, Card, useTheme, Typography } from "@mui/material";
import LoginImage from "../../../assets/images/LoginImage.jpg";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Box
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.mode === 'light' 
          ? "linear-gradient(135deg, rgba(240, 230, 184, 0.3) 0%, rgba(205, 227, 255, 0.5) 100%)" 
          : "linear-gradient(135deg, #121826 0%, #1E293B 100%)",
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: theme.shadows[10],
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          bgcolor: 'background.paper',
        }}
      >
         
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            bgcolor: theme.palette.primary.light,
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -80,
              left: -80,
              width: 250,
              height: 250,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <Box
            component="img"
            src={LoginImage}
            alt="Login Illustration"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 2,
              zIndex: 1,
              boxShadow: theme.shadows[5],
            }}
          />
           {/* <Typography
                      variant="h6"
                      sx={{
                        position: 'absolute',
                        top: 30,
                        left: 35,
                        color: 'white',
                        fontWeight: 600,
                        zIndex: 2,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
            Log in to access your dashboard and continue your learning journey.
                    </Typography> */}
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <LoginForm />
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
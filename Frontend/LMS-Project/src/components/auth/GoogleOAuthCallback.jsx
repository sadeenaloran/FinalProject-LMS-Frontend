// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { CircularProgress, Box, Typography, Backdrop } from "@mui/material";

// const GoogleAuthCallback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const token = params.get("token");
//     const id = params.get("id");
//     const name = params.get("name");
//     const email = params.get("email");
//     const avatar = params.get("avatar");
//     const role = params.get("role");

//     if (token) {
//       localStorage.setItem("token", token);
//       setUser({ id, name, email, avatar, role });
//       navigate("/dashboard");
//     } else {
//       navigate("/login");
//     }
//   }, [location]);

//   return (
//     <Backdrop open={true}>
//       <Box textAlign="center">
//         <CircularProgress />
//         <Typography>Logging in with Google...</Typography>
//       </Box>
//     </Backdrop>
//   );
// };

// export default GoogleAuthCallback;
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Container,
  Paper,
  Fade,
} from "@mui/material";
import { Google } from "@mui/icons-material";

const GoogleOAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, DEFAULT_REDIRECTS } = useAuth();
  const [error, setError] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(true);
  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");
    const userId = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const avatar = searchParams.get("avatar");
    const role = searchParams.get("role");

    const handleCallback = async () => {
      try {
        if (errorParam) {
          setError(getErrorMessage(errorParam));
          setTimeout(() => {
            navigate("/login?error=" + errorParam);
          }, 3000);
          return;
        }

        if (token && userId) {
          localStorage.setItem("access-token", token);

          const user = {
            id: userId,
            name: decodeURIComponent(name || ""),
            email: decodeURIComponent(email || ""),
            avatar: decodeURIComponent(avatar || ""),
            role: role || "student",
          };

          setToken(token, user);

          setTimeout(() => {
            const redirectPath =
              DEFAULT_REDIRECTS[role] || DEFAULT_REDIRECTS.student;
            navigate(redirectPath, { replace: true });
          }, 1500);
        } else {
          setError("Missing authentication data");
          setTimeout(() => {
            navigate("/login?error=missing_data");
          }, 3000);
        }
      } catch (error) {
        console.error("Error processing OAuth callback:", error);
        setError("Failed to process authentication");
        setTimeout(() => {
          navigate("/login?error=callback_error");
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, []);

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case "oauth_error":
        return "Google authentication failed";
      case "oauth_failed":
        return "Google login failed";
      case "login_failed":
        return "Login process failed";
      case "callback_error":
        return "Authentication callback failed";
      case "missing_data":
        return "Missing authentication data";
      default:
        return "Authentication error occurred";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, 
rgb(53, 75, 238) 0%, 
rgb(78, 138, 243) 50%,
rgb(79, 145, 246) 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {error ? (
            <Fade in>
              <Box>
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      fontSize: "2rem",
                    },
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    Authentication Failed
                  </Typography>
                  {error}
                </Alert>
                <Typography variant="body2" color="text.secondary">
                  Redirecting to login page...
                </Typography>
              </Box>
            </Fade>
          ) : (
            <Fade in>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                    }}
                  >
                    <CircularProgress
                      size={60}
                      thickness={4}
                      sx={{
                        color: "#rgb(78, 138, 243) 50%,",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Google sx={{ fontSize: 28, color: "#rgb(78, 138, 243) 50%" }} />
                    </Box>
                  </Box>
                </Box>

                <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
                  {isProcessing
                    ? "Processing Authentication..."
                    : "Login Successful!"}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  {isProcessing
                    ? "Please wait while we set up your account"
                    : "Redirecting to your dashboard..."}
                </Typography>
              </Box>
            </Fade>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default GoogleOAuthCallback;

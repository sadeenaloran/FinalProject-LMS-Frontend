import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Box,
  Typography,
  Container,
  Backdrop,
  Alert,
  Button
} from "@mui/material";

const GoogleAuth = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const userData = {
      id: params.get("id"),
      name: decodeURIComponent(params.get("name") || ""),
      email: decodeURIComponent(params.get("email") || ""),
      avatar: decodeURIComponent(params.get("avatar") || ""),
      role: params.get("role"),
    };

    if (token && userData.id) {
      localStorage.setItem("token", token);
      setUser(userData);
      navigate("/dashboard");
    } else {
      setError("Google authentication failed. Please try again.");
    }
  }, [search, navigate, setUser]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
        >
          Go back to Login
        </Button>
      </Container>
    );
  }

  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" color="white">
          Authenticating with Google...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GoogleAuth;
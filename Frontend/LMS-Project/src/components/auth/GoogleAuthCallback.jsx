import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CircularProgress, Box, Typography, Backdrop } from "@mui/material";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");
    const avatar = params.get("avatar");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      setUser({ id, name, email, avatar, role });
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location]);

  return (
    <Backdrop open={true}>
      <Box textAlign="center">
        <CircularProgress />
        <Typography>Logging in with Google...</Typography>
      </Box>
    </Backdrop>
  );
};

export default GoogleAuthCallback;

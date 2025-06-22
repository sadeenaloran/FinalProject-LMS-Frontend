// src/components/LoginForm.jsx
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  Paper,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import { Alert } from "@mui/material";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const handleChange = (field) => (event) => {
  //   setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      if (user?.role === "student") {
        navigate("/student/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
       } else if (user?.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        // navigate("/unauthorized");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={10}
      sx={{
        p: 4,
        borderRadius: 4,
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.9)"
            : "rgba(30,30,30,0.9)",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "light" ? "rgba(229, 231, 235, 0.5)" : "#333",
        maxWidth: 500,
        width: "100%",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(to bottom right, #dbeafe, #bfdbfe)",
          }}
        >
          <Lock sx={{ color: "#2563eb", fontSize: 32 }} />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to your account to continue
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          // onChange={handleChange("email")}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // onChange={handleChange("password")}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box textAlign="right" my={1}>
          <Link href="#" variant="body2" underline="hover">
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1,
            fontWeight: "bold",
            background: "linear-gradient(to right, #3b82f6, #2563eb)",
            ":hover": {
              background: "linear-gradient(to right, #2563eb, #1d4ed8)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Divider sx={{ my: 2 }}>or continue with</Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          startIcon={
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={20}
            />
          }
        >
          Login with Google
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link href="/register" underline="hover" fontWeight="medium">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
export default LoginForm;

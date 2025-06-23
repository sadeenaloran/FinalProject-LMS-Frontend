import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <Paper>
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Register now to access the dashboard
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
          inputProps={{ minLength: 6 }}
        />

        <TextField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          inputProps={{ minLength: 6 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Divider sx={{ my: 2 }}>or continue with</Divider>

        
     <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleRegister}
          startIcon={
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={20}
            />
          }
        >
          Sign up with Google
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link href="/login" underline="hover" fontWeight="medium">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterForm;

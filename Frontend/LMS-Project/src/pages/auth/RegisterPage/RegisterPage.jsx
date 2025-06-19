import React from "react";
import { Box, Grid, Container } from "@mui/material";
import RegisterForm from "@/components/auth/RegisterForm";
import loginImage from "../../../assets/images/loginImg.png";

const RegisterPage = () => {
  return (
      <Box maxWidth="xl"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right,rgb(240, 230, 184),rgb(205, 227, 255))",
          position: "relative",
          overflow: "hidden",
          p: 2,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={loginImage}
              alt="LMS illustration"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Box>
  );
};

export default RegisterPage;

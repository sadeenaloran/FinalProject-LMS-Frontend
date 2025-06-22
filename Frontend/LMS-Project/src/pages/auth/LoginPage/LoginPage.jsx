import LoginForm from "../../../components/auth/LoginForm";
import { Grid, Box } from "@mui/material";
import LoginImage from "../../../assets/images/LoginImage.png"; 
const LoginPage = () => {
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
        <Grid container spacing={4} sx={{ alignItems:"center"}}>
          <Grid item xs={12} md={6} lg={6}>
            <img
              src={LoginImage}
              alt="LMS LoginImage"
              width={500}
              height={500}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
  );
};

export default LoginPage;


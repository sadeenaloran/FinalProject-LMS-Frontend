import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My LMS
        </Typography>

        {isAuthenticated ? (
          <>
            <Typography sx={{ mr: 2 }}>Hello, {user.name}</Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

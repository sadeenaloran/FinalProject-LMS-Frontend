import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { text: "Courses", link: "/courses" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" fontWeight="bold">
            Lernix
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Mobile Search */}
      <Box sx={{ p: 2 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid #e0e0e0",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search courses..."
            inputProps={{ "aria-label": "search courses" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Divider />

      {/* Mobile Navigation */}
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.link} sx={{ color: 'inherit', textDecoration: 'none' }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Mobile Auth Buttons */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="outlined"
          component={Link}
          to="/login"
          fullWidth
          sx={{ mb: 1 }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/register"
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SchoolIcon color="primary" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Lernix
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {/* Search Bar */}
              <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 400 }}>
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #e0e0e0",
                    boxShadow: "none",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search courses..."
                    inputProps={{ "aria-label": "search courses" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>

              {/* Navigation Links */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.link}
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* Auth Buttons */}
                <Button
                  variant="outlined"
                  component={Link}
                  to="/login"
                  sx={{ ml: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                >
                  Sign Up
                </Button>
              </Box>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
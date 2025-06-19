import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
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
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Settings from "@/components/common/Settings/Settings";
const UserHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch user data from backend (example)
  useEffect(() => {
    // Replace this with your actual API call
    const fetchUserData = async () => {
      try {
        // Example API call - replace with your actual endpoint
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();

        // Mock data for demonstration
        const mockUserData = {
          name: "",
          role: "",
          avatarUrl: "", // or base64 string
        };

        setUserData(mockUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Courses", link: "/courses" },
    { text: "Progress", link: "/progress" },
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

      {/* User Profile in Mobile */}
      {userData && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={userData.avatarUrl}
            alt={userData.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="subtitle2">{userData.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {userData.role}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider />

      {/* Mobile Navigation */}
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.link}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
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
              to="/dashboard"
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

                {/* User Profile Section */}
                {userData && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                      }}
                      onClick={handleMenuOpen}
                    >
                      <Avatar
                        src={userData.avatarUrl}
                        alt={userData.name}
                        sx={{ width: 33, height: 33 }}
                      />
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="subtitle2">
                          {userData.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {userData.role}
                        </Typography>
                      </Box>
                    </Box>

                    {/* User Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      onClick={handleMenuClose}
                    >
                      <MenuItem component={Link} to="/profile">
                        Profile
                      </MenuItem>
                      <MenuItem component={Link}>
                        <Settings/>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
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
              <IconButton
              sx={{m:2}}
                color="inherit"
                aria-label="logout"
                edge="start"
                component={Link}
                to="/logout"
              >
                <LogoutIcon />
              </IconButton>
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
          keepMounted: true,
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

export default UserHeader;

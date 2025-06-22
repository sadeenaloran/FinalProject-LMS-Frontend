// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   InputBase,
//   Paper,
//   useTheme,
//   useMediaQuery,
//   Divider,
//   Avatar,
//   Menu,
//   MenuItem,
//   Badge,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   School as SchoolIcon,
//   Close as CloseIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import Settings from "@/components/common/Settings/Settings";
// const UserHeader = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   // Fetch user data from backend (example)
//   useEffect(() => {
//     // Replace this with your actual API call
//     const fetchUserData = async () => {
//       try {
//         // Example API call - replace with your actual endpoint
//         // const response = await fetch('/api/user/profile');
//         // const data = await response.json();

//         // Mock data for demonstration
//         const mockUserData = {
//           name: "",
//           role: "",
//           avatarUrl: "", // or base64 string
//         };

//         setUserData(mockUserData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const navigationItems = [
//     { text: "Dashboard", link: "/dashboard" },
//     { text: "Courses", link: "/courses" },
//     { text: "Progress", link: "/progress" },
//   ];

//   // Mobile drawer content
//   const drawer = (
//     <Box sx={{ width: 250, height: "100%" }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 2,
//           borderBottom: "1px solid #e0e0e0",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <SchoolIcon color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6" color="primary" fontWeight="bold">
//             Lernix
//           </Typography>
//         </Box>
//         <IconButton onClick={handleDrawerToggle}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* User Profile in Mobile */}
//       {userData && (
//         <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
//           <Avatar
//             src={userData.avatarUrl}
//             alt={userData.name}
//             sx={{ width: 40, height: 40 }}
//           />
//           <Box>
//             <Typography variant="subtitle2">{userData.name}</Typography>
//             <Typography variant="caption" color="text.secondary">
//               {userData.role}
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       <Divider />

//       {/* Mobile Navigation */}
//       <List>
//         {navigationItems.map((item) => (
//           <ListItem
//             key={item.text}
//             component={Link}
//             to={item.link}
//             sx={{ color: "inherit", textDecoration: "none" }}
//           >
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static" color="inherit" elevation={1}>
//         <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <SchoolIcon color="primary" sx={{ mr: 1 }} />
//             <Typography
//               variant="h6"
//               component={Link}
//               to="/dashboard"
//               sx={{
//                 color: "primary.main",
//                 fontWeight: "bold",
//                 textDecoration: "none",
//                 fontSize: { xs: "1.1rem", md: "1.25rem" },
//               }}
//             >
//               Lernix
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           {!isMobile && (
//             <>
//               {/* Search Bar */}
//               <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 400 }}>
//                 <Paper
//                   component="form"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     width: "100%",
//                     border: "1px solid #e0e0e0",
//                     boxShadow: "none",
//                   }}
//                 >
//                   <InputBase
//                     sx={{ ml: 1, flex: 1 }}
//                     placeholder="Search courses..."
//                     inputProps={{ "aria-label": "search courses" }}
//                   />
//                   <IconButton
//                     type="button"
//                     sx={{ p: "10px" }}
//                     aria-label="search"
//                   >
//                     <SearchIcon />
//                   </IconButton>
//                 </Paper>
//               </Box>

//               {/* Navigation Links */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//                 {navigationItems.map((item) => (
//                   <Button
//                     key={item.text}
//                     component={Link}
//                     to={item.link}
//                     sx={{
//                       color: "text.primary",
//                       fontWeight: 500,
//                       "&:hover": {
//                         color: "primary.main",
//                         backgroundColor: "transparent",
//                       },
//                     }}
//                   >
//                     {item.text}
//                   </Button>
//                 ))}

//                 {/* User Profile Section */}
//                 {userData && (
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         cursor: "pointer",
//                       }}
//                       onClick={handleMenuOpen}
//                     >
//                       <Avatar
//                         src={userData.avatarUrl}
//                         alt={userData.name}
//                         sx={{ width: 33, height: 33 }}
//                       />
//                       <Box sx={{ textAlign: "left" }}>
//                         <Typography variant="subtitle2">
//                           {userData.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {userData.role}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* User Menu */}
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl)}
//                       onClose={handleMenuClose}
//                       onClick={handleMenuClose}
//                     >
//                       <MenuItem component={Link} to="/profile">
//                         Profile
//                       </MenuItem>
//                       <MenuItem component={Link}>
//                         <Settings/>
//                       </MenuItem>
//                     </Menu>
//                   </Box>
//                 )}
//               </Box>
//             </>
//           )}

//           {/* Mobile Menu Button */}
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//               <IconButton
//               sx={{m:2}}
//                 color="inherit"
//                 aria-label="logout"
//                 edge="start"
//                 component={Link}
//                 to="/logout"
//               >
//                 <LogoutIcon />
//               </IconButton>
//             </IconButton>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         anchor="right"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           display: { xs: "block", md: "none" },
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: 250,
//           },
//         }}
//       >
//         {drawer}
//       </Drawer>
//     </>
//   );
// };

// export default UserHeader;


import React, { useState, useEffect } from "react";
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
  Slide,
  Fade,
  Stack,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  alpha,
  Container,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
  AccountCircle,
  Dashboard,
  Logout as LogoutIcon,
  Settings,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api"
const UserHeader = ({ mode, toggleColorMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  // const { logout, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const navigationItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Courses", link: "/Courses" },
    { text: "Progress", link: "/progress" },
  ];

  // Fetch user data from backend (example)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("http://localhost:5000/api/auth/getme", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase();
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, height: "100%", bgcolor: 'background.paper' }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: 'primary.50'
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
            sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
          >
            {getInitials(userData.name)}
          </Avatar>

          <Box>
            <Typography variant="subtitle2">{userData.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {userData.role}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider />

      {/* Mobile Search */}
      <Box sx={{ p: 2 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid",
            borderColor: 'primary.100'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search courses..."
            inputProps={{ "aria-label": "search courses" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon color="primary" />
          </IconButton>
        </Paper>
      </Box>

      <Divider />

      {/* Mobile Navigation */}
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.link} 
            sx={{ 
              color: 'text.primary',
              textDecoration: 'none',
              "&:hover": {
                bgcolor: 'primary.50'
              }
            }}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Mobile Settings and Logout */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="outlined"
          component={Link}
          to="/profile"
          fullWidth
          sx={{ mb: 1 }}
          onClick={handleDrawerToggle}
        >
          Profile
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/settings"
          fullWidth
          sx={{ mb: 1 }}
          onClick={handleDrawerToggle}
        >
          Settings
        </Button>
        <Divider sx={{ my: 1 }} />
        <Button
          variant="outlined"
          color="error"
          component={Link}
          to="/logout"
          fullWidth
          onClick={handleDrawerToggle}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: scrolled
            ? alpha(theme.palette.background.paper, 0.8)
            : "transparent",
          backgroundImage: scrolled
            ? `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`
            : "none",
          transition: "all 0.3s ease",
          color: scrolled ? "white" : "text.primary",
          py: scrolled ? 0 : 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo with animation */}
            <Slide direction="right" in={!scrolled} mountOnEnter unmountOnExit>
              <Stack direction="row" alignItems="center" spacing={1}>
                <SchoolIcon
                  sx={{
                    color: scrolled ? "white" : "primary.main",
                    fontSize: 32,
                  }}
                />
                <Typography variant="h5" fontWeight={700}>
                  Lernix
                </Typography>
              </Stack>
            </Slide>

            <Fade in={scrolled}>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SchoolIcon sx={{ color: "white", fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Lernix
                  </Typography>
                </Stack>
              </Box>
            </Fade>

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
                      border: "1px solid",
                      borderColor: scrolled ? 'rgba(255,255,255,0.2)' : 'primary.100',
                      boxShadow: "none",
                      bgcolor: scrolled ? 'rgba(255,255,255,0.1)' : 'background.paper'
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, color: scrolled ? 'white' : 'inherit' }}
                      placeholder="Search courses..."
                      inputProps={{ "aria-label": "search courses" }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px", color: scrolled ? 'white' : 'primary.main' }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.link}
                      sx={{
                        color: scrolled ? "white" : "text.primary",
                        fontWeight: 500,
                        "&:hover": {
                          color: scrolled ? "primary.100" : "primary.main",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              </>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* User Controls */}
            {userData && (
              <>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {scrolled && (
                    <Chip
                      label={userData.role}
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "white",
                        color: theme.palette.primary.main,
                      }}
                    />
                  )}
                  <IconButton onClick={handleClick}>
                    <Avatar
                      sx={{
                        bgcolor: scrolled ? "white" : "primary.main",
                        color: scrolled ? theme.palette.primary.main : "white",
                        width: 40,
                        height: 40,
                        fontWeight: 600,
                      }}
                    >
                      {getInitials(userData.name)}
                    </Avatar>
                  </IconButton>
                </Stack>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/settings");
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={() => {
                      navigate("/");
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: scrolled ? 'white' : 'inherit' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
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
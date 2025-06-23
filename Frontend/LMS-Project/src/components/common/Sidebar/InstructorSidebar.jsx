// import {
//   Box,
//   Typography,
//   styled,
//   Avatar,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Toolbar,
//   useTheme,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   School as CoursesIcon,
//   People as StudentsIcon,
//   BarChart as AnalyticsIcon,
//   Settings as SettingsIcon,
//   Quiz as QuizIcon,
//   School as SchoolIcon,
//   Add as AddIcon,
//   Assignment as AssignmentIcon,
//   Logout as LogoutIcon,
//   Menu,
//   ChevronLeft,
// } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";

// import { Drawer } from "@mui/material";
// const drawerWidth = 240;
// const collapsedWidth = 72;

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   "& .MuiDrawer-paper": {
//     backgroundColor: "#f8fafc",
//     backgroundImage: "linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)",
//     borderRight: "1px solid rgba(145, 185, 255, 0.3)",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: "hidden",
//     top: "69px",
//     width: drawerWidth,
//     [theme.breakpoints.down("sm")]: {
//       position: "absolute",
//       height: "100%",
//       zIndex: theme.zIndex.drawer + 1,
//     },
//   },
//   "& .MuiDrawer-paperCollapsed": {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     top: "69px",
//     height: "100%",
//     width: collapsedWidth,
//     [theme.breakpoints.down("sm")]: {
//       width: 0,
//     },
//   },
// }));

// const InstructorSidebar = ({
//   mobileOpen,
//   handleDrawerToggle,
//   collapsed,
//   setCollapsed,
//   isMobile,
//   currentView,
//   onViewChange,
// }) => {
//   const { logout } = useAuth();
//   const theme = useTheme();
//   const location = useLocation();

//   const menuItems = [
//     {
//       text: "Dashboard",
//       icon: <DashboardIcon color="primary" />,
//       view: "dashboard",
//       color: "primary.main",
//     },
//     {
//       text: "My Courses",
//       icon: <CoursesIcon color="secondary" />,
//       view: "my-courses",
//       color: "secondary.main",
//     },
//     {
//       text: "Enrollment Stats",
//       icon: <StudentsIcon sx={{ color: "#ff9800" }} />,
//       view: "enrollment-stats",
//       color: "#ff9800",
//     },
//     {
//       text: "Assignments", // Fixed spelling
//       icon: <AssignmentIcon sx={{ color: "#9c27b0" }} />,
//       view: "assignments",
//       color: "#9c27b0",
//     },
//     {
//       text: "visualization",
//       icon: <AnalyticsIcon sx={{ color: "#607d8b" }} />,
//       view: "visualization",
//       color: "#607d8b",
//     },
//     {
//       text: "Quizzes", // Fixed spelling
//       icon: <QuizIcon sx={{ color: "#3f51b5" }} />,
//       view: "quizzes",
//       color: "#3f51b5",
//     },
//     {
//       text: "Settings",
//       icon: <SettingsIcon sx={{ color: "#607d8b" }} />,
//       view: "settings",
//       color: "#607d8b",
//     },
//   ];

//   const handleItemClick = (item) => {
//     if (item.path) {
//       // For items with external paths, use Link navigation
//       return;
//     } else if (item.view) {
//       // For items with views, use the view change handler
//       onViewChange(item.view);
//       if (isMobile) handleDrawerToggle();
//     }
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {isMobile && (
//         <Toolbar
//           sx={{
//             position: "fixed",
//             top: "70px",
//             left: 0,
//             zIndex: theme.zIndex.drawer - 1,
//             borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
//           }}
//         >
//           <IconButton
//             color="primary"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//           >
//             <Menu />
//           </IconButton>
//         </Toolbar>
//       )}

//       <StyledDrawer
//         variant={isMobile ? "temporary" : "permanent"}
//         anchor="left"
//         open={isMobile ? mobileOpen : true}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         PaperProps={{
//           className: collapsed ? "MuiDrawer-paperCollapsed" : "",
//         }}
//       >
//         {/* Collapse Button */}
//         {!isMobile && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
//             }}
//           >
//             <IconButton onClick={() => setCollapsed(!collapsed)}>
//               {collapsed ? (
//                 <Menu color="primary" />
//               ) : (
//                 <ChevronLeft color="primary" />
//               )}
//             </IconButton>
//           </Box>
//         )}

//         {/* Menu Items */}
//         <List sx={{ p: 1 }}>
//           {menuItems.map((item) => {
//             const isSelected = item.view
//               ? currentView === item.view
//               : location.pathname === item.path;

//             return (
//               <ListItem
//                 key={item.text}
//                 component={item.path ? Link : "div"}
//                 to={item.path || undefined}
//                 selected={isSelected}
//                 onClick={() => handleItemClick(item)}
//                 sx={{
//                   borderRadius: 1,
//                   mb: 0.5,
//                   minHeight: 48,
//                   justifyContent: collapsed ? "center" : "flex-start",
//                   cursor: "pointer",
//                   "&.Mui-selected": {
//                     backgroundColor: "primary.50",
//                     "&:hover": {
//                       backgroundColor: "primary.50",
//                     },
//                   },
//                   "&:hover": {
//                     backgroundColor: "primary.100",
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: collapsed ? 0 : 2,
//                     justifyContent: "center",
//                     color: isSelected ? item.color : "text.secondary",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 {!collapsed && (
//                   <ListItemText
//                     primary={item.text}
//                     primaryTypographyProps={{
//                       fontWeight: isSelected ? 600 : 400,
//                       color: isSelected ? "primary.dark" : "text.primary",
//                       fontSize: "0.9rem",
//                     }}
//                   />
//                 )}
//               </ListItem>
//             );
//           })}
//         </List>

//         {/* Logout Button */}
//         <Divider sx={{ borderColor: "rgba(145, 185, 255, 0.3)" }} />
//         <List sx={{ p: 1 }}>
//           <ListItem
//             onClick={logout}
//             sx={{
//               borderRadius: 1,
//               minHeight: 48,
//               justifyContent: collapsed ? "center" : "flex-start",
//               cursor: "pointer",
//               "&:hover": {
//                 backgroundColor: "error.50",
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: 0,
//                 mr: collapsed ? 0 : 2,
//                 justifyContent: "center",
//                 color: "error.main",
//               }}
//             >
//               <LogoutIcon />
//             </ListItemIcon>
//             {!collapsed && (
//               <ListItemText
//                 primary="Logout"
//                 primaryTypographyProps={{
//                   color: "error.main",
//                   fontWeight: 500,
//                 }}
//               />
//             )}
//           </ListItem>
//         </List>
//       </StyledDrawer>
//     </>
//   );
// };

// export default InstructorSidebar;




import {
  Box,
  Typography,
  styled,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  useTheme,
  Badge,
  Chip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  Menu,
  ChevronLeft,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Drawer } from "@mui/material";

const drawerWidth = 260;
const collapsedWidth = 80;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.default,
    backgroundImage: theme.palette.mode === 'light' 
      ? "linear-gradient(195deg, rgba(240, 245, 255, 0.8), rgba(255, 255, 255, 1))" 
      : "linear-gradient(195deg, rgba(20, 30, 50, 0.8), rgba(30, 41, 59, 1))",
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(["width", "transform"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: "hidden",
    top: "69px",
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      height: "100%",
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: theme.shadows[16],
    },
  },
  "& .MuiDrawer-paperCollapsed": {
    width: collapsedWidth,
    [theme.breakpoints.down("sm")]: {
      width: 0,
    },
  },
}));

const MenuItemWrapper = styled(ListItem)(({ theme, selected, collapsed }) => ({
  borderRadius: 12,
  margin: theme.spacing(0, 1.5, 0.5),
  minHeight: 48,
  justifyContent: collapsed ? "center" : "flex-start",
  transition: "all 0.2s ease-in-out",
  position: "relative",
  overflow: "hidden",
  
  "&:before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: selected ? 4 : 0,
    backgroundColor: theme.palette.primary.main,
    transition: "width 0.2s ease",
  },
  
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === 'light' 
      ? "rgba(26, 140, 240, 0.08)" 
      : "rgba(26, 140, 240, 0.2)",
    "&:hover": {
      backgroundColor: theme.palette.mode === 'light' 
        ? "rgba(26, 140, 240, 0.12)" 
        : "rgba(26, 140, 240, 0.25)",
    },
  },
  
  "&:hover": {
    backgroundColor: theme.palette.mode === 'light' 
      ? "rgba(26, 140, 240, 0.05)" 
      : "rgba(255, 255, 255, 0.05)",
    transform: "translateX(2px)",
  },
  
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: collapsed ? 0 : theme.spacing(2),
    justifyContent: "center",
    transition: "color 0.2s ease",
    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
  },
  
  "& .MuiListItemText-root": {
    opacity: collapsed ? 0 : 1,
    transition: "opacity 0.2s ease",
    "& span": {
      fontWeight: selected ? 600 : 400,
      color: selected ? theme.palette.primary.dark : theme.palette.text.primary,
      fontSize: "0.9rem",
    },
  },
}));

const InstructorSidebar = ({
  mobileOpen,
  handleDrawerToggle,
  collapsed,
  setCollapsed,
  isMobile,
  currentView,
  onViewChange,
}) => {
  const { logout, user } = useAuth();
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Badge color="secondary" variant="dot" invisible={false}><DashboardIcon /></Badge>,
      view: "dashboard",
      color: "primary.main",
    },
    {
      text: "My Courses",
      icon: <CoursesIcon />,
      view: "my-courses",
      color: "secondary.main",
      badge: "3 New",
    },
    {
      text: "Students",
      icon: <StudentsIcon />,
      view: "enrollment-stats",
      color: "warning.main",
    },
    {
      text: "Assignments",
      icon: <AssignmentIcon />,
      view: "assignments",
      color: "secondary.main",
    },
    {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      view: "visualization",
      color: "info.main",
    },
    {
      text: "Quizzes",
      icon: <QuizIcon />,
      view: "quizzes",
      color: "success.main",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      view: "settings",
      color: "text.secondary",
    },
  ];

  const handleItemClick = (item) => {
    if (item.path) {
      return;
    } else if (item.view) {
      onViewChange(item.view);
      if (isMobile) handleDrawerToggle();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Toolbar
          sx={{
            position: "fixed",
            top: (theme) => theme.mixins.toolbar.minHeight,
            left: 0,
            zIndex: theme.zIndex.drawer - 1,
            boxShadow: theme.shadows[1],
          }}
        >
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: theme.palette.mode === 'light' 
                ? "rgba(26, 140, 240, 0.1)" 
                : "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: theme.palette.mode === 'light' 
                  ? "rgba(26, 140, 240, 0.2)" 
                  : "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      )}

      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          className: collapsed ? "MuiDrawer-paperCollapsed" : "",
        }}
      >
        {/* Collapse Button */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {!collapsed && (
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  ml: 1,
                }}
              >
                Menu
              </Typography>
            )}
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                backgroundColor: theme.palette.mode === 'light' 
                  ? "rgba(26, 140, 240, 0.1)" 
                  : "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'light' 
                    ? "rgba(26, 140, 240, 0.2)" 
                    : "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {collapsed ? (
                <Menu color="primary" />
              ) : (
                <ChevronLeft color="primary" />
              )}
            </IconButton>
          </Box>
        )}

        {/* User Profile (hidden when collapsed) */}
        {!collapsed && (
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "success.main",
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                />
              }
            >
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  width: 48,
                  height: 48,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0) || "I"}
              </Avatar>
            </Badge>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                noWrap
                sx={{ color: theme.palette.text.primary }}
              >
                {user?.name || "Instructor"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ fontSize: "0.75rem" }}
              >
                {user?.email || "Instructor@example.com"}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Menu Items */}
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => {
            const isSelected = item.view
              ? currentView === item.view
              : location.pathname === item.path;

            return (
              <MenuItemWrapper
                key={item.text}
                selected={isSelected}
                collapsed={collapsed}
                onClick={() => handleItemClick(item)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {item.text}
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              ml: 1,
                              height: 20,
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              bgcolor: "primary.light",
                              color: "primary.contrastText",
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                )}
              </MenuItemWrapper>
            );
          })}
        </List>

        {/* Logout Button */}
        <Divider sx={{ borderColor: theme.palette.divider, my: 1 }} />
        <List sx={{ p: 1 }}>
          <MenuItemWrapper
            collapsed={collapsed}
            onClick={logout}
            sx={{
              "&:hover": {
                backgroundColor: "error.50",
              },
            }}
          >
            <ListItemIcon sx={{ color: "error.main" }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  color: "error.main",
                  fontWeight: 500,
                }}
              />
            )}
          </MenuItemWrapper>
        </List>
      </StyledDrawer>
    </>
  );
};

export default InstructorSidebar;
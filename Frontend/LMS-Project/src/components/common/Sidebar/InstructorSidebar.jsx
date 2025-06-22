// // import { Link, useLocation } from "react-router-dom";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// // import Divider from "@mui/material/Divider";
// // import DashboardIcon from "@mui/icons-material/Dashboard";
// // import BookIcon from "@mui/icons-material/Book";
// // import PeopleIcon from "@mui/icons-material/People";
// // import SettingsIcon from "@mui/icons-material/Settings";
// // import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// // const InstructorSidebar = () => {
// //   const location = useLocation();

// //   const menuItems = [
// //     {
// //       text: "Dashboard",
// //       icon: <DashboardIcon />,
// //       path: "/instructor/dashboard",
// //     },
// //     {
// //       text: "Courses",
// //       icon: <BookIcon />,
// //       path: "/instructor/courses",
// //     },
// //     {
// //       text: "Students",
// //       icon: <PeopleIcon />,
// //       path: "/instructor/students",
// //     },
// //   ];

// //   const bottomMenuItems = [
// //     {
// //       text: "Settings",
// //       icon: <SettingsIcon />,
// //       path: "/instructor/settings",
// //     },
// //     {
// //       text: "Logout",
// //       icon: <ExitToAppIcon />,
// //       path: "/logout",
// //     },
// //   ];

// //   return (
// //     <div style={{ width: 250 }}>
// //       <List>
// //         {menuItems.map((item) => (
// //           <ListItem
// //             button
// //             key={item.text}
// //             component={Link}
// //             to={item.path}
// //             selected={location.pathname === item.path}
// //           >
// //             <ListItemIcon>{item.icon}</ListItemIcon>
// //             <ListItemText primary={item.text} />
// //           </ListItem>
// //         ))}
// //       </List>
// //       <Divider />
// //       <List>
// //         {bottomMenuItems.map((item) => (
// //           <ListItem
// //             button
// //             key={item.text}
// //             component={Link}
// //             to={item.path}
// //             selected={location.pathname === item.path}
// //           >
// //             <ListItemIcon>{item.icon}</ListItemIcon>
// //             <ListItemText primary={item.text} />
// //           </ListItem>
// //         ))}
// //       </List>
// //     </div>
// //   );
// // };

// // export default InstructorSidebar;

// import React from "react";
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
//   Quiz as QuizIcon ,
//   School as SchoolIcon,
//   Add as AddIcon,
//   Assignment as AssignmentIcon,
//   Logout as LogoutIcon ,
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
// }) => {
//   const { logout, user } = useAuth();
//   const theme = useTheme();
//   const location = useLocation();

//   const menuItems = [
//     {
//       text: "Dashboard",
//       icon: <DashboardIcon color="primary" />,
//       path: "/instructor/dashboard",
//       color: "primary.main",
//     },
//     {
//       text: "My Courses",
//       icon: <CoursesIcon color="secondary" />,
//       path: "/instructor/courses",
//       color: "secondary.main",
//     },
//     {
//       text: "Create Course",
//       icon: <AddIcon sx={{ color: "#4caf50" }} />,
//       path: "/instructor/courses/create",
//       color: "#4caf50",
//     },
//     {
//       text: "Enrollment Stats",
//       icon: <StudentsIcon sx={{ color: "#ff9800" }} />,
//       path: "/instructor/enrollments",
//       color: "#ff9800",
//     },
//     {
//       text: "Assignment",
//       icon: <AssignmentIcon sx={{ color: "#9c27b0" }} />,
//       path: "/instructor/assignments",
//       color: "#9c27b0",
//     },
//     {
//       text: "Visualization",
//       icon: <AnalyticsIcon sx={{ color: "#607d8b" }} />,
//       path: "/instructor/Visualization",
//       color: "#607d8b",
//     },
//     {
//       text: "Quizzez",
//       icon: <QuizIcon  sx={{ color: "#3f51b5" }} />,
//       path: "/instructor/Quizze",
//       color: "#3f51b5",
//     },
//     {
//       text: "Settings",
//       icon: <SettingsIcon sx={{ color: "#607d8b" }} />,
//       tab: "settings",
//       color: "#607d8b",
//     },
//   ];

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
//             // bgcolor: "background.paper",
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

//         {/* User Profile (hidden when collapsed) */}
//         {!collapsed && (
//           <Box
//             sx={{
//               p: 2,
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: "primary.light",
//                 color: "primary.dark",
//                 width: 48,
//                 height: 48,
//               }}
//             >
//               {user?.name?.charAt(0) || "I"}
//             </Avatar>
//             <Box>
//               <Typography variant="subtitle1" fontWeight={500} noWrap>
//                 {user?.name || "Instructor"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" noWrap>
//                 Instructor
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* Menu Items */}
//         <List sx={{ p: 1 }}>
//           {menuItems.map((item) => (
//             <ListItem
//               key={item.text}
//               component={Link}
//               to={item.path}
//               selected={location.pathname === item.path}
//               onClick={() => {
//                 if (isMobile) handleDrawerToggle();
//               }}
//               sx={{
//                 borderRadius: 1,
//                 mb: 0.5,
//                 minHeight: 48,
//                 justifyContent: collapsed ? "center" : "flex-start",
//                 "&.Mui-selected": {
//                   backgroundColor: "primary.50",
//                   "&:hover": {
//                     backgroundColor: "primary.50",
//                   },
//                 },
//                 "&:hover": {
//                   backgroundColor: "primary.100",
//                 },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: collapsed ? 0 : 2,
//                   justifyContent: "center",
//                   color:
//                     location.pathname === item.path
//                       ? item.color
//                       : "text.secondary",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               {!collapsed && (
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontWeight: location.pathname === item.path ? 600 : 400,
//                     color:
//                       location.pathname === item.path
//                         ? "primary.dark"
//                         : "text.primary",
//                     fontSize: "0.9rem",
//                   }}
//                 />
//               )}
//             </ListItem>
//           ))}
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
//               <LogoutIcon  />
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
// import React from "react";
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
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import { Drawer } from "@mui/material";
const drawerWidth = 240;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "#f8fafc",
    backgroundImage: "linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)",
    borderRight: "1px solid rgba(145, 185, 255, 0.3)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    top: "69px",
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      height: "100%",
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  "& .MuiDrawer-paperCollapsed": {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    top: "69px",
    height: "100%",
    width: collapsedWidth,
    [theme.breakpoints.down("sm")]: {
      width: 0,
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
      icon: <DashboardIcon color="primary" />,
      view: "dashboard",
      color: "primary.main",
    },
    {
      text: "My Courses",
      icon: <CoursesIcon color="secondary" />,
      view: "my-courses",
      color: "secondary.main",
    },
    {
      text: "Enrollment Stats",
      icon: <StudentsIcon sx={{ color: "#ff9800" }} />,
      view: "enrollment-stats",
      color: "#ff9800",
    },
    {
      text: "Assignments", // Fixed spelling
      icon: <AssignmentIcon sx={{ color: "#9c27b0" }} />,
      view: "assignments",
      color: "#9c27b0",
    },
    {
      text: "visualization",
      icon: <AnalyticsIcon sx={{ color: "#607d8b" }} />,
      view: "visualization",
      color: "#607d8b",
    },
    {
      text: "Quizzes", // Fixed spelling
      icon: <QuizIcon sx={{ color: "#3f51b5" }} />,
      view: "quizzes",
      color: "#3f51b5",
    },
    {
      text: "Settings",
      icon: <SettingsIcon sx={{ color: "#607d8b" }} />,
      view: "settings",
      color: "#607d8b",
    },
  ];

  const handleItemClick = (item) => {
    if (item.path) {
      // For items with external paths, use Link navigation
      return;
    } else if (item.view) {
      // For items with views, use the view change handler
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
            top: "70px",
            left: 0,
            zIndex: theme.zIndex.drawer - 1,
            borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
          }}
        >
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
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
              borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
            }}
          >
            <IconButton onClick={() => setCollapsed(!collapsed)}>
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
              borderBottom: "1px solid rgba(145, 185, 255, 0.3)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.light",
                color: "primary.dark",
                width: 48,
                height: 48,
              }}
            >
              {user?.name?.charAt(0) || "I"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={500} noWrap>
                {user?.name || "Instructor"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                Instructor
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
              <ListItem
                key={item.text}
                component={item.path ? Link : "div"}
                to={item.path || undefined}
                selected={isSelected}
                onClick={() => handleItemClick(item)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  minHeight: 48,
                  justifyContent: collapsed ? "center" : "flex-start",
                  cursor: "pointer",
                  "&.Mui-selected": {
                    backgroundColor: "primary.50",
                    "&:hover": {
                      backgroundColor: "primary.50",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "primary.100",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: "center",
                    color: isSelected ? item.color : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? "primary.dark" : "text.primary",
                      fontSize: "0.9rem",
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>

        {/* Logout Button */}
        <Divider sx={{ borderColor: "rgba(145, 185, 255, 0.3)" }} />
        <List sx={{ p: 1 }}>
          <ListItem
            onClick={logout}
            sx={{
              borderRadius: 1,
              minHeight: 48,
              justifyContent: collapsed ? "center" : "flex-start",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "error.50",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 2,
                justifyContent: "center",
                color: "error.main",
              }}
            >
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
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default InstructorSidebar;

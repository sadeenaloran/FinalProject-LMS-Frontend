import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Box,
  Typography,
  IconButton,
  Toolbar,
  styled,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as AllCoursesIcon,
  Book as MyCoursesIcon,
  Assessment as ProgressIcon,
  Assignment as AssignmentsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Quiz as QuizIcon,
  Menu,
  ChevronLeft,
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";

// Modern colorful icons
const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    tab: "dashboard",
    color: "secondary.main",
  },
  {
    text: "All Courses",
    icon: <AllCoursesIcon color="primary" />,
    tab: "all",
    color: "primary.main",
  },
  {
    text: "My Courses",
    icon: <MyCoursesIcon color="secondary" />,
    tab: "enrolled",
    color: "secondary.main",
  },
  {
    text: "My Progress",
    icon: <ProgressIcon sx={{ color: "#4caf50" }} />,
    tab: "progress",
    color: "#4caf50",
  },
  {
    text: "Assignments",
    icon: <AssignmentsIcon sx={{ color: "#ff9800" }} />,
    tab: "assignments",
    color: "#ff9800",
  },
  {
    text: "Quizzes",
    label: "Quizzes",
    icon: <QuizIcon />,
    color: "secondary.main",
  },
  {
    text: "Settings",
    icon: <SettingsIcon sx={{ color: "#607d8b" }} />,
    tab: "settings",
    color: "#607d8b",
  },
];

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

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
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
            bgcolor: "background.paper",
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
            <IconButton onClick={handleDrawerToggle}>
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
              {user?.name?.charAt(0) || "S"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={500} noWrap>
                {user?.name || "Student"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                Student Account
              </Typography>
            </Box>
          </Box>
        )}

        {/* Menu Items */}
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              selected={activeTab === item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                minHeight: 48,
                justifyContent: collapsed ? "center" : "flex-start",
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
                  color: activeTab === item.tab ? item.color : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: activeTab === item.tab ? 600 : 400,
                    color:
                      activeTab === item.tab ? "primary.dark" : "text.primary",
                    fontSize: "0.9rem",
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

        {/* Logout Button */}
        <Divider sx={{ borderColor: "rgba(145, 185, 255, 0.3)" }} />
        <List sx={{ p: 1 }}>
          <ListItem
            button
            onClick={logout}
            sx={{
              borderRadius: 1,
              minHeight: 48,
              justifyContent: collapsed ? "center" : "flex-start",
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

export default StudentSidebar;



// import { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Box,
//   Typography,
//   IconButton,
//   Toolbar,
//   styled,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   School as AllCoursesIcon,
//   Book as MyCoursesIcon,
//   Assessment as ProgressIcon,
//   Assignment as AssignmentsIcon,
//   Settings as SettingsIcon,
//   ExitToApp as LogoutIcon,
//   Quiz as QuizIcon,
//   Menu,
//   ChevronLeft,
// } from "@mui/icons-material";
// import { useAuth } from "../../../contexts/AuthContext";

// // Updated menu items using theme colors
// const menuItems = [
//   {
//     text: "Dashboard",
//     icon: <DashboardIcon />,
//     tab: "dashboard",
//     color: "secondary.main",
//   },
//   {
//     text: "All Courses",
//     icon: <AllCoursesIcon />,
//     tab: "all",
//     color: "primary.main",
//   },
//   {
//     text: "My Courses",
//     icon: <MyCoursesIcon />,
//     tab: "enrolled",
//     color: "secondary.main",
//   },
//   {
//     text: "My Progress",
//     icon: <ProgressIcon />,
//     tab: "progress",
//     color: "success.main",
//   },
//   {
//     text: "Assignments",
//     icon: <AssignmentsIcon />,
//     tab: "assignments",
//     color: "warning.main",
//   },
//   {
//     text: "Quizzes",
//     icon: <QuizIcon />,
//     tab: "quizzes",
//     color: "info.main",
//   },
//   {
//     text: "Settings",
//     icon: <SettingsIcon />,
//     tab: "settings",
//     color: "text.secondary",
//   },
// ];

// const drawerWidth = 240;
// const collapsedWidth = 72;

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   "& .MuiDrawer-paper": {
//     backgroundColor: theme.palette.background.default,
//     backgroundImage: theme.palette.mode === 'light' 
//       ? "linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)" 
//       : "none",
//     borderRight: `1px solid ${theme.palette.divider}`,
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

// const StudentSidebar = ({ activeTab, setActiveTab }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { logout, user } = useAuth();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     if (isMobile) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {isMobile && (
//         <Toolbar
//           sx={{
//             position: "fixed",
//             top: (theme) => theme.mixins.toolbar.minHeight,
//             left: 0,
//             zIndex: theme.zIndex.drawer - 1,
//             bgcolor: "background.paper",
//             borderBottom: `1px solid ${theme.palette.divider}`,
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
//               borderBottom: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <IconButton onClick={handleDrawerToggle}>
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
//               borderBottom: `1px solid ${theme.palette.divider}`,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: "primary.light",
//                 color: "primary.contrastText",
//                 width: 48,
//                 height: 48,
//               }}
//             >
//               {user?.name?.charAt(0) || "S"}
//             </Avatar>
//             <Box>
//               <Typography variant="subtitle1" fontWeight={500} noWrap>
//                 {user?.name || "Student"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" noWrap>
//                 Student Account
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* Menu Items */}
//         <List sx={{ p: 1 }}>
//           {menuItems.map((item) => (
//             <ListItem
//               button
//               key={item.text}
//               selected={activeTab === item.tab}
//               onClick={() => {
//                 setActiveTab(item.tab);
//                 if (isMobile) setMobileOpen(false);
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
//                   color: activeTab === item.tab ? item.color : "text.secondary",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               {!collapsed && (
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontWeight: activeTab === item.tab ? 600 : 400,
//                     color: activeTab === item.tab ? item.color : "text.primary",
//                     fontSize: "0.9rem",
//                   }}
//                 />
//               )}
//             </ListItem>
//           ))}
//         </List>

//         {/* Logout Button */}
//         <Divider sx={{ borderColor: theme.palette.divider }} />
//         <List sx={{ p: 1 }}>
//           <ListItem
//             button
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

// export default StudentSidebar;


































// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Box,
//   Typography,
// } from "@mui/material";
// import {
//   School,
//   Book,
//   Assessment,
//   Assignment,
//   Dashboard,
//   Quiz as QuizIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";

// const drawerWidth = 280;

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   "& .MuiDrawer-paper": {
//     width: drawerWidth,
//     boxSizing: "border-box",
//     background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
//     borderRight: "1px solid rgba(99, 102, 241, 0.08)",
//     boxShadow: "4px 0 20px rgba(99, 102, 241, 0.05)",
//   },
// }));

// const ModernListItem = styled(ListItem)(({ theme, selected }) => ({
//   margin: "6px 16px",
//   borderRadius: "12px",
//   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     left: 0,
//     top: 0,
//     height: "100%",
//     width: selected ? "4px" : "0px",
//     background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//     transition: "width 0.3s ease",
//   },
//   ...(selected
//     ? {
//         background:
//           "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)",
//         color: "#6366f1",
//         boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
//         transform: "translateX(4px)",
//         "& .MuiListItemIcon-root": {
//           color: "#6366f1",
//         },
//         "& .MuiListItemText-primary": {
//           fontWeight: 600,
//           color: "#6366f1",
//         },
//       }
//     : {
//         "&:hover": {
//           background:
//             "linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(139, 92, 246, 0.03) 100%)",
//           transform: "translateX(2px)",
//           boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)",
//         },
//       }),
// }));

// const StudentSidebar = ({ activeTab, setActiveTab }) => {
//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: <Dashboard />,
//       color: "#6366f1",
//     },
//     { id: "all", label: "All Courses", icon: <School />, color: "#6366f1" },
//     { id: "enrolled", label: "My Courses", icon: <Book />, color: "#8b5cf6" },
//     {
//       id: "progress",
//       label: "My Progress",
//       icon: <Assessment />,
//       color: "#06b6d4",
//     },
//     {
//       id: "assignments",
//       label: "Assignments",
//       icon: <Assignment />,
//       color: "#10b981",
//     },
//     {
//       id: "quizzes",
//       label: "Quizzes",
//       icon: <QuizIcon />,
//       color: "#f59e0b",
//     },
//   ];

//   return (
//     <StyledDrawer variant="permanent">
//       <Box
//         sx={{
//           p: 3,
//           background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//           color: "white",
//           textAlign: "center",
//           position: "relative",
//           overflow: "hidden",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background:
//               'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
//             opacity: 0.3,
//           },
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             position: "relative",
//             zIndex: 1,
//             textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           Learning Hub
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             opacity: 0.9,
//             mt: 0.5,
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           Student Portal
//         </Typography>
//       </Box>

//       <Box sx={{ mt: 2 }}>
//         <List sx={{ px: 0 }}>
//           {menuItems.map((item) => (
//             <ModernListItem
//               key={item.id}
//               button
//               selected={activeTab === item.id}
//               onClick={() => setActiveTab(item.id)}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 48,
//                   "& .MuiSvgIcon-root": {
//                     fontSize: 22,
//                     transition: "all 0.3s ease",
//                   },
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{
//                   fontSize: "0.95rem",
//                   fontWeight: activeTab === item.id ? 600 : 500,
//                 }}
//               />
//             </ModernListItem>
//           ))}
//         </List>
//       </Box>
//     </StyledDrawer>
//   );
// };

// export default StudentSidebar;

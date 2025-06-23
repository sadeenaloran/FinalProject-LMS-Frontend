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
//   styled
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   School as SchoolIcon,
//   BarChart as BarChartIcon,
//   Settings as SettingsIcon,
//   ExitToApp as LogoutIcon,
//   Class as ClassIcon,
//   Menu,
//   ChevronLeft
// } from "@mui/icons-material";
// import { useAuth } from "../../../contexts/AuthContext";

// // Modern colorful icons
// const menuItems = [
//   { 
//     text: "Dashboard", 
//     icon: <DashboardIcon color="primary" />, 
//     tab: "dashboard",
//     color: "primary.main"
//   },
//   { 
//     text: "User Management", 
//     icon: <PeopleIcon color="secondary" />, 
//     tab: "users",
//     color: "secondary.main"
//   },
//   { 
//     text: "Course Management", 
//     icon: <SchoolIcon sx={{ color: "#4caf50" }} />, 
//     tab: "courses",
//     color: "#4caf50"
//   },
//   { 
//     text: "Category Management", 
//     icon: <ClassIcon sx={{ color: "#ff9800" }} />, 
//     tab: "categories",
//     color: "#ff9800"
//   },
//   { 
//     text: "Reports", 
//     icon: <BarChartIcon sx={{ color: "#9c27b0" }} />, 
//     tab: "reports",
//     color: "#9c27b0"
//   },
//   { 
//     text: "Settings", 
//     icon: <SettingsIcon sx={{ color: "#607d8b" }} />, 
//     tab: "settings",
//     color: "#607d8b"
//   },
// ];

// const drawerWidth = 240;
// const collapsedWidth = 72;

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   '& .MuiDrawer-paper': {
//     backgroundColor: '#f8fafc',
//     backgroundImage: 'linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)',
//     borderRight: '1px solid rgba(145, 185, 255, 0.3)',
//     transition: theme.transitions.create('width', {
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
//   '& .MuiDrawer-paperCollapsed': {
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//      overflowX: "hidden",
//     top: "69px",
//     height: "100%",
//     width: collapsedWidth,
//     [theme.breakpoints.down("sm")]: {
//       width: 0,
//     },
//   },
// }));

// const AdminSidebar = ({ activeTab, setActiveTab }) => {
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
//         <Toolbar sx={{ 
//           position: 'fixed',
//           top: 10,
//           left: 0,
//           zIndex: theme.zIndex.drawer - 1,
//           bgcolor: 'background.paper',
//           borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
//         }}>
//           <IconButton
//             color="primary"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Admin Panel
//           </Typography>
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
//           className: collapsed ? 'MuiDrawer-paperCollapsed' : '',
//         }}
//       >
//         {/* Collapse Button */}
//         {!isMobile && (
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'flex-end', 
//             borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
//           }}>
//             <IconButton onClick={handleDrawerToggle}>
//               {collapsed ? <Menu color="primary" /> : <ChevronLeft color="primary" />}
//             </IconButton>
//           </Box>
//         )}

//         {/* User Profile (hidden when collapsed) */}
//         {!collapsed && (
//           <Box sx={{ 
//             p: 2, 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: 2,
//             borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
//           }}>
//             <Avatar sx={{ 
//               bgcolor: 'primary.light',
//               color: 'primary.dark',
//               width: 48,
//               height: 48
//             }}>
//               {user?.name?.charAt(0) || 'A'}
//             </Avatar>
//             <Box>
//               <Typography variant="subtitle1" fontWeight={500} noWrap>
//                 {user?.name || 'Admin'}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" noWrap>
//                 Administrator
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
//                 justifyContent: collapsed ? 'center' : 'flex-start',
//                 "&.Mui-selected": {
//                   backgroundColor: 'primary.50',
//                   "&:hover": {
//                     backgroundColor: 'primary.50',
//                   },
//                 },
//                 "&:hover": {
//                   backgroundColor: 'primary.100',
//                 },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: collapsed ? 0 : 2,
//                   justifyContent: 'center',
//                   color: activeTab === item.tab ? item.color : 'text.secondary',
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               {!collapsed && (
//                 <ListItemText
//                   primary={item.text}
//                   primaryTypographyProps={{
//                     fontWeight: activeTab === item.tab ? 600 : 400,
//                     color: activeTab === item.tab ? 'primary.dark' : 'text.primary',
//                     fontSize: '0.9rem'
//                   }}
//                 />
//               )}
//             </ListItem>
//           ))}
//         </List>

//         {/* Logout Button */}
//         <Divider sx={{ borderColor: 'rgba(145, 185, 255, 0.3)' }} />
//         <List sx={{ p: 1 }}>
//           <ListItem 
//             button 
//             onClick={logout}
//             sx={{
//               borderRadius: 1,
//               minHeight: 48,
//               justifyContent: collapsed ? 'center' : 'flex-start',
//               "&:hover": {
//                 backgroundColor: 'error.50',
//               },
//             }}
//           >
//             <ListItemIcon sx={{ 
//               minWidth: 0,
//               mr: collapsed ? 0 : 2,
//               justifyContent: 'center',
//               color: 'error.main'
//             }}>
//               <LogoutIcon />
//             </ListItemIcon>
//             {!collapsed && (
//               <ListItemText 
//                 primary="Logout" 
//                 primaryTypographyProps={{
//                   color: 'error.main',
//                   fontWeight: 500
//                 }} 
//               />
//             )}
//           </ListItem>
//         </List>
//       </StyledDrawer>
//     </>
//   );
// };

// export default AdminSidebar;



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
  Badge,
  Chip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Class as ClassIcon,
  Menu,
  ChevronLeft,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";

const menuItems = [
  { 
    text: "Dashboard", 
    icon: <Badge color="secondary" variant="dot"><DashboardIcon /></Badge>,
    tab: "dashboard",
    color: "primary.main",
    badge: "New"
  },
  { 
    text: "Users", 
    icon:<PeopleIcon />,
    tab: "users",
    color: "secondary.main"
  },
  { 
    text: "Courses", 
    icon: <SchoolIcon />,
    tab: "courses",
    color: "success.main",
  },
  { 
    text: "Categories", 
    icon: <ClassIcon />,
    tab: "categories",
    color: "warning.main"
  },
  { 
    text: "Reports", 
    icon: <BarChartIcon />,
    tab: "reports",
    color: "info.main"
  },
  { 
    text: "Settings", 
    icon: <SettingsIcon />,
    tab: "settings",
    color: "text.secondary"
  },
  { 
    text: "Admin Tools", 
    icon: <SecurityIcon />,
    tab: "admin-tools",
    color: "error.main"
  },
];

const drawerWidth = 280;
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

const AdminSidebar = ({ activeTab, setActiveTab }) => {
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
            borderBottom: `1px solid ${theme.palette.divider}`,
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
                {user?.name?.charAt(0) || "A"}
              </Avatar>
            </Badge>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                noWrap
                sx={{ color: theme.palette.text.primary }}
              >
                {user?.name || "Admin"}
              </Typography>
               <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                sx={{ fontSize: "0.75rem" }}
              >
                {user?.email || "Admin@example.com"}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Menu Items */}
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <MenuItemWrapper
              key={item.text}
              selected={activeTab === item.tab}
              collapsed={collapsed}
              onClick={() => {
                setActiveTab(item.tab);
                if (isMobile) setMobileOpen(false);
              }}
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
          ))}
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
            <ListItemIcon
              sx={{
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
          </MenuItemWrapper>
        </List>
      </StyledDrawer>
    </>
  );
};

export default AdminSidebar;
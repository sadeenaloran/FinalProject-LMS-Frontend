// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Toolbar, // <-- Add this import
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   School as SchoolIcon,
//   BarChart as BarChartIcon,
//   Settings as SettingsIcon,
// } from "@mui/icons-material";

// const drawerWidth = 240;

// const AdminSidebar = ({ activeTab, setActiveTab }) => {
//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, tab: "dashboard" },
//     { text: "User Management", icon: <PeopleIcon />, tab: "users" },
//     { text: "Course Management", icon: <SchoolIcon />, tab: "courses" }, // This should match the switch case
//     { text: "Reports", icon: <BarChartIcon />, tab: "reports" },
//     { text: "Settings", icon: <SettingsIcon />, tab: "settings" },
//   ];

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar /> {/* This creates space below the AppBar */}
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             selected={activeTab === item.tab}
//             onClick={() => setActiveTab(item.tab)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   School as SchoolIcon,
//   BarChart as BarChartIcon,
//   Settings as SettingsIcon,
//   ExitToApp as LogoutIcon,
//   Class as ClassIcon,
// } from "@mui/icons-material";
// import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed

// const drawerWidth = 240;

// const AdminSidebar = ({
//   activeTab,
//   setActiveTab,
//   mobileOpen,
//   handleDrawerToggle,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { logout } = useAuth(); // Get logout function from your auth context

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, tab: "dashboard" },
//     { text: "User Management", icon: <PeopleIcon />, tab: "users" },
//     { text: "Course Management", icon: <SchoolIcon />, tab: "courses" },
//     { text: "Category Management", icon: <ClassIcon  />, tab: "categories" },
//     { text: "Reports", icon: <BarChartIcon />, tab: "reports" },
//     { text: "Settings", icon: <SettingsIcon />, tab: "settings" },
//   ];

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: theme.palette.background.paper,
//           [theme.breakpoints.down("sm")]: {
//             width: mobileOpen ? drawerWidth : 0,
//           },
//         },
//       }}
//       variant={isMobile ? "temporary" : "permanent"}
//       anchor="left"
//       open={isMobile ? mobileOpen : true}
//       onClose={handleDrawerToggle}
//       ModalProps={{
//         keepMounted: true, // Better open performance on mobile
//       }}
//     >
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             selected={activeTab === item.tab}
//             onClick={() => {
//               setActiveTab(item.tab);
//               if (isMobile) handleDrawerToggle(); // Close drawer on mobile after selection
//             }}
//             sx={{
//               "&.Mui-selected": {
//                 backgroundColor: theme.palette.action.selected,
//                 "&:hover": {
//                   backgroundColor: theme.palette.action.selected,
//                 },
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 color:
//                   activeTab === item.tab
//                     ? theme.palette.primary.main
//                     : "inherit",
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontWeight: activeTab === item.tab ? "medium" : "normal",
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         <ListItem button onClick={logout}>
//           <ListItemIcon>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Box,
//   Typography
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   School as SchoolIcon,
//   BarChart as BarChartIcon,
//   Settings as SettingsIcon,
//   ExitToApp as LogoutIcon,
//   Class as ClassIcon,
// } from "@mui/icons-material";
// import { useAuth } from "../../../contexts/AuthContext";

// const drawerWidth = 240;

// const AdminSidebar = ({
//   activeTab,
//   setActiveTab,
//   mobileOpen,
//   handleDrawerToggle,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { logout, user } = useAuth();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, tab: "dashboard" },
//     { text: "User Management", icon: <PeopleIcon />, tab: "users" },
//     { text: "Course Management", icon: <SchoolIcon />, tab: "courses" },
//     { text: "Category Management", icon: <ClassIcon />, tab: "categories" },
//     { text: "Reports", icon: <BarChartIcon />, tab: "reports" },
//     { text: "Settings", icon: <SettingsIcon />, tab: "settings" },
//   ];

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: '#f8fafc',
//           backgroundImage: 'linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)',
//           borderRight: '1px solid rgba(145, 185, 255, 0.3)',
//           [theme.breakpoints.down("sm")]: {
//             width: mobileOpen ? drawerWidth : 0,
//           },
//         },
//       }}
//       variant={isMobile ? "temporary" : "permanent"}
//       anchor="left"
//       open={isMobile ? mobileOpen : true}
//       onClose={handleDrawerToggle}
//       ModalProps={{
//         keepMounted: true,
//       }}
//     >
//       <Box sx={{ 
//         p: 2, 
//         display: 'flex', 
//         alignItems: 'center', 
//         gap: 2,
//         borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
//       }}>
//         <Avatar sx={{ 
//           bgcolor: 'primary.light',
//           color: 'primary.dark',
//           width: 48,
//           height: 48
//         }}>
//           {user?.name?.charAt(0) || 'A'}
//         </Avatar>
//         <Box>
//           <Typography variant="subtitle1" fontWeight={500}>
//             {user?.name || 'Admin'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Administrator
//           </Typography>
//         </Box>
//       </Box>

//       <List sx={{ p: 1 }}>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.text}
//             selected={activeTab === item.tab}
//             onClick={() => {
//               setActiveTab(item.tab);
//               if (isMobile) handleDrawerToggle();
//             }}
//             sx={{
//               borderRadius: 1,
//               mb: 0.5,
//               "&.Mui-selected": {
//                 backgroundColor: 'primary.50',
//                 "&:hover": {
//                   backgroundColor: 'primary.50',
//                 },
//               },
//               "&:hover": {
//                 backgroundColor: 'primary.100',
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 color: activeTab === item.tab ? 'primary.main' : 'text.secondary',
//                 minWidth: 40
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontWeight: activeTab === item.tab ? 600 : 400,
//                 color: activeTab === item.tab ? 'primary.dark' : 'text.primary',
//                 fontSize: '0.9rem'
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//       <Divider sx={{ borderColor: 'rgba(145, 185, 255, 0.3)' }} />
//       <List sx={{ p: 1 }}>
//         <ListItem 
//           button 
//           onClick={logout}
//           sx={{
//             borderRadius: 1,
//             "&:hover": {
//               backgroundColor: 'error.50',
//             },
//           }}
//         >
//           <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText 
//             primary="Logout" 
//             primaryTypographyProps={{
//               color: 'error.main',
//               fontWeight: 500
//             }} 
//           />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;

import React, { useState } from "react";
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
  styled
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
  ChevronLeft
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";

// Modern colorful icons
const menuItems = [
  { 
    text: "Dashboard", 
    icon: <DashboardIcon color="primary" />, 
    tab: "dashboard",
    color: "primary.main"
  },
  { 
    text: "User Management", 
    icon: <PeopleIcon color="secondary" />, 
    tab: "users",
    color: "secondary.main"
  },
  { 
    text: "Course Management", 
    icon: <SchoolIcon sx={{ color: "#4caf50" }} />, 
    tab: "courses",
    color: "#4caf50"
  },
  { 
    text: "Category Management", 
    icon: <ClassIcon sx={{ color: "#ff9800" }} />, 
    tab: "categories",
    color: "#ff9800"
  },
  { 
    text: "Reports", 
    icon: <BarChartIcon sx={{ color: "#9c27b0" }} />, 
    tab: "reports",
    color: "#9c27b0"
  },
  { 
    text: "Settings", 
    icon: <SettingsIcon sx={{ color: "#607d8b" }} />, 
    tab: "settings",
    color: "#607d8b"
  },
];

const drawerWidth = 240;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: '#f8fafc',
    backgroundImage: 'linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)',
    borderRight: '1px solid rgba(145, 185, 255, 0.3)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  '& .MuiDrawer-paperCollapsed': {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: collapsedWidth,
    [theme.breakpoints.down('sm')]: {
      width: 0,
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
        <Toolbar sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer - 1,
          bgcolor: 'background.paper',
          borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
        }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
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
          className: collapsed ? 'MuiDrawer-paperCollapsed' : '',
        }}
      >
        {/* Collapse Button */}
        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            p: 1,
            borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
          }}>
            <IconButton onClick={handleDrawerToggle}>
              {collapsed ? <Menu color="primary" /> : <ChevronLeft color="primary" />}
            </IconButton>
          </Box>
        )}

        {/* User Profile (hidden when collapsed) */}
        {!collapsed && (
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            borderBottom: '1px solid rgba(145, 185, 255, 0.3)'
          }}>
            <Avatar sx={{ 
              bgcolor: 'primary.light',
              color: 'primary.dark',
              width: 48,
              height: 48
            }}>
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={500} noWrap>
                {user?.name || 'Admin'}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                Administrator
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
                justifyContent: collapsed ? 'center' : 'flex-start',
                "&.Mui-selected": {
                  backgroundColor: 'primary.50',
                  "&:hover": {
                    backgroundColor: 'primary.50',
                  },
                },
                "&:hover": {
                  backgroundColor: 'primary.100',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: 'center',
                  color: activeTab === item.tab ? item.color : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: activeTab === item.tab ? 600 : 400,
                    color: activeTab === item.tab ? 'primary.dark' : 'text.primary',
                    fontSize: '0.9rem'
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

        {/* Logout Button */}
        <Divider sx={{ borderColor: 'rgba(145, 185, 255, 0.3)' }} />
        <List sx={{ p: 1 }}>
          <ListItem 
            button 
            onClick={logout}
            sx={{
              borderRadius: 1,
              minHeight: 48,
              justifyContent: collapsed ? 'center' : 'flex-start',
              "&:hover": {
                backgroundColor: 'error.50',
              },
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 0,
              mr: collapsed ? 0 : 2,
              justifyContent: 'center',
              color: 'error.main'
            }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{
                  color: 'error.main',
                  fontWeight: 500
                }} 
              />
            )}
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};

export default AdminSidebar;
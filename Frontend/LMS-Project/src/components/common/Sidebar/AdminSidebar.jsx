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

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Class as ClassIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed

const drawerWidth = 240;

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useAuth(); // Get logout function from your auth context

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, tab: "dashboard" },
    { text: "User Management", icon: <PeopleIcon />, tab: "users" },
    { text: "Course Management", icon: <SchoolIcon />, tab: "courses" },
    { text: "Category Management", icon: <ClassIcon  />, tab: "categories" },
    { text: "Reports", icon: <BarChartIcon />, tab: "reports" },
    { text: "Settings", icon: <SettingsIcon />, tab: "settings" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          [theme.breakpoints.down("sm")]: {
            width: mobileOpen ? drawerWidth : 0,
          },
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={activeTab === item.tab}
            onClick={() => {
              setActiveTab(item.tab);
              if (isMobile) handleDrawerToggle(); // Close drawer on mobile after selection
            }}
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  activeTab === item.tab
                    ? theme.palette.primary.main
                    : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: activeTab === item.tab ? "medium" : "normal",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;

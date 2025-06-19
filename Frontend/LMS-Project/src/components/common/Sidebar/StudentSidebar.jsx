import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Grading as GradingIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const drawerWidth = 240;

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, tab: "dashboard" },
    { text: "All Courses", icon: <SchoolIcon />, tab: "all-courses" },
    { text: "My Courses", icon: <BookIcon />, tab: "my-courses" },
    { text: "Progress", icon: <BookIcon />, tab: "progress" },
    { text: "Assignments", icon: <AssignmentIcon />, tab: "assignments" },
    { text: "Grades", icon: <GradingIcon />, tab: "grades" },
    { text: "Settings", icon: <SettingsIcon />, tab: "settings" },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      action: handleLogout,
      tab: "logout",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              selected={activeTab === item.tab}
              onClick={() => (item.action ? item.action() : setActiveTab(item.tab))}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default StudentSidebar;
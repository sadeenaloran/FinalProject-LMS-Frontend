import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { School, Book, Assessment } from "@mui/icons-material";
import { styled } from "@mui/system";
import { sidebarStyles } from "../../theme/studentStyle";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    borderRight: "none",
  },
}));

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <StyledDrawer variant="permanent">
      <Box sx={sidebarStyles.logoContainer}>
        <Typography variant="h6" sx={sidebarStyles.logoText}>
          Learning Hub
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem
          button={true} // Changed this line
          selected={activeTab === "all"}
          onClick={() => setActiveTab("all")}
          sx={sidebarStyles.listItem}
        >
          <ListItemIcon sx={sidebarStyles.listIcon}>
            <School />
          </ListItemIcon>
          <ListItemText primary="All Courses" />
        </ListItem>
        <ListItem
          button={true} // Changed this line
          selected={activeTab === "enrolled"}
          onClick={() => setActiveTab("enrolled")}
          sx={sidebarStyles.listItem}
        >
          <ListItemIcon sx={sidebarStyles.listIcon}>
            <Book />
          </ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem
          button={true} // Changed this line
          selected={activeTab === "progress"}
          onClick={() => setActiveTab("progress")}
          sx={sidebarStyles.listItem}
        >
          <ListItemIcon sx={sidebarStyles.listIcon}>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary="My Progress" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default StudentSidebar;

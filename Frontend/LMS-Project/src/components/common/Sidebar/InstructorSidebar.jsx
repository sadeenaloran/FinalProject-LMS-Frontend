import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const InstructorSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/instructor/dashboard",
    },
    {
      text: "Courses",
      icon: <BookIcon />,
      path: "/instructor/courses",
    },
    {
      text: "Students",
      icon: <PeopleIcon />,
      path: "/instructor/students",
    },
  ];

  const bottomMenuItems = [
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/instructor/settings",
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      path: "/logout",
    },
  ];

  return (
    <div style={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default InstructorSidebar;

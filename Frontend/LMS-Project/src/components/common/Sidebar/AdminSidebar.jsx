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
    overflowX: "hidden",
    top: "69px",
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      height: "100%",
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  '& .MuiDrawer-paperCollapsed': {
    transition: theme.transitions.create('width', {
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
          top: 10,
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
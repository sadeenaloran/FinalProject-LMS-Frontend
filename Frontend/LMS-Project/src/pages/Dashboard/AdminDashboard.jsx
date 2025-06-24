import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/common/Sidebar/AdminSidebar";
// import AdminHeader from "../../components/common/Sidebar/AdminHeader";
import UserHeader from "../../components/common/Header/UserHeader";
import { useAuth } from "../../contexts/AuthContext";
import UserManagement from "../../contexts/UserManagment";
import CourseManagement from "../../components/Dashboard/Admin/CourseManagement/CourseManagement";
import ReportManagement from "../../components/Dashboard/Admin/ReportManagemnt/ReportManagemnt";
import CategoryManagement from "../../components/Dashboard/Admin/CategoryManagement/CategoryManagement";
import Settings from "../../components/common/Settings/Settings";
import DashboardDefaultContent from "../Dashboard/DashboardDefaultContent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    // if (!loading && user?.role !== "admin") {
    //   navigate("/unauthorized");
    // }
  }, [user, loading, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "courses":
        return <CourseManagement />;
      case "categories":
        return <CategoryManagement />;
      case "reports":
        return <ReportManagement />;
      case "settings":
        return <Settings />;
      case "dashboard":
      default:
        return <DashboardDefaultContent />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${theme.spacing(30)})` },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <UserHeader user={user} logout={logout} handleDrawerToggle={handleDrawerToggle} />
        <Container
          maxWidth={false}
          sx={{
            mt: 4,
            mb: 4,
            paddingLeft: { xs: 0, sm: 2 },
            paddingRight: { xs: 0, sm: 2 },
          }}
        >
          {renderActiveTab()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
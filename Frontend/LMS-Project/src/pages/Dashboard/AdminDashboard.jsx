import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/common/Sidebar/AdminSidebar";
// import AdminHeader from "../../components/common/Sidebar/AdminHeader";
import UserHeader from "../../components/common/Header/UserHeader";
import { useAuth } from "../../contexts/AuthContext";
import UserManagement from "../../contexts/UserManagment";
import CourseManagement from "../../components/Dashboard/Admin/CourseManagement/CourseManagement";
import ReportManagement from "../../components/Dashboard/Admin/CourseManagement/ReportManagemnt/ReportManagemnt";
import CategoryManagement from "../../components/Dashboard/Admin/CategoryManagement/CategoryManagement";
import Settings from "../../components/common/Settings/Settings";
import DashboardDefaultContent from "../Dashboard/DashboardDefaultContent";

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // Default tab

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (!loading && user?.role !== "admin") {
      navigate("/unauthorized");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AdminHeader user={user} logout={logout} /> */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <UserHeader user={user} logout={logout} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderActiveTab()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

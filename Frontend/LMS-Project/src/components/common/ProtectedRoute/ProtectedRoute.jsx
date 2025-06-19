import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({children, roles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // If the auth state is still loading, you can return a loading indicator or null
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  } 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{form: location}}  replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return  children ? (
    children
  ) : (
    <Outlet />
  ); 
};

export default ProtectedRoute;

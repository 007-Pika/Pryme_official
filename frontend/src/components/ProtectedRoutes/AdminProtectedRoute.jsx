import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.admin.isAdminAuth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;

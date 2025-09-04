import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import ServicesTabs from "../components/AddServices/ServicesTabs";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // List of routes where ServicesTabs should be hidden
  const excludedRoutes = ["/admin/dashboard", "/admin/allservices", "/admin/add-services"  , "/admin/timesheet"];

  // Show tabs if in /admin and not in the excluded list
  const showTabs =
    location.pathname.startsWith("/admin") &&
    !excludedRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto px-8 py-6 transition-all duration-300">
          {showTabs && <ServicesTabs />}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

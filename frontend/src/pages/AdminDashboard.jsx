import React from "react";
import AdminStatsBoxes from "../components/AdminStatsBoxes";
import AdminGraphsSection from "../components/AdminGraphsSection";

const AdminDashboard = () => {
  return (
    <>
      <div className="bg-white rounded-xl p-6">
        <h1 className="text-xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-4">Sales Summary</p>
        <AdminStatsBoxes />
      </div>
      <AdminGraphsSection />
    </>
  );
};

export default AdminDashboard;

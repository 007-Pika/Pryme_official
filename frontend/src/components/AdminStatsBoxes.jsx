import React, { useEffect, useState } from "react";
import { HiMiniChartBarSquare } from "react-icons/hi2";
import { LuNotebookText } from "react-icons/lu";
import { IoRepeatSharp } from "react-icons/io5"; // New icon for repeat customers
import { RiUserAddFill } from "react-icons/ri"; // New icon for first-time customers
import axiosInstance from "../utils/axiosInstance";

const AdminStatsBoxes = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get("/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  // ----- Stats Calculation -----
  const totalBookings = bookings.length;

  // Bookings made today
  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter(
    (b) => b.createdAt && b.createdAt.startsWith(today)
  ).length;

  // Repeat Customers
  const customerCounts = bookings.reduce((acc, b) => {
    if (b.email) {
      acc[b.email] = (acc[b.email] || 0) + 1;
    }
    return acc;
  }, {});
  const repeatCustomers = Object.values(customerCounts).filter((count) => count > 1).length;

  // First-Time Customers
  const firstTimeCustomers = Object.values(customerCounts).filter((count) => count === 1).length;

  const stats = [
    {
      value: totalBookings,
      label: "Total Bookings",
      change: "+8% from yesterday",
      color: "bg-red-100 text-red-600",
      icon: HiMiniChartBarSquare,
      iconColor: "text-red-600",
    },
    {
      value: todayBookings,
      label: "New Bookings",
      change: "+5% from yesterday",
      color: "bg-orange-100 text-orange-600",
      icon: LuNotebookText,
      iconColor: "text-orange-600",
    },
    {
      value: repeatCustomers,
      label: "Repeat Customers",
      change: "+2% from last week",
      color: "bg-green-100 text-green-600",
      icon: IoRepeatSharp,
      iconColor: "text-green-600",
    },
    {
      value: firstTimeCustomers,
      label: "First-Time Customers",
      change: "+4% from last week",
      color: "bg-purple-100 text-purple-600",
      icon: RiUserAddFill,
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`p-6 rounded-lg ${stat.color} shadow-sm flex flex-col gap-2`}
          >
            <Icon className={`text-xl ${stat.iconColor}`} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-gray-700">{stat.label}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.change}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatsBoxes;

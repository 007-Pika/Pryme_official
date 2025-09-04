import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosInstance from "../utils/axiosInstance";

const AdminGraphsSection = () => {
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
    return <div>Loading charts...</div>;
  }

  // ---------- Process Data ----------
  const bookingsByDate = {};
  const bookingCounts = {}; // Tracks total bookings per email

  // Sort by date so repeat logic is chronological
  bookings
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach((b) => {
      const date = b.createdAt?.split("T")[0];
      if (!date || !b.email) return;

      if (!bookingsByDate[date]) {
        bookingsByDate[date] = { date, firstTime: 0, repeat: 0 };
      }

      bookingCounts[b.email] = (bookingCounts[b.email] || 0) + 1;

      if (bookingCounts[b.email] === 1) {
        bookingsByDate[date].firstTime += 1;
      } else if (bookingCounts[b.email] === 2) {
        // Only count the first time they become a repeat
        bookingsByDate[date].repeat += 1;
      }
    });

  const areaChartData = Object.values(bookingsByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Totals (matching StatBoxes logic)
  const customerCounts = bookings.reduce((acc, b) => {
    if (b.email) {
      acc[b.email] = (acc[b.email] || 0) + 1;
    }
    return acc;
  }, {});
  const totalFirstTime = Object.values(customerCounts).filter(
    (count) => count === 1
  ).length;
  const totalRepeat = Object.values(customerCounts).filter(
    (count) => count > 1
  ).length;

  const donutData = [
    { name: "First-Time Customers", value: totalFirstTime },
    { name: "Repeat Customers", value: totalRepeat },
  ];

  // Colors matched to StatBoxes
  const COLORS = ["#A855F7", "#22C55E"]; // purple-600, green-500
  const AREA_COLORS = {
    firstTime: { stroke: "#A855F7", fill: "#E9D5FF" }, // purple-600 + purple-200
    repeat: { stroke: "#22C55E", fill: "#BBF7D0" }, // green-500 + green-200
  };

  // ---------- Render ----------
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {/* Bookings Over Time */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Bookings Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="firstTime"
              stroke={AREA_COLORS.firstTime.stroke}
              fill={AREA_COLORS.firstTime.fill}
              name="First-Time"
            />
            <Area
              type="monotone"
              dataKey="repeat"
              stroke={AREA_COLORS.repeat.stroke}
              fill={AREA_COLORS.repeat.fill}
              name="Repeat"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Split */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Customer Split</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminGraphsSection;

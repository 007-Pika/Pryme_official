import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:9700", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/admin/me");
        setIsAuthenticated(true);
        fetchNotifications();

        // Register admin only if authenticated
        socket.emit("register-admin", { role: "admin" });

        socket.on("admin-notification", (notif) => {
          console.log("📩 New socket notification received:", notif);
          setNotifications((prev) => [notif, ...prev]);
          setHasNewNotification(true);
        });
      } catch (err) {
        setIsAuthenticated(false);
        console.error("❌ Not authenticated:", err?.response?.data || err.message);
      }
    };

    checkAuth();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout");
      window.location.href = "/adminlogin";
    } catch (err) {
      console.error("Logout failed", err.message);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setHasNewNotification(false);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 my-2 relative z-50 bg-white">
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 relative">
        <NavLink to="/" className="text-3xl font-bold text-blue-700" style={{ fontFamily: "Jaro, sans-serif" }}>
          Pryme
        </NavLink>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-700 font-semibold text-lg sm:text-xl">
          Admin Dashboard
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
                onClick={toggleDropdown}
              >
                <FiBell className="text-2xl text-blue-700" />
                {hasNewNotification && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping" />
                )}
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-md z-50 overflow-hidden border"
                  >
                    <div className="p-3 border-b font-semibold text-white bg-blue-600">
                      Notifications
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500 text-center">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notif, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between p-3 hover:bg-gray-50 text-sm"
                          >
                            <div className="flex-1 overflow-hidden">
                              <div className="font-medium text-gray-800 truncate w-full">
                                {notif.message}
                              </div>
                              <div className="text-xs text-gray-500 truncate w-full">
                                {new Date(notif.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <button
                              className="ml-2 text-blue-600 hover:underline text-xs whitespace-nowrap"
                              onClick={() => navigate("/admin/bookings")}
                            >
                              View
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default AdminNavbar;

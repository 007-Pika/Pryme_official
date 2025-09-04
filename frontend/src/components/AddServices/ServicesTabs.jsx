import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiCalendar,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";

const ServicesTabs = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(() => [
    {
      label: "Services",
      icon: <FiGrid className="w-4 h-4 mb-1" />,
      path: "/admin/allservices",
    },
    {
      label: "Add Services",
      icon: <FiPlusCircle className="w-4 h-4 mb-1" />,
      path: "/admin/add-services",
    },
    {
      label: "Bookings",
      icon: <FiCalendar className="w-4 h-4 mb-1" />,
      path: "/admin/bookings",
    },
    {
      label: "TimeSheet",
      icon: <FiClock className="w-4 h-4 mb-1" />,
      path: "/admin/timesheet",
    },
    {
      label: "Reviews",
      icon: <FiMessageSquare className="w-4 h-4 mb-1" />,
      path: "/admin/reviews",
    },
  ], []);

  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map(({ label, icon, path }) => {
        const isActive = location.pathname === path;
        const base =
          "flex flex-col items-center px-6 py-3 rounded-lg shadow transition-colors";
        const active = isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white";

        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`${base} ${active}`}
          >
            {icon}
            <span className="text-[13px]">{label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default ServicesTabs;

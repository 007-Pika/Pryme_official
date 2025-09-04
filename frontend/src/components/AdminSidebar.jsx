import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FiGrid /> },
    { to: "/admin/allservices", label: "Services", icon: <FiGrid /> },
    { to: "/admin/add-services", label: "Add Services", icon: <FiPlusCircle /> },
    { to: "/admin/bookings", label: "Bookings", icon: <FiCalendar /> },
    { to: "/admin/timesheet", label: "TimeSheet", icon: <FiClock /> },
    { to: "/admin/reviews", label: "Reviews", icon: <FiMessageSquare /> },
  ];

  return (
    <aside className={`bg-white border rounded-xl border-gray-200 h-full mt-[22px] -mr-[22px] transition-all duration-300 ${
      isOpen ? "w-[190px] px-4" : "w-[60px] px-2"
    }`}>
      <nav className="flex flex-col space-y-2 py-4">
        <button onClick={toggleSidebar} className={`flex items-center justify-center p-1 mb-4 rounded hover:bg-gray-200`}>
          {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center transition-colors duration-200 ${
                isOpen ? "space-x-3 px-3 py-3 text-[15px]" : "justify-center py-3"
              } rounded-md ${
                isActive ? "bg-gray-200 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

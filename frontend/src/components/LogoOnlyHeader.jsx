import React from "react";
import { NavLink } from "react-router-dom";

const LogoOnlyHeader = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 my-3 relative z-50">
      <header className="flex items-center px-4 sm:px-8 py-4">
        <NavLink
          to="/"
          className="text-3xl font-bold text-blue-700"
          style={{ fontFamily: "Jaro, sans-serif" }}
        >
          Pryme
        </NavLink>
      </header>
    </div>
  );
};

export default LogoOnlyHeader;

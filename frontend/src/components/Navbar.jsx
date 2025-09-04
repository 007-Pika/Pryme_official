import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../features/user/userSelector";
import { logout } from "../features/user/userSlice";
import axiosInstance from "../utils/axiosInstance";
import ButtonWithLoader from "../components/ButtonWithLoader"; // ✅ Reuse your loader button

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axiosInstance.post("/auth/logout"); // ✅ Clear cookie on backend
      dispatch(logout()); // ✅ Clear Redux state
      navigate("/login"); // ✅ Redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
      setMenuOpen(false);
    }
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 my-2 relative z-50">
      <header className="flex justify-between items-center px-4 sm:px-8 py-4">
        <NavLink
          to="/"
          className="text-3xl font-bold text-blue-700"
          style={{ fontFamily: "Jaro, sans-serif" }}
        >
          Pryme
        </NavLink>

        {/* Desktop Nav */}
        <nav className="space-x-6 hidden md:block">
          <NavLink to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </NavLink>
          <NavLink to="/services" className="text-gray-700 hover:text-blue-600">
            Services
          </NavLink>
          <NavLink to="/about-us" className="text-gray-700 hover:text-blue-600">
            About
          </NavLink>
          <NavLink to="/contact-us" className="text-gray-700 hover:text-blue-600">
            Contact
          </NavLink>
          <NavLink to="/review-us" className="text-gray-700 hover:text-blue-600">
            Rate Us
          </NavLink>
        </nav>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                {user?.name || user?.email}
              </span>
              <ButtonWithLoader
                onClick={handleLogout}
                loading={loggingOut}
                loadingText="Logging out..."
                className={`ml-3 inline-block ${
                  loggingOut ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                } text-white px-4 py-2 rounded-full font-medium transition`}
              >
                Logout
              </ButtonWithLoader>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl text-blue-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white rounded-md shadow-md py-4 px-6 absolute w-full left-0 top-20 z-40">
          <nav className="space-y-4">
            <NavLink
              to="/"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/about-us"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact-us"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <span className="block text-gray-700 mb-2">
                    {user?.name || user?.email}
                  </span>
                  <ButtonWithLoader
                    onClick={handleLogout}
                    loading={loggingOut}
                    loadingText="Logging out..."
                    className={`block w-full text-center ${
                      loggingOut
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-white border border-red-600 text-red-600 hover:bg-red-50"
                    } px-4 py-2 rounded-md`}
                  >
                    Logout
                  </ButtonWithLoader>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center bg-white border border-gray-600 text-gray-700 px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import Footer from "../components/Footer";
import LogoOnlyHeader from "../components/LogoOnlyHeader";
import { useDispatch } from "react-redux";
import { setAdmin } from "../features/admin/adminSlice";
import axiosInstance from "../utils/axiosInstance";
import { saveToken } from "../utils/authHelper";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      const { admin } = response.data;
      dispatch(setAdmin(admin));

      enqueueSnackbar("Admin login successful!", { variant: "success" });
      console.log("Navigating to admin dashboard...");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.error || "Invalid credentials", {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LogoOnlyHeader />

      <div className="mx-9 sm:mx-8 md:mx-24 mb-12">
        <div className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden gap-6">
          <div className="w-[650px] h-[500px]">
            <img
              src="/kalaimage.jpg"
              alt="Auth"
              className="object-cover object-left w-full h-full rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 px-8 md:px-12 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">Admin Log In</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Enter your admin credentials.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mb-4"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;

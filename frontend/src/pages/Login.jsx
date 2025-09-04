import React, { useState } from "react";
import Footer from "../components/Footer";
import LogoOnlyHeader from "../components/LogoOnlyHeader";
import { NavLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";
import { saveToken } from "../utils/authHelper";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import ButtonWithLoader from "../components/ButtonWithLoader"; // ✅ use your reusable loader button

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loggingIn, setLoggingIn] = useState(false); // ✅ state for loader

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true); // start loader

    try {
      const { email, password } = formData;

      await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // ✅ Automatically sends HttpOnly cookie — no need to save manually

      // 🔄 Now fetch user info
      const res = await axiosInstance.get("/auth/me");

      dispatch(login(res.data.user));
      enqueueSnackbar("Logged in successfully", { variant: "success" });

      navigate("/");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Login failed", {
        variant: "error",
      });
    } finally {
      setLoggingIn(false); // stop loader
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LogoOnlyHeader />

      <div className="mx-9 sm:mx-8 md:mx-24 mb-12">
        <div className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden gap-6">
          <div className="w-[650px] h-[500px]">
            <img
              src="/AuthImage.jpg"
              alt="Auth"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 px-8 md:px-12 flex flex-col">
            <div className="mt-0">
              <h2 className="text-2xl font-bold mb-2">Log In</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Enter your credentials to access your account
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm mb-1 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                    placeholder="********"
                    required
                  />
                </div>

                <div className="flex justify-end mb-8">
                  <NavLink
                    to="/recoverpassword"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                <ButtonWithLoader
                  type="submit"
                  loading={loggingIn}
                  loadingText="Logging in..."
                  className={`w-full py-3 rounded-md ${
                    loggingIn
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors mb-4`}
                >
                  Log In
                </ButtonWithLoader>

                <p className="text-sm text-center">
                  Don&apos;t have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

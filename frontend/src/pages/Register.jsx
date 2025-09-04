import React, { useState } from "react";
import Footer from "../components/Footer";
import LogoOnlyHeader from "../components/LogoOnlyHeader";
import { NavLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import ButtonWithLoader from "../components/ButtonWithLoader"; // ✅ Reusable loader button

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [registering, setRegistering] = useState(false); // ✅ Loader state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    try {
      setRegistering(true);

      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      enqueueSnackbar("Registered successfully. Please login.", {
        variant: "success",
      });

      navigate("/login");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Registration failed", {
        variant: "error",
      });
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LogoOnlyHeader />

      <div className="mx-9 sm:mx-8 md:mx-24 mb-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden gap-6 items-start"
        >
          <div className="w-[650px] h-[550px]">
            <img
              src="/AuthImage.jpg"
              alt="Auth"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div className="w-full md:w-1/2 px-8 md:px-12 flex flex-col justify-start">
            <h2 className="text-2xl font-bold mb-2">Create New Account</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Let&apos;s get started with a few essentials we need
            </p>

            <div className="mb-6">
              <label className="block text-sm mb-1 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1 text-gray-700">Email</label>
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

            <div className="mb-6">
              <label className="block text-sm mb-1 text-gray-700">
                Create Password
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

            <div className="mb-8">
              <label className="block text-sm mb-1 text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                placeholder="********"
                required
              />
            </div>

            <ButtonWithLoader
              type="submit"
              loading={registering}
              loadingText="Creating account..."
              className={`w-full py-3 rounded-md ${
                registering
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors mb-4`}
            >
              Create Account
            </ButtonWithLoader>

            <p className="text-sm text-center">
              Already have an account?
              <NavLink
                to="/login"
                className="text-blue-600 pl-1 hover:underline"
              >
                Log In
              </NavLink>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import Footer from "../components/Footer";
import LogoOnlyHeader from "../components/LogoOnlyHeader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ButtonWithLoader from "../components/ButtonWithLoader"; // ✅ import reusable button

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false); // ✅ loader state

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); // ✅ start loader

    try {
      const response = await axiosInstance.post("/auth/forgot-password", { email });
      const otpToken = response.data.otpToken;

      enqueueSnackbar("Verification code sent to your email!", {
        variant: "success",
      });

      navigate("/recoverpassword2", {
        state: { email, otpToken },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      enqueueSnackbar(
        "Failed to send verification code. Please try again.",
        { variant: "error" }
      );
    } finally {
      setSending(false); // ✅ stop loader
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LogoOnlyHeader />

      <div className="mx-9 sm:mx-8 md:mx-24 mb-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden gap-6"
        >
          {/* Left: Image */}
          <div className="w-[650px] h-[500px]">
            <img
              src="/AuthImage.jpg"
              alt="Auth"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 px-8 md:px-12 flex flex-col">
            <div>
              <h2 className="text-2xl font-bold mb-2">Recover Password</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Enter the email address you used to create
                <br /> your Pryme account.
              </p>

              <div className="mb-8">
                <label className="block text-sm mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-0 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none py-2"
                  placeholder="you@example.com"
                />
              </div>

              <ButtonWithLoader
                type="submit"
                loading={sending}
                loadingText="Sending..."
                className={`w-full py-3 rounded-md ${
                  sending
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors mb-4`}
              >
                Send Verification Code
              </ButtonWithLoader>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RecoverPassword;

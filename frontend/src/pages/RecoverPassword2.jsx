import React, { useState } from "react";
import Footer from "../components/Footer";
import LogoOnlyHeader from "../components/LogoOnlyHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";
import ButtonWithLoader from "../components/ButtonWithLoader"; // ✅ Reusable loader button

const RecoverPassword2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const email = location.state?.email;
  const otpToken = location.state?.otpToken;

  const [currentOtpToken, setCurrentOtpToken] = useState(otpToken);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [submitting, setSubmitting] = useState(false); // ✅ Loader for submit
  const [resending, setResending] = useState(false); // ✅ Loader for resend

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      enqueueSnackbar("Please enter the full 4-digit code", {
        variant: "warning",
      });
      return;
    }

    setSubmitting(true); // ✅ Start loader
    try {
      await axiosInstance.post("/auth/verify-otp", {
        otp: code,
        otpToken: currentOtpToken,
      });

      enqueueSnackbar("Code verified! Set a new password.", {
        variant: "success",
      });
      navigate("/newpassword", {
        state: { email, otpToken: currentOtpToken, otp: code },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      enqueueSnackbar("Invalid or expired code.", { variant: "error" });
    } finally {
      setSubmitting(false); // ✅ Stop loader
    }
  };

  const handleResend = async () => {
    setResending(true); // ✅ Start loader
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });

      const newOtpToken = response.data.otpToken;
      setCurrentOtpToken(newOtpToken);

      enqueueSnackbar("Verification code resent!", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to resend code.", { variant: "error" });
    } finally {
      setResending(false); // ✅ Stop loader
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <LogoOnlyHeader />

      <div className="mx-9 sm:mx-8 md:mx-24 mb-12">
        <div className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden gap-6">
          {/* Left: Image */}
          <div className="w-[650px] h-[500px]">
            <img
              src="AuthImage.jpg"
              alt="Auth"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 px-8 md:px-12 flex flex-col">
            <div>
              <h2 className="text-2xl font-bold mb-2">Recover Password</h2>
              <p className="text-gray-500 mb-8 text-sm">
                Enter the 4-digit code we sent to your email
                <br /> <span className="font-medium">{email}</span>
              </p>

              {/* Code input boxes */}
              <div className="flex gap-3 mb-8 max-w-xs">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:border-blue-600 focus:outline-none text-xl"
                  />
                ))}
              </div>

              {/* Submit button */}
              <ButtonWithLoader
                type="button"
                loading={submitting}
                loadingText="Submitting..."
                onClick={handleSubmit}
                className={`w-86 py-3 rounded-md mb-4 ${
                  submitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition-colors`}
              >
                Submit
              </ButtonWithLoader>

              {/* Resend button */}
              <ButtonWithLoader
                type="button"
                loading={resending}
                loadingText="Resending..."
                onClick={handleResend}
                className={`w-86 py-3 rounded-md border transition-colors ${
                  resending
                    ? "border-blue-300 text-blue-300 cursor-not-allowed"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                Resend Code
              </ButtonWithLoader>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecoverPassword2;

import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axiosInstance from "../utils/axiosInstance";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../features/user/userSelector";

const RateUs = () => {
  const { enqueueSnackbar } = useSnackbar();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStarClick = (index) => {
    if (!isAuthenticated) {
      enqueueSnackbar("You must be logged in to rate.", { variant: "warning" });
      return;
    }
    setRating(index + 1);
  };

  const handleFeedbackChange = (e) => {
    if (!isAuthenticated) {
      enqueueSnackbar("You must be logged in to leave feedback.", { variant: "warning" });
      return;
    }
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      enqueueSnackbar("You must be logged in to submit a review.", {
        variant: "warning",
      });
      return;
    }

    if (rating === 0) {
      enqueueSnackbar("Please select a rating before submitting.", {
        variant: "warning",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/reviews",
        { rating, feedback },
        { withCredentials: true }
      );

      if (response.status === 201) {
        enqueueSnackbar("Thank you! Your review has been submitted.", {
          variant: "success",
        });
        setRating(0);
        setFeedback("");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        error.response?.data?.message || "Something went wrong. Please try again.",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white py-12 px-6 flex justify-center items-center">
        <div className="bg-blue-50 shadow-lg rounded-2xl w-full max-w-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Rate Our Service
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="flex justify-center mb-6">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(0)}
                    className="text-3xl focus:outline-none transition-transform duration-200 hover:scale-110"
                  >
                    <span
                      className={
                        (hover || rating) > i
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
            </div>

            {/* Feedback Textarea */}
            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Share your feedback
              </label>
              <textarea
                id="feedback"
                rows="4"
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                placeholder="Tell us what you think..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RateUs;

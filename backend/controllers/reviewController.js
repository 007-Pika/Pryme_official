const Review = require("../models/reviewModel.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
// @desc    Create a new review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (!rating || !feedback) {
      return res
        .status(400)
        .json({ message: "Rating and feedback are required" });
    }

    let userId = null;

    // ✅ Extract user from cookie directly
    const token = req.cookies?.token;
    console.log("Token from cookie:", token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("_id");
        if (user) userId = user._id;
      } catch (err) {
        console.error("JWT verification failed:", err.message);
      }
    }

    const newReview = new Review({
      rating,
      feedback,
      user: userId,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// Get all reviews with full user info
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email") // only bring name & email
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
};

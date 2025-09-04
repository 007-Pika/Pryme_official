const express =require("express");
const {createReview , getReviews} = require("../controllers/reviewController.js");
// import { protect } from "../middleware/authMiddleware.js"; // if auth is needed

const router = express.Router();

// Public: Anyone can submit or view reviews
router.post("/", createReview); // You can add protect middleware if login is required
router.get("/", getReviews);

module.exports = router;

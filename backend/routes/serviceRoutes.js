const express = require("express");
const router = express.Router();
const {
  createService,
  getServices,
  deleteService
} = require("../controllers/serviceController");
const upload = require("../middleware/upload");

// POST /api/services — with thumbnail upload
router.post("/", upload.single("thumbnail"), createService);

// GET /api/services/get
router.get("/get", getServices);
router.delete("/:id", deleteService); // ✅ Add delete route

module.exports = router;

const express = require("express");
const {
  createTimesheet,
  getTimesheets,
  updateTimesheet,
  deleteTimesheet,
} = require("../controllers/timeSheetController");

const router = express.Router();

// Create new timesheet(s)
router.post("/", createTimesheet);

// Get timesheets (with optional week query parameter)
router.get("/", getTimesheets);

// Update a specific timesheet
router.put("/:id", updateTimesheet);

// Delete a specific timesheet
router.delete("/:id", deleteTimesheet);

module.exports = router;
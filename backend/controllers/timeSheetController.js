const { get } = require("mongoose");
const TimeSheet = require("../models/TimeSheet");

const createTimesheet = async (req, res) => {
  try {
    const { timesheets } = req.body;

    if (!Array.isArray(timesheets) || timesheets.length === 0) {
      return res.status(400).json({ message: "timesheets array is required" });
    }

    const newEntries = await TimeSheet.insertMany(timesheets);
    res.status(201).json(newEntries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTimesheets = async (req, res) => {
  const { week } = req.query;
  try {
    const query = week ? { week } : {};
    const timesheets = await TimeSheet.find(query);
    res.json(timesheets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch timesheets" });
  }
};
const updateTimesheet = async (req, res) => {
  try {
    const updated = await TimeSheet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    await TimeSheet.findByIdAndDelete(req.params.id);
    res.json({ message: "Timesheet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTimesheet,
  getTimesheets ,
  updateTimesheet,
  deleteTimesheet,
};

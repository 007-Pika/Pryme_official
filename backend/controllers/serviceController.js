const Service = require("../models/serviceModel");

exports.createService = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      category,
      price,
      duration, 
    } = req.body;

    // Check if thumbnail file was uploaded
    const thumbnail = req.file ? req.file.filename : null;

    const newService = new Service({
      title,
      shortDescription,
      fullDescription,
      category,
      price: parseFloat(price),
      duration,
      thumbnail, // Save only the filename or relative path
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Error creating service", error });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Get services failed:", error);
    res.status(500).json({ message: "Failed to get services" });
  }
};


// controllers/serviceController.js

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Failed to delete service", error });
  }
};

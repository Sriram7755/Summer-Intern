const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Add Bus
router.post("/bus", auth, admin, async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Error adding bus" });
  }
});

// Get all buses
router.get("/bus", auth, admin, async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching buses" });
  }
});

// Delete Bus
router.delete("/bus/:id", auth, admin, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bus" });
  }
});

module.exports = router;

const Bus = require("../models/Bus");

// 🔍 SEARCH BUS
exports.searchBus = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    if (!source || !destination || !date) {
      return res.status(400).json({ message: "Source, destination, and date are required" });
    }

    // Case-insensitive search using regex
    const buses = await Bus.find({
      source: { $regex: new RegExp(`^${source.toLowerCase()}$`, 'i') },
      destination: { $regex: new RegExp(`^${destination.toLowerCase()}$`, 'i') },
      date,
    });

    console.log(`Found ${buses.length} buses for ${source} to ${destination} on ${date}`);
    res.json(buses);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

// 🚌 GET BUS BY ID (IMPORTANT FIX)
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // 🔥 IMPORTANT: send full bus object with all fields
    res.json({
      _id: bus._id,
      busName: bus.busName,
      source: bus.source,
      destination: bus.destination,
      date: bus.date,
      totalSeats: bus.totalSeats,
      price: bus.price,
      bookedSeats: bus.bookedSeats || [],
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      busType: bus.busType,
      amenities: bus.amenities || []
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bus" });
  }
};
exports.getLocations = async (req, res) => {
  try {
    const sources = await Bus.distinct("source");
    const destinations = await Bus.distinct("destination");

    res.json({
      sources,
      destinations
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch locations" });
  }
};

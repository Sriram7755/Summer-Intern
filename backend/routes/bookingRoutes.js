const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const auth = require("../middleware/authMiddleware");

// Get user bookings
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("busId", "busName source destination date price departureTime arrivalTime busType");
    
    const bookingsWithDetails = bookings.map(booking => ({
      _id: booking._id,
      busName: booking.busId.busName,
      source: booking.busId.source,
      destination: booking.busId.destination,
      date: booking.date || booking.busId.date,
      seats: booking.seats,
      price: booking.totalPrice || (booking.seats.length * booking.busId.price),
      departureTime: booking.busId.departureTime,
      arrivalTime: booking.busId.arrivalTime,
      busType: booking.busId.busType
    }));

    res.json(bookingsWithDetails);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    const { busId, seats, date } = req.body;

    if (!busId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Bus ID and seats are required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Block already booked seats
    const seatAlreadyBooked = seats.some(seat =>
      bus.bookedSeats.includes(seat)
    );

    if (seatAlreadyBooked) {
      return res.status(400).json({
        message: "One or more seats already booked"
      });
    }

    const totalPrice = seats.length * bus.price;

    // Save booking
    const booking = await Booking.create({
      userId: req.user._id,
      busId,
      seats,
      date: date || bus.date,
      totalPrice
    });

    // Mark seats as booked
    bus.bookedSeats.push(...seats);
    await bus.save();

    res.json({ 
      message: "Booking successful",
      bookingId: booking._id,
      totalPrice
    });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

module.exports = router;

const Booking = require("../models/Booking");
const Bus = require("../models/Bus");

exports.bookSeat = async (req, res) => {
  try {
    const { busId, seats = [] } = req.body;

    if (!busId || !seats.length) {
      return res.status(400).json({ message: "Bus and seats are required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (bus.seatsAvailable < seats.length) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const fare = (bus.fare || 0) * seats.length;

    const booking = await Booking.create({
      userId: req.user._id,
      busId,
      busName: bus.busName,
      source: bus.source,
      destination: bus.destination,
      date: bus.date,
      seats,
      fare
    });

    // reduce available seats
    bus.seatsAvailable = Math.max(0, bus.seatsAvailable - seats.length);
    await bus.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error creating booking" });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

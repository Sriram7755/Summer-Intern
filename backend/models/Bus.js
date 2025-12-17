const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  departureTime: { type: String, default: "08:00" },
  arrivalTime: { type: String, default: "14:00" },
  totalSeats: { type: Number, required: true, default: 40 },
  price: { type: Number, required: true },
  busType: { type: String, enum: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper"], default: "AC" },
  amenities: { type: [String], default: [] },
  bookedSeats: {
    type: [Number],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Bus", busSchema);

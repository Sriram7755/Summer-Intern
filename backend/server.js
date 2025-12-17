const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Bus Booking Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

// ⭐ ADMIN ROUTES
app.use("/api/admin", adminRoutes);
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});


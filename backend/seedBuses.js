/**
 * Seed script to insert sample buses from Coimbatore.
 * Usage (from backend folder):
 *   MONGO_URI="mongodb+srv://..." JWT_SECRET="secret" node seedBuses.js
 */
const mongoose = require("mongoose");
const Bus = require("./models/Bus");
require("dotenv").config();

const buses = [
  {
    busName: "Kovai Express",
    source: "coimbatore",
    destination: "chennai",
    date: "2025-12-15",
    totalSeats: 40,
    price: 950,
    departureTime: "08:00",
    arrivalTime: "14:00",
    busType: "AC",
    amenities: ["WiFi", "Charging Point", "Water Bottle"]
  },
  {
    busName: "Nilgiri Rider",
    source: "coimbatore",
    destination: "ooty",
    date: "2025-12-15",
    totalSeats: 32,
    price: 420,
    departureTime: "09:30",
    arrivalTime: "13:00",
    busType: "Non-AC",
    amenities: ["Water Bottle"]
  },
  {
    busName: "Western Ghats Deluxe",
    source: "coimbatore",
    destination: "bengaluru",
    date: "2025-12-16",
    totalSeats: 45,
    price: 780,
    departureTime: "22:00",
    arrivalTime: "06:00",
    busType: "Sleeper",
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"]
  },
  {
    busName: "Avinashi Express",
    source: "coimbatore",
    destination: "tiruchirappalli",
    date: "2025-12-16",
    totalSeats: 38,
    price: 560,
    departureTime: "10:00",
    arrivalTime: "15:30",
    busType: "AC",
    amenities: ["WiFi", "Charging Point"]
  },
  {
    busName: "Pollachi Comfort",
    source: "coimbatore",
    destination: "madurai",
    date: "2025-12-17",
    totalSeats: 36,
    price: 620,
    departureTime: "07:00",
    arrivalTime: "12:00",
    busType: "AC",
    amenities: ["WiFi", "Charging Point", "Water Bottle"]
  },
  {
    busName: "Red Bus Premium",
    source: "chennai",
    destination: "bengaluru",
    date: "2025-12-18",
    totalSeats: 42,
    price: 1200,
    departureTime: "23:00",
    arrivalTime: "06:00",
    busType: "Sleeper",
    amenities: ["WiFi", "Charging Point", "Blanket", "Pillow", "Water Bottle"]
  },
  {
    busName: "Express Deluxe",
    source: "bengaluru",
    destination: "chennai",
    date: "2025-12-18",
    totalSeats: 40,
    price: 1100,
    departureTime: "20:00",
    arrivalTime: "04:00",
    busType: "Sleeper",
    amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"]
  },
  {
    busName: "City Connect",
    source: "madurai",
    destination: "chennai",
    date: "2025-12-19",
    totalSeats: 38,
    price: 850,
    departureTime: "21:00",
    arrivalTime: "05:00",
    busType: "Semi-Sleeper",
    amenities: ["WiFi", "Charging Point"]
  }
];

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is missing. Set it in .env or the command line.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  // Clear existing buses (optional - comment out if you want to keep existing data)
  // await Bus.deleteMany({});
  await Bus.insertMany(buses);

  console.log("Inserted buses:", buses.map(b => b.busName));
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});



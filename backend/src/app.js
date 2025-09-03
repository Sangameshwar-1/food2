import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from "./routes/api.js"; // Authentication routes
import donorRoutes from "./routes/donors.js"; // Donor-related routes
import volunteerRoutes from "./routes/volunteers.js"; // Volunteer-related routes

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/food")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", apiRoutes); // Authentication routes (login, register, etc.)
app.use("/api/donors", donorRoutes); // Donor routes (add donor, fetch donor, etc.)
app.use("/api/volunteers", volunteerRoutes); // Volunteer routes (add volunteer, etc.)

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


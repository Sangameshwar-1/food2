import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import donorRoutes from "./routes/donors.js";
import volunteerRoutes from "./routes/volunteers.js";
import studentRoutes from "./routes/studentRoutes.js";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser()); // Add this middleware to parse cookies
const PORT = process.env.PORT || 5000;

// MongoDB connection (use environment variable)
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/food")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
app.use(cors());
app.use(express.json());
app.use("/api/auth", apiRoutes); // Mount the routes with the prefix "/api/auth"

app.use("/api/donors", donorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/students", studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
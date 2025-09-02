import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/food"; // Replace "food" with your database name
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", apiRoutes);

// Test route to verify database connection
app.get("/api/test-db", async (req, res) => {
  try {
    // Define a simple schema and model for testing
    const TestModel = mongoose.model("Test", new mongoose.Schema({ name: String }));
    const testData = await TestModel.find(); // Fetch all documents from the "tests" collection
    res.status(200).json({ success: true, data: testData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error", error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
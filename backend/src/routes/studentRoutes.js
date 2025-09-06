import express from "express";

const router = express.Router();

// Define your student-related routes here
router.get("/", (req, res) => {
  res.send("Student routes are working!");
});

export default router; // Ensure this is a default export
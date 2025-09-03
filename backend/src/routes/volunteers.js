import express from "express";
import Volunteer from "../models/Volunteer.js"; // Replace with your volunteer model

const router = express.Router();

// Add a new volunteer
router.post("/", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ message: "Error adding volunteer", error: err.message });
  }
});

// Get all volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteers", error: err.message });
  }
});

export default router;
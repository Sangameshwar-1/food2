import express from "express";
import Donor from "../models/Donor.js"; // Replace with your donor model

const router = express.Router();

// Create a new donor
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(500).json({ message: "Error creating donor", error: err.message });
  }
});

// Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching donors", error: err.message });
  }
});

export default router;
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Assuming you have a User model

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Register route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

export default router;
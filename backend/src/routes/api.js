import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import Donor from "../models/Donor.js";

const router = express.Router();

// Define your routes here
router.get("/", (req, res) => {
  res.send("API Routes");
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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

router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Replace with your user identification logic
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Print the user ID and data to the console
    console.log("User ID:", user._id);
    console.log("User Data:", user);

    // Send the user ID and data in the response
    res.json({
      id: user._id,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
});



export default router; //
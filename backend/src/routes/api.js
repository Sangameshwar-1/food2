import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import Donor from "../models/Donor.js";
import authenticateToken from "../../server/middleware/auth.js"; // Correctly import the middleware

const router = express.Router();

// Define your routes here
router.get("/", (_, res) => {
  res.send("API Routes");
});
// Removed localStorage usage and unused response variable

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful", user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the token as an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.json({ message: "Login successful", TOKEN: token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("Error in /login route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router; //
const express = require('express');
const router = express.Router();
const { Donor } = require('../models/Donor');
const { Volunteer } = require('../models/Volunteer');
import User from "../models/User.js";
const auth = require('../middleware/auth'); // JWT/session middleware

// Get current user info
router.get('/auth/me', auth, async (req, res) => {
  res.json(req.user); // user info from auth middleware
});

// Logout (destroys session/JWT cookie)
router.post('/auth/logout', auth, (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

// Get current user's donor info
router.get('/donors/me', auth, async (req, res) => {
  const donor = await Donor.findOne({ userId: req.user._id });
  if (!donor) return res.sendStatus(404);
  res.json(donor);
});

// Add new donor info
router.post('/donors', auth, async (req, res) => {
  const existing = await Donor.findOne({ userId: req.user._id });
  if (existing) return res.status(400).json({ error: 'Donor info already exists.' });
  const donor = new Donor({ ...req.body, userId: req.user._id });
  await donor.save();
  res.json(donor);
});

// Edit current user's donor info
router.put('/donors/me', auth, async (req, res) => {
  const donor = await Donor.findOneAndUpdate(
    { userId: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!donor) return res.sendStatus(404);
  res.json(donor);
});

// Volunteer registration
router.post('/volunteers', async (req, res) => {
  const volunteer = new Volunteer(req.body);
  await volunteer.save();
  res.json(volunteer);
});

module.exports = router;
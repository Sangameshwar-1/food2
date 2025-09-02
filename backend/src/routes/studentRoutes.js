const express = require("express");
const { getStudents, createStudent } = require("../controllers/studentController");

const router = express.Router();

// Route to get all students
router.get("/", getStudents);

// Route to create a new student
router.post("/", createStudent);

module.exports = router;
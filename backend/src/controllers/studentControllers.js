const Student = require("../models/student");

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, age, branch } = req.body;
    const newStudent = new Student({ name, age, branch });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStudents, createStudent };
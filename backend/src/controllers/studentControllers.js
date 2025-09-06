import Student from "../models/student.js";

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, age, branch } = req.body;
    if (!name || !age || !branch) {
      return res.status(400).json({ error: "All fields required" });
    }
    const newStudent = new Student({ name, age, branch });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
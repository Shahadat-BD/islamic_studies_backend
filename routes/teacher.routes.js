const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// ✅ Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a teacher by email (Must be above `/:id`)
router.get('/me/:email', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ email: req.params.email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch teacher', error: err });
  }
});

// ✅ Get a single teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.send(teacher);
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch teacher', error: err });
  }
});

// ✅ Add a new teacher
// ✅ Add a new teacher with duplicate email check
router.post('/', async (req, res) => {
  const { name, designation, email, phone, department, image } = req.body;

  try {
    // 🔒 Check if a teacher with the same email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(409).json({ message: 'Teacher with this email already exists' });
    }

    const teacher = new Teacher({
      name,
      designation,
      email,
      phone,
      department,
      image
    });

    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create teacher', error: err });
  }
});


// ✅ Update a teacher
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }

    res.send(updatedTeacher);
  } catch (err) {
    res.status(500).send({ message: "Update failed", error: err });
  }
});

// ✅ Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const result = await Teacher.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Teacher not found" });
    }
    res.send({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Delete failed", error: err });
  }
});

module.exports = router;

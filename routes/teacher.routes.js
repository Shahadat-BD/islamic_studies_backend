const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a new teacher
router.post('/', async (req, res) => {
  const { name, designation, email, phone, department, image } = req.body;

  const teacher = new Teacher({
    name,
    designation,
    email,
    phone,
    department,
    image
  });

  try {
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a teacher
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


// UPDATE a teacher
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

// GET a single teacher by ID
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


module.exports = router;

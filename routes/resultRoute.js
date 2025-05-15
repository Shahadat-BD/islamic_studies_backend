const express = require('express');
const router = express.Router();
const StudentResult = require('../models/StudentResult');

// POST: Add Result (Teacher uploads)
router.post('/add-result', async (req, res) => {
  try {
    const newResult = new StudentResult(req.body);
    await newResult.save();
    res.status(201).json({ message: 'Result added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add result', error });
  }
});

// GET: All Results (Admin / Teacher view)
router.get('/all-results', async (req, res) => {
  try {
    const results = await StudentResult.find().sort({ publishedAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch results', error });
  }
});

// GET: Single Student Result (By reg & roll)
router.get('/result', async (req, res) => {
  const { registrationNumber, classRoll } = req.query;
  try {
    const studentResult = await StudentResult.findOne({
      registrationNumber,
      classRoll
    });
    if (!studentResult) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(studentResult);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving result', error });
  }
});

module.exports = router;

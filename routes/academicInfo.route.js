const express = require('express');
const router = express.Router();
const AcademicInfo = require('../models/academicinfo.modal');

// ✅ Add new academic info
// ✅ Prevent duplicate submission

router.post('/', async (req, res) => {
  const { name, registrationNumber, email, classRoll, mobileNumber, session,year} = req.body;

  try {
    // 🔒 Check if a teacher with the same email already exists
    const existingStudent = await AcademicInfo.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'student with this email already exists' });
    }

    const student = new AcademicInfo({
     name, registrationNumber, email, classRoll, mobileNumber, session,year
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create student', error: err });
  }
});



// ✅ Get all academic info with optional search, filter, and pagination
router.get('/', async (req, res) => {
  const { search = '', year = '', page = 1, limit = 8 } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { classRoll: { $regex: search, $options: 'i' } }
    ];
  }

  if (year) {
    query.year = year;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const total = await AcademicInfo.countDocuments(query);
    const data = await AcademicInfo.find(query).skip(skip).limit(parseInt(limit));
    res.send({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data
    });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch academic info' });
  }
});


// ✅ Get academic info for logged-in user
router.get('/my-info/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const myInfo = await AcademicInfo.findOne({ email });
    if (!myInfo) {
      return res.status(404).send({ message: 'Academic Info not found' });
    }
    res.send(myInfo);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch academic info' });
  }
});



// ✅ UPDATE academic info
router.put('/:id', async (req, res) => {
  try {
    const updated = await AcademicInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update academic info' });
  }
});

// ✅ DELETE academic info
router.delete('/:id', async (req, res) => {
  try {
    await AcademicInfo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Academic info deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete academic info' });
  }
});


module.exports = router;


module.exports = router;

const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const verifyTeacher = require('../middleware/verifyTeacher');

// 🔹 Add Notice (teacher-only)
router.post('/', verifyToken, verifyTeacher, upload.single('file'), async (req, res) => {
  const { title, date } = req.body;
  const fileUrl = req.file ? `http://localhost:5000/${req.file.filename}` : '';

  const notice = new Notice({
    title,
    date,
    postedBy: req.user.email,
    file: fileUrl
  });

  await notice.save();
  res.status(201).json({ message: 'Notice added successfully' });
});

// 🔹 Public: Get all Notices
router.get('/all', async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

module.exports = router;

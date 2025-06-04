const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/verifyToken');

// 👉 POST Notice
router.post('/add', upload.single('file'), verifyToken ,  async (req, res) => {
  try {
    const { title, date, postedBy } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = req.file.path;

    const newNotice = new Notice({ title, date, postedBy, fileUrl });
    await newNotice.save();

    res.status(201).json({ message: 'Notice added successfully', notice: newNotice });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add notice', error: err.message });
  }
});

// GET all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notices', error });
  }
});

// DELETE /notices/:id
router.delete('/:id',verifyToken, async (req, res) => {
  try {
    const result = await Notice.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Notice not found' });
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT notices/:id
router.put('/:id', verifyToken , async (req, res) => {
  try {
    const { title, date, postedBy } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, date, postedBy },
      { new: true }
    );
    if (!updatedNotice) return res.status(404).json({ message: 'Notice not found' });
    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
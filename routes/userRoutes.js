const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Save user after Firebase registration
router.post('/', async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send({ message: 'User already exists' });

    const newUser = new User({ name, email, image });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to save user' });
  }
});

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

// backend: routes/users.js
router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.send(user);
});



// ✅ Approve student as teacher
router.put('/approve-teacher/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, { role: 'teacher' }, { new: true });
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update role' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

// ✅ Save user after Firebase registration
router.post('/', verifyToken , async (req, res) => {
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

// ✅ Get single user by email
router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.send(user);
});

// ✅ Dynamic role update (student <-> teacher)
router.put('/:id/role', verifyToken , async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update user role' });
  }
});

module.exports = router;

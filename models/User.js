const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

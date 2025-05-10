const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    default: 'Islamic Studies',
  },
  image: {
    type: String,
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);

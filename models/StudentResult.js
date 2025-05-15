const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  classRoll: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true }, // e.g., Honours 2nd Year
  examType: { type: String, required: true }, // e.g., Midterm, Final
  results: [
    {
      subject: { type: String, required: true },
      marks: { type: Number, required: true },
      grade: { type: String, required: true }
    }
  ],
  publishedBy: { type: String, required: true }, // Teacher name
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentResult', resultSchema);

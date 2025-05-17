const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  subjectCode: { type: String, required: true },
  marks: { type: Number, required: true },
  gpa: { type: Number, required: true },
});

const ResultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  classRoll: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  examType: { type: String, required: true },
  results: [SubjectSchema],
  totalMarks: Number,
  averageGpa: Number,
  averageGrade: String, 
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);

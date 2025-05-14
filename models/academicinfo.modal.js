const mongoose = require('mongoose');

const academicInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  classRoll: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  session: { type: String, required: true },
  year: {
    type: String,
    enum: ['Honours 1st Year', 'Honours 2nd Year', 'Honours 3rd Year', 'Honours 4th Year', 'Master\'s'],
    required: true,
  }
}, {
  timestamps: true
});

const AcademicInfo = mongoose.model('AcademicInfo', academicInfoSchema);

module.exports = AcademicInfo;

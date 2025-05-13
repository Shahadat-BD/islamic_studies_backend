const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  subjectSymbol: { type: String, default: null },
  subjectName: { type: String, default: null },
  teacher: { type: String, default: null }
});

const routineSchema = new mongoose.Schema({
  department: { type: String, required: true },
  RoutineCreated: { type: String, required: true },
  year: { type: String, required: true }, // e.g., "Honours 3rd Year"
  day: { type: String, required: true },  // e.g., "Sunday"
  room: { type: String, required: true }, // e.g., "1901"
  slots: [slotSchema]
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;

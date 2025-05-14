const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  postedBy: { type: String, required: true },
  file: { type: String }, // file URL (image or PDF)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notice', noticeSchema);

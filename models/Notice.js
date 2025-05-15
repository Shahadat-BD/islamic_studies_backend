const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: String,
  date: String,
  postedBy: String,
  fileUrl: String, // Public file path (image/pdf)
});
 
const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;


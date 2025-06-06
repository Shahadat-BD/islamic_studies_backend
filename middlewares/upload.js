const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'notices', // Cloudinary তে ফোল্ডার তৈরি হবে
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // আপনি চাইলে আরও type দিতে পারেন
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

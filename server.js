const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teacherRoutes = require('./routes/teacher.routes');
const routineRoutes = require('./routes/routineRoutes');
const userRoutes = require('./routes/userRoutes');
const academicInfoRoutes= require('./routes/academicInfo.route');
const noticeRoutes= require('./routes/notice.route');
const resultRoutes= require('./routes/resultRoutes');

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['https://islamic-studies-department-66er.vercel.app/'], // ✅ Replace with your actual frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/routines', routineRoutes);
app.use('/users', userRoutes);
app.use('/academic-info',academicInfoRoutes);
app.use('/notices', noticeRoutes);
app.use('/api/results', resultRoutes);

// hello world
app.get('/', (req, res) => {
  res.send('Islamic studies web application is running!')
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

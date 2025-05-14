const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const teacherRoutes = require('./routes/teacher.routes');
const routineRoutes = require('./routes/routineRoutes');
const userRoutes = require('./routes/userRoutes');
const academicInfoRoutes= require('./routes/academicInfo.route');

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

// hello world
app.get('/', (req, res) => {
  res.send('Islamic studies web application working start!')
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const verifyTeacher = async (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden: Not a teacher' });
  }
};

module.exports = verifyTeacher;

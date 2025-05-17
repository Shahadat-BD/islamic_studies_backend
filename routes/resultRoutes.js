const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// GPA calculator
function calculateGPA(marks) {
  if (marks >= 80) return 4.00;
  if (marks >= 75) return 3.75;
  if (marks >= 70) return 3.50;
  if (marks >= 65) return 3.25;
  if (marks >= 60) return 3.00;
  if (marks >= 55) return 2.75;
  if (marks >= 50) return 2.50;
  if (marks >= 45) return 2.25;
  if (marks >= 40) return 2.00;
  if (marks >= 33) return 1.00;
  return 0.00;
}



router.post('/add-result', async (req, res) => {
  try {
    const {
      studentName,
      registrationNumber,
      classRoll,
      department,
      year,
      examType,
      results
    } = req.body;

    // Total marks & GPA calculate
    let totalMarks = 0;
    let totalGpa = 0;

    const calculatedResults = results.map((sub) => {
      const marks = Number(sub.marks);
      const gpa = calculateGPA(sub.marks);
      totalMarks += marks;
      totalGpa += gpa;

      return {
        ...sub,
        gpa
      };
    });


    const averageGpa = parseFloat((totalGpa / results.length).toFixed(2));
    
    function getGradeFromCgpa(averageGpa) {
  if (averageGpa >= 4.00) return 'A+';
  if (averageGpa >= 3.75) return 'A';
  if (averageGpa >= 3.50) return 'A-';
  if (averageGpa >= 3.25) return 'B+';
  if (averageGpa >= 3.00) return 'B';
  if (averageGpa >= 2.75) return 'B-';
  if (averageGpa >= 2.50) return 'C+';
  if (averageGpa >= 2.25) return 'C';
  if (averageGpa >= 2.00) return 'D';
  if (averageGpa >= 1.00) return 'E';
  return 'F';
}
    
const averageGrade = getGradeFromCgpa(averageGpa);


    const newResult = new Result({
      studentName,
      registrationNumber,
      classRoll,
      department,
      year,
      examType,
      results: calculatedResults,
      totalMarks,
      averageGpa,
      averageGrade
    });

    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add result',
      error: {
        message: error.message,
        stack: error.stack,
        errors: error.errors || null
      }
    });
  }
});

router.get('/result', async (req, res) => {
  const { registrationNumber, classRoll } = req.query;
  try {
    const studentResult = await Result.findOne({
      registrationNumber,
      classRoll
    });
    if (!studentResult) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(studentResult);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving result', error });
  }
});



module.exports = router;

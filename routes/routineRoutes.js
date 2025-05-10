const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// GET all routines (optional filters)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.year) filter.year = req.query.year;
    if (req.query.day) filter.day = req.query.day;
    const routines = await Routine.find(filter);
    res.send(routines);
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch routines', error: err });
  }
});

// POST a new routine
router.post('/', async (req, res) => {
  try {
    const newRoutine = new Routine(req.body);
    const savedRoutine = await newRoutine.save();
    res.status(201).send(savedRoutine);
  } catch (err) {
    res.status(400).send({ message: 'Failed to add routine', error: err });
  }
});

// PUT update routine
router.put('/:id', async (req, res) => {
  try {
    const updated = await Routine.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).send({ message: 'Routine not found' });
    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: 'Failed to update routine', error: err });
  }
});


// GET a single routines by ID
router.get('/:id', async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).send({ message: 'routine not found' });
    }
    res.send(routine);
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch routine', error: err });
  }
});

// DELETE a routine
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Routine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ message: 'Routine not found' });
    res.send({ message: 'Routine deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Failed to delete routine', error: err });
  }
});

module.exports = router;

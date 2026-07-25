const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// @route   GET /api/directory
// @desc    Get all alumni with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, batch, location, industry } = req.query;

    let query = {};

    if (batch) query.batch = batch;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (industry) query.industry = industry;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const alumni = await Alumni.find(query);

    res.json({
      success: true,
      count: alumni.length,
      alumni
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/directory/:id
// @desc    Get single alumni by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    res.json({
      success: true,
      alumni
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

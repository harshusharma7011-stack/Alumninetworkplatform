const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const protect = require('../middleware/auth');

// @route   GET /api/mentorship
// @desc    Get all mentors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();

    res.json({
      success: true,
      count: mentors.length,
      mentors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/mentorship/:id
// @desc    Get single mentor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({
      success: true,
      mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/mentorship/:id/request
// @desc    Request mentorship
// @access  Private
router.post('/:id/request', protect, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Check if user already requested
    if (mentor.requests.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already requested mentorship' });
    }

    mentor.requests.push(req.user.id);
    await mentor.save();

    res.json({
      success: true,
      message: 'Mentorship request sent successfully',
      mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

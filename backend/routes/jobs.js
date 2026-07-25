const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const protect = require('../middleware/auth');

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, company, logo, location, type, experience, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      logo,
      location,
      type,
      experience,
      salary,
      description,
      postedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { body, validationResult } = require('express-validator');
const protect = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().trim(),
  body('graduationYear').optional().trim(),
  body('branch').optional().trim(),
  body('currentCompany').optional().trim(),
  body('jobRole').optional().trim(),
  body('location').optional().trim(),
  body('linkedin').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, phone, graduationYear, branch, currentCompany, jobRole, location, linkedin } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      graduationYear,
      branch,
      currentCompany,
      jobRole,
      location,
      linkedin
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        graduationYear: user.graduationYear,
        branch: user.branch,
        currentCompany: user.currentCompany,
        jobRole: user.jobRole,
        location: user.location,
        linkedin: user.linkedin
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        graduationYear: user.graduationYear,
        branch: user.branch,
        currentCompany: user.currentCompany,
        jobRole: user.jobRole,
        location: user.location,
        linkedin: user.linkedin,
        skills: user.skills,
        about: user.about
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        graduationYear: user.graduationYear,
        branch: user.branch,
        currentCompany: user.currentCompany,
        jobRole: user.jobRole,
        location: user.location,
        linkedin: user.linkedin,
        skills: user.skills,
        about: user.about
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { fullName, phone, currentCompany, jobRole, location, linkedin, about, skills } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.currentCompany = currentCompany || user.currentCompany;
    user.jobRole = jobRole || user.jobRole;
    user.location = location || user.location;
    user.linkedin = linkedin || user.linkedin;
    user.about = about || user.about;
    user.skills = skills || user.skills;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        graduationYear: user.graduationYear,
        branch: user.branch,
        currentCompany: user.currentCompany,
        jobRole: user.jobRole,
        location: user.location,
        linkedin: user.linkedin,
        skills: user.skills,
        about: user.about
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

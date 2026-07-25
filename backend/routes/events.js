const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const protect = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events/:id/rsvp
// @desc    RSVP for an event
// @access  Private
router.post('/:id/rsvp', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already RSVPed
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already RSVPed for this event' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    res.json({
      success: true,
      message: 'RSVP successful',
      event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

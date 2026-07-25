const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  initials: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  linkedin: {
    type: String
  },
  skills: [{
    type: String
  }]
});

module.exports = mongoose.model('Alumni', alumniSchema);

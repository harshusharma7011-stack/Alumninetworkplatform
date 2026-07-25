const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Mentor', mentorSchema);

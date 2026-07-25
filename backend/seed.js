const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Alumni = require('./models/Alumni');
const Event = require('./models/Event');
const Job = require('./models/Job');
const Mentor = require('./models/Mentor');

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-network');

  await Promise.all([
    Alumni.deleteMany({}),
    Event.deleteMany({}),
    Job.deleteMany({}),
    Mentor.deleteMany({})
  ]);

  await Alumni.insertMany([
    { name: 'Harshita Sharma', initials: 'HS', company: 'Google', role: 'Software Engineer', location: 'Bangalore, India', batch: '2022', industry: 'Technology', linkedin: 'https://linkedin.com/in/harshita', skills: ['React', 'Node.js'] },
    { name: 'Rohit Sharma', initials: 'RS', company: 'Goldman Sachs', role: 'Data Analyst', location: 'Mumbai, India', batch: '2021', industry: 'Finance', linkedin: 'https://linkedin.com/in/rohit', skills: ['Python', 'SQL'] },
    { name: 'Anjali Gupta', initials: 'AG', company: 'Microsoft', role: 'UI/UX Designer', location: 'Delhi, India', batch: '2022', industry: 'Technology', linkedin: 'https://linkedin.com/in/anjali', skills: ['Figma', 'UX'] }
  ]);

  await Event.insertMany([
    { title: 'Annual Alumni Reunion', date: 'December 15, 2026', venue: 'University Campus, Main Auditorium', icon: '🎉', description: 'Reconnect with classmates and industry peers.' },
    { title: 'Tech Talk: AI in Industry', date: 'December 20, 2026', venue: 'Virtual Event (Zoom)', icon: '💻', description: 'Hear from engineering leaders about AI adoption.' }
  ]);

  await Job.insertMany([
    { title: 'Software Engineer', company: 'Google', logo: 'G', location: 'Bangalore, India', type: 'Full-time', experience: '2+ years', salary: '₹20-35 LPA', description: 'Build scalable web experiences.' },
    { title: 'Frontend Developer', company: 'Microsoft', logo: 'M', location: 'Hyderabad, India', type: 'Full-time', experience: '3+ years', salary: '₹18-30 LPA', description: 'Create polished user interfaces.' }
  ]);

  await Mentor.insertMany([
    { name: 'Vikram Singh', initials: 'VS', company: 'Amazon', experience: '12+ years', skills: ['Product Management', 'Strategy', 'Leadership'] },
    { name: 'Priya Patel', initials: 'PP', company: 'Apollo Hospitals', experience: '11+ years', skills: ['Healthcare IT', 'Data Analytics'] }
  ]);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});

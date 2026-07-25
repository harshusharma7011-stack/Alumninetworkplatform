const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const directoryRoutes = require('./routes/directory');
const jobsRoutes = require('./routes/jobs');
const eventsRoutes = require('./routes/events');
const mentorshipRoutes = require('./routes/mentorship');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/mentorship', mentorshipRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const HOST = process.env.HOST || '127.0.0.1';
const DEFAULT_PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 5001);
const MAX_PORT = DEFAULT_PORT + 10;

const startServer = (port) => {
  const server = app.listen(port, HOST, () => {
    console.log(`Server is running on http://${HOST}:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' || error.code === 'EPERM') {
      if (port < MAX_PORT) {
        console.warn(`Port ${port} unavailable. Trying port ${port + 1}...`);
        startServer(port + 1);
        return;
      }
    }

    console.error('Server failed to start:', error.message);
    process.exit(1);
  });
};

startServer(DEFAULT_PORT);

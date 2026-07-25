# Alumni Network Platform - Backend API

Node.js/Express backend API for the Alumni Network Platform with MongoDB database.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy .env file and update values
cp .env.example .env
```

3. Update `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alumni-network
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

## MongoDB Setup

### Option 1: Local MongoDB Installation

1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: Run as Administrator and execute `net start MongoDB`
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. Verify MongoDB is running: `mongod --version`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string from the Atlas dashboard
4. Update `.env` file with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/alumni-network?retryWrites=true&w=majority
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Directory

- `GET /api/directory` - Get all alumni with optional filters
- `GET /api/directory/:id` - Get single alumni by ID

### Jobs

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job by ID
- `POST /api/jobs` - Create a new job (protected)

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event by ID
- `POST /api/events/:id/rsvp` - RSVP for an event (protected)

### Mentorship

- `GET /api/mentorship` - Get all mentors
- `GET /api/mentorship/:id` - Get single mentor by ID
- `POST /api/mentorship/:id/request` - Request mentorship (protected)

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message",
  "error": "Detailed error"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### User
- fullName
- email (unique)
- password (hashed)
- phone
- graduationYear
- branch
- currentCompany
- jobRole
- location
- linkedin
- skills (array)
- about

### Alumni
- name
- initials
- company
- role
- location
- batch
- industry
- linkedin
- skills (array)

### Job
- title
- company
- logo
- location
- type
- experience
- salary
- description
- postedBy (User reference)

### Event
- title
- date
- venue
- icon
- description
- attendees (User references array)

### Mentor
- name
- initials
- company
- experience
- skills (array)
- requests (User references array)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your MONGODB_URI in .env file
- Verify MongoDB credentials if using Atlas

### Port Already in Use
- Change PORT in .env file
- Kill process using port 5000: `npx kill-port 5000`

### JWT Errors
- Ensure JWT_SECRET is set in .env
- Check token expiration (default: 7 days)

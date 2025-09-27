# Course Tracker Server with MongoDB

A Node.js/Express server with MongoDB integration for the Course Tracker application.

## Features

- **Course Management**: Create, read, update, delete courses with multiple videos
- **Video Progress Tracking**: Track completion percentage, watch time, and current position
- **Notes System**: Add timestamped notes while watching videos
- **Video Streaming**: HTTP range request support for smooth video playback
- **MVC Architecture**: Clean separation of models, views (controllers), and routes

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. MongoDB Setup
Install MongoDB locally or use MongoDB Atlas (cloud).

**Local MongoDB:**
- Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service: `mongod`

**MongoDB Atlas (Recommended):**
- Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string

### 3. Environment Configuration
Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/course-tracker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-tracker
```

### 4. Seed Database
```bash
npm run seed
```

### 5. Start Server
```bash
npm run dev
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Videos within Courses
- `POST /api/courses/:id/videos` - Add video to course
- `PUT /api/courses/:courseId/videos/:videoId` - Update video in course
- `DELETE /api/courses/:courseId/videos/:videoId` - Delete video from course

### Progress Tracking
- `GET /api/progress/user?userId=default-user` - Get all user progress
- `GET /api/progress/course/:courseId?userId=default-user` - Get course progress
- `GET /api/progress/course/:courseId/video/:videoId?userId=default-user` - Get video progress
- `PUT /api/progress/course/:courseId/video/:videoId` - Update video progress

### Notes
- `POST /api/progress/course/:courseId/video/:videoId/notes` - Add note to video
- `PUT /api/progress/course/:courseId/video/:videoId/notes/:noteId` - Update note
- `DELETE /api/progress/course/:courseId/video/:videoId/notes/:noteId` - Delete note

### Video Streaming
- `GET /api/videos/:filename` - Stream video file with range request support

## Data Models

### Course
```javascript
{
  title: String,
  description: String,
  instructor: String,
  duration: String,
  status: ['active', 'completed', 'pending'],
  category: String,
  level: ['beginner', 'intermediate', 'advanced'],
  videos: [VideoSchema],
  totalVideos: Number,
  totalDuration: Number
}
```

### Video (embedded in Course)
```javascript
{
  title: String,
  description: String,
  videoUrl: String,
  duration: Number, // seconds
  order: Number,
  isPreview: Boolean
}
```

### Progress
```javascript
{
  courseId: ObjectId,
  videoId: String,
  userId: String,
  isCompleted: Boolean,
  currentTime: Number,
  completedPercentage: Number,
  watchTime: Number,
  notes: [NoteSchema],
  lastWatched: Date
}
```

### Note (embedded in Progress)
```javascript
{
  content: String,
  timestamp: Number, // video timestamp in seconds
  createdAt: Date
}
```

## Example API Usage

### Create Course
```bash
POST /api/courses
Content-Type: application/json

{
  "title": "Advanced React",
  "description": "Deep dive into React patterns",
  "instructor": "Jane Doe",
  "duration": "8 weeks",
  "category": "Web Development",
  "level": "advanced"
}
```

### Update Video Progress
```bash
PUT /api/progress/course/64f1a2b3c4d5e6f7g8h9i0j1/video/video1
Content-Type: application/json

{
  "userId": "user123",
  "currentTime": 1200,
  "completedPercentage": 75,
  "watchTime": 1800
}
```

### Add Note
```bash
POST /api/progress/course/64f1a2b3c4d5e6f7g8h9i0j1/video/video1/notes
Content-Type: application/json

{
  "userId": "user123",
  "content": "Important concept about hooks",
  "timestamp": 1200
}
```

## Project Structure
```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── courseController.js  # Course CRUD operations
│   └── progressController.js # Progress and notes management
├── models/
│   ├── Course.js           # Course and Video schemas
│   └── Progress.js         # Progress and Note schemas
├── routes/
│   ├── courseRoutes.js     # Course-related routes
│   └── progressRoutes.js   # Progress-related routes
├── videos/                 # Video files directory
├── index.js               # Main server file
├── seed.js               # Database seeding script
└── package.json
```
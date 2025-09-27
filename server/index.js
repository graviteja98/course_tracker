const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Import routes
const courseRoutes = require('./routes/courseRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Video streaming routes
app.get('/api/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.join(__dirname, 'videos', `${filename}.mp4`);
  
  // Check if video file exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    // Parse Range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Course Tracker API is running!' });
});

// Test route for video streaming
app.get('/test-video', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-video.html'));
});

// API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

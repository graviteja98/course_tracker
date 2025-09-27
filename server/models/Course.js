const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in seconds
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  isPreview: {
    type: Boolean,
    default: false
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String, // e.g., "4 weeks", "6 hours"
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'pending'],
    default: 'pending'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  thumbnail: {
    type: String,
    default: ''
  },
  videos: [videoSchema],
  totalVideos: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number, // Total duration in seconds
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.totalVideos = this.videos.length;
  this.totalDuration = this.videos.reduce((total, video) => total + video.duration, 0);
  next();
});

module.exports = mongoose.model('Course', courseSchema);

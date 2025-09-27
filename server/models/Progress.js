const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Number, // Video timestamp in seconds where note was taken
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const videoProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  videoId: {
    type: String, // Reference to video within course
    required: true
  },
  userId: {
    type: String, // In a real app, this would reference User model
    required: true,
    default: 'default-user' // For now, using a default user
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  currentTime: {
    type: Number, // Current playback time in seconds
    default: 0
  },
  completedPercentage: {
    type: Number, // Percentage of video watched (0-100)
    default: 0,
    min: 0,
    max: 100
  },
  watchTime: {
    type: Number, // Total time spent watching in seconds
    default: 0
  },
  notes: [noteSchema],
  lastWatched: {
    type: Date,
    default: Date.now
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
videoProgressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
videoProgressSchema.index({ courseId: 1, userId: 1 });
videoProgressSchema.index({ videoId: 1, userId: 1 });

module.exports = mongoose.model('Progress', videoProgressSchema);

const Progress = require('../models/Progress');
const Course = require('../models/Course');

// Get progress for all videos in a course
const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId = 'default-user' } = req.query;

    const progress = await Progress.find({
      courseId,
      userId
    }).sort({ createdAt: 1 });

    // Get course details to include video information
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Calculate overall course progress
    const totalVideos = course.videos.length;
    const completedVideos = progress.filter(p => p.isCompleted).length;
    const overallProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

    res.json({
      success: true,
      data: {
        courseId,
        courseTitle: course.title,
        overallProgress,
        totalVideos,
        completedVideos,
        videoProgress: progress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course progress',
      error: error.message
    });
  }
};

// Get progress for a specific video
const getVideoProgress = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;
    const { userId = 'default-user' } = req.query;

    const progress = await Progress.findOne({
      courseId,
      videoId,
      userId
    });

    if (!progress) {
      return res.json({
        success: true,
        data: {
          courseId,
          videoId,
          isCompleted: false,
          currentTime: 0,
          completedPercentage: 0,
          watchTime: 0,
          notes: []
        }
      });
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching video progress',
      error: error.message
    });
  }
};

// Update video progress
const updateVideoProgress = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;
    const { userId = 'default-user' } = req.body;
    const { currentTime, completedPercentage, watchTime } = req.body;

    // Get video duration to determine completion
    const course = await Course.findById(courseId);
    const video = course?.videos.find(v => v._id.toString() === videoId);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    const isCompleted = completedPercentage >= 90; // Consider 90% as completed

    const progress = await Progress.findOneAndUpdate(
      { courseId, videoId, userId },
      {
        currentTime: currentTime || 0,
        completedPercentage: completedPercentage || 0,
        watchTime: watchTime || 0,
        isCompleted,
        lastWatched: new Date()
      },
      { 
        new: true, 
        upsert: true, // Create if doesn't exist
        runValidators: true 
      }
    );

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating video progress',
      error: error.message
    });
  }
};

// Add note to video
const addNoteToVideo = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;
    const { userId = 'default-user' } = req.body;
    const { content, timestamp } = req.body;

    if (!content || timestamp === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Content and timestamp are required'
      });
    }

    const note = {
      content,
      timestamp
    };

    const progress = await Progress.findOneAndUpdate(
      { courseId, videoId, userId },
      {
        $push: { notes: note },
        lastWatched: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding note',
      error: error.message
    });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const { courseId, videoId, noteId } = req.params;
    const { userId = 'default-user' } = req.body;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const progress = await Progress.findOneAndUpdate(
      { 
        courseId, 
        videoId, 
        userId,
        'notes._id': noteId
      },
      {
        $set: { 'notes.$.content': content }
      },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating note',
      error: error.message
    });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const { courseId, videoId, noteId } = req.params;
    const { userId = 'default-user' } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { courseId, videoId, userId },
      {
        $pull: { notes: { _id: noteId } }
      },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
      error: error.message
    });
  }
};

// Get all progress for a user
const getUserProgress = async (req, res) => {
  try {
    const { userId = 'default-user' } = req.query;

    const progress = await Progress.find({ userId })
      .populate('courseId', 'title instructor category')
      .sort({ lastWatched: -1 });

    // Group by course
    const courseProgress = {};
    progress.forEach(p => {
      if (!courseProgress[p.courseId._id]) {
        courseProgress[p.courseId._id] = {
          course: p.courseId,
          videos: [],
          totalVideos: 0,
          completedVideos: 0,
          overallProgress: 0
        };
      }
      courseProgress[p.courseId._id].videos.push(p);
      courseProgress[p.courseId._id].totalVideos++;
      if (p.isCompleted) {
        courseProgress[p.courseId._id].completedVideos++;
      }
    });

    // Calculate overall progress for each course
    Object.keys(courseProgress).forEach(courseId => {
      const course = courseProgress[courseId];
      course.overallProgress = course.totalVideos > 0 
        ? (course.completedVideos / course.totalVideos) * 100 
        : 0;
    });

    res.json({
      success: true,
      data: {
        userId,
        courseProgress: Object.values(courseProgress)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
};

module.exports = {
  getCourseProgress,
  getVideoProgress,
  updateVideoProgress,
  addNoteToVideo,
  updateNote,
  deleteNote,
  getUserProgress
};

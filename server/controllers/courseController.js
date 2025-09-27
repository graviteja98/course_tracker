const Course = require('../models/Course');

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// Create new course
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      category,
      level,
      thumbnail,
      videos
    } = req.body;

    // Validate required fields
    if (!title || !description || !instructor || !duration || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, instructor, duration, and category are required'
      });
    }

    const course = new Course({
      title,
      description,
      instructor,
      duration,
      category,
      level: level || 'beginner',
      thumbnail: thumbnail || '',
      videos: videos || []
    });

    const savedCourse = await course.save();
    
    res.status(201).json({
      success: true,
      data: savedCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};

// Add video to course
const addVideoToCourse = async (req, res) => {
  try {
    const { title, description, videoUrl, duration, order, isPreview } = req.body;

    if (!title || !description || !videoUrl || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, videoUrl, and duration are required'
      });
    }

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const video = {
      title,
      description,
      videoUrl,
      duration,
      order: order || course.videos.length,
      isPreview: isPreview || false
    };

    course.videos.push(video);
    await course.save();

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding video to course',
      error: error.message
    });
  }
};

// Update video in course
const updateVideoInCourse = async (req, res) => {
  try {
    const { videoId } = req.params;
    const updateData = req.body;

    const course = await Course.findOneAndUpdate(
      { 'videos._id': videoId },
      { $set: { 'videos.$': { ...updateData, _id: videoId } } },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course or video not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
};

// Delete video from course
const deleteVideoFromCourse = async (req, res) => {
  try {
    const { videoId } = req.params;

    const course = await Course.findOneAndUpdate(
      { 'videos._id': videoId },
      { $pull: { videos: { _id: videoId } } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course or video not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addVideoToCourse,
  updateVideoInCourse,
  deleteVideoFromCourse
};

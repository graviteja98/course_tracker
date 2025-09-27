const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Course routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

// Video routes within courses
router.post('/:id/videos', courseController.addVideoToCourse);
router.put('/:courseId/videos/:videoId', courseController.updateVideoInCourse);
router.delete('/:courseId/videos/:videoId', courseController.deleteVideoFromCourse);

module.exports = router;

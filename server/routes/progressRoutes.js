const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Progress routes
router.get('/user', progressController.getUserProgress);
router.get('/course/:courseId', progressController.getCourseProgress);
router.get('/course/:courseId/video/:videoId', progressController.getVideoProgress);
router.put('/course/:courseId/video/:videoId', progressController.updateVideoProgress);

// Note routes
router.post('/course/:courseId/video/:videoId/notes', progressController.addNoteToVideo);
router.put('/course/:courseId/video/:videoId/notes/:noteId', progressController.updateNote);
router.delete('/course/:courseId/video/:videoId/notes/:noteId', progressController.deleteNote);

module.exports = router;

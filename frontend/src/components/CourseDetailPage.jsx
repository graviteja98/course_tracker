import React, { useState, useEffect } from 'react';
import './CourseDetailPage.css';
import VideoPlayer from './VideoPlayer';
import VideoSidebar from './VideoSidebar';

const CourseDetailPage = ({ course, onBack, progressData, onProgressUpdate }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});

  useEffect(() => {
    console.log('CourseDetailPage - Course:', course);
    console.log('CourseDetailPage - Videos:', course?.videos);
    
    if (course && course.videos && course.videos.length > 0) {
      // Select the first video by default, or the last watched video
      const firstVideo = course.videos[0];
      const lastWatchedVideo = course.videos.find(video => {
        const progress = progressData[video._id];
        return progress && progress.currentTime > 0;
      });
      
      console.log('CourseDetailPage - Selected Video:', lastWatchedVideo || firstVideo);
      setSelectedVideo(lastWatchedVideo || firstVideo);
    }
  }, [course, progressData]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleVideoProgress = async (videoId, progress) => {
    try {
      // Update local state immediately for responsive UI
      setVideoProgress(prev => ({
        ...prev,
        [videoId]: progress
      }));

      // Send to server
      const response = await fetch(`http://localhost:5000/api/progress/course/${course._id}/video/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'default-user',
          currentTime: progress.currentTime,
          completedPercentage: progress.completedPercentage,
          watchTime: progress.watchTime
        })
      });

      if (response.ok) {
        // Notify parent component to refresh progress data
        if (onProgressUpdate) {
          onProgressUpdate();
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const addNote = async (videoId, note) => {
    try {
      const response = await fetch(`http://localhost:5000/api/progress/course/${course._id}/video/${videoId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'default-user',
          content: note.content,
          timestamp: note.timestamp
        })
      });

      if (response.ok) {
        // Refresh progress data
        if (onProgressUpdate) {
          onProgressUpdate();
        }
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  if (!course) {
    return <div className="course-not-found">Course not found</div>;
  }

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Courses
        </button>
        <div className="course-info">
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span className="instructor">👨‍🏫 {course.instructor}</span>
            <span className="duration">⏱️ {course.duration}</span>
            <span className="category">🏷️ {course.category}</span>
            <span className="level">📊 {course.level}</span>
          </div>
        </div>
      </div>

      <div className="course-content">
        <div className="video-section">
          {selectedVideo ? (
            <div className="video-container">
              <VideoPlayer
                videoUrl={selectedVideo.videoUrl}
                title={selectedVideo.title}
                onProgress={(progress) => handleVideoProgress(selectedVideo._id, progress)}
                onAddNote={(note) => addNote(selectedVideo._id, note)}
                showNotes={true}
              />
              <div className="video-info">
                <h3>{selectedVideo.title}</h3>
                <p>{selectedVideo.description}</p>
                <div className="video-meta">
                  <span className="video-duration">
                    ⏱️ {Math.floor(selectedVideo.duration / 60)}:{(selectedVideo.duration % 60).toString().padStart(2, '0')}
                  </span>
                  {selectedVideo.isPreview && (
                    <span className="preview-badge">👁️ Preview</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-video-selected">
              <h3>Select a video to start watching</h3>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <VideoSidebar
            videos={course.videos}
            selectedVideo={selectedVideo}
            onVideoSelect={handleVideoSelect}
            progressData={progressData}
            courseId={course._id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

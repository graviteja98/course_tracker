import React from 'react';
import './VideoSidebar.css';

const VideoSidebar = ({ videos, selectedVideo, onVideoSelect, progressData, courseId }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressForVideo = (videoId) => {
    return progressData[videoId] || {
      isCompleted: false,
      completedPercentage: 0,
      currentTime: 0,
      watchTime: 0
    };
  };

  const getProgressColor = (percentage) => {
    if (percentage === 100) return '#4CAF50';
    if (percentage > 0) return '#FF9800';
    return '#757575';
  };

  const getProgressIcon = (percentage) => {
    if (percentage === 100) return '✅';
    if (percentage > 0) return '⏸️';
    return '▶️';
  };

  const isVideoSelected = (video) => {
    return selectedVideo && selectedVideo._id === video._id;
  };

  return (
    <div className="video-sidebar">
      <div className="sidebar-header">
        <h3>📹 Course Videos</h3>
        <span className="video-count">{videos.length} videos</span>
      </div>

      <div className="video-list">
        {videos.map((video, index) => {
          const progress = getProgressForVideo(video._id);
          const progressColor = getProgressColor(progress.completedPercentage);
          const isSelected = isVideoSelected(video);

          return (
            <div
              key={video._id}
              className={`video-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onVideoSelect(video)}
            >
              <div className="video-item-header">
                <div className="video-index">
                  <span className="index-number">{index + 1}</span>
                </div>
                
                <div className="video-info">
                  <h4 className="video-title">
                    {video.isPreview && <span className="preview-badge">👁️</span>}
                    {video.title}
                  </h4>
                  <p className="video-description">{video.description}</p>
                </div>
                
                <div className="video-actions">
                  <div className="progress-indicator">
                    <div 
                      className="progress-circle"
                      style={{ 
                        background: `conic-gradient(${progressColor} ${progress.completedPercentage * 3.6}deg, #333 ${progress.completedPercentage * 3.6}deg)`
                      }}
                    >
                      <span className="progress-icon">
                        {getProgressIcon(progress.completedPercentage)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-meta">
                <span className="video-duration">⏱️ {formatDuration(video.duration)}</span>
                {progress.completedPercentage > 0 && (
                  <span className="progress-text">
                    {Math.round(progress.completedPercentage)}% complete
                  </span>
                )}
              </div>

              {progress.completedPercentage > 0 && progress.completedPercentage < 100 && (
                <div className="video-progress-details">
                  <span>Last position: {Math.floor(progress.currentTime / 60)}:{(progress.currentTime % 60).toString().padStart(2, '0')}</span>
                </div>
              )}

              {progress.notes && progress.notes.length > 0 && (
                <div className="video-notes-indicator">
                  📝 {progress.notes.length} note{progress.notes.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSidebar;

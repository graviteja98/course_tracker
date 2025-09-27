import React from 'react';
import './VideoList.css';

const VideoList = ({ videos, onPlayVideo, courseId, progressData = {} }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressForVideo = (videoId) => {
    return progressData[videoId] || {
      isCompleted: false,
      completedPercentage: 0,
      currentTime: 0
    };
  };

  const getProgressColor = (percentage) => {
    if (percentage === 100) return '#4CAF50'; // Green for completed
    if (percentage > 0) return '#FF9800'; // Orange for in progress
    return '#757575'; // Gray for not started
  };

  const getProgressIcon = (percentage) => {
    if (percentage === 100) return '✅';
    if (percentage > 0) return '⏸️';
    return '▶️';
  };

  return (
    <div className="video-list">
      <h4 className="video-list-title">📹 Course Videos ({videos.length})</h4>
      {videos.map((video, index) => {
        const progress = getProgressForVideo(video._id);
        const progressColor = getProgressColor(progress.completedPercentage);
        
        return (
          <div key={video._id} className="video-item">
            <div className="video-item-header">
              <div className="video-index">
                <span className="index-number">{index + 1}</span>
              </div>
              
              <div className="video-info">
                <h5 className="video-title">
                  {video.isPreview && <span className="preview-badge">👁️ Preview</span>}
                  {video.title}
                </h5>
                <p className="video-description">{video.description}</p>
                
                <div className="video-meta">
                  <span className="video-duration">⏱️ {formatDuration(video.duration)}</span>
                  {progress.completedPercentage > 0 && (
                    <span className="video-progress">
                      📊 {Math.round(progress.completedPercentage)}% complete
                    </span>
                  )}
                </div>
              </div>
              
              <div className="video-actions">
                <div className="progress-indicator">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${progress.completedPercentage}%`,
                      backgroundColor: progressColor
                    }}
                  />
                  <span className="progress-icon">
                    {getProgressIcon(progress.completedPercentage)}
                  </span>
                </div>
                
                <button 
                  className="play-video-btn"
                  onClick={() => onPlayVideo(video, courseId)}
                >
                  {progress.completedPercentage > 0 ? 'Continue' : 'Watch'}
                </button>
              </div>
            </div>
            
            {progress.completedPercentage > 0 && progress.completedPercentage < 100 && (
              <div className="video-progress-details">
                <span>Last position: {Math.floor(progress.currentTime / 60)}:{(progress.currentTime % 60).toString().padStart(2, '0')}</span>
                <span>Watch time: {Math.floor(progress.watchTime / 60)}:{(progress.watchTime % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;

import React, { useState } from 'react';
import './CourseCard.css';
import VideoList from './VideoList';

const CourseCard = ({ course, onPlayVideo, progressData = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  console.log('CourseCard - Course:', course);
  console.log('CourseCard - Videos:', course.videos);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'pending': return '#FF9800';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '▶️';
      case 'completed': return '✅';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const calculateOverallProgress = () => {
    if (!course.videos || course.videos.length === 0) return 0;
    
    const totalProgress = course.videos.reduce((sum, video) => {
      const videoProgress = progressData[video._id] || { completedPercentage: 0 };
      return sum + videoProgress.completedPercentage;
    }, 0);
    
    return Math.round(totalProgress / course.videos.length);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="course-card">
      <div className="course-header">
        <div className="course-title-section">
          <h3 className="course-title">{course.title}</h3>
          <div className="course-progress">
            <span className="progress-text">{overallProgress}% Complete</span>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="course-header-actions">
          <span 
            className="course-status"
            style={{ backgroundColor: getStatusColor(course.status) }}
          >
            {getStatusIcon(course.status)} {course.status}
          </span>
          
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶️'}
            {course.videos?.length || 0} videos
          </button>
        </div>
      </div>
      
      <div className="course-content">
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="course-info">
            <span className="instructor">👨‍🏫 {course.instructor}</span>
            <span className="duration">⏱️ {course.duration}</span>
            <span className="category">🏷️ {course.category}</span>
            <span className="level">📊 {course.level}</span>
          </div>
        </div>
      </div>
      
      {isExpanded && course.videos && course.videos.length > 0 && (
        <VideoList 
          videos={course.videos}
          onPlayVideo={onPlayVideo}
          courseId={course._id}
          progressData={progressData}
        />
      )}
    </div>
  );
};

export default CourseCard;

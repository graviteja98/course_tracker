import React from 'react';
import './Statistics.css';

const Statistics = ({ courses, progressData }) => {
  const calculateStats = () => {
    const totalCourses = courses.length;
    const totalVideos = courses.reduce((sum, course) => sum + (course.videos?.length || 0), 0);
    
    let completedCourses = 0;
    let totalCompletedVideos = 0;
    let totalWatchTime = 0;
    let totalProgress = 0;

    courses.forEach(course => {
      if (course.videos && course.videos.length > 0) {
        let courseCompletedVideos = 0;
        let courseProgress = 0;
        let courseWatchTime = 0;

        course.videos.forEach(video => {
          const videoProgress = progressData[video._id] || { 
            isCompleted: false, 
            completedPercentage: 0, 
            watchTime: 0 
          };
          
          if (videoProgress.isCompleted) {
            courseCompletedVideos++;
            totalCompletedVideos++;
          }
          
          courseProgress += videoProgress.completedPercentage;
          courseWatchTime += videoProgress.watchTime || 0;
        });

        totalWatchTime += courseWatchTime;
        
        // Course is considered completed if all videos are completed
        if (courseCompletedVideos === course.videos.length && course.videos.length > 0) {
          completedCourses++;
        }
        
        totalProgress += courseProgress / course.videos.length;
      }
    });

    const overallProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
    const completionRate = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    const videoCompletionRate = totalVideos > 0 ? Math.round((totalCompletedVideos / totalVideos) * 100) : 0;

    return {
      totalCourses,
      completedCourses,
      totalVideos,
      totalCompletedVideos,
      overallProgress,
      completionRate,
      videoCompletionRate,
      totalWatchTime: Math.round(totalWatchTime / 60) // Convert to minutes
    };
  };

  const stats = calculateStats();

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>📊 Learning Progress</h2>
        <div className="overall-progress">
          <span className="progress-label">Overall Progress</span>
          <div className="progress-circle">
            <svg className="progress-ring" width="80" height="80">
              <circle
                className="progress-ring-circle-bg"
                stroke="#333"
                strokeWidth="6"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
              />
              <circle
                className="progress-ring-circle"
                stroke="#61dafb"
                strokeWidth="6"
                fill="transparent"
                r="34"
                cx="40"
                cy="40"
                style={{
                  strokeDasharray: `${2 * Math.PI * 34}`,
                  strokeDashoffset: `${2 * Math.PI * 34 * (1 - stats.overallProgress / 100)}`
                }}
              />
            </svg>
            <span className="progress-text">{stats.overallProgress}%</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedCourses}/{stats.totalCourses}</div>
            <div className="stat-label">Courses Completed</div>
            <div className="stat-sub">{stats.completionRate}% completion rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalCompletedVideos}/{stats.totalVideos}</div>
            <div className="stat-label">Videos Watched</div>
            <div className="stat-sub">{stats.videoCompletionRate}% video completion</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-number">{formatTime(stats.totalWatchTime)}</div>
            <div className="stat-label">Total Watch Time</div>
            <div className="stat-sub">Time spent learning</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalCourses - stats.completedCourses}</div>
            <div className="stat-label">Courses In Progress</div>
            <div className="stat-sub">Still learning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

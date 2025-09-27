import React, { useState, useRef } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoUrl, title, onClose, onProgress, onAddNote, showNotes = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const videoRef = useRef(null);
  const watchStartTime = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (watchStartTime.current) {
          const currentWatchTime = Date.now() - watchStartTime.current;
          setWatchTime(prev => prev + currentWatchTime / 1000);
          watchStartTime.current = null;
        }
      } else {
        videoRef.current.play();
        watchStartTime.current = Date.now();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);
      
      // Track watch time
      if (isPlaying && watchStartTime.current) {
        const currentWatchTime = Date.now() - watchStartTime.current;
        setWatchTime(prev => prev + currentWatchTime / 1000);
        watchStartTime.current = Date.now();
      }
      
      // Calculate progress percentage
      const progressPercentage = duration > 0 ? (newTime / duration) * 100 : 0;
      
      // Call progress callback every 5 seconds or when video ends
      if (onProgress && (Math.floor(newTime) % 5 === 0 || newTime >= duration)) {
        onProgress({
          currentTime: newTime,
          completedPercentage: progressPercentage,
          watchTime: watchTime
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      console.log('Video loaded successfully:', videoUrl);
    }
  };

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
    console.error('Video URL:', videoUrl);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (noteText.trim() && onAddNote) {
      onAddNote({
        content: noteText.trim(),
        timestamp: currentTime
      });
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddNote();
    } else if (e.key === 'Escape') {
      setShowNoteInput(false);
      setNoteText('');
    }
  };

  return (
    <div className="video-modal">
      <div className="video-container">
        <div className="video-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={`http://localhost:5000${videoUrl}`}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="video-element"
          />
          
          <div className="video-controls">
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="progress-container" onClick={handleSeek}>
              <div 
                className="progress-bar"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            
            <span className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <div className="volume-container">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
            
            <button className="fullscreen-btn" onClick={toggleFullscreen}>
              {isFullscreen ? '⤓' : '⤢'}
            </button>
            
            {showNotes && (
              <button 
                className="note-btn"
                onClick={() => setShowNoteInput(!showNoteInput)}
              >
                📝 Add Note
              </button>
            )}
          </div>
          
          {showNoteInput && (
            <div className="note-input-container">
              <div className="note-input">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Add note at ${formatTime(currentTime)}...`}
                  autoFocus
                />
                <button onClick={handleAddNote}>Save</button>
                <button onClick={() => {
                  setShowNoteInput(false);
                  setNoteText('');
                }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

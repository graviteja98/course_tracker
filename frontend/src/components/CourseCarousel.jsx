import React, { useState, useRef } from 'react';
import './CourseCarousel.css';
import CourseCard from './CourseCard';

const CourseCarousel = ({ courses, onPlayVideo, progressData, onCourseSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!courses || courses.length === 0) {
    return <div className="no-courses">No courses available</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h3>📚 Your Courses</h3>
        <div className="carousel-indicators">
          {courses.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="carousel-wrapper">
        <button 
          className="carousel-btn prev-btn"
          onClick={prevSlide}
          disabled={courses.length <= 1}
        >
          ‹
        </button>

        <div className="carousel-track" ref={carouselRef}>
          <div 
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {courses.map((course, index) => (
              <div key={course._id || course.id} className="carousel-slide">
                <div 
                  className="course-card-clickable"
                  onClick={() => onCourseSelect && onCourseSelect(course)}
                >
                  <CourseCard
                    course={course}
                    onPlayVideo={onPlayVideo}
                    progressData={progressData}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn next-btn"
          onClick={nextSlide}
          disabled={courses.length <= 1}
        >
          ›
        </button>
      </div>

      <div className="carousel-info">
        <span className="slide-counter">
          {currentIndex + 1} of {courses.length}
        </span>
        {courses.length > 1 && (
          <div className="carousel-navigation-hint">
            Use arrow buttons or click dots to navigate
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;

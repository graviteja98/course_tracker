import { useState, useEffect } from 'react'
import './App.css'
import Statistics from './components/Statistics'
import CourseCarousel from './components/CourseCarousel'
import CourseDetailPage from './components/CourseDetailPage'
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [progressData, setProgressData] = useState({})
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    fetchCourses()
    fetchUserProgress()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses')
      const data = await response.json()
      console.log('Fetched courses data:', data)
      setCourses(data.data || data) // Handle both new API format and legacy format
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProgress = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/progress/user?userId=default-user')
      const data = await response.json()
      
      // Transform progress data into a format that's easy to lookup by video ID
      const progressMap = {}
      if (data.data && data.data.courseProgress) {
        data.data.courseProgress.forEach(courseProgress => {
          courseProgress.videos.forEach(videoProgress => {
            progressMap[videoProgress.videoId] = videoProgress
          })
        })
      }
      setProgressData(progressMap)
    } catch (error) {
      console.error('Error fetching progress:', error)
    }
  }

  const handlePlayVideo = (video, courseId) => {
    setSelectedVideo({
      ...video,
      courseId: courseId,
      courseTitle: courses.find(c => c._id === courseId)?.title || 'Course'
    })
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
    // Refresh progress data after closing video
    fetchUserProgress()
  }

  const handleCourseSelect = (course) => {
    console.log('Selected course:', course);
    console.log('Course videos:', course.videos);
    setSelectedCourse(course)
  }

  const handleBackToCourses = () => {
    setSelectedCourse(null)
    fetchUserProgress() // Refresh progress when going back
  }

  const handleProgressUpdate = () => {
    fetchUserProgress()
  }

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h1>Course Tracker</h1>
          <p>Loading courses...</p>
        </div>
      </div>
    )
  }

  // Show course detail page if a course is selected
  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={handleBackToCourses}
        progressData={progressData}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎓 Course Tracker</h1>
        <p>Track your learning progress with video courses</p>
      </header>

      <main className="App-main">
        <Statistics 
          courses={courses} 
          progressData={progressData} 
        />
        
        <CourseCarousel
          courses={courses}
          onPlayVideo={handlePlayVideo}
          progressData={progressData}
          onCourseSelect={handleCourseSelect}
        />
      </main>

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.videoUrl}
          title={`${selectedVideo.courseTitle} - ${selectedVideo.title}`}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  )
}

export default App

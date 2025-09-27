const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const sampleCourses = [
  {
    title: "Introduction to React",
    description: "Learn the basics of React development including components, state, and props",
    instructor: "John Doe",
    duration: "4 weeks",
    category: "Web Development",
    level: "beginner",
    status: "active",
    videos: [
      {
        title: "Introduction to React",
        description: "Learn the basics of React development including components, state, and props",
        videoUrl: "/api/videos/react-intro",
        duration: 2400, // 40 minutes
        order: 1,
        isPreview: true
      }
    ]
  },
  {
    title: "Node.js Fundamentals",
    description: "Master server-side JavaScript with Node.js, Express, and MongoDB",
    instructor: "Jane Smith",
    duration: "6 weeks",
    category: "Backend Development",
    level: "intermediate",
    status: "active",
    videos: [
      {
        title: "Node.js Fundamentals",
        description: "Master server-side JavaScript with Node.js, Express, and MongoDB",
        videoUrl: "/api/videos/nodejs-fundamentals",
        duration: 3600, // 60 minutes
        order: 1,
        isPreview: true
      }
    ]
  },
  {
    title: "Database Design",
    description: "Learn database design principles, normalization, and SQL queries",
    instructor: "Mike Johnson",
    duration: "5 weeks",
    category: "Database",
    level: "beginner",
    status: "pending",
    videos: [
      {
        title: "Database Design",
        description: "Learn database design principles, normalization, and SQL queries",
        videoUrl: "/api/videos/database-design",
        duration: 3000, // 50 minutes
        order: 1,
        isPreview: true
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-tracker');
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses`);

    // Log course details
    courses.forEach(course => {
      console.log(`- ${course.title} (${course.videos.length} videos)`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;

const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-tracker');
    console.log('Connected to MongoDB\n');

    const courses = await Course.find();
    
    console.log(`📚 Found ${courses.length} courses in database:\n`);
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   👨‍🏫 Instructor: ${course.instructor}`);
      console.log(`   📅 Duration: ${course.duration}`);
      console.log(`   🏷️  Category: ${course.category}`);
      console.log(`   📊 Level: ${course.level}`);
      console.log(`   🎯 Status: ${course.status}`);
      console.log(`   📹 Videos: ${course.videos.length}`);
      
      course.videos.forEach((video, videoIndex) => {
        console.log(`      ${videoIndex + 1}. ${video.title}`);
        console.log(`         📝 ${video.description}`);
        console.log(`         🎬 URL: ${video.videoUrl}`);
        console.log(`         ⏱️  Duration: ${Math.floor(video.duration / 60)} minutes`);
        console.log(`         ${video.isPreview ? '👁️ Preview Video' : '🔒 Full Course'}`);
      });
      console.log('');
    });

    console.log('✅ Database check completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
};

checkData();

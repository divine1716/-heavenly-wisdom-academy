// Test script to verify the setup
console.log('🧪 Testing Portal Backend Setup...\n');

try {
  // Test environment variables
  require('dotenv').config();
  console.log('✅ Environment variables loaded');
  console.log(`   - PORT: ${process.env.PORT || '5000'}`);
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   - Database URI configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
  console.log(`   - JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);

  // Test dependencies
  console.log('\n📦 Testing dependencies...');
  const express = require('express');
  console.log('✅ Express loaded');
  
  const mongoose = require('mongoose');
  console.log('✅ Mongoose loaded');
  
  const bcrypt = require('bcrypt');
  console.log('✅ Bcrypt loaded');
  
  const jwt = require('jsonwebtoken');
  console.log('✅ JWT loaded');
  
  const cors = require('cors');
  console.log('✅ CORS loaded');

  // Test models
  console.log('\n🗂️  Testing models...');
  const User = require('./models/User');
  console.log('✅ User model loaded');
  
  const Admission = require('./models/Admission');
  console.log('✅ Admission model loaded');

  // Test routes
  console.log('\n🛤️  Testing routes...');
  const authRoutes = require('./routes/auth');
  console.log('✅ Auth routes loaded');
  
  const admissionRoutes = require('./routes/admissions');
  console.log('✅ Admission routes loaded');

  // Test database config
  console.log('\n🔧 Testing database config...');
  const dbConfig = require('./config/database');
  console.log('✅ Database config loaded');

  console.log('\n🎉 All tests passed! Your setup is ready.');
  console.log('\n📋 Next Steps:');
  console.log('1. Make sure MongoDB is running');
  console.log('2. Update your .env file with correct values');
  console.log('3. Run: npm run dev');
  console.log('4. Test the API at: http://localhost:5000');

} catch (error) {
  console.error('❌ Setup test failed:', error.message);
  console.log('\n🔍 Check the following:');
  console.log('- All dependencies are installed (npm install)');
  console.log('- All files are in the correct locations');
  console.log('- .env file exists and is properly configured');
}
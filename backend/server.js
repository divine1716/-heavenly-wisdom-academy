const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Please check:');
    console.log('   1. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)');
    console.log('   2. Database credentials');
    console.log('   3. Network connectivity');
    // Don't exit on connection failure during development
    console.log('🔄 Server will continue running for API testing...');
  }
};

// Connect to database (async)
connectDB();

// Use fallback authentication for testing (works without MongoDB)
console.log('🔄 Using file-based authentication for testing...');
app.use('/api/auth', require('./routes/auth-fallback'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Portal Backend API is running!',
    database: mongoose.connection.name || 'File Storage',
    status: mongoose.connection.readyState === 1 ? 'MongoDB Connected' : 'File Storage Active'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    storage: 'File Storage Active',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌟 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
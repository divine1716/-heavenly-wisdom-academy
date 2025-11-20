// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Security middleware - Helmet protects against common vulnerabilities
app.use(helmet());

// ✅ Allow CORS from your frontend
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://your-domain.com',  // Replace with your actual domain
      'https://www.your-domain.com'
    ]
  : [
      'http://127.0.0.1:5500', 
      'http://localhost:5500', 
      'http://127.0.0.1:5501', 
      'http://localhost:5501', 
      'http://127.0.0.1:5502', 
      'http://localhost:5502', 
      'http://localhost:3000'
    ];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ✅ Test route
app.get('/', (req, res) => res.send('Backend running 🚀'));

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

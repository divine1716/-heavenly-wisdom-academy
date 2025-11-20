// Simple server without MongoDB - for testing only
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory user storage (temporary - data lost on restart)
const users = [];

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Backend running 🚀 (Simple Mode - No MongoDB)'));

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Check if user exists
    const exists = users.find(u => u.email === email);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash,
      role,
      createdAt: new Date()
    };
    
    users.push(user);

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || 'default_secret_key', 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      success: true,
      message: 'User created', 
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        fullName: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || 'default_secret_key', 
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true,
      message: 'Login successful', 
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        fullName: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    
    const user = users.find(u => u.id === payload.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ 
      success: true,
      user: { 
        id: user.id, 
        name: user.name, 
        fullName: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Get current user (alternative endpoint)
app.get('/api/user/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    
    const user = users.find(u => u.id === payload.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ 
      success: true,
      user: { 
        id: user.id, 
        name: user.name, 
        fullName: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📝 Using in-memory storage (data will be lost on restart)');
  console.log('💡 To use MongoDB, run: node server.js instead');
});

// Vercel Serverless Function for User Login
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// In-memory storage (use database in production)
let users = [];

// Simple password hashing
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'heavenly_salt').digest('hex');
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const ok = verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || 'heavenly_wisdom_secret_key', 
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true,
      message: 'Login successful!', 
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
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
}
// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/User');
const { signupValidation, loginValidation, validate } = require('../middleware/validation');
const { authLimiter } = require('../middleware/rateLimiter');

const SALT_ROUNDS = 10;

// POST /api/auth/signup
router.post('/signup', authLimiter, signupValidation, validate, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Additional email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      passwordHash, 
      role 
    });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      success: true,
      message: 'User created', 
      token,
      user: { id: user._id, name: user.name, fullName: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, loginValidation, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      success: true,
      message: 'Login successful', 
      token,
      user: { id: user._id, name: user.name, fullName: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/me (alternative endpoint for user verification)
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ success: false, message: 'No token provided' });

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(payload.id).select('-passwordHash -__v');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.json({ 
      success: true,
      user: { id: user._id, name: user.name, fullName: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;

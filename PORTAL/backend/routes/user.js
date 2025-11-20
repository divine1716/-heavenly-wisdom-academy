// backend/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, authorizeRoles } = require('../middleware/auth');

// GET /api/user/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example admin-only route
router.get('/all', auth, authorizeRoles('admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash -__v');
  res.json({ users });
});

module.exports = router;

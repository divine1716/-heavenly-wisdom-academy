const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body || {};
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }
  if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'Admin login is not configured.' });
  return res.status(200).json({
    success: true,
    token: jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '8h' }),
    username
  });
};

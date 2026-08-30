// Unified School Website Backend Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const submitAdmissionToSupabase = require('./api/admission/submit');
const adminLogin = require('./api/admin/login');
const adminAdmissions = require('./api/admin/admissions');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory user storage (for demo - use database in production)
const users = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = new Set([
  'https://heavenly-wisdom-academy-t283y67vh-divine-emmanuels-projects.vercel.app'
]);

app.use(cors({
  origin(origin, callback) {
    const isLocalOrigin = origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    callback(null, !origin || isLocalOrigin || allowedOrigins.has(origin));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Serve static files
app.use(express.static('.'));

// Uses the same handler as the deployed serverless endpoint, so local testing
// saves applications to Supabase too.
app.post('/api/admission/submit', submitAdmissionToSupabase);
app.post('/api/admin/login', adminLogin);
app.all('/api/admin/admissions', adminAdmissions);

// Configure multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `passport-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_PASS || process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('✅ Heavenly Wisdom Academy Backend Server is running 🚀');
});

// ===== AUTHENTICATION ROUTES =====

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
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
      process.env.JWT_SECRET || 'heavenly_wisdom_secret_key', 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      success: true,
      message: 'Account created successfully!', 
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
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
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
    const ok = await bcrypt.compare(password, user.passwordHash);
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
});

// Get current user
app.get('/api/auth/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'heavenly_wisdom_secret_key');
    
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
    console.error('Auth check error:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// ===== ADMISSION FORM ROUTE =====

// Submissions file
const SUBMISSION_FILE = path.join(__dirname, 'submissions.json');
if (!fs.existsSync(SUBMISSION_FILE)) fs.writeFileSync(SUBMISSION_FILE, '[]');

app.post('/submit-admission', upload.single('passport'), async (req, res) => {
  try {
    const formData = req.body;
    const passportFile = req.file;

    // Save submission data
    const dataToSave = {
      ...formData,
      passport: passportFile ? passportFile.filename : null,
      submittedAt: new Date().toISOString()
    };

    // Save to JSON file
    const submissions = JSON.parse(fs.readFileSync(SUBMISSION_FILE));
    submissions.push(dataToSave);
    fs.writeFileSync(SUBMISSION_FILE, JSON.stringify(submissions, null, 2));

    // Create email content
    const emailContent = `
New Admission Form Submission
=============================

SECTION A: Pupil's Personal Data
---------------------------------
Full Name: ${formData.fullName}
Residential Address: ${formData.address}
State of Origin: ${formData.stateOrigin}
Date of Birth: ${formData.dob}
Place of Birth: ${formData.birthPlace}
Religion: ${formData.religion}
Sex: ${formData.sex}
Class: ${formData.class}
Disability: ${formData.disability}
Genotype: ${formData.genotype}
Blood Group: ${formData.bloodGroup}
Hepatitis B: ${formData.hepatitis}
Former School: ${formData.formerSchool}

SECTION B: Parent/Guardian Data
---------------------------------
Parent/Guardian Name: ${formData.guardianName}
Residential Address: ${formData.guardianAddress}
Phone Number: ${formData.guardianPhone}
Occupation: ${formData.occupation}
Place of Work: ${formData.placeOfWork}
Next of Kin: ${formData.nextOfKin}
Next of Kin Phone: ${formData.kinPhone}
Child knows way home: ${formData.knowsWayHome}
Authorized persons to pick child: ${formData.authorizedPersons}
Christian training: ${formData.christianTraining}
Attestation: ${formData.attestation}

Submitted at: ${dataToSave.submittedAt}
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || 'adorableheavenlywisdom@gmail.com',
      subject: `New Admission Application - ${formData.fullName}`,
      text: emailContent,
      attachments: passportFile ? [{
        filename: passportFile.originalname,
        path: passportFile.path
      }] : [],
    };

    // Try to send email (don't fail if email fails)
    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Admission email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Email sending failed:', emailError.message);
      // Continue anyway - form is still saved
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Admission form submitted successfully! You will be contacted soon.' 
    });
    
  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit admission form. Please try again.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Heavenly Wisdom Academy Server running on http://localhost:${PORT}`);
  console.log('📝 Features available:');
  console.log('   - User Authentication (Login/Signup)');
  console.log('   - Admission Form Processing');
  console.log('   - File Upload Support');
  console.log('   - Email Notifications');
  console.log('💡 Note: Using in-memory storage for demo (data resets on restart)');
});

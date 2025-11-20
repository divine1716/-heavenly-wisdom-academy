// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('✅ School website backend is running 🚀');
});

// Admission form submission route
app.post('/ADMISSION/public/index.html/submit-admission', upload.single('passportUpload'), async (req, res) => {
  try {
    const formData = req.body;
    
    // Create email content
    const emailContent = `
      <h2>New Admission Form Submission</h2>
      <h3>SECTION A: Pupil's Personal Data</h3>
      <p><strong>Full Name:</strong> ${formData.fullName}</p>
      <p><strong>Residential Address:</strong> ${formData.address}</p>
      <p><strong>State of Origin:</strong> ${formData.stateOrigin}</p>
      <p><strong>Date of Birth:</strong> ${formData.dob}</p>
      <p><strong>Place of Birth:</strong> ${formData.birthPlace}</p>
      <p><strong>Religion:</strong> ${formData.religion}</p>
      <p><strong>Sex:</strong> ${formData.sex}</p>
      <p><strong>Class:</strong> ${formData.class}</p>
      <p><strong>Any Disability:</strong> ${formData.disability}</p>
      <p><strong>Genotype:</strong> ${formData.genotype}</p>
      <p><strong>Blood Group:</strong> ${formData.bloodGroup}</p>
      <p><strong>Hepatitis B:</strong> ${formData.hepatitis}</p>
      <p><strong>Former School:</strong> ${formData.formerSchool}</p>
      
      <h3>SECTION B: Parent/Guardian Data</h3>
      <p><strong>Parent/Guardian Name:</strong> ${formData.guardianName}</p>
      <p><strong>Residential Address:</strong> ${formData.guardianAddress}</p>
      <p><strong>Phone Number:</strong> ${formData.guardianPhone}</p>
      <p><strong>Occupation:</strong> ${formData.occupation}</p>
      <p><strong>Place of Work:</strong> ${formData.placeOfWork}</p>
      <p><strong>Next of Kin:</strong> ${formData.nextOfKin}</p>
      <p><strong>Phone of Next of Kin:</strong> ${formData.kinPhone}</p>
      <p><strong>Does child know way home:</strong> ${formData.knowsWayHome}</p>
      <p><strong>Authorized persons to pick child:</strong> ${formData.authorizedPersons}</p>
      <p><strong>Christian training:</strong> ${formData.christianTraining}</p>
      <p><strong>Attestation:</strong> ${formData.attestation}</p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'adorableheavenlywisdom@gmail.com',
      subject: `New Admission Application - ${formData.fullName}`,
      html: emailContent
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Admission form submitted successfully! You will receive a confirmation email shortly.' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit admission form. Please try again.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

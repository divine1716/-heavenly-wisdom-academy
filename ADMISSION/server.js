require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload config (Multer)
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

// Submissions file
const SUBMISSION_FILE = path.join(__dirname, 'submissions.json');
if (!fs.existsSync(SUBMISSION_FILE)) fs.writeFileSync(SUBMISSION_FILE, '[]');

// POST route to handle admission form
app.post('/submit-admission', upload.single('passport'), async (req, res) => {
  try {
    const formData = req.body;
    const passportFile = req.file;

    const dataToSave = {
      ...formData,
      passport: passportFile ? passportFile.filename : null,
      submittedAt: new Date().toISOString()
    };

    // Save to JSON file
    const submissions = JSON.parse(fs.readFileSync(SUBMISSION_FILE));
    submissions.push(dataToSave);
    fs.writeFileSync(SUBMISSION_FILE, JSON.stringify(submissions, null, 2));

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const emailBody = `
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

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Admission Submission: ${formData.fullName}`,
      text: emailBody,
      attachments: passportFile ? [{
        filename: passportFile.originalname,
        path: passportFile.path
      }] : [],
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Admission submitted successfully.' });
  } catch (error) {
    console.error('Submission error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Vercel Serverless Function for Admission Form Submission
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// Simple in-memory storage for demo
let submissions = [];

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    // Parse form data
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await form.parse(req);

    // Extract form data
    const formData = {};
    Object.keys(fields).forEach(key => {
      formData[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    });

    // Handle passport file
    let passportFile = null;
    if (files.passport && files.passport[0]) {
      passportFile = files.passport[0];
    }

    // Save submission data
    const dataToSave = {
      ...formData,
      passport: passportFile ? passportFile.originalFilename : null,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    };

    // Store in memory (use database in production)
    submissions.push(dataToSave);

    console.log('✅ Admission form submitted:', formData.fullName);
    
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
}
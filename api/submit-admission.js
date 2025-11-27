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
    
    // Send email notification using SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'REGENERATE_YOUR_KEY_DONT_USE_THE_OLD_ONE') {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        // Email to school admin
        const adminEmail = {
          to: 'adorableheavenlywisdom@gmail.com',
          from: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
          subject: `New Admission Application - ${formData.fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Admission Application</h2>
              
              <h3>Student Information</h3>
              <p><strong>Full Name:</strong> ${formData.fullName}</p>
              <p><strong>Date of Birth:</strong> ${formData.dob}</p>
              <p><strong>Gender:</strong> ${formData.gender}</p>
              <p><strong>Class Applying For:</strong> ${formData.classApplying}</p>
              <p><strong>Previous School:</strong> ${formData.previousSchool || 'N/A'}</p>
              
              <h3>Parent/Guardian Information</h3>
              <p><strong>Parent Name:</strong> ${formData.parentName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Address:</strong> ${formData.address}</p>
              <p><strong>Occupation:</strong> ${formData.occupation || 'N/A'}</p>
              
              <h3>Additional Information</h3>
              <p><strong>Medical Conditions:</strong> ${formData.medicalConditions || 'None'}</p>
              <p><strong>Special Needs:</strong> ${formData.specialNeeds || 'None'}</p>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
                <p>Submitted: ${new Date().toLocaleString()}</p>
                <p>Application ID: ${dataToSave.id}</p>
              </div>
            </div>
          `
        };
        
        await sgMail.send(adminEmail);
        console.log('📧 Admin notification email sent');
        
        // Auto-reply to parent
        const parentEmail = {
          to: formData.email,
          from: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
          subject: 'Admission Application Received - Heavenly Wisdom Academy',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #667eea;">Heavenly Wisdom International Academy</h1>
              </div>
              
              <p>Dear ${formData.parentName},</p>
              
              <p>Thank you for submitting an admission application for <strong>${formData.fullName}</strong>.</p>
              
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3>Application Details:</h3>
                <p><strong>Student Name:</strong> ${formData.fullName}</p>
                <p><strong>Class:</strong> ${formData.classApplying}</p>
                <p><strong>Application ID:</strong> ${dataToSave.id}</p>
                <p><strong>Date Submitted:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              <p>Your application has been received and is being reviewed by our admissions team. We will contact you within 2-3 business days regarding the next steps.</p>
              
              <p><strong>What happens next?</strong></p>
              <ol>
                <li>Application review (1-2 days)</li>
                <li>Interview scheduling (if required)</li>
                <li>Admission decision notification</li>
              </ol>
              
              <p>If you have any questions, please feel free to contact us:</p>
              <p style="font-size: 16px; color: #667eea;"><strong>📱 +234 806 229 7002</strong></p>
              <p style="font-size: 16px; color: #667eea;"><strong>📧 adorableheavenlywisdom@gmail.com</strong></p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 5px 0;"><strong>Heavenly Wisdom International Academy</strong></p>
                <p style="margin: 5px 0;">Opposite Nikton Junction, Yenagoa, Bayelsa State</p>
                <p style="margin: 5px 0;">Motto: Knowledge with the fear of God</p>
              </div>
              
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          `
        };
        
        await sgMail.send(parentEmail);
        console.log('📧 Parent confirmation email sent');
        
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠️ SendGrid not configured - emails not sent');
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
}
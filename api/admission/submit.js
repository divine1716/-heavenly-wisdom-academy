// Serverless function for handling admission submissions
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const admissionData = req.body;
    
    // Validate required fields
    if (!admissionData.fullName || !admissionData.guardianName || !admissionData.guardianPhone) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Student name, guardian name, and phone number are required'
      });
    }

    // Generate application ID
    const applicationId = 'ADM' + Date.now();
    const submissionDate = new Date().toISOString();

    // Prepare complete submission data
    const completeData = {
      ...admissionData,
      applicationId,
      submissionDate,
      status: 'pending',
      reviewedBy: null,
      reviewDate: null
    };

    // Send notification email to admin
    if (process.env.SENDGRID_API_KEY) {
      try {
        const adminEmailContent = {
          to: process.env.ADMIN_EMAIL || 'adorableheavenlywisdom@gmail.com',
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
            name: process.env.SENDGRID_FROM_NAME || 'Heavenly Wisdom Academy'
          },
          subject: `🎓 New Admission Application - ${admissionData.fullName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
                .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
                .info-label { font-weight: bold; min-width: 150px; color: #666; }
                .info-value { color: #333; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; margin: 10px 5px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎓 New Admission Application</h1>
                  <p>A new student has applied for admission</p>
                </div>
                
                <div class="content">
                  <div class="info-section">
                    <h2 style="color: #667eea; margin-top: 0;">Application Details</h2>
                    <div class="info-row">
                      <div class="info-label">Application ID:</div>
                      <div class="info-value"><strong>${applicationId}</strong></div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Submission Date:</div>
                      <div class="info-value">${new Date(submissionDate).toLocaleString()}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Status:</div>
                      <div class="info-value"><span style="background: #ffc107; padding: 4px 12px; border-radius: 20px; color: #000;">Pending Review</span></div>
                    </div>
                  </div>

                  <div class="info-section">
                    <h2 style="color: #667eea; margin-top: 0;">Student Information</h2>
                    <div class="info-row">
                      <div class="info-label">Full Name:</div>
                      <div class="info-value">${admissionData.fullName}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Date of Birth:</div>
                      <div class="info-value">${admissionData.dob || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Gender:</div>
                      <div class="info-value">${admissionData.sex || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Class Applying For:</div>
                      <div class="info-value"><strong>${admissionData.class || 'N/A'}</strong></div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Address:</div>
                      <div class="info-value">${admissionData.address || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">State of Origin:</div>
                      <div class="info-value">${admissionData.stateOrigin || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Previous School:</div>
                      <div class="info-value">${admissionData.formerSchool || 'None'}</div>
                    </div>
                  </div>

                  <div class="info-section">
                    <h2 style="color: #667eea; margin-top: 0;">Parent/Guardian Information</h2>
                    <div class="info-row">
                      <div class="info-label">Name:</div>
                      <div class="info-value">${admissionData.guardianName}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Phone:</div>
                      <div class="info-value"><strong>${admissionData.guardianPhone}</strong></div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Email:</div>
                      <div class="info-value">${admissionData.guardianEmail || 'Not provided'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Occupation:</div>
                      <div class="info-value">${admissionData.occupation || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Address:</div>
                      <div class="info-value">${admissionData.guardianAddress || 'N/A'}</div>
                    </div>
                  </div>

                  <div class="info-section">
                    <h2 style="color: #667eea; margin-top: 0;">Medical Information</h2>
                    <div class="info-row">
                      <div class="info-label">Genotype:</div>
                      <div class="info-value">${admissionData.genotype || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Blood Group:</div>
                      <div class="info-value">${admissionData.bloodGroup || 'N/A'}</div>
                    </div>
                    <div class="info-row">
                      <div class="info-label">Any Disability:</div>
                      <div class="info-value">${admissionData.disability || 'No'}</div>
                    </div>
                  </div>

                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.VERCEL_URL || 'https://your-site.vercel.app'}/PORTAL/admin-panel.html" class="button">
                      📋 View in Admin Panel
                    </a>
                    <p style="color: #666; font-size: 14px; margin-top: 15px;">
                      Review this application and send acceptance/rejection letter to the parent.
                    </p>
                  </div>
                </div>

                <div class="footer">
                  <p><strong>Heavenly Wisdom International Academy</strong></p>
                  <p>Opposite Nikton Junction, Yenagoa, Bayelsa State</p>
                  <p>📧 adorableheavenlywisdom@gmail.com | 📱 +234 806 229 7002</p>
                </div>
              </div>
            </body>
            </html>
          `
        };

        await sgMail.send(adminEmailContent);
        console.log('✅ Admin notification email sent successfully');
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Send confirmation email to parent (if email provided)
    if (admissionData.guardianEmail && process.env.SENDGRID_API_KEY) {
      try {
        const parentEmailContent = {
          to: admissionData.guardianEmail,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
            name: process.env.SENDGRID_FROM_NAME || 'Heavenly Wisdom Academy'
          },
          subject: `Application Received - ${admissionData.fullName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .highlight-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #28a745; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✅ Application Received!</h1>
                  <p>Thank you for applying to Heavenly Wisdom International Academy</p>
                </div>
                
                <div class="content">
                  <p>Dear <strong>${admissionData.guardianName}</strong>,</p>
                  
                  <p>We have successfully received the admission application for <strong>${admissionData.fullName}</strong>.</p>
                  
                  <div class="highlight-box">
                    <h3 style="margin-top: 0; color: #667eea;">Application Summary</h3>
                    <p><strong>Application ID:</strong> ${applicationId}</p>
                    <p><strong>Student Name:</strong> ${admissionData.fullName}</p>
                    <p><strong>Class:</strong> ${admissionData.class}</p>
                    <p><strong>Submission Date:</strong> ${new Date(submissionDate).toLocaleDateString()}</p>
                  </div>

                  <h3>What Happens Next?</h3>
                  <ol>
                    <li>Our admissions team will review your application within 3-5 business days</li>
                    <li>We will contact you via phone or email for any additional information</li>
                    <li>You will receive an admission decision letter via email</li>
                    <li>If accepted, further instructions for enrollment will be provided</li>
                  </ol>

                  <h3>Required Documents (Please Prepare)</h3>
                  <ul>
                    <li>Birth Certificate (Original & Photocopy)</li>
                    <li>Previous School Report Card (if applicable)</li>
                    <li>Passport Photographs (4 copies)</li>
                    <li>Medical Report</li>
                    <li>Parent/Guardian ID Card</li>
                  </ul>

                  <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact us:</p>
                  <p>
                    📞 <strong>+234 806 229 7002</strong><br>
                    📧 <strong>adorableheavenlywisdom@gmail.com</strong>
                  </p>
                </div>

                <div class="footer">
                  <p><strong>Heavenly Wisdom International Academy</strong></p>
                  <p>Knowledge with the Fear of God</p>
                  <p>Opposite Nikton Junction, Yenagoa, Bayelsa State</p>
                </div>
              </div>
            </body>
            </html>
          `
        };

        await sgMail.send(parentEmailContent);
        console.log('✅ Parent confirmation email sent successfully');
      } catch (emailError) {
        console.error('❌ Parent email failed:', emailError);
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      data: completeData
    });

  } catch (error) {
    console.error('Admission submission error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process admission application'
    });
  }
};

// Serverless function for reviewing admission applications (Accept/Reject)
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
    const { applicationId, action, studentData, adminName } = req.body;
    
    // Validate required fields
    if (!applicationId || !action || !studentData) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Application ID, action, and student data are required'
      });
    }

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ 
        error: 'Invalid action',
        message: 'Action must be either "accept" or "reject"'
      });
    }

    const reviewDate = new Date().toISOString();
    const isAccepted = action === 'accept';

    // Send email to parent
    if (studentData.guardianEmail && process.env.SENDGRID_API_KEY) {
      try {
        let emailContent;

        if (isAccepted) {
          // ACCEPTANCE LETTER
          emailContent = {
            to: studentData.guardianEmail,
            from: {
              email: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
              name: process.env.SENDGRID_FROM_NAME || 'Heavenly Wisdom Academy'
            },
            subject: `🎉 Admission Offer - ${studentData.fullName}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Georgia', serif; line-height: 1.8; color: #333; }
                  .container { max-width: 700px; margin: 0 auto; padding: 20px; background: white; }
                  .letterhead { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px; }
                  .logo { font-size: 24px; font-weight: bold; color: #667eea; }
                  .school-name { font-size: 28px; font-weight: bold; color: #333; margin: 10px 0; }
                  .motto { font-style: italic; color: #666; }
                  .letter-content { padding: 20px 0; }
                  .highlight { background: #f0f7ff; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
                  .signature-section { margin-top: 50px; }
                  .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 14px; color: #666; }
                  .button { display: inline-block; padding: 15px 30px; background: #28a745; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="letterhead">
                    <div class="logo">🎓</div>
                    <div class="school-name">HEAVENLY WISDOM INTERNATIONAL ACADEMY</div>
                    <div class="motto">Knowledge with the Fear of God</div>
                    <p style="margin: 10px 0; font-size: 14px;">
                      Opposite Nikton Junction, Yenagoa, Bayelsa State<br>
                      📧 adorableheavenlywisdom@gmail.com | 📱 +234 806 229 7002
                    </p>
                  </div>

                  <div class="letter-content">
                    <p style="text-align: right;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p style="text-align: right;"><strong>Ref:</strong> ${applicationId}</p>

                    <p><strong>${studentData.guardianName}</strong><br>
                    ${studentData.guardianAddress || ''}</p>

                    <p><strong>Dear ${studentData.guardianName},</strong></p>

                    <h2 style="text-align: center; color: #28a745; margin: 30px 0;">
                      🎉 ADMISSION OFFER LETTER 🎉
                    </h2>

                    <p>We are delighted to inform you that your child/ward, <strong>${studentData.fullName}</strong>, has been offered provisional admission into <strong>${studentData.class}</strong> for the 2025/2026 academic session.</p>

                    <div class="highlight">
                      <h3 style="margin-top: 0; color: #667eea;">Admission Details</h3>
                      <p><strong>Student Name:</strong> ${studentData.fullName}</p>
                      <p><strong>Class Admitted:</strong> ${studentData.class}</p>
                      <p><strong>Application ID:</strong> ${applicationId}</p>
                      <p><strong>Session:</strong> 2025/2026</p>
                      <p><strong>Admission Date:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>

                    <h3>Next Steps to Complete Enrollment:</h3>
                    <ol>
                      <li><strong>Accept Admission:</strong> Confirm your acceptance within 14 days by visiting the school or calling us</li>
                      <li><strong>Pay Acceptance Fee:</strong> ₦20,000 (Non-refundable registration fee)</li>
                      <li><strong>Submit Documents:</strong>
                        <ul>
                          <li>Birth Certificate (Original & 2 photocopies)</li>
                          <li>Previous School Report Card (if applicable)</li>
                          <li>Passport Photographs (4 copies)</li>
                          <li>Medical Report/Immunization Card</li>
                          <li>Parent/Guardian ID Card (Photocopy)</li>
                        </ul>
                      </li>
                      <li><strong>Pay School Fees:</strong> See fee structure on our website or contact the bursar</li>
                      <li><strong>Purchase Uniforms:</strong> Available at the school</li>
                    </ol>

                    <h3>Important Information:</h3>
                    <ul>
                      <li><strong>Resumption Date:</strong> September 9, 2025</li>
                      <li><strong>Orientation:</strong> September 6, 2025 (10:00 AM)</li>
                      <li><strong>School Hours:</strong> 8:00 AM - 3:00 PM (Monday - Friday)</li>
                    </ul>

                    <div class="highlight" style="background: #fff3cd; border-left-color: #ffc107;">
                      <h3 style="margin-top: 0; color: #856404;">Payment Details</h3>
                      <p><strong>Bank:</strong> First City Monument Bank (FCMB)</p>
                      <p><strong>Account Name:</strong> Heavenly Wisdom International Academy</p>
                      <p><strong>Account Number:</strong> 4816576009</p>
                      <p><strong>Payment Reference:</strong> ${studentData.fullName} - ${studentData.class}</p>
                    </div>

                    <p>We are excited to welcome <strong>${studentData.fullName}</strong> into our school family. Our commitment is to provide quality education grounded in moral and spiritual values.</p>

                    <p>Should you have any questions or require further clarification, please do not hesitate to contact us.</p>

                    <div style="text-align: center; margin: 30px 0;">
                      <a href="tel:+2348062297002" class="button">📞 Call Us Now</a>
                    </div>

                    <p>Congratulations once again!</p>

                    <div class="signature-section">
                      <p><strong>Yours faithfully,</strong></p>
                      <p style="margin-top: 40px;">
                        <strong>_______________________</strong><br>
                        <strong>Principal</strong><br>
                        Heavenly Wisdom International Academy
                      </p>
                    </div>
                  </div>

                  <div class="footer">
                    <p><strong>HEAVENLY WISDOM INTERNATIONAL ACADEMY</strong></p>
                    <p>Building Future Leaders with Knowledge and the Fear of God</p>
                    <p>www.heavenlywisdomacademy.com</p>
                  </div>
                </div>
              </body>
              </html>
            `
          };
        } else {
          // REJECTION LETTER
          emailContent = {
            to: studentData.guardianEmail,
            from: {
              email: process.env.SENDGRID_FROM_EMAIL || 'adorableheavenlywisdom@gmail.com',
              name: process.env.SENDGRID_FROM_NAME || 'Heavenly Wisdom Academy'
            },
            subject: `Admission Application Update - ${studentData.fullName}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Georgia', serif; line-height: 1.8; color: #333; }
                  .container { max-width: 700px; margin: 0 auto; padding: 20px; background: white; }
                  .letterhead { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px; }
                  .school-name { font-size: 28px; font-weight: bold; color: #333; margin: 10px 0; }
                  .letter-content { padding: 20px 0; }
                  .highlight { background: #f8f9fa; padding: 20px; border-left: 4px solid #6c757d; margin: 20px 0; }
                  .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 14px; color: #666; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="letterhead">
                    <div class="school-name">HEAVENLY WISDOM INTERNATIONAL ACADEMY</div>
                    <p style="margin: 10px 0; font-size: 14px;">
                      Opposite Nikton Junction, Yenagoa, Bayelsa State<br>
                      📧 adorableheavenlywisdom@gmail.com | 📱 +234 806 229 7002
                    </p>
                  </div>

                  <div class="letter-content">
                    <p style="text-align: right;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p style="text-align: right;"><strong>Ref:</strong> ${applicationId}</p>

                    <p><strong>${studentData.guardianName}</strong></p>

                    <p><strong>Dear ${studentData.guardianName},</strong></p>

                    <h3>RE: ADMISSION APPLICATION FOR ${studentData.fullName.toUpperCase()}</h3>

                    <p>Thank you for your interest in Heavenly Wisdom International Academy and for taking the time to apply for admission.</p>

                    <p>After careful review of your application, we regret to inform you that we are unable to offer admission to <strong>${studentData.fullName}</strong> for the <strong>${studentData.class}</strong> at this time.</p>

                    <div class="highlight">
                      <p>This decision was made due to limited spaces available in the requested class. We received an overwhelming number of applications this year, and unfortunately, we could not accommodate all qualified applicants.</p>
                    </div>

                    <p>We encourage you to:</p>
                    <ul>
                      <li>Apply again for the next academic session</li>
                      <li>Consider applying for a different class level if applicable</li>
                      <li>Contact us for information about our waiting list</li>
                    </ul>

                    <p>We appreciate your understanding and wish <strong>${studentData.fullName}</strong> the very best in their educational journey.</p>

                    <p>If you have any questions, please feel free to contact us.</p>

                    <p style="margin-top: 40px;"><strong>Yours faithfully,</strong></p>
                    <p style="margin-top: 40px;">
                      <strong>Admissions Office</strong><br>
                      Heavenly Wisdom International Academy
                    </p>
                  </div>

                  <div class="footer">
                    <p><strong>HEAVENLY WISDOM INTERNATIONAL ACADEMY</strong></p>
                    <p>Building Future Leaders with Knowledge and the Fear of God</p>
                  </div>
                </div>
              </body>
              </html>
            `
          };
        }

        await sgMail.send(emailContent);
        console.log(`✅ ${isAccepted ? 'Acceptance' : 'Rejection'} letter sent to parent`);
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        return res.status(500).json({
          error: 'Email sending failed',
          message: 'Application was reviewed but email notification failed'
        });
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Application ${isAccepted ? 'accepted' : 'rejected'} successfully`,
      action,
      reviewDate,
      emailSent: !!studentData.guardianEmail
    });

  } catch (error) {
    console.error('Review error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process application review'
    });
  }
};

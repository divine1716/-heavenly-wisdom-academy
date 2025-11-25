// Vercel Serverless Function for Contact Form Submissions
// This handles form submissions and can send emails via SendGrid, Mailgun, etc.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message, formType } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Prepare email content
    const emailContent = {
      to: 'adorableheavenlywisdom@gmail.com',
      from: email,
      subject: `${formType || 'Contact Form'}: ${subject || 'New Inquiry'}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submitted: ${new Date().toLocaleString()}
Form Type: ${formType || 'General Inquiry'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>Submitted: ${new Date().toLocaleString()}</p>
            <p>Form Type: ${formType || 'General Inquiry'}</p>
          </div>
        </div>
      `
    };

    // SendGrid Integration
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'REGENERATE_YOUR_KEY_DONT_USE_THE_OLD_ONE') {
      try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        // Update email content with proper from address
        emailContent.from = process.env.SENDGRID_FROM_EMAIL || 'noreply@heavenlywisdom.sendgrid.net';
        
        await sgMail.send(emailContent);
        console.log('Email sent successfully via SendGrid');
      } catch (emailError) {
        console.error('SendGrid error:', emailError);
        // Continue anyway - don't fail the request
      }
    } else {
      console.log('SendGrid not configured. Email content:', emailContent);
    }

    // Send auto-reply to user
    const autoReply = {
      to: email,
      from: 'adorableheavenlywisdom@gmail.com',
      subject: 'Thank you for contacting Heavenly Wisdom Academy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #667eea;">Heavenly Wisdom International Academy</h1>
          </div>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting us! We have received your message and will respond within 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>If you need immediate assistance, please feel free to call us at:</p>
          <p style="font-size: 18px; color: #667eea;"><strong>+234 806 229 7002</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 5px 0;"><strong>Heavenly Wisdom International Academy</strong></p>
            <p style="margin: 5px 0;">Opposite Nikton Junction, Yenagoa, Bayelsa State</p>
            <p style="margin: 5px 0;">Email: adorableheavenlywisdom@gmail.com</p>
            <p style="margin: 5px 0;">Phone: +234 806 229 7002</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    };

    // Send auto-reply
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'REGENERATE_YOUR_KEY_DONT_USE_THE_OLD_ONE') {
      try {
        autoReply.from = process.env.SENDGRID_FROM_EMAIL || 'noreply@heavenlywisdom.sendgrid.net';
        await sgMail.send(autoReply);
        console.log('Auto-reply sent successfully');
      } catch (replyError) {
        console.error('Auto-reply error:', replyError);
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will respond within 24 hours.',
      data: {
        name,
        email,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to send message',
      message: 'Please try again or contact us directly at adorableheavenlywisdom@gmail.com'
    });
  }
}

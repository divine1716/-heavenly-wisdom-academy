// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Modal functions
function showModal(message) {
  const modal = document.getElementById('successModal');
  const messageElement = document.getElementById('successMessage');
  messageElement.textContent = message;
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('successModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Close modal with X button
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
});

// Email sending function using EmailJS or mailto
function sendEmail(formData, formType) {
  // For now, we'll use mailto as a fallback
  // You can integrate EmailJS, SendGrid, or your backend API here
  
  const schoolEmail = 'adorableheavenlywisdom@gmail.com';
  let subject = '';
  let body = '';
  
  switch(formType) {
    case 'inquiry':
      subject = `Inquiry: ${formData.subject}`;
      body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`;
      break;
      
    case 'tour':
      subject = 'School Tour Request';
      body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nNumber of Visitors: ${formData.visitors}\n\nAdditional Notes:\n${formData.notes || 'None'}`;
      break;
      
    case 'callback':
      subject = 'Callback Request';
      body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\n\nBest Time to Call: ${formData.time}\nReason: ${formData.reason}`;
      break;
  }
  
  // Create mailto link
  const mailtoLink = `mailto:${schoolEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Also save to localStorage for admin to view
  saveInquiry(formData, formType);
  
  return true;
}

// Save inquiry to localStorage
function saveInquiry(formData, formType) {
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  inquiries.push({
    type: formType,
    data: formData,
    timestamp: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem('inquiries', JSON.stringify(inquiries));
}

// Quick Inquiry Form Handler
document.getElementById('quickInquiryForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Sending...';
  
  const formData = {
    name: document.getElementById('inquiryName').value,
    email: document.getElementById('inquiryEmail').value,
    phone: document.getElementById('inquiryPhone').value,
    subject: document.getElementById('inquirySubject').value,
    message: document.getElementById('inquiryMessage').value
  };
  
  // Simulate sending delay
  setTimeout(() => {
    const success = sendEmail(formData, 'inquiry');
    
    if (success) {
      showModal('Thank you for your inquiry! We will respond to your message within 24 hours.');
      this.reset();
    } else {
      alert('There was an error sending your message. Please try again or call us directly.');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 1000);
});

// Tour Request Form Handler
document.getElementById('tourRequestForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Sending...';
  
  const formData = {
    name: document.getElementById('tourName').value,
    email: document.getElementById('tourEmail').value,
    phone: document.getElementById('tourPhone').value,
    date: document.getElementById('tourDate').value,
    time: document.getElementById('tourTime').value,
    visitors: document.getElementById('tourVisitors').value,
    notes: document.getElementById('tourNotes').value
  };
  
  // Validate date is not in the past
  const selectedDate = new Date(formData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    alert('Please select a future date for your tour.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    return;
  }
  
  // Simulate sending delay
  setTimeout(() => {
    const success = sendEmail(formData, 'tour');
    
    if (success) {
      showModal(`Your tour request has been submitted! We will confirm your visit for ${formData.date} at ${formData.time} via email or phone.`);
      this.reset();
    } else {
      alert('There was an error sending your request. Please try again or call us directly.');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 1000);
});

// Callback Request Form Handler
document.getElementById('callbackForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Sending...';
  
  const formData = {
    name: document.getElementById('callbackName').value,
    phone: document.getElementById('callbackPhone').value,
    email: document.getElementById('callbackEmail').value,
    time: document.getElementById('callbackTime').value,
    reason: document.getElementById('callbackReason').value
  };
  
  // Simulate sending delay
  setTimeout(() => {
    const success = sendEmail(formData, 'callback');
    
    if (success) {
      showModal(`Thank you! We will call you back at ${formData.phone} during ${formData.time}.`);
      this.reset();
    } else {
      alert('There was an error sending your request. Please try again or call us directly.');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 1000);
});

// Set minimum date for tour booking (today)
document.addEventListener('DOMContentLoaded', () => {
  const tourDateInput = document.getElementById('tourDate');
  if (tourDateInput) {
    const today = new Date().toISOString().split('T')[0];
    tourDateInput.setAttribute('min', today);
  }
});

// Auto-send confirmation email (simulated)
function sendAutoReply(email, name, type) {
  console.log(`Auto-reply sent to ${email}`);
  // In production, this would be handled by your backend
  // Example: Send via EmailJS, SendGrid, or your server
}

console.log('Contact form system loaded successfully!');

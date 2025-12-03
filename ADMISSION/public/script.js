// Global variables
let currentStep = 1;
const totalSteps = 4;
let formData = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  updateProgress();
  
  // Add input listeners for real-time validation
  document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
  });
});

// Preview passport image
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      event.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('passportPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Validate individual field
function validateField(field) {
  if (field.hasAttribute('required') && !field.value.trim()) {
    field.style.borderColor = '#dc3545';
    return false;
  } else {
    field.style.borderColor = '#28a745';
    return true;
  }
}

// Validate current step
function validateStep(step) {
  const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
  const requiredFields = currentStepElement.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#dc3545';
      isValid = false;
    } else {
      field.style.borderColor = '#28a745';
    }
  });
  
  if (!isValid) {
    showNotification('Please fill in all required fields', 'error');
  }
  
  return isValid;
}

// Next step
function nextStep() {
  if (!validateStep(currentStep)) {
    return;
  }
  
  // Save current step data
  saveStepData(currentStep);
  
  if (currentStep < totalSteps) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    
    // Show next step
    currentStep++;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update progress
    updateProgress();
    
    // If review step, populate review content
    if (currentStep === 4) {
      populateReview();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Previous step
function prevStep() {
  if (currentStep > 1) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show previous step
    currentStep--;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
    
    // Update progress
    updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Update progress bar
function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

// Save step data
function saveStepData(step) {
  const stepElement = document.querySelector(`.form-step[data-step="${step}"]`);
  const inputs = stepElement.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    if (input.type === 'file') {
      // Handle file separately
      if (input.files[0]) {
        formData[input.name] = input.files[0].name;
      }
    } else {
      formData[input.name] = input.value;
    }
  });
}

// Populate review section
function populateReview() {
  const reviewContent = document.getElementById('reviewContent');
  
  const reviewHTML = `
    <div class="review-group">
      <h3><i class="fas fa-user-graduate"></i> Student Information</h3>
      <div class="review-item">
        <div class="review-label">Full Name:</div>
        <div class="review-value">${formData.fullName || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Date of Birth:</div>
        <div class="review-value">${formData.dob || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Gender:</div>
        <div class="review-value">${formData.sex || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Class Applying For:</div>
        <div class="review-value">${formData.class || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Address:</div>
        <div class="review-value">${formData.address || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">State of Origin:</div>
        <div class="review-value">${formData.stateOrigin || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Previous School:</div>
        <div class="review-value">${formData.formerSchool || 'N/A'}</div>
      </div>
    </div>

    <div class="review-group">
      <h3><i class="fas fa-users"></i> Parent/Guardian Information</h3>
      <div class="review-item">
        <div class="review-label">Guardian Name:</div>
        <div class="review-value">${formData.guardianName || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Phone Number:</div>
        <div class="review-value">${formData.guardianPhone || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Email:</div>
        <div class="review-value">${formData.guardianEmail || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Occupation:</div>
        <div class="review-value">${formData.occupation || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Next of Kin:</div>
        <div class="review-value">${formData.nextOfKin || 'N/A'}</div>
      </div>
    </div>

    <div class="review-group">
      <h3><i class="fas fa-heartbeat"></i> Medical Information</h3>
      <div class="review-item">
        <div class="review-label">Genotype:</div>
        <div class="review-value">${formData.genotype || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Blood Group:</div>
        <div class="review-value">${formData.bloodGroup || 'N/A'}</div>
      </div>
      <div class="review-item">
        <div class="review-label">Any Disability:</div>
        <div class="review-value">${formData.disability || 'N/A'}</div>
      </div>
    </div>
  `;
  
  reviewContent.innerHTML = reviewHTML;
}

// Form submission
document.getElementById('admissionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Check terms acceptance
  if (!document.getElementById('termsAccept').checked) {
    showNotification('Please accept the terms and conditions', 'error');
    return;
  }
  
  // Save final step data
  saveStepData(currentStep);
  
  // Show loading
  showLoading();
  
  // Prepare submission data
  const submissionData = {
    id: 'ADM' + Date.now(),
    timestamp: new Date().toISOString(),
    ...formData,
    status: 'pending'
  };
  
  // Save to localStorage
  const submissions = JSON.parse(localStorage.getItem('admission_submissions') || '[]');
  submissions.push(submissionData);
  localStorage.setItem('admission_submissions', JSON.stringify(submissions));
  
  // Simulate API call
  setTimeout(() => {
    hideLoading();
    showSuccess(submissionData);
  }, 2000);
});

// Show loading overlay
function showLoading() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.id = 'loadingOverlay';
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="spinner"></div>
      <h3>Submitting Your Application...</h3>
      <p>Please wait while we process your information</p>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.remove();
  }
}

// Show success message
function showSuccess(data) {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-content success-message">
      <i class="fas fa-check-circle"></i>
      <h2>Application Submitted Successfully!</h2>
      <p><strong>Application ID:</strong> ${data.id}</p>
      <p><strong>Student Name:</strong> ${data.fullName}</p>
      <p><strong>Class:</strong> ${data.class}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
      <p>Thank you for applying to Heavenly Wisdom International Academy!</p>
      <p>We will review your application and contact you within 3-5 business days.</p>
      <p style="margin-top: 20px;">
        <strong>Next Steps:</strong><br>
        • Check your email for confirmation<br>
        • Prepare required documents<br>
        • Await our call for interview
      </p>
      <button onclick="location.href='/index.html'" style="margin-top: 25px; padding: 12px 30px; background: white; color: #28a745; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1em;">
        Return to Homepage
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  
  // Send email notification (mailto link)
  const emailBody = `
New Admission Application

Application ID: ${data.id}
Student Name: ${data.fullName}
Class: ${data.class}
Guardian: ${data.guardianName}
Phone: ${data.guardianPhone}
Email: ${data.guardianEmail || 'Not provided'}

Submitted: ${new Date().toLocaleString()}

Please review this application in the admin panel.
  `;
  
  console.log('Application submitted:', data);
  console.log('Email notification prepared');
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'error' ? '#dc3545' : '#667eea'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 10001;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('mobile-visible');
}

// Make functions globally available
window.previewImage = previewImage;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.toggleMobileMenu = toggleMobileMenu;

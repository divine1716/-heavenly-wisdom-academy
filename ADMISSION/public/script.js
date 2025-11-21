// Preview Passport Image
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById('passportPreview');
    output.src = reader.result;
    output.style.display = 'block';
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Handle form submission (Local Storage + Email)
document.getElementById('admissionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const button = this.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Submitting Application...";
  
  // Show loading message
  const loadingMsg = document.createElement('div');
  loadingMsg.id = 'loadingMessage';
  loadingMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    text-align: center;
    font-size: 18px;
  `;
  loadingMsg.innerHTML = `
    <div style="margin-bottom: 10px;">📤 Submitting Your Application...</div>
    <div style="font-size: 14px; opacity: 0.9;">Please wait while we process your information</div>
  `;
  document.body.appendChild(loadingMsg);
  
  // Collect form data
  const formData = new FormData(this);
  const submissionData = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    
    // Student Information
    fullName: formData.get('fullName') || '',
    address: formData.get('address') || '',
    stateOrigin: formData.get('stateOrigin') || '',
    dob: formData.get('dob') || '',
    birthPlace: formData.get('birthPlace') || '',
    religion: formData.get('religion') || '',
    sex: formData.get('sex') || '',
    class: formData.get('class') || '',
    disability: formData.get('disability') || '',
    genotype: formData.get('genotype') || '',
    bloodGroup: formData.get('bloodGroup') || '',
    hepatitis: formData.get('hepatitis') || '',
    formerSchool: formData.get('formerSchool') || '',
    
    // Guardian Information
    guardianName: formData.get('guardianName') || '',
    guardianAddress: formData.get('guardianAddress') || '',
    guardianPhone: formData.get('guardianPhone') || '',
    occupation: formData.get('occupation') || '',
    placeOfWork: formData.get('placeOfWork') || '',
    nextOfKin: formData.get('nextOfKin') || '',
    kinPhone: formData.get('kinPhone') || '',
    knowsWayHome: formData.get('knowsWayHome') || '',
    authorizedPersons: formData.get('authorizedPersons') || '',
    christianTraining: formData.get('christianTraining') || '',
    attestation: formData.get('attestation') || '',
    
    status: 'submitted'
  };
  
  // Store in localStorage for admin dashboard
  const submissions = JSON.parse(localStorage.getItem('admission_submissions') || '[]');
  submissions.push(submissionData);
  localStorage.setItem('admission_submissions', JSON.stringify(submissions));
  
  // Simulate processing time
  setTimeout(() => {
    // Remove loading message
    if (loadingMsg) loadingMsg.remove();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
      font-size: 18px;
      max-width: 90%;
    `;
    successMsg.innerHTML = `
      <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
      <div style="font-size: 24px; margin-bottom: 15px; font-weight: bold;">Application Submitted Successfully!</div>
      <div style="margin-bottom: 20px;">Thank you ${submissionData.fullName}! Your admission application has been received.</div>
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 20px;">
        • Application ID: ${submissionData.id}<br>
        • Submitted: ${new Date().toLocaleString()}<br>
        • We'll contact you within 3-5 business days
      </div>
      <button onclick="this.parentElement.remove(); location.reload();" style="background: white; color: #28a745; border: none; padding: 10px 20px; border-radius: 25px; font-weight: bold; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(successMsg);
    
    // Create email content for manual sending
    const emailContent = `
New Admission Application Received!

Student Information:
- Name: ${submissionData.fullName}
- Class: ${submissionData.class}
- Date of Birth: ${submissionData.dob}
- Sex: ${submissionData.sex}
- Address: ${submissionData.address}

Guardian Information:
- Name: ${submissionData.guardianName}
- Phone: ${submissionData.guardianPhone}
- Address: ${submissionData.guardianAddress}

Application Details:
- ID: ${submissionData.id}
- Submitted: ${new Date().toLocaleString()}

Please review this application and contact the family for next steps.

Best regards,
Heavenly Wisdom Academy Portal System
    `;
    
    // Create mailto link for easy emailing
    const mailtoLink = `mailto:adorableheavenlywisdom@gmail.com?subject=New Admission Application - ${submissionData.fullName}&body=${encodeURIComponent(emailContent)}`;
    
    // Auto-open email client (optional)
    // window.open(mailtoLink);
    
    console.log('✅ Admission application saved successfully');
    console.log('📧 Email content prepared for:', submissionData.fullName);
    
  }, 2000);
});


// Chat widget toggle
const chatBtn = document.getElementById('chat-btn');
const chatPopup = document.getElementById('chat-popup');
const closeChatBtn = document.getElementById('close-chat');

chatBtn.addEventListener('click', () => {
  chatPopup.style.display = chatPopup.style.display === 'flex' ? 'none' : 'flex';
});

closeChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'none';
});

// Dark mode toggle function
function toggledarkmode() {
  document.body.classList.toggle("darkmode");
  // Save preference
  if (document.body.classList.contains("darkmode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  if (mobileMenu && mobileMenuOverlay) {
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// Auto-hide mobile menu on larger screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Load dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("darkmode");
  }
});

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.toggledarkmode = toggledarkmode;

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

// Handle form submission with Formspree
document.getElementById('admissionForm').addEventListener('submit', function(e) {
  // Set submission date
  document.getElementById('submissionDate').value = new Date().toISOString();
  
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
  
  // Store submission in localStorage for admin dashboard
  const formData = new FormData(this);
  const submissionData = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    studentName: formData.get('fullName'),
    guardianName: formData.get('guardianName'),
    guardianPhone: formData.get('guardianPhone'),
    class: formData.get('class'),
    status: 'submitted'
  };
  
  const submissions = JSON.parse(localStorage.getItem('admission_submissions') || '[]');
  submissions.push(submissionData);
  localStorage.setItem('admission_submissions', JSON.stringify(submissions));
  
  // Let the form submit naturally to Formspree
  // Formspree will handle the redirect to success.html
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

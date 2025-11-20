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

// Handle form submission
document.getElementById('admissionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Attach passport image
  const passportFile = document.getElementById('passportUpload').files[0];
  if (passportFile) {
    formData.append('passport', passportFile);
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Submitting...";

  try {
    const response = await fetch('/submit-admission', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert("Admission form submitted successfully.");
      form.reset();
      document.getElementById('passportPreview').src = '';
    } else {
      alert("Submission failed: " + result.error);
    }
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    button.disabled = false;
    button.textContent = "Submit Form";
  }
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

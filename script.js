window.onload = function() {
      alert("welcome to heavenly wisdom intl academy!");
};

function toggledarkmode() {
      document.body.classList.toggle("darkmode");
      // Save preference
      if (document.body.classList.contains("darkmode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
}

// Load dark mode preference on page load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("darkmode");
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggleBtn.addEventListener('click', () => {
    navLinks.style.display =
      navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let idx = 0;
  const total = slides.length;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    idx = (idx + 1) % total;
    showSlide(idx);
  }

  function prevSlide() {
    idx = (idx - 1 + total) % total;
    showSlide(idx);
  }

  // Arrow button events
  nextBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Start autoplay
  slideInterval = setInterval(nextSlide, 5000);
});


  document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', () => {
      alert('You clicked a social media icon!');
    });
  });

  const chatBtn = document.getElementById('chat-btn');
  const chatPopup = document.getElementById('chat-popup');
  const closeChat = document.getElementById('close-chat');

  chatBtn.addEventListener('click', () => {
    chatPopup.style.display = (chatPopup.style.display === 'none' || chatPopup.style.display === '') 
      ? 'flex' 
      : 'none';
  });

  closeChat.addEventListener('click', () => {
    chatPopup.style.display = 'none';
  });

  // Optional: Auto-hide message after few seconds
  setTimeout(() => {
    const msg = document.getElementById('chat-message');
    if (msg) msg.style.display = 'none';
    }, 5000);

// Mobile menu toggle - Working version
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const toggleBtn = document.getElementById('mobileToggle');
  
  console.log('Toggle clicked!');
  
  // Toggle visibility
  if (navLinks.style.display === 'block') {
    // Close menu
    navLinks.style.display = 'none';
    toggleBtn.innerHTML = '☰';
    console.log('Menu CLOSED');
  } else {
    // Open menu
    navLinks.style.display = 'block';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '120px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'linear-gradient(135deg, rgba(124, 106, 239, 0.98) 0%, rgba(20, 184, 166, 0.98) 100%)';
    navLinks.style.zIndex = '1000';
    navLinks.style.padding = '20px 0';
    navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    navLinks.style.borderRadius = '0 0 15px 15px';
    toggleBtn.innerHTML = '✕';
    console.log('Menu OPENED');
  }
}

// Auto-hide mobile menu on larger screens and ensure proper setup
window.addEventListener('resize', () => {
  const navLinks = document.getElementById('navLinks');
  const toggleBtn = document.getElementById('mobileToggle');
  
  if (window.innerWidth > 768) {
    // Desktop view - reset styles
    navLinks.style.display = 'flex';
    navLinks.style.position = 'static';
    navLinks.style.background = 'none';
    navLinks.style.boxShadow = 'none';
    navLinks.style.padding = '0';
    if (toggleBtn) toggleBtn.innerHTML = '☰';
  } else {
    // Mobile view - hide menu by default
    navLinks.style.display = 'none';
    if (toggleBtn) toggleBtn.innerHTML = '☰';
  }
});

// Setup on page load
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const toggleBtn = document.getElementById('mobileToggle');
  
  // Set initial state based on screen size
  if (window.innerWidth <= 768) {
    navLinks.style.display = 'none';
    if (toggleBtn) toggleBtn.innerHTML = '☰';
  }
  
  // Close menu when clicking on nav links (mobile)
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        if (toggleBtn) toggleBtn.innerHTML = '☰';
      }
    });
  });
});

// Hom
epage Contact Form Handler
document.getElementById('homeContactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.contact-submit-btn');
  const originalText = submitBtn.innerHTML;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  const formData = {
    name: document.getElementById('homeName').value,
    email: document.getElementById('homeEmail').value,
    phone: document.getElementById('homePhone').value,
    subject: document.getElementById('homeSubject').value,
    message: document.getElementById('homeMessage').value
  };
  
  // Create email
  const schoolEmail = 'adorableheavenlywisdom@gmail.com';
  const subject = `Website Inquiry: ${formData.subject}`;
  const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`;
  
  // Save to localStorage
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  inquiries.push({
    type: 'homepage_inquiry',
    data: formData,
    timestamp: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem('inquiries', JSON.stringify(inquiries));
  
  // Simulate sending delay
  setTimeout(() => {
    // Open email client
    const mailtoLink = `mailto:${schoolEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Show success message
    alert('✅ Thank you for contacting us! Your message has been sent. We will respond within 24 hours.');
    
    // Reset form
    this.reset();
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 1000);
});

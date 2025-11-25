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

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks.classList.contains('mobile-hidden')) {
    navLinks.classList.remove('mobile-hidden');
    navLinks.classList.add('mobile-visible');
  } else {
    navLinks.classList.add('mobile-hidden');
    navLinks.classList.remove('mobile-visible');
  }
}

// Auto-hide mobile menu on larger screens
window.addEventListener('resize', () => {
  const navLinks = document.getElementById('navLinks');
  if (window.innerWidth > 768) {
    navLinks.classList.remove('mobile-hidden', 'mobile-visible');
  }
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

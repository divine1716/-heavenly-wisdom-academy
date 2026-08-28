// Removed alert to prevent blocking page load
window.onload = function() {
      console.log("Welcome to Heavenly Wisdom International Academy!");
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

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.style.display =
      navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});

// Keep the main navigation focused, while retaining secondary pages under More.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  const links = document.querySelector('#navLinks');
  if (!nav || !links || links.dataset.organized) return;
  links.dataset.organized = 'true';

  const primaryPages = new Set(['index.html', 'ADMISSION/public/index.html', 'FEES/index.html', 'PORTAL/student-login.html', 'ABOUT US/index.html', 'GALLERY/index.html']);
  const secondaryItems = [...links.children].filter((item) => !primaryPages.has(item.querySelector('a')?.getAttribute('href')));
  if (secondaryItems.length) {
    const more = document.createElement('li');
    more.className = 'more-menu';
    more.innerHTML = '<button class="more-toggle" type="button" aria-expanded="false">More <span aria-hidden="true">⌄</span></button><div class="more-dropdown"></div>';
    const button = more.querySelector('button');
    const dropdown = more.querySelector('.more-dropdown');
    secondaryItems.forEach((item) => dropdown.appendChild(item.querySelector('a')));
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = more.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', () => { more.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); });
    links.appendChild(more);
  }

  const themeButton = nav.querySelector('button[onclick="toggledarkmode()"]');
  if (themeButton) {
    themeButton.classList.add('nav-theme-toggle');
    themeButton.setAttribute('aria-label', 'Toggle dark mode');
    themeButton.title = 'Toggle dark mode';
  }
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

// Simple mobile menu functions
function closeMobileMenu() {
  const menu = document.getElementById('mobileNav');
  const btn = document.getElementById('mobileMenuBtn');
  if (menu && btn) {
    menu.style.display = 'none';
    btn.innerHTML = '☰';
    btn.setAttribute('aria-expanded', 'false');
  }
}

// Keyboard navigation support
function setupKeyboardNavigation() {
  // Handle keyboard navigation for mobile menu button
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  }

  // Handle keyboard navigation for navigation links
  const navLinks = document.querySelectorAll('#navLinks a, #mobileNav a');
  navLinks.forEach((link, index) => {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % navLinks.length;
        navLinks[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndex].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMobileMenu();
        if (mobileMenuBtn) mobileMenuBtn.focus();
      }
    });
  });

  // Handle keyboard navigation for social media links
  const socialLinks = document.querySelectorAll('.top-social-icons a');
  socialLinks.forEach((link, index) => {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % socialLinks.length;
        socialLinks[nextIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + socialLinks.length) % socialLinks.length;
        socialLinks[prevIndex].focus();
      }
    });
  });
}

// Close mobile menu when clicking on links
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavLinks = document.querySelectorAll('#mobileNav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobileNav');
    const btn = document.getElementById('mobileMenuBtn');
    
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Initialize keyboard navigation
  setupKeyboardNavigation();
});

// Auto-hide mobile menu on larger screens and ensure proper setup
window.addEventListener('resize', () => {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (window.innerWidth > 768) {
    // Desktop view - show desktop navigation
    if (navLinks) {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'static';
      navLinks.style.background = 'none';
      navLinks.style.boxShadow = 'none';
      navLinks.style.padding = '0';
    }
    // Hide mobile menu and reset button
    if (mobileNav) mobileNav.style.display = 'none';
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  } else {
    // Mobile view - hide desktop navigation, ensure mobile menu is ready
    if (navLinks) {
      navLinks.style.display = 'none';
    }
    if (mobileNav) mobileNav.style.display = 'none';
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Setup on page load
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  // Set initial state based on screen size
  if (window.innerWidth > 768) {
    // Desktop - show desktop navigation
    if (navLinks) navLinks.style.display = 'flex';
    if (mobileNav) mobileNav.style.display = 'none';
  } else {
    // Mobile - hide desktop navigation
    if (navLinks) navLinks.style.display = 'none';
    if (mobileNav) mobileNav.style.display = 'none';
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
  
  // Close mobile menu when clicking on nav links
  if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mobileNav.style.display = 'none';
          if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }
});

// Homepage Contact Form Handler
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

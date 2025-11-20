const images = document.querySelectorAll('.gallery img');

images.forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});
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

// Dark mode toggle
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
}//
 Mobile menu toggle
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

// Dark mode toggle
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
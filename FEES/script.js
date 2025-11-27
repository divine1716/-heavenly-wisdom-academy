// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const feeSections = document.querySelectorAll('.fee-section');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs and sections
      tabBtns.forEach(b => b.classList.remove('active'));
      feeSections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked tab
      btn.classList.add('active');
      
      // Show corresponding section
      const tabId = btn.dataset.tab;
      document.getElementById(tabId).classList.add('active');
      
      // Smooth scroll to section
      document.getElementById(tabId).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});

// Make function globally available
window.toggleMobileMenu = toggleMobileMenu;

console.log('Fee Structure page loaded successfully!');

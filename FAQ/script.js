// Toggle FAQ Answer
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Toggle current FAQ
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Filter by Category
function filterCategory(category) {
  const items = document.querySelectorAll('.faq-item');
  const buttons = document.querySelectorAll('.category-btn');
  
  // Update active button
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter items
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
      item.classList.remove('active');
    }
  });
}

// Search FAQ
function searchFAQ() {
  const searchTerm = document.getElementById('faqSearch').value.toLowerCase();
  const items = document.querySelectorAll('.faq-item');
  
  items.forEach(item => {
    const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
      item.classList.remove('active');
    }
  });
  
  // Reset category filter when searching
  if (searchTerm) {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('mobile-visible');
  navLinks.classList.toggle('mobile-hidden');
}

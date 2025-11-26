// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// News data (you can move this to a separate file or database later)
const newsData = [
  {
    id: 1,
    title: "2025/2026 Academic Session Admission Now Open!",
    excerpt: "We are excited to announce that applications for the 2025/2026 academic session are now being accepted. Limited slots available!",
    category: "announcement",
    date: "2025-11-25",
    image: "../images/HEAVENLY.jpg"
  },
  {
    id: 2,
    title: "First Term Examination Schedule Released",
    excerpt: "The examination timetable for first term has been published. Students are advised to prepare adequately. Exams begin January 10, 2026.",
    category: "academic",
    date: "2025-11-24",
    image: "../images/wonderful.jpg"
  },
  {
    id: 3,
    title: "Our Students Excel in Inter-School Competition",
    excerpt: "Heavenly Wisdom Academy students won 5 gold medals and 3 silver medals at the State-level Mathematics and Science competition.",
    category: "achievement",
    date: "2025-11-20",
    image: "../images/success.jpg"
  },
  {
    id: 4,
    title: "Annual Inter-House Sports Coming Up!",
    excerpt: "Mark your calendars! Our annual inter-house sports competition will hold on February 5, 2026. All parents are invited to attend.",
    category: "event",
    date: "2025-11-18",
    image: "../images/great.jpg"
  },
  {
    id: 5,
    title: "New Computer Laboratory Inaugurated",
    excerpt: "We are pleased to announce the opening of our state-of-the-art computer laboratory with 40 modern computers for student use.",
    category: "announcement",
    date: "2025-11-15",
    image: "../images/NICE.jpg"
  },
  {
    id: 6,
    title: "Parent-Teacher Association Meeting",
    excerpt: "The PTA meeting for this term will hold on January 20, 2026 at 10:00 AM. All parents are encouraged to attend.",
    category: "event",
    date: "2025-11-12",
    image: "../images/love.jpg"
  },
  {
    id: 7,
    title: "Students Participate in Community Service",
    excerpt: "Our JSS and SS students engaged in a community clean-up exercise, demonstrating civic responsibility and environmental awareness.",
    category: "achievement",
    date: "2025-11-10",
    image: "../images/DIVINE.jpg"
  },
  {
    id: 8,
    title: "Second Term Resumption Date Announced",
    excerpt: "Second term will commence on January 15, 2026. Students are expected to resume with all necessary materials and fees paid.",
    category: "academic",
    date: "2025-11-08",
    image: "../images/ADURA.jpg"
  },
  {
    id: 9,
    title: "Christmas Carol Service - A Huge Success!",
    excerpt: "Our annual Christmas carol service was a beautiful celebration of the season. Thank you to all students, parents, and staff who participated.",
    category: "event",
    date: "2025-11-05",
    image: "../images/wonderful.jpg"
  }
];

// Current filter and pagination
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 6;

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get category icon
function getCategoryIcon(category) {
  const icons = {
    announcement: '📢',
    event: '🎉',
    achievement: '🏆',
    academic: '📚'
  };
  return icons[category] || '📰';
}

// Filter news
function filterNews(category) {
  currentFilter = category;
  currentPage = 1;
  renderNews();
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    }
  });
}

// Get filtered news
function getFilteredNews() {
  if (currentFilter === 'all') {
    return newsData;
  }
  return newsData.filter(news => news.category === currentFilter);
}

// Render news cards
function renderNews() {
  const filteredNews = getFilteredNews();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  const newsGrid = document.getElementById('newsGrid');
  
  if (paginatedNews.length === 0) {
    newsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
        <h3>No news found in this category</h3>
        <p>Check back later for updates!</p>
      </div>
    `;
    return;
  }
  
  newsGrid.innerHTML = paginatedNews.map(news => `
    <div class="news-card" onclick="viewNews(${news.id})">
      <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.src='../images/HEAVENLY.jpg'">
      <div class="news-content">
        <div class="news-meta">
          <span class="news-category category-${news.category}">
            ${getCategoryIcon(news.category)} ${news.category}
          </span>
          <span class="news-date">${formatDate(news.date)}</span>
        </div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <a href="#" class="read-more" onclick="event.stopPropagation(); viewNews(${news.id})">
          Read More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');
  
  renderPagination(filteredNews.length);
}

// Render pagination
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById('pagination');
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let paginationHTML = '';
  
  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})">← Previous</button>`;
  }
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<span style="padding: 10px;">...</span>`;
    }
  }
  
  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})">Next →</button>`;
  }
  
  pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
  currentPage = page;
  renderNews();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// View full news (you can create a detail page later)
function viewNews(id) {
  const news = newsData.find(n => n.id === id);
  if (news) {
    alert(`Full article coming soon!\n\n${news.title}\n\n${news.excerpt}\n\nDate: ${formatDate(news.date)}`);
    // Later you can redirect to: window.location.href = `news-detail.html?id=${id}`;
  }
}

// Initialize filter buttons
document.addEventListener('DOMContentLoaded', () => {
  // Add click events to filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterNews(btn.dataset.filter);
    });
  });
  
  // Initial render
  renderNews();
});

// Make functions globally available
window.filterNews = filterNews;
window.changePage = changePage;
window.viewNews = viewNews;
window.toggleMobileMenu = toggleMobileMenu;

console.log('News & Announcements system loaded successfully!');

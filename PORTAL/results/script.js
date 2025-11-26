import { students, studentPasswords, studentDepartments } from "./student.js";

// Check if user is logged in
const portalUser = sessionStorage.getItem("portal_user");
if (!portalUser) {
  alert("⚠️ Please login to the portal to access student results.");
  window.location.href = "../index.html";
}

// Display logged-in student info
try {
  const userData = JSON.parse(portalUser);
  const loggedInElement = document.getElementById("loggedInStudent");
  if (loggedInElement && userData.name) {
    loggedInElement.innerHTML = `👋 Logged in as: <strong>${userData.name}</strong> ${userData.class ? `(${userData.class})` : ''}`;
  }
} catch (error) {
  console.error("Error parsing user data:", error);
}

const dropdownLinks = document.querySelectorAll(".dropdown-content a");
const studentList = document.getElementById("studentList");
const dropbtn = document.querySelector(".dropbtn");

// When a class is selected
dropdownLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const className = link.getAttribute("data-class");
    const names = students[className];

    dropbtn.textContent = link.textContent;

    if (names && names.length > 0) {
      studentList.innerHTML = `
        <h2>${link.textContent} - Student List</h2>
        <ul>
          ${names.map(n => `
            <li>
              <a href="#" class="student-link" data-name="${n}" data-class="${className}">
                ${n}
              </a>
            </li>
          `).join("")}
        </ul>
      `;

      // Add click event to each student link
      document.querySelectorAll('.student-link').forEach(studentLink => {
        studentLink.addEventListener('click', (e) => {
          e.preventDefault();
          const studentName = studentLink.getAttribute('data-name');
          const studentClass = studentLink.getAttribute('data-class');
          
          // Check if student has a password
          if (studentPasswords[studentName]) {
            // Prompt for password
            const enteredPassword = prompt(`Enter password for ${studentName}:`);
            
            if (enteredPassword === studentPasswords[studentName]) {
              // Correct password - check if student has department info
              const department = studentDepartments[studentName] || '';
              const url = department 
                ? `result.html?name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}&department=${department}`
                : `result.html?name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}`;
              window.location.href = url;
            } else if (enteredPassword !== null) {
              // Wrong password (null means user clicked cancel)
              alert('Incorrect password! Please contact the school administrator.');
            }
          } else {
            // No password set - show message
            alert('No result available for this student yet.');
          }
        });
      });
    } else {
      studentList.innerHTML = `<p>No students found for this class.</p>`;
    }
  });
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

// Load dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("darkmode");
  }
});

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

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.toggledarkmode = toggledarkmode;
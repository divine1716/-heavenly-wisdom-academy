import { students, studentPasswords } from "./student.js";

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
              // Correct password - redirect to result page
              window.location.href = `result.html?name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}`;
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
// Show correct section on Dashboard
document.addEventListener("DOMContentLoaded", async () => {
  // Check for session storage (new password-based system)
  const portalUser = sessionStorage.getItem("portal_user");
  
  if (portalUser) {
    // New system - use session storage
    const userData = JSON.parse(portalUser);
    
    // Use actual student name if available, otherwise use role-based name
    const user = {
      name: userData.name || (userData.role.charAt(0).toUpperCase() + userData.role.slice(1) + " User"),
      fullName: userData.name || (userData.role.charAt(0).toUpperCase() + userData.role.slice(1) + " User"),
      email: userData.email || (userData.role + "@heavenlywisdom.edu"),
      role: userData.role,
      class: userData.class || "",
      studentId: userData.studentId || ""
    };
    const role = userData.role;

    // Update user info display
    if (document.getElementById("userEmail")) {
      document.getElementById("userEmail").innerText = user.email;
    }
    if (document.getElementById("userRole")) {
      document.getElementById("userRole").innerText = role.charAt(0).toUpperCase() + role.slice(1);
    }
    if (document.getElementById("sidebarUserName")) {
      document.getElementById("sidebarUserName").innerText = user.fullName || user.name;
    }
    if (document.getElementById("sidebarUserRole")) {
      document.getElementById("sidebarUserRole").innerText = role.charAt(0).toUpperCase() + role.slice(1);
    }
    
    // Show student-specific info if student
    if (role === "student" && user.class) {
      const classInfo = document.getElementById("studentClassInfo");
      const idInfo = document.getElementById("studentIdInfo");
      if (classInfo) {
        classInfo.style.display = "block";
        document.getElementById("userClass").innerText = user.class;
      }
      if (idInfo && user.studentId) {
        idInfo.style.display = "block";
        document.getElementById("userStudentId").innerText = user.studentId;
      }
    }

    // Hide all role sections
    document.querySelectorAll(".role-section").forEach(section => {
      section.style.display = "none";
    });

    // Show section based on role and display user name
    if (role === "student") {
      document.getElementById("studentSection").style.display = "block";
      document.getElementById("welcomeText").innerText = `Welcome, ${user.fullName || user.name} 🎓`;
      // For students, results link goes directly to their result
      const resultsLink = document.getElementById("resultsLink");
      if (resultsLink) {
        resultsLink.onclick = function(e) {
          e.preventDefault();
          viewMyResult();
        };
      }
    } else if (role === "parent") {
      document.getElementById("parentSection").style.display = "block";
      document.getElementById("welcomeText").innerText = `Welcome, ${user.fullName || user.name} 👪`;
      // For non-students, results link goes to student list
      const resultsLink = document.getElementById("resultsLink");
      if (resultsLink) {
        resultsLink.href = "results/index.html";
        resultsLink.onclick = null;
      }
    } else if (role === "teacher" || role === "staff") {
      document.getElementById("teacherSection").style.display = "block";
      document.getElementById("welcomeText").innerText = `Welcome, ${user.fullName || user.name} 📘`;
      // For non-students, results link goes to student list
      const resultsLink = document.getElementById("resultsLink");
      if (resultsLink) {
        resultsLink.href = "results/index.html";
        resultsLink.onclick = null;
      }
    } else if (role === "admin") {
      document.getElementById("adminSection").style.display = "block";
      document.getElementById("welcomeText").innerText = `Welcome, ${user.fullName || user.name} ⚙️`;
      // Load user count for admin
      loadUserCount();
      // For non-students, results link goes to student list
      const resultsLink = document.getElementById("resultsLink");
      if (resultsLink) {
        resultsLink.href = "results/index.html";
        resultsLink.onclick = null;
      }
    }

  } else {
    // No session found - redirect to login
    alert("Please sign in to access the dashboard.");
    window.location.href = "index.html";
    return;
  }
});

// Admin function to load user count
async function loadUserCount() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch('/api/user/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("totalUsers").innerText = data.users.length;
    }
  } catch (error) {
    console.error('Error loading user count:', error);
    document.getElementById("totalUsers").innerText = "N/A";
  }
}

// Admin function to view all users
async function viewAllUsers() {
  const userListSection = document.getElementById("userListSection");
  const userListContainer = document.getElementById("userListContainer");
  
  userListSection.style.display = "block";
  userListContainer.innerHTML = "Loading users...";

  try {
    const token = localStorage.getItem("token");
    const response = await fetch('/api/user/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const users = data.users;

      if (users.length === 0) {
        userListContainer.innerHTML = "<p>No users found.</p>";
        return;
      }

      let html = '<table style="width: 100%; border-collapse: collapse;">';
      html += '<tr style="background: #4a1dbd; color: white;"><th style="padding: 10px; border: 1px solid #ddd;">Name</th><th style="padding: 10px; border: 1px solid #ddd;">Email</th><th style="padding: 10px; border: 1px solid #ddd;">Role</th></tr>';
      
      users.forEach(user => {
        html += `<tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${user.name}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${user.email}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${user.role}</td>
        </tr>`;
      });
      
      html += '</table>';
      userListContainer.innerHTML = html;
    } else {
      userListContainer.innerHTML = "<p>Failed to load users. You may not have permission.</p>";
    }
  } catch (error) {
    console.error('Error loading users:', error);
    userListContainer.innerHTML = "<p>Error loading users.</p>";
  }
}

// Hide user list
function hideUserList() {
  document.getElementById("userListSection").style.display = "none";
}

// Logout
async function logout() {
  const confirmed = confirm('Are you sure you want to logout?');
  
  if (confirmed) {
    // Clear session storage (new system)
    sessionStorage.removeItem("portal_user");
    
    // Clear local storage (old system - for compatibility)
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");
    
    // Show success message
    alert('You have been logged out successfully!');
    
    // Redirect immediately
    window.location.href = "index.html";
  }
}


// Mobile Sidebar Toggle Function
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// Close sidebar when clicking on a link (mobile)
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        toggleMobileMenu();
      }
    });
  });

  // Close sidebar on window resize if switching to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Function to view student's own result directly
function viewMyResult() {
  const portalUser = sessionStorage.getItem("portal_user");
  
  if (!portalUser) {
    alert("⚠️ Please login to view your result");
    window.location.href = "index.html";
    return;
  }
  
  const userData = JSON.parse(portalUser);
  
  // Check if user is a student
  if (userData.role !== "student") {
    alert("This feature is only available for students");
    return;
  }
  
  // Get student name and class
  const studentName = userData.name;
  const studentClass = userData.class;
  
  if (!studentName) {
    alert("⚠️ Student name not found. Please login again.");
    return;
  }
  
  // Show loading message
  const loadingMsg = document.createElement('div');
  loadingMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    text-align: center;
    font-size: 18px;
  `;
  loadingMsg.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 15px;">📊</div>
    <div>Loading your result...</div>
  `;
  document.body.appendChild(loadingMsg);
  
  // Redirect to result page with student info
  setTimeout(() => {
    loadingMsg.remove();
    
    // Determine which result template to use based on class
    const classLower = (studentClass || '').toLowerCase();
    let resultPage = 'results/result.html'; // default
    
    if (classLower.includes('nursery') || classLower.includes('creche') || classLower.includes('pre-nursery')) {
      resultPage = 'results/result-nursery.html';
    } else if (classLower.includes('jss')) {
      resultPage = 'results/result-jss.html';
    } else if (classLower.includes('ss')) {
      // For SS students, check department (default to science)
      const department = userData.department || 'science';
      resultPage = `results/result-ss-${department.toLowerCase()}.html`;
    }
    
    // Redirect with student name and class
    window.location.href = `${resultPage}?name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}&auto=true`;
  }, 1000);
}

// Make function globally available
window.viewMyResult = viewMyResult;

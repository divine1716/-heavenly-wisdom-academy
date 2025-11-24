// Load user profile
document.addEventListener("DOMContentLoaded", async () => {
  // Check for session storage (new system)
  const portalUser = sessionStorage.getItem("portal_user");
  
  if (!portalUser) {
    alert("Please sign in to view your profile.");
    window.location.href = "index.html";
    return;
  }

  try {
    const userData = JSON.parse(portalUser);
    
    // Display user information
    document.getElementById("profileName").value = userData.name || (userData.role.charAt(0).toUpperCase() + userData.role.slice(1) + " User");
    document.getElementById("profileEmail").value = userData.email || (userData.role + "@heavenlywisdom.edu");
    document.getElementById("profileRole").value = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
    
    // Show student-specific fields if student
    if (userData.role === "student" && userData.class) {
      // Add class field if it doesn't exist
      const emailField = document.getElementById("profileEmail").parentElement;
      
      if (!document.getElementById("profileClass")) {
        const classField = document.createElement("div");
        classField.className = "form-group";
        classField.innerHTML = `
          <label for="profileClass">Class</label>
          <input type="text" id="profileClass" value="${userData.class}" readonly>
        `;
        emailField.parentElement.insertBefore(classField, emailField.nextSibling);
      }
      
      if (userData.studentId && !document.getElementById("profileStudentId")) {
        const idField = document.createElement("div");
        idField.className = "form-group";
        idField.innerHTML = `
          <label for="profileStudentId">Student ID</label>
          <input type="text" id="profileStudentId" value="${userData.studentId}" readonly>
        `;
        emailField.parentElement.insertBefore(idField, emailField.nextSibling.nextSibling);
      }
    }
    
    // Set access time
    const accessTime = new Date(userData.accessTime || Date.now());
    document.getElementById("profileCreated").value = accessTime.toLocaleDateString();
    
  } catch (error) {
    console.error('Error loading profile:', error);
    alert("Error loading profile. Please login again.");
    sessionStorage.removeItem("portal_user");
    window.location.href = "index.html";
  }
});

// Change password
document.getElementById("changePasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match!");
    return;
  }

  if (newPassword.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  // For now, show alert (backend endpoint needed)
  alert("Password change feature coming soon! This requires backend implementation.");
  
  // Clear form
  document.getElementById("changePasswordForm").reset();
});

// Delete account confirmation
function confirmDeleteAccount() {
  const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone!");
  
  if (confirmed) {
    const doubleConfirm = confirm("This will permanently delete all your data. Are you absolutely sure?");
    
    if (doubleConfirm) {
      alert("Account deletion feature coming soon! Please contact administrator.");
    }
  }
}

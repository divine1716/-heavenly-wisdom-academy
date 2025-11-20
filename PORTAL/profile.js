// Load user profile
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    alert("Please sign in to view your profile.");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch('/api/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const user = data.user;

      document.getElementById("profileName").value = user.name || user.fullName;
      document.getElementById("profileEmail").value = user.email;
      document.getElementById("profileRole").value = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      document.getElementById("profileCreated").value = new Date(user.createdAt || Date.now()).toLocaleDateString();
    } else {
      console.error('Profile API response:', response.status, response.statusText);
      const errorData = await response.json().catch(() => ({}));
      console.error('Error details:', errorData);
      
      if (response.status === 401) {
        alert("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userInfo");
        window.location.href = "index.html";
      } else {
        alert("Failed to load profile: " + (errorData.message || 'Unknown error'));
        window.location.href = "dashboard.html";
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    alert("Error loading profile.");
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

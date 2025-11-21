// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const eye = document.getElementById(inputId + '-eye');
  
  if (input.type === 'password') {
    input.type = 'text';
    eye.classList.remove('fa-eye');
    eye.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    eye.classList.remove('fa-eye-slash');
    eye.classList.add('fa-eye');
  }
}

// Validate password strength
function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password should contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password should contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password should contain at least one number";
  }
  return null; // Valid password
}

// Handle form submission
document.getElementById("signupForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password || !role) {
    alert("Please fill in all fields.");
    return;
  }

  // Validate password strength
  const passwordError = validatePassword(password);
  if (passwordError) {
    alert(passwordError);
    return;
  }

  try {
    // Show loading
    const submitBtn = document.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    showLoading('Creating your account...');

    // Use local authentication for Vercel static hosting
    const result = await window.localAuth.signup(name, email, password, role);
    
    if (result.success) {
      showSuccess(`Welcome, ${result.user.fullName}! You can now sign in.`, 'Account Created');
      // Redirect to signin page after short delay
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 2000);
    } else {
      showError(result.message, 'Sign Up Failed');
    }

  } catch (error) {
    console.error('Signup error:', error);
    showError('Signup failed. Please try again.');
  } finally {
    hideLoading();
    setButtonLoading(submitBtn, false);
  }
});

// Sign In button click
function signIn() {
  alert("Redirecting to Sign In page...");
  // Example: window.location.href = "signin.html";
}

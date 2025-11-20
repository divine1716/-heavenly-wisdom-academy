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

// Forgot password functionality
function forgotPassword(event) {
  event.preventDefault();
  const email = prompt("Enter your email address to reset password:");
  
  if (email && email.trim()) {
    // TODO: Implement actual password reset via email
    alert("Password reset link has been sent to " + email + "\n\n(Note: Email functionality not yet implemented. Please contact administrator.)");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      if (!email || !password || !role) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        // Show loading
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);
        showLoading('Signing in...');

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        hideLoading();
        
        if (data.success) {
          // Store token and user info
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('userInfo', JSON.stringify(data.user));

          showSuccess(`Welcome back, ${data.user.fullName}!`, 'Login Successful');
          
          // Redirect to dashboard after short delay
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1000);
        } else {
          showError(data.message, 'Login Failed');
          setButtonLoading(submitBtn, false);
        }

      } catch (error) {
        console.error('Login error:', error);
        hideLoading();
        showError('Unable to connect to server. Please ensure backend is running.', 'Connection Error');
        setButtonLoading(submitBtn, false);
      }
    });
  }
});


 document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', () => {
      alert('You clicked a social media icon!');
    });
  });

  const chatBtn = document.getElementById('chat-btn');
  const chatPopup = document.getElementById('chat-popup');
  const closeChat = document.getElementById('close-chat');

  chatBtn.addEventListener('click', () => {
    chatPopup.style.display = (chatPopup.style.display === 'none' || chatPopup.style.display === '') 
      ? 'flex' 
      : 'none';
  });

  closeChat.addEventListener('click', () => {
    chatPopup.style.display = 'none';
  });

  // Optional: Auto-hide message after few seconds
  setTimeout(() => {
    const msg = document.getElementById('chat-message');
    if (msg) msg.style.display = 'none';
    }, 5000);

// Optional: Only attach signup handler if signupForm exists on this page
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (name && email && password) {
      alert("Sign Up Successful!\nWelcome, " + name);
      // Here you could add backend integration
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Sign In button click
function signIn() {
  alert("Redirecting to Sign In page...");
  // Example: window.location.href = "signin.html";
}




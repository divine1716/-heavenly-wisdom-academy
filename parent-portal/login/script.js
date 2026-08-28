// ========================================
// PARENT PORTAL LOGIN SCRIPT
// ========================================

// Dark mode toggle
function toggledarkmode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ========================================
// LOGIN AUTHENTICATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin');
    
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
});

function handleLogin() {
    // Get form inputs
    const fullNameInput = document.querySelector('#signin input[type="text"]');
    const passwordInput = document.querySelector('#signin input[type="password"]');
    
    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate inputs
    if (!fullName || !password) {
        showError('Please enter both full name and password');
        return;
    }
    
    // Find matching parent
    const parent = parentCredentials.find(p => 
        p.fullName.toLowerCase() === fullName.toLowerCase() && 
        p.password === password
    );
    
    if (parent) {
        // Login successful
        showSuccess('Login successful! Redirecting...');
        
        // Store parent info in session
        sessionStorage.setItem('parentLoggedIn', 'true');
        sessionStorage.setItem('parentId', parent.id);
        sessionStorage.setItem('parentName', parent.fullName);
        sessionStorage.setItem('parentEmail', parent.email);
        sessionStorage.setItem('parentPhone', parent.phone);
        sessionStorage.setItem('parentAddress', parent.address);
        sessionStorage.setItem('parentChildren', JSON.stringify(parent.children));
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = '/parent-portal/index.html';
        }, 1000);
        
    } else {
        // Login failed
        showError('Invalid full name or password. Please contact the school office for your credentials.');
        
        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// ========================================
// NOTIFICATION FUNCTIONS
// ========================================

function showError(message) {
    // Remove any existing notifications
    removeNotifications();
    
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showSuccess(message) {
    // Remove any existing notifications
    removeNotifications();
    
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function removeNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(n => n.remove());
}

// ========================================
// FORM SWITCHING (if you add signup later)
// ========================================

function showForm(formId, button) {
    // Hide all forms
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected form
    document.getElementById(formId).classList.add('active');
    
    // Add active class to clicked tab
    button.classList.add('active');
}

// ========================================
// PASSWORD VISIBILITY TOGGLE (Optional Enhancement)
// ========================================

function togglePasswordVisibility() {
    const passwordInput = document.querySelector('#signin input[type="password"]');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// ========================================
// PREVENT ACCESS IF ALREADY LOGGED IN
// ========================================

// If parent is already logged in, redirect to dashboard
if (sessionStorage.getItem('parentLoggedIn') === 'true') {
    window.location.href = '/parent-portal/index.html';
}

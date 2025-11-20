// Notification System

// Show loading overlay
function showLoading(message = "Loading...") {
  let overlay = document.getElementById('loadingOverlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div class="spinner"></div>
        <div class="loading-text" id="loadingText">${message}</div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  document.getElementById('loadingText').textContent = message;
  overlay.classList.add('active');
}

// Hide loading overlay
function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Show toast notification
function showToast(title, message, type = 'info', duration = 4000) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Icon based on type
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;

  container.appendChild(toast);

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Success notification
function showSuccess(message, title = 'Success!') {
  showToast(title, message, 'success');
}

// Error notification
function showError(message, title = 'Error!') {
  showToast(title, message, 'error');
}

// Warning notification
function showWarning(message, title = 'Warning!') {
  showToast(title, message, 'warning');
}

// Info notification
function showInfo(message, title = 'Info') {
  showToast(title, message, 'info');
}

// Add loading state to button
function setButtonLoading(button, loading = true) {
  if (loading) {
    button.classList.add('btn-loading');
    button.dataset.originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
  } else {
    button.classList.remove('btn-loading');
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

// Confirm dialog with better styling
function confirmAction(message, title = 'Confirm Action') {
  return new Promise((resolve) => {
    const result = confirm(`${title}\n\n${message}`);
    resolve(result);
  });
}

// Debug Authentication System
console.log('🔍 Starting Authentication Debug...');

// Check if we're running locally or on Vercel
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
console.log('🌐 Environment:', isLocal ? 'Local' : 'Production (Vercel)');

// Check if auth-local.js is loaded
setTimeout(() => {
  if (window.localAuth) {
    console.log('✅ Authentication system loaded successfully');
    console.log('📊 Auth methods available:', Object.getOwnPropertyNames(window.localAuth));
    
    // Check localStorage
    const users = JSON.parse(localStorage.getItem('heavenly_users') || '[]');
    console.log('👥 Stored users:', users.length);
    
    const currentUser = JSON.parse(localStorage.getItem('heavenly_current_user') || 'null');
    console.log('👤 Current user:', currentUser ? currentUser.name : 'None');
    
    // Test basic functionality
    console.log('🧪 Testing hash function...');
    const testHash = window.localAuth.hashPassword('test123');
    console.log('🔐 Hash result:', testHash);
    
  } else {
    console.error('❌ Authentication system NOT loaded');
    console.log('🔍 Available window objects:', Object.keys(window).filter(key => key.includes('auth') || key.includes('local')));
  }
  
  // Check if admission function is available
  if (window.submitAdmissionForm) {
    console.log('✅ Admission form function loaded');
  } else {
    console.error('❌ Admission form function NOT loaded');
  }
  
}, 1000);

// Add error listener
window.addEventListener('error', (event) => {
  console.error('🚨 JavaScript Error:', event.error);
  console.error('📍 File:', event.filename);
  console.error('📍 Line:', event.lineno);
});

// Add unhandled promise rejection listener
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

console.log('🔍 Debug script loaded. Check console for results in 1 second...');
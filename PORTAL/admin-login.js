const isLocalDevelopment = ['localhost', '127.0.0.1'].includes(location.hostname);
const adminApiBase = window.ADMISSION_API_BASE ||
  (location.protocol === 'file:' || (isLocalDevelopment && location.port !== '5000')
    ? 'http://localhost:5000'
    : '');
document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const error = document.getElementById('loginError'); error.textContent = '';
  try {
    const response = await fetch(`${adminApiBase}/api/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username.value, password: password.value }) });
    const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Sign in failed.');
    sessionStorage.setItem('adminToken', result.token); sessionStorage.setItem('adminUsername', result.username); location.href = 'admin-panel.html#admissions';
  } catch (err) { error.textContent = err.message; }
});

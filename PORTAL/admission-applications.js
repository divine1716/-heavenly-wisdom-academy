const admissionsApiBase = window.ADMISSION_API_BASE || ((location.protocol === 'file:' || ['3000', '5500'].includes(location.port)) ? 'http://localhost:5000' : '');
const adminToken = sessionStorage.getItem('adminToken');
let applications = [];

if (!adminToken) location.replace('admin-login.html');
document.getElementById('adminIdentity').textContent = `Signed in as ${sessionStorage.getItem('adminUsername') || 'Administrator'}`;
document.getElementById('signOut').onclick = () => { sessionStorage.removeItem('adminToken'); sessionStorage.removeItem('adminUsername'); location.replace('admin-login.html'); };
document.getElementById('refresh').onclick = loadApplications;
document.getElementById('statusFilter').onchange = renderApplications;

const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
function showStats() {
  const counts = ['all', 'pending', 'accepted', 'rejected'].map((status) => ({ status, total: status === 'all' ? applications.length : applications.filter((app) => app.status === status).length }));
  document.getElementById('statistics').innerHTML = counts.map(({ status, total }) => `<div class="stat-item"><div class="stat-number">${total}</div><div class="stat-label">${status === 'all' ? 'Total' : status[0].toUpperCase() + status.slice(1)}</div></div>`).join('');
}
function renderApplications() {
  showStats();
  const selected = document.getElementById('statusFilter').value;
  const visible = selected === 'all' ? applications : applications.filter((app) => app.status === selected);
  const root = document.getElementById('applications');
  if (!visible.length) { root.innerHTML = '<p>No applications found.</p>'; return; }
  root.innerHTML = `<table class="admission-table"><thead><tr><th>Date</th><th>Student</th><th>Guardian</th><th>Class</th><th>Status</th><th>Actions</th></tr></thead><tbody>${visible.map((app) => `<tr><td>${new Date(app.created_at).toLocaleDateString()}</td><td><strong>${escapeHtml(app.full_name)}</strong><br><small>${escapeHtml(app.application_id)}</small></td><td>${escapeHtml(app.guardian_name)}<br><a href="tel:${escapeHtml(app.guardian_phone)}">${escapeHtml(app.guardian_phone)}</a></td><td>${escapeHtml(app.applying_class)}</td><td><span class="status-badge ${escapeHtml(app.status)}">${escapeHtml(app.status)}</span></td><td><button class="btn-small" onclick="details('${app.id}')">Details</button> <button class="btn-small" onclick="setStatus('${app.id}','accepted')">Accept</button> <button class="btn-small btn-danger" onclick="setStatus('${app.id}','rejected')">Reject</button></td></tr>`).join('')}</tbody></table>`;
}
window.details = (id) => {
  const app = applications.find((entry) => entry.id === id); if (!app) return;
  const photo = app.passport_url ? `<p><a href="${app.passport_url}" target="_blank" rel="noopener">View passport photo</a></p>` : '';
  document.getElementById('applications').insertAdjacentHTML('afterbegin', `<div class="admin-card" id="detailsCard"><button class="btn-small" onclick="document.getElementById('detailsCard').remove()">Close</button><h2>${escapeHtml(app.full_name)}</h2><p><strong>Address:</strong> ${escapeHtml(app.residential_address)}</p><p><strong>Date of birth:</strong> ${escapeHtml(app.date_of_birth)} &nbsp; <strong>Gender:</strong> ${escapeHtml(app.sex)}</p><p><strong>Guardian:</strong> ${escapeHtml(app.guardian_name)} — ${escapeHtml(app.guardian_email || 'No email')}</p><p><strong>Medical notes:</strong> ${escapeHtml(app.medical_conditions || 'None')}</p>${photo}</div>`);
};
window.setStatus = async (id, status) => {
  if (!confirm(`Mark this application as ${status}?`)) return;
  const response = await fetch(`${admissionsApiBase}/api/admin/admissions`, { method: 'PATCH', headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
  const result = await response.json(); if (!response.ok) return alert(result.error || 'Could not update application.');
  applications = applications.map((app) => app.id === id ? { ...app, ...result.application } : app); renderApplications();
};
async function loadApplications() {
  const root = document.getElementById('applications'); root.innerHTML = '<p>Loading applications…</p>';
  const response = await fetch(`${admissionsApiBase}/api/admin/admissions`, { headers: { Authorization: `Bearer ${adminToken}` } });
  const result = await response.json();
  if (response.status === 401) { sessionStorage.removeItem('adminToken'); location.replace('admin-login.html'); return; }
  if (!response.ok) { root.innerHTML = `<p>${escapeHtml(result.error || 'Could not load applications.')}</p>`; return; }
  applications = result.applications; renderApplications();
}
loadApplications();

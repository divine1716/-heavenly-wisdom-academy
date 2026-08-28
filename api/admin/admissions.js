const jwt = require('jsonwebtoken');

function isAdmin(req) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  try { return Boolean(token && jwt.verify(token, process.env.JWT_SECRET).role === 'admin'); } catch { return false; }
}
async function supabase(endpoint, options = {}) {
  return fetch(`${process.env.SUPABASE_URL}${endpoint}`, { ...options, headers: {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    ...(options.headers || {})
  }});
}
async function photoUrl(passportPath) {
  if (!passportPath) return null;
  const response = await supabase(`/storage/v1/object/sign/admission-passports/${passportPath}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expiresIn: 900 }) });
  if (!response.ok) return null;
  const { signedURL } = await response.json();
  return signedURL ? `${process.env.SUPABASE_URL}/storage/v1${signedURL}` : null;
}
module.exports = async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Admin access required.' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(500).json({ error: 'Supabase is not configured.' });
  try {
    if (req.method === 'GET') {
      const response = await supabase('/rest/v1/admission_applications?select=*&order=created_at.desc');
      if (!response.ok) throw new Error(await response.text());
      const applications = await response.json();
      return res.status(200).json({ applications: await Promise.all(applications.map(async (app) => ({ ...app, passport_url: await photoUrl(app.passport_path) }))) });
    }
    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (!id || !['pending', 'accepted', 'rejected'].includes(status)) return res.status(400).json({ error: 'A valid application and status are required.' });
      const response = await supabase(`/rest/v1/admission_applications?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify({ status, reviewed_at: new Date().toISOString() }) });
      if (!response.ok) throw new Error(await response.text());
      return res.status(200).json({ success: true, application: (await response.json())[0] });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Admin admissions error:', error);
    return res.status(500).json({ error: 'Unable to process admission applications.' });
  }
};

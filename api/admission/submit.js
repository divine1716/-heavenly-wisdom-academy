const fs = require('fs/promises');
const path = require('path');
const { formidable } = require('formidable');

const REQUIRED_FIELDS = ['fullName', 'dob', 'sex', 'birthPlace', 'stateOrigin', 'address', 'class', 'guardianName', 'guardianPhone', 'guardianAddress', 'occupation', 'knowsWayHome', 'christianTraining'];
const firstValue = (value) => Array.isArray(value) ? value[0] : value;
const nullable = (value) => {
  const result = firstValue(value);
  return typeof result === 'string' && result.trim() ? result.trim() : null;
};

function handleCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

async function uploadPassport(file, applicationId) {
  if (!file || !file.size) return null;
  if (!file.mimetype || !file.mimetype.startsWith('image/')) throw new Error('Passport photo must be an image file.');
  if (file.size > 2 * 1024 * 1024) throw new Error('Passport photo must be 2MB or less.');

  const extension = path.extname(file.originalFilename || '') || '.jpg';
  const objectPath = `${applicationId}/passport${extension.toLowerCase()}`;
  const response = await fetch(`${process.env.SUPABASE_URL}/storage/v1/object/admission-passports/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': file.mimetype,
      'x-upsert': 'false'
    },
    body: await fs.readFile(file.filepath)
  });
  if (!response.ok) throw new Error(`Passport upload failed: ${await response.text()}`);
  return objectPath;
}

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase is not configured on the server.' });
  }

  let passportFile;
  try {
    const [fields, files] = await formidable({ multiples: false, maxFileSize: 2 * 1024 * 1024, allowEmptyFiles: false }).parse(req);
    if (nullable(fields.website)) return res.status(400).json({ error: 'Invalid submission.' });

    const missingFields = REQUIRED_FIELDS.filter((field) => !nullable(fields[field]));
    if (missingFields.length) return res.status(400).json({ error: 'Missing required fields.', fields: missingFields });

    const applicationId = `ADM-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    passportFile = firstValue(files.passport);
    const passportPath = await uploadPassport(passportFile, applicationId);
    const application = {
      application_id: applicationId,
      full_name: nullable(fields.fullName), date_of_birth: nullable(fields.dob), sex: nullable(fields.sex),
      birth_place: nullable(fields.birthPlace), state_of_origin: nullable(fields.stateOrigin),
      residential_address: nullable(fields.address), applying_class: nullable(fields.class), religion: nullable(fields.religion),
      former_school: nullable(fields.formerSchool), guardian_name: nullable(fields.guardianName), guardian_phone: nullable(fields.guardianPhone),
      guardian_email: nullable(fields.guardianEmail), guardian_address: nullable(fields.guardianAddress), occupation: nullable(fields.occupation),
      place_of_work: nullable(fields.placeOfWork), next_of_kin: nullable(fields.nextOfKin), kin_phone: nullable(fields.kinPhone),
      authorized_persons: nullable(fields.authorizedPersons), knows_way_home: nullable(fields.knowsWayHome), christian_training: nullable(fields.christianTraining),
      genotype: nullable(fields.genotype), blood_group: nullable(fields.bloodGroup), hepatitis_vaccination: nullable(fields.hepatitis),
      disability: nullable(fields.disability), medical_conditions: nullable(fields.medicalConditions), attestation: nullable(fields.attestation), passport_path: passportPath
    };
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/admission_applications`, {
      method: 'POST',
      headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(application)
    });
    if (!response.ok) throw new Error(`Application save failed: ${await response.text()}`);
    return res.status(201).json({
      success: true,
      applicationId,
      fullName: application.full_name,
      class: application.applying_class
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    return res.status(500).json({ error: 'Unable to submit application. Please try again.' });
  } finally {
    if (passportFile?.filepath) await fs.unlink(passportFile.filepath).catch(() => {});
  }
};

module.exports.config = { api: { bodyParser: false } };

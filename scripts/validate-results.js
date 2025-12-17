const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'PORTAL', 'results', 'student.js');
const outReport = path.join(__dirname, '..', 'student result', `validation-report-${new Date().toISOString().replace(/[:.]/g,'-')}.csv`);

const raw = fs.readFileSync(filePath, 'utf8');

// Extract the studentResults object by finding the start and matching braces
const marker = 'export const studentResults = ';
const start = raw.indexOf(marker);
if (start === -1) {
  console.error('Could not find studentResults export in student.js');
  process.exit(2);
}

let i = start + marker.length;
// skip whitespace
while (i < raw.length && /\s/.test(raw[i])) i++;
if (raw[i] !== '{') {
  console.error('studentResults does not start with an object');
  process.exit(2);
}

let depth = 0; let endIdx = -1;
for (; i < raw.length; i++) {
  if (raw[i] === '{') depth++;
  else if (raw[i] === '}') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}

if (endIdx === -1) {
  console.error('Could not locate end of studentResults object');
  process.exit(2);
}

const objectText = raw.slice(start + marker.length, endIdx + 1);

// Convert export-style to a parsable JS expression and evaluate in a sandbox
const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);
console.log('--- BEGIN OBJECT TEXT PREVIEW ---');
console.log(objectText.slice(0,1000));
console.log('--- END OBJECT TEXT PREVIEW ---');
try {
  // Evaluate into the sandbox and assign to sandbox.studentResults directly
  vm.runInContext('studentResults = ' + objectText + ';', sandbox);
  // Expose the parsed object
  sandbox.studentResults = sandbox.studentResults;
} catch (e) {
  console.error('Failed to evaluate studentResults object:', e.stack || e.message);
  process.exit(2);
}

const results = sandbox.studentResults;

function expectedGrade(total) {
  if (total >= 70) return 'A';
  if (total >= 55) return 'B';
  if (total >= 40) return 'C';
  return 'F';
}
function expectedRemark(total) {
  if (total >= 90) return 'Excellent';
  if (total >= 70) return 'Very Good';
  if (total >= 55) return 'Good';
  return 'Fair';
}

const mismatches = [];
let totalSubjectsChecked = 0;
for (const [studentName, data] of Object.entries(results)) {
  if (!data || !Array.isArray(data.subjects)) continue;
  for (const subj of data.subjects) {
    totalSubjectsChecked++;
    const expectedTotal = Number(subj.test1 || 0) + Number(subj.test2 || 0) + Number(subj.exam || 0);
    const storedTotal = Number(subj.total || 0);
    const expectedG = expectedGrade(expectedTotal);
    const expectedR = expectedRemark(expectedTotal);

    if (expectedTotal !== storedTotal || subj.grade !== expectedG || subj.remark !== expectedR) {
      mismatches.push({student: studentName, subject: subj.name, test1: subj.test1, test2: subj.test2, exam: subj.exam, storedTotal, expectedTotal, storedGrade: subj.grade, expectedGrade: expectedG, storedRemark: subj.remark, expectedRemark: expectedR});
    }
  }
}

console.log(`Checked ${totalSubjectsChecked} subject entries.`);
if (mismatches.length === 0) {
  console.log('All totals, grades and remarks match expectations. ✅');
} else {
  console.log(`Found ${mismatches.length} mismatches:`);
  mismatches.slice(0,50).forEach(m => {
    console.log(`- ${m.student} / ${m.subject}: total stored=${m.storedTotal} expected=${m.expectedTotal}; grade stored=${m.storedGrade} expected=${m.expectedGrade}; remark stored=${m.storedRemark} expected=${m.expectedRemark}`);
  });

  // Write CSV
  const header = ['student','subject','test1','test2','exam','storedTotal','expectedTotal','storedGrade','expectedGrade','storedRemark','expectedRemark'];
  const rows = mismatches.map(m => header.map(h => JSON.stringify(m[h] || '')).join(','));
  fs.mkdirSync(path.dirname(outReport), { recursive: true });
  fs.writeFileSync(outReport, header.join(',') + '\n' + rows.join('\n'));
  console.log(`Wrote report to ${outReport}`);
}

process.exit(0);

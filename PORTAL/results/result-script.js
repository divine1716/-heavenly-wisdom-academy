import { studentResults } from "./student.js";

// Check if user is logged in or this is an automated inline view
const urlParams = new URLSearchParams(window.location.search);
const autoView = urlParams.get('auto') === 'true' || urlParams.get('auto') === '1';
const portalUser = sessionStorage.getItem("portal_user");
if (!portalUser && !autoView) {
  alert("⚠️ Please login to the portal to access student results.");
  window.location.href = "../index.html";
}

// Get URL parameters (we parse them at top for inline/auto view)
const studentName = urlParams.get("name");
const className = urlParams.get("class");
const department = urlParams.get("department");

// Function to calculate grade
function calculateGrade(total) {
  if (total >= 90) return "A1";
  if (total >= 80) return "A2";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

// Function to get remark based on total
function getRemark(total) {
  if (total >= 90) return "Excellent";
  if (total >= 70) return "Very Good";
  if (total >= 55) return "Good";
  if (total >= 40) return "Fair";
  return "Needs Improvement";
}

// Load student result
(function(){
  // Normalize helper
  function normalizeName(s){
    if (!s) return '';
    return s.replace(/\s+/g,' ').trim();
  }

  const requestedName = normalizeName(studentName || '');
  // Prefer session user when available (students viewing their own result)
  let effectiveName = requestedName;
  try {
    if (portalUser) {
      const userData = JSON.parse(portalUser);
      if (userData && userData.role === 'student' && userData.name) {
        effectiveName = normalizeName(userData.name);
        console.log('Using session student name for lookup:', effectiveName);
      }
    }
  } catch (e) {
    console.warn('Failed to parse portal_user from sessionStorage:', e.message || e);
  }

  // Try direct match, then case-insensitive key match
  let matchedKey = null;
  if (effectiveName && studentResults[effectiveName]) {
    matchedKey = effectiveName;
  } else if (effectiveName) {
    const lower = effectiveName.toLowerCase();
    for (const key of Object.keys(studentResults)) {
      if (key.toLowerCase() === lower) {
        matchedKey = key;
        break;
      }
    }
  }

  if (!matchedKey && requestedName) {
    // Attempt fuzzy includes match (helps with small typos)
    const lowerReq = requestedName.toLowerCase();
    const possible = Object.keys(studentResults).filter(k => k.toLowerCase().includes(lowerReq)).slice(0,5);
    console.warn('No exact match for student name:', requestedName, 'possible matches:', possible);
    document.querySelector('.result-container').innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h2>No result found for "${requestedName}"</h2>
        <p>We tried a few close matches: ${possible.length ? possible.join(', ') : 'none'}. Please ensure you used the exact registered name.</p>
        <p><a href="index.html">Go back to student list</a></p>
      </div>
    `;
    return;
  }

  if (!matchedKey) {
    // No student specified and no session - show message
    document.querySelector('.result-container').innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h2>No student specified</h2>
        <p>Please access this page via the portal or provide a student name.</p>
        <p><a href="index.html">Back</a></p>
      </div>
    `;
    return;
  }

  const result = studentResults[matchedKey];

  // Check if student is Nursery/Creche, JSS or SS - redirect to appropriate template
  const classLower = (result.class || '').toLowerCase();
  
  if (classLower.includes('nursery') || classLower.includes('creche') || classLower.includes('pre-nursery')) {
    // Redirect to Nursery/Creche result template
    window.location.href = `result-nursery.html?name=${encodeURIComponent(matchedKey)}&class=${encodeURIComponent(result.class)}`;
    return;
  }
  
  if (classLower.includes('jss')) {
    // Redirect to JSS result template
    window.location.href = `result-jss.html?name=${encodeURIComponent(matchedKey)}&class=${encodeURIComponent(result.class)}`;
    return;
  }
  
  if (classLower.includes('ss')) {
    // For SS students, check department from URL or result data (default to science if not specified)
    const studentDepartment = department || result.department || 'science';
    window.location.href = `result-ss-${studentDepartment.toLowerCase()}.html?name=${encodeURIComponent(matchedKey)}&class=${encodeURIComponent(result.class)}`;
    return;
  }
  
  // Calculate totals
  let grandTotal = 0;
  result.subjects.forEach(subject => {
    grandTotal += subject.total;
  });
  const average = (grandTotal / result.subjects.length).toFixed(2);
  
  // Determine sex (you can add this to student data later)
  const sex = ""; // Placeholder
  const numInClass = ""; // Placeholder
  const timesOpened = ""; // Placeholder
  const attendance = ""; // Placeholder
  
  // Update student info with new format
  document.querySelector(".student-info").innerHTML = `
    <div class="info-row">
      <span class="info-label">Name of Student:</span>
      <span class="info-value">${matchedKey}</span>
      <span class="info-label">Sex:</span>
      <span class="info-value">${sex}</span>
      <span class="info-label">Class:</span>
      <span class="info-value">${result.class}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Number of times school opened:</span>
      <span class="info-value">${timesOpened}</span>
      <span class="info-label">Number of Attendance:</span>
      <span class="info-value">${attendance}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Number in Class:</span>
      <span class="info-value">${numInClass}</span>
      <span class="info-label">Grade:</span>
      <span class="info-value">${calculateGrade(average)}</span>
      <span class="info-label">Year:</span>
      <span class="info-value">${result.year}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Term:</span>
      <span class="info-value">${result.term}</span>
      <span class="info-label">Next Term Begins:</span>
      <span class="info-value">${result.nextTermBegins}</span>
    </div>
  `;
  
  // Update results table
  const tbody = document.querySelector(".results-table tbody");
  tbody.innerHTML = result.subjects.map(subject => `
    <tr>
      <td>${subject.name}</td>
      <td>${subject.test1}</td>
      <td>${subject.test2}</td>
      <td>${subject.exam}</td>
      <td>${subject.total}</td>
      <td>${subject.grade}</td>
      <td>${subject.remark}</td>
    </tr>
  `).join("");
  
  // Update remarks section
  document.querySelector(".remark-box").innerHTML = `
    <p><strong>CLASS TEACHER'S REMARK:</strong> <span class="remark-line">${result.formTeacherRemark || ''}</span></p>
    <p><strong>HEAD TEACHER'S REMARK:</strong> <span class="remark-line">${result.principalRemark || ''}</span></p>
  `;
})();

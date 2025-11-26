import { studentResults } from "./student.js";

// Check if user is logged in
const portalUser = sessionStorage.getItem("portal_user");
if (!portalUser) {
  alert("⚠️ Please login to the portal to access student results.");
  window.location.href = "../index.html";
}

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get("name");
const className = urlParams.get("class");

// Function to calculate grade for SS (WAEC grading system)
function calculateGrade(total) {
  if (total >= 75) return "A1";
  if (total >= 70) return "B2";
  if (total >= 65) return "B3";
  if (total >= 60) return "C4";
  if (total >= 55) return "C5";
  if (total >= 50) return "C6";
  if (total >= 45) return "D7";
  if (total >= 40) return "E8";
  return "F9";
}

// Function to get remark based on total for SS
function getRemark(total) {
  if (total >= 75) return "Excellent";
  if (total >= 70) return "Very Good";
  if (total >= 65) return "Good";
  if (total >= 50) return "Credit";
  if (total >= 40) return "Pass";
  return "Fail";
}

// Load student result
if (studentName && studentResults[studentName]) {
  const result = studentResults[studentName];
  
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
      <span class="info-value">${studentName}</span>
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
      <td>${subject.ca1 || subject.test1}</td>
      <td>${subject.ca2 || subject.test2}</td>
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
} else {
  document.querySelector(".result-container").innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <h2>No result found for this student</h2>
      <p><a href="index.html">Go back to student list</a></p>
    </div>
  `;
}

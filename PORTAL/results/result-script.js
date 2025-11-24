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

// Function to calculate grade
function calculateGrade(total) {
  if (total >= 70) return "A";
  if (total >= 55) return "B";
  if (total >= 40) return "C";
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
if (studentName && studentResults[studentName]) {
  const result = studentResults[studentName];
  
  // Calculate totals
  let grandTotal = 0;
  result.subjects.forEach(subject => {
    grandTotal += subject.total;
  });
  const average = (grandTotal / result.subjects.length).toFixed(2);
  
  // Update student info
  document.querySelector(".student-info").innerHTML = `
    <p><strong>Name:</strong> ${studentName}</p>
    <p><strong>Class:</strong> ${result.class}</p>
    <p><strong>Term:</strong> ${result.term}</p>
    <p><strong>Year:</strong> ${result.year}</p>
    <p><strong>Total:</strong> ${grandTotal}</p>
    <p><strong>Average:</strong> ${average}</p>
    <p><strong>Position:</strong> 1st</p>
    <p><strong>Remark:</strong> ${getRemark(average)}</p>
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
    <p><strong>Form Teacher's Remark:</strong> ${result.formTeacherRemark}</p>
    <p><strong>Hostel Master's Remark:</strong> ${result.hostelMasterRemark}</p>
    <p><strong>Guidance Counsellor's Remark:</strong> ${result.guidanceCounsellorRemark}</p>
    <p><strong>Principal's Remark:</strong> ${result.principalRemark}</p>
    <p><strong>Next Term Begins:</strong> ${result.nextTermBegins}</p>
  `;
} else {
  document.querySelector(".result-container").innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <h2>No result found for this student</h2>
      <p><a href="index.html">Go back to student list</a></p>
    </div>
  `;
}

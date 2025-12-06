// Nursery/Creche Result Script

// Get student data from URL or localStorage
function loadStudentData() {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');
  
  if (studentId) {
    // Load from localStorage or database
    const students = JSON.parse(localStorage.getItem('nursery_students') || '[]');
    const student = students.find(s => s.id === studentId);
    
    if (student) {
      document.getElementById('studentName').textContent = student.name;
      document.getElementById('studentSex').textContent = student.sex;
      document.getElementById('studentClass').textContent = student.class;
      document.getElementById('year').textContent = new Date().getFullYear();
      document.getElementById('term').textContent = 'First Term';
    }
  }
}

// Calculate individual row
function calculateRow(row) {
  const ca1 = parseFloat(row.querySelector('.ca1').value) || 0;
  const ca2 = parseFloat(row.querySelector('.ca2').value) || 0;
  const exam = parseFloat(row.querySelector('.exam').value) || 0;
  
  const total = ca1 + ca2 + exam;
  row.querySelector('.total').textContent = total;
  
  // Calculate grade
  const grade = getGrade(total);
  row.querySelector('.grade').textContent = grade;
  
  // Calculate remark
  const remark = getRemark(total);
  row.querySelector('.remark').textContent = remark;
  
  return total;
}

// Get grade based on score
function getGrade(score) {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  if (score >= 40) return 'E';
  return 'F';
}

// Get remark based on score
function getRemark(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 50) return 'Pass';
  if (score >= 40) return 'Weak';
  return 'Fail';
}

// Calculate all results
function calculateResults() {
  const rows = document.querySelectorAll('#resultsBody tr');
  let totalScore = 0;
  let subjectCount = 0;
  
  rows.forEach(row => {
    const score = calculateRow(row);
    if (score > 0) {
      totalScore += score;
      subjectCount++;
    }
  });
  
  // Update summary
  document.getElementById('totalScore').textContent = totalScore;
  
  const average = subjectCount > 0 ? (totalScore / subjectCount).toFixed(2) : '0.00';
  document.getElementById('average').textContent = average;
  
  // Show success message
  showNotification('Results calculated successfully!', 'success');
}

// Add input listeners for auto-calculation
document.addEventListener('DOMContentLoaded', function() {
  loadStudentData();
  
  // Add listeners to all input fields
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      const row = this.closest('tr');
      if (row) {
        calculateRow(row);
        updateSummary();
      }
    });
  });
});

// Update summary automatically
function updateSummary() {
  const rows = document.querySelectorAll('#resultsBody tr');
  let totalScore = 0;
  let subjectCount = 0;
  
  rows.forEach(row => {
    const total = parseFloat(row.querySelector('.total').textContent) || 0;
    if (total > 0) {
      totalScore += total;
      subjectCount++;
    }
  });
  
  document.getElementById('totalScore').textContent = totalScore;
  
  const average = subjectCount > 0 ? (totalScore / subjectCount).toFixed(2) : '0.00';
  document.getElementById('average').textContent = average;
}

// Save result
function saveResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');
  
  if (!studentId) {
    showNotification('No student ID found!', 'error');
    return;
  }
  
  // Collect all data
  const resultData = {
    studentId: studentId,
    studentName: document.getElementById('studentName').textContent,
    class: document.getElementById('studentClass').textContent,
    term: document.getElementById('term').textContent,
    year: document.getElementById('year').textContent,
    subjects: [],
    totalScore: document.getElementById('totalScore').textContent,
    average: document.getElementById('average').textContent,
    position: document.getElementById('position').textContent,
    teacherComment: document.getElementById('teacherComment').value,
    headComment: document.getElementById('headComment').value,
    savedDate: new Date().toISOString()
  };
  
  // Collect subject scores
  const rows = document.querySelectorAll('#resultsBody tr');
  rows.forEach(row => {
    const subject = row.cells[0].textContent;
    const ca1 = row.querySelector('.ca1').value;
    const ca2 = row.querySelector('.ca2').value;
    const exam = row.querySelector('.exam').value;
    const total = row.querySelector('.total').textContent;
    const grade = row.querySelector('.grade').textContent;
    const remark = row.querySelector('.remark').textContent;
    
    resultData.subjects.push({
      name: subject,
      ca1: ca1,
      ca2: ca2,
      exam: exam,
      total: total,
      grade: grade,
      remark: remark
    });
  });
  
  // Save to localStorage
  const results = JSON.parse(localStorage.getItem('nursery_results') || '[]');
  
  // Check if result already exists
  const existingIndex = results.findIndex(r => r.studentId === studentId);
  if (existingIndex >= 0) {
    results[existingIndex] = resultData;
  } else {
    results.push(resultData);
  }
  
  localStorage.setItem('nursery_results', JSON.stringify(results));
  
  showNotification('Result saved successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'error' ? '#dc3545' : '#28a745'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Load saved result if exists
function loadSavedResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('id');
  
  if (studentId) {
    const results = JSON.parse(localStorage.getItem('nursery_results') || '[]');
    const savedResult = results.find(r => r.studentId === studentId);
    
    if (savedResult) {
      // Populate fields with saved data
      savedResult.subjects.forEach((subject, index) => {
        const row = document.querySelectorAll('#resultsBody tr')[index];
        if (row) {
          row.querySelector('.ca1').value = subject.ca1;
          row.querySelector('.ca2').value = subject.ca2;
          row.querySelector('.exam').value = subject.exam;
          calculateRow(row);
        }
      });
      
      document.getElementById('teacherComment').value = savedResult.teacherComment || '';
      document.getElementById('headComment').value = savedResult.headComment || '';
      document.getElementById('position').textContent = savedResult.position || '-';
    }
  }
}

// Load saved result on page load
window.addEventListener('load', loadSavedResult);

// Check if user is admin
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  
  if (userInfo.role !== "admin") {
    alert("Access denied. Admin only.");
    window.location.href = "dashboard.html";
    return;
  }

  loadStudentsList();
  loadStudentNamesForResults();
  createSubjectFields();
});

// Tab switching
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName + 'Tab').classList.add('active');
  event.target.classList.add('active');
}

// Load users from database
async function loadUsers() {
  const container = document.getElementById('usersTableContainer');
  container.innerHTML = '<p>Loading users...</p>';

  try {
    const token = localStorage.getItem("token");
    const response = await fetch('/api/user/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const users = data.users;

      if (users.length === 0) {
        container.innerHTML = '<p>No users found.</p>';
        return;
      }

      let html = '<table class="admin-table">';
      html += '<thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>';
      html += '<tbody>';
      
      users.forEach(user => {
        html += `<tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><span class="role-badge ${user.role}">${user.role}</span></td>
          <td>
            <button class="btn-small btn-danger" onclick="deleteUser('${user._id}', '${user.email}')">Delete</button>
          </td>
        </tr>`;
      });
      
      html += '</tbody></table>';
      container.innerHTML = html;
    } else {
      container.innerHTML = '<p>Failed to load users.</p>';
    }
  } catch (error) {
    console.error('Error loading users:', error);
    container.innerHTML = '<p>Error loading users.</p>';
  }
}

// Delete user (placeholder)
function deleteUser(userId, email) {
  if (confirm(`Are you sure you want to delete user: ${email}?`)) {
    alert('User deletion requires backend endpoint. Feature coming soon!');
    // TODO: Implement delete endpoint
  }
}

// Load students list
function loadStudentsList() {
  // This would normally come from a database
  // For now, we'll show instructions
  const container = document.getElementById('studentsListContainer');
  
  container.innerHTML = `
    <div class="info-box">
      <h4>📝 Current Student Management</h4>
      <p>Students are currently managed in the code file: <code>student result/student.js</code></p>
      <p><strong>To add a student:</strong></p>
      <ol>
        <li>Use the "Add New Student" form above</li>
        <li>The student will be added to the system</li>
        <li>You can then add their results in the "Manage Results" tab</li>
      </ol>
      <p><strong>Current Students:</strong> 27 students across all classes</p>
      <a href="../student result/index.html" class="card-btn" style="margin-top: 15px;">View All Students</a>
    </div>
  `;
}

// Add student form handler
document.getElementById('addStudentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('studentName').value.trim();
  const studentClass = document.getElementById('studentClass').value;
  const password = document.getElementById('studentPassword').value.trim();

  if (!name || !studentClass || !password) {
    alert('Please fill in all fields');
    return;
  }

  // Show instructions for manual addition
  const instructions = `
Student Added Successfully! 📝

To complete the addition, add this code to student.js:

1. In the students object, add to ${studentClass} array:
   "${name}"

2. In the studentPasswords object, add:
   "${name}": "${password}"

File location: student result/student.js

The student will then appear in the student results system.
  `;

  alert(instructions);
  document.getElementById('addStudentForm').reset();
});

// Load student names for results dropdown
function loadStudentNamesForResults() {
  // Sample student names - in production, load from database
  const students = [
    "Emmanuel Angel", "Emmanuel Ejiro", "Augusii Bethel", "Trustgod Areh",
    "Prince Boniface", "Antoye Gloria", "Oyinnuah proyebuyeg", "Delight starry",
    "Goodness Ebikabowei", "Favour Jackson", "Adura Boniface", "Azibagiri Mentor",
    "Igodo Tresure", "samuel adawgu", "Ferida Monday", "Igodo Majesty",
    "Azibagiri Godson", "David Osei", "Igodo Godswill", "Ogaga Glorious",
    "Perpetual", "Piama Isikpi", "Gift Forcebray", "Monday Faoziya", "Stanley Favour"
  ];

  const select = document.getElementById('resultStudentName');
  students.forEach(student => {
    const option = document.createElement('option');
    option.value = student;
    option.textContent = student;
    select.appendChild(option);
  });
}

// Create subject input fields
function createSubjectFields() {
  const subjects = [
    "English Language", "Mathematics", "Basic Science & tech", "National Values",
    "P.H.E", "Computer Studies", "Pre-vocational Studies", "History",
    "C.C.A", "Quantitative reasoning", "Verbal reasoning", "Hand-writing",
    "C.R.S", "Phonics"
  ];

  const container = document.getElementById('subjectsContainer');
  
  subjects.forEach(subject => {
    const div = document.createElement('div');
    div.className = 'subject-row';
    div.innerHTML = `
      <label>${subject}:</label>
      <input type="number" class="score-input" placeholder="Test1" min="0" max="20" data-subject="${subject}" data-type="test1">
      <input type="number" class="score-input" placeholder="Test2" min="0" max="20" data-subject="${subject}" data-type="test2">
      <input type="number" class="score-input" placeholder="Exam" min="0" max="60" data-subject="${subject}" data-type="exam">
      <span class="total-display">Total: 0</span>
    `;
    container.appendChild(div);

    // Add auto-calculation
    const inputs = div.querySelectorAll('.score-input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const row = input.closest('.subject-row');
        const test1 = parseInt(row.querySelector('[data-type="test1"]').value) || 0;
        const test2 = parseInt(row.querySelector('[data-type="test2"]').value) || 0;
        const exam = parseInt(row.querySelector('[data-type="exam"]').value) || 0;
        const total = test1 + test2 + exam;
        row.querySelector('.total-display').textContent = `Total: ${total}`;
      });
    });
  });
}

// Add result form handler
document.getElementById('addResultForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const studentName = document.getElementById('resultStudentName').value;
  const term = document.getElementById('resultTerm').value;
  const year = document.getElementById('resultYear').value;
  const teacherRemark = document.getElementById('teacherRemark').value;
  const principalRemark = document.getElementById('principalRemark').value;
  const nextTermBegins = document.getElementById('nextTermBegins').value;

  // Collect all subject scores
  const subjects = [];
  document.querySelectorAll('.subject-row').forEach(row => {
    const subject = row.querySelector('[data-type="test1"]').dataset.subject;
    const test1 = parseInt(row.querySelector('[data-type="test1"]').value) || 0;
    const test2 = parseInt(row.querySelector('[data-type="test2"]').value) || 0;
    const exam = parseInt(row.querySelector('[data-type="exam"]').value) || 0;
    const total = test1 + test2 + exam;
    
    const grade = total >= 70 ? 'A' : total >= 55 ? 'B' : total >= 40 ? 'C' : 'F';
    const remark = total >= 90 ? 'Excellent' : total >= 70 ? 'Very Good' : total >= 55 ? 'Good' : 'Fair';

    subjects.push({
      name: subject,
      test1,
      test2,
      exam,
      total,
      grade,
      remark
    });
  });

  // Generate code to add to student.js
  const resultCode = `
"${studentName}": {
  class: "primary X", // Update with correct class
  term: "${term}",
  year: "${year}",
  subjects: ${JSON.stringify(subjects, null, 4)},
  formTeacherRemark: "${teacherRemark}",
  hostelMasterRemark: "–",
  guidanceCounsellorRemark: "Keep up the good work.",
  principalRemark: "${principalRemark}",
  nextTermBegins: "${nextTermBegins}"
}
  `;

  // Show instructions
  alert(`Result created! 📊\n\nTo save this result, add the following code to:\nstudent result/student.js\n\nIn the studentResults object.\n\nCheck the browser console for the code.`);
  console.log('=== ADD THIS TO student.js studentResults object ===');
  console.log(resultCode);
  console.log('=== END ===');

  // Optionally reset form
  if (confirm('Result code copied to console. Reset form?')) {
    document.getElementById('addResultForm').reset();
    document.querySelectorAll('.total-display').forEach(el => el.textContent = 'Total: 0');
  }
});

// Generate sample results
function generateSampleResults() {
  if (!confirm('This will generate sample results for all students without results. Continue?')) {
    return;
  }

  alert('Sample results generation feature!\n\nThis would create random scores for all students.\n\nFor now, you can:\n1. Use the "Add/Edit Student Result" form above\n2. Or run the generate-results.js script in student result folder');
}

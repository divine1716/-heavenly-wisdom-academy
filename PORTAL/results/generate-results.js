// Helper script to generate sample results for remaining students
// Run this once to generate results, then copy to student.js

const remainingStudents = [
  // Primary 2
  { name: "Oyinnuah proyebuyeg", class: "primary 2" },
  { name: "Delight starry", class: "primary 2" },
  { name: "Goodness Ebikabowei", class: "primary 2" },
  { name: "Favour Jackson", class: "primary 2" },
  
  // Primary 3
  { name: "Adura Boniface", class: "primary 3" },
  { name: "Azibagiri Mentor", class: "primary 3" },
  { name: "Igodo Tresure", class: "primary 3" },
  { name: "samuel adawgu", class: "primary 3" },
  { name: "Ferida Monday", class: "primary 3" },
  
  // Primary 4
  { name: "Igodo Majesty", class: "primary 4" },
  { name: "Azibagiri Godson", class: "primary 4" },
  { name: "David Osei", class: "primary 4" },
  
  // Primary 5
  { name: "Igodo Godswill", class: "primary 5" },
  { name: "Ogaga Glorious", class: "primary 5" },
  { name: "Perpetual", class: "primary 5" },
  
  // JSS 1
  { name: "Piama Isikpi", class: "jss 1" },
  { name: "Gift Forcebray", class: "jss 1" },
  { name: "Monday Faoziya", class: "jss 1" },
  
  // SS 1
  { name: "Stanley Favour", class: "ss 1" }
];

const subjects = [
  "English Language",
  "Mathematics",
  "Basic Science & tech",
  "National Values",
  "P.H.E",
  "Computer Studies",
  "Pre-vocational Studies",
  "History",
  "C.C.A",
  "Quantitative reasoning",
  "Verbal reasoning",
  "Hand-writing",
  "C.R.S",
  "Phonics"
];

function getGrade(total) {
  if (total >= 70) return "A";
  if (total >= 55) return "B";
  if (total >= 40) return "C";
  return "F";
}

function getRemark(total) {
  if (total >= 90) return "Excellent";
  if (total >= 70) return "Very Good";
  if (total >= 55) return "Good";
  return "Fair";
}

function generateRandomScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSubjectScores() {
  return subjects.map(subject => {
    const test1 = generateRandomScore(10, 20);
    const test2 = generateRandomScore(10, 20);
    const exam = generateRandomScore(35, 60);
    const total = test1 + test2 + exam;
    return {
      name: subject,
      test1,
      test2,
      exam,
      total,
      grade: getGrade(total),
      remark: getRemark(total)
    };
  });
}

// Generate results for all students
remainingStudents.forEach(student => {
  const result = {
    class: student.class,
    term: "First Term",
    year: "2025/2026",
    subjects: generateSubjectScores(),
    formTeacherRemark: "Good performance this term.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the good work.",
    principalRemark: "Well done!",
    nextTermBegins: "January 15, 2026"
  };
  
  console.log(`"${student.name}": ${JSON.stringify(result, null, 2)},\n`);
});

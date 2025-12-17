
const students = [
  {
    name: "Prince Boniface",
    subjects: [
      { name: "English Language", test1: 11, test2: 15, exam: 35, total: 61 },
      { name: "Mathematics", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Basic Science & tech", test1: 20, test2: 20, exam: 45, total: 85 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 14, test2: 18, exam: 42, total: 74 },
      { name: "Computer Studies", test1: 19, test2: 16, exam: 48, total: 83 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 40, total: 80 },
      { name: "History", test1: 16, test2: 18, exam: 38, total: 67 },
      { name: "C.C.A", test1: 16, test2: 19, exam: 47, total: 82 },
      { name: "Quantitative reasoning", test1: 17, test2: 20, exam: 50, total: 87 },
      { name: "Verbal reasoning", test1: 20, test2: 19, exam: 57, total: 96 },
      { name: "Hand-writing", test1: 20, test2: 19, exam: 55, total: 94 },
      { name: "C.R.S", test1: 18, test2: 20, exam: 54, total: 92 },
      { name: "Phonics", test1: 15, test2: 11, exam: 33, total: 59 }
    ],
    formTeacherRemark: "Excellent performance. Keep it up!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "You are doing great. Stay focused.",
    principalRemark: "Outstanding result. Well done!"
  },
  {
    name: "Antoye Gloria",
    subjects: [
      { name: "English Language", test1: 13, test2: 16, exam: 40, total: 69 },
      { name: "Mathematics", test1: 18, test2: 16, exam: 42, total: 76 },
      { name: "Basic Science & tech", test1: 15, test2: 16, exam: 48, total: 79 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 18, test2: 12, exam: 45, total: 75 },
      { name: "Computer Studies", test1: 15, test2: 10, exam: 30, total: 55 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "History", test1: 5, test2: 10, exam: 16, total: 31 },
      { name: "C.C.A", test1: 7, test2: 19, exam: 21, total: 47 },
      { name: "Quantitative reasoning", test1: 15, test2: 18, exam: 45, total: 78 },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Hand-writing", test1: 14, test2: 18, exam: 40, total: 72 },
      { name: "C.R.S", test1: 16, test2: 17, exam: 49, total: 82 },
      { name: "Phonics", test1: 15, test2: 16, exam: 47, total: 78 }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Well done!"
  },
  {
    name: "Oyinnuah proyebuyeg",
    subjects: [
      { name: "English Language", test1: 15, test2: 18, exam: 55, total: 88 },
      { name: "Mathematics", test1: 18, test2: 20, exam: 55, total: 93 },
      { name: "Basic Science & tech", test1: 16, test2: 17, exam: 49, total: 82 },
      { name: "Quantitative reasoning", test1: 18, test2: 20, exam: 55, total: 93 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 10, test2: 18, exam: 28, total: 56 },
      { name: "Computer Studies", test1: 14, test2: 8, exam: 24, total: 46 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "History", test1: 10, test2: 15, exam: 15, total: 40 },
      { name: "C.C.A", test1: 11, test2: 13, exam: 32, total: 56 },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Hand-writing", test1: 14, test2: 18, exam: 40, total: 72 },
      { name: "C.R.S", test1: 17, test2: 18, exam: 50, total: 85 },
      { name: "Phonics", test1: 10, test2: 6, exam: 16, total: 32 }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Well done!"
  },
  {
    name: "Delight starry",
    subjects: [
      { name: "English Language", test1: 8, test2: 19, exam: 45, total: 72 },
      { name: "Mathematics", test1: 18, test2: 18, exam: 45, total: 81 },
      { name: "Basic Science & tech", test1: 12, test2: 12, exam: 30, total: 54 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 14, test2: 17, exam: 42, total: 73 },
      { name: "Computer Studies", test1: 10, test2: 13, exam: 28, total: 51 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "History", test1: 6, test2: 10, exam: 18, total: 34 },
      { name: "C.C.A", test1: 14, test2: 18, exam: 40, total: 72 },
      { name: "Quantitative reasoning", test1: 10, test2: 13, exam: 30, total: 53 },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Hand-writing", test1: 18, test2: 14, exam: 40, total: 72 },
      { name: "C.R.S", test1: 18, test2: 19, exam: 53, total: 90 },
      { name: "Phonics", test1: 17, test2: 18, exam: 51, total: 86 }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Well done!"
  },
  {
    name: "Goodness Ebikabowei",
    subjects: [
      { name: "English Language", test1: 11, test2: 18, exam: 44, total: 73 },
      { name: "Mathematics", test1: 15, test2: 18, exam: 46, total: 79 },
      { name: "Basic Science & tech", test1: 8, test2: 8, exam: 32, total: 48 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 7, test2: 11, exam: 20, total: 38 },
      { name: "Computer Studies", test1: 6, test2: 10, exam: 16, total: 32 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "History", test1: 16, test2: 13, exam: 9, total: 38 },
      { name: "C.C.A", test1: 17, test2: 15, exam: 45, total: 77 },
      { name: "Quantitative reasoning", test1: 9, test2: 12, exam: 25, total: 46 },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Hand-writing", test1: 19, test2: 20, exam: 55, total: 94 },
      { name: "C.R.S", test1: 19, test2: 20, exam: 56, total: 95 },
      { name: "Phonics", test1: 12, test2: 8, exam: 23, total: 43 }
    ],
    formTeacherRemark: "Goodness is an exceptional student with outstanding performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Excellent work. Keep it up!",
    principalRemark: "Outstanding performance!"
  },
  {
    name: "Favour Jackson",
    subjects: [
      { name: "English Language", test1: 13, test2: 16, exam: 50, total: 79 },
      { name: "Mathematics", test1: 14, test2: 17, exam: 34, total: 65 },
      { name: "Basic Science & tech", test1: 15, test2: 16, exam: 46, total: 77 },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "P.H.E", test1: 16, test2: 20, exam: 47, total: 83 },
      { name: "Computer Studies", test1: 12, test2: 15, exam: 36, total: 63 },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "History", test1: 13, test2: 17, exam: 39, total: 69 },
      { name: "C.C.A", test1: 18, test2: 16, exam: 40, total: 74 },
      { name: "Quantitative reasoning", test1: 20, test2: 17, exam: 50, total: 87 },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100 },
      { name: "Hand-writing", test1: 15, test2: 18, exam: 45, total: 78 },
      { name: "C.R.S", test1: 16, test2: 17, exam: 47, total: 80 },
      { name: "Phonics", test1: 15, test2: 16, exam: 45, total: 76 }
    ],
    formTeacherRemark: "Favour is making good progress. Keep working hard!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve your study habits.",
    principalRemark: "Good work. Aim higher next term!"
  }
];

function calculateGrade(total) {
  if (total >= 90) return "A1";
  if (total >= 80) return "A2";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

function getRemark(total) {
  if (total >= 90) return "Excellent";
  if (total >= 80) return "Very Good";
  if (total >= 70) return "Good";
  if (total >= 60) return "Credit";
  if (total >= 50) return "Pass";
  return "Fail";
}

let output = "";

students.filter(s => ["Oyinnuah proyebuyeg", "Delight starry", "Goodness Ebikabowei", "Favour Jackson"].includes(s.name)).forEach(student => {
  let grandTotal = 0;
  student.subjects.forEach(subject => {
    subject.total = subject.test1 + subject.test2 + subject.exam;
    subject.grade = calculateGrade(subject.total);
    subject.remark = getRemark(subject.total);
    grandTotal += subject.total;
  });
  student.grandTotal = grandTotal;
  student.average = (grandTotal / student.subjects.length).toFixed(2);
  
  output += `  "${student.name}": {\n`;
  output += `    class: "primary 2",\n`;
  output += `    term: "First Term",\n`;
  output += `    year: "2025/2026",\n`;
  output += `    grandTotal: ${student.grandTotal},\n`;
  output += `    average: "${student.average}",\n`;
  output += `    subjects: [\n`;
  student.subjects.forEach((subject, index) => {
    output += `      { name: "${subject.name}", test1: ${subject.test1}, test2: ${subject.test2}, exam: ${subject.exam}, total: ${subject.total}, grade: "${subject.grade}", remark: "${subject.remark}" }${index < student.subjects.length - 1 ? "," : ""}\n`;
  });
  output += `    ],\n`;
  output += `    formTeacherRemark: "${student.formTeacherRemark}",\n`;
  output += `    hostelMasterRemark: "${student.hostelMasterRemark}",\n`;
  output += `    guidanceCounsellorRemark: "${student.guidanceCounsellorRemark}",\n`;
  output += `    principalRemark: "${student.principalRemark}",\n`;
  output += `    nextTermBegins: "January 15, 2026"\n`;
  output += `  },\n\n`;
});

console.log(output);

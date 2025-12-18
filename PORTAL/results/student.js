export const students = {
  creche: [
    "Albert Purity Amarachi",
    "Good News Moses",
    "Igodo Richman"
  ],
  "pre-nursery": [
    "Angel Melody",
    "Antony Victory",
    "Starry Mackenzie"
  ],
  nursery1: [
    "Forcebray Glory",
    "Zoe Justice",
    "Preye Duye Ebiakpo",
    "Reward Tari",
    "Lukesman Rosemary",
    "Ebirabwel Greatness"
  ],
  nursery2: [],
  nursery3: [],

  primary1: [
    "Emmanuel Angel",
    "Emmanuel Ejiro",
    "Augusii Bethel",
    "Trustgod Areh"
  ],

  primary2: [
    "Prince Boniface",
    "Antoye Gloria",
    "Oyinnuah proyebuyeg",
    "Delight starry",
    "Goodness Ebikabowei",
    "Favour Jackson"
  ],

  primary3: [
    "Adura Boniface",
    "Azibagiri Mentor",
    "Igodo Tresure",
    "samuel adawgu",
    "Ferida Monday"
  ],

  primary4: ["Majesty Jonathan Igodo", "Azibagiri Godson"],
  primary5: ["Godswill Jonathan Igodo", "Oweilayefa Perpetual", "Emmanuel George", "Ogaga Glorious"],

  jss1: ["Piama Isikpi", "Gift Forcebray", "Monday Faoziya"],
  jss2: [],
  jss3: [],

  ss1: ["Stanley Favour"],
  ss2: [],
  ss3: []
};

// Student passwords - Format: FirstLetters + Numbers + LastLetters
// Example: "Emmanuel Angel" = "EmAn2025gel"
export const studentPasswords = {
  // Creche
  "Albert Purity Amarachi": "AlPu2025mar",
  "Good News Moses": "GoNe2025ses",
  "Igodo Richman": "IgRi2025man",
  
  // Nursery 1
  "Forcebray Glory": "Foce2025ory",
  "Zoe Justice": "ZoJu2025ice",
  "Preye Duye Ebiakpo": "Pre2025akpo",
  "Reward Tari": "ReTa2025ari",
  "Antoye Sunday Victory": "AnSu2025ory",
  "Lukesman Rosemary": "LuRo2025ary",
  "Ebirabwel Greatness": "EbGr2025ess",
  
  // Primary 1
  "Emmanuel Angel": "EmAn2025gel",
  "Emmanuel Ejiro": "EmEj2025iro",
  "Augusii Bethel": "AuBe2025hel",
  "Trustgod Areh": "TrAr2025reh",
  "Forcebray Emmanuella": "Force22lla",
  
  // Primary 2
  "Prince Boniface": "PrBo2025ace",
  "Antoye Gloria": "AnGl2025ria",
  "Oyinnuah proyebuyeg": "OyPr2025yeg",
  "Delight starry": "DeSt2025rry",
  "Goodness Ebikabowei": "GoEb2025wei",
  "Favour Jackson": "FaJa2025son",
  
  // Primary 3
  "Adura Boniface": "AdBo2025ace",
  "Azibagiri Mentor": "AzMe2025tor",
  "Igodo Tresure": "IgTr2025ure",
  "samuel adawgu": "SaAd2025wgu",
  "Ferida Monday": "FeMo2025day",
  
  // Primary 4
  "Igodo Majesty": "IgMa2025sty",
  "Azibagiri Godson": "AzGo2025son",
  "David Osei": "DaOs2025sei",
  
  // Primary 5
  "Igodo Godswill": "IgGo2025ill",
  "Ogaga Glorious": "OgGl2025ous",
  "Perpetual": "Pe2025tual",
  
  // JSS 1
  "Piama Isikpi": "PiIs2025kpi",
  "Gift Forcebray": "GiFo2025ray",
  "Monday Faoziya": "MoFa2025iya",
  
  // SS 1
  "Stanley Favour": "StFa2025our"
};

// Student results data
export const studentResults = {
  // NURSERY 1 STUDENTS
  "Forcebray Glory": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1186,
    average: "91.23",
    subjects: [
      { name: "Literacy (English)", test1: 13, test2: 15, exam: 48, total: 76, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Excellent" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 46, total: 86, grade: "A", remark: "Very Good" },
      { name: "Bible Knowledge", test1: 19, test2: 20, exam: 59, total: 98, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 55, total: 95, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 53, total: 93, grade: "A", remark: "Excellent" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 53, total: 93, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 18, test2: 17, exam: 60, total: 95, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 20, test2: 12, exam: 58, total: 90, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Force is a brilliant and active child. Keep it up!",
    principalRemark: "Excellent performance. Well done!",
    nextTermBegins: "January 15, 2026"
  },

  "Zoe Justice": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1190,
    average: "91.54",
    subjects: [
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 16, test2: 20, exam: 50, total: 86, grade: "A", remark: "Very Good" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 55, total: 95, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Bible Knowledge", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 55, total: 95, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 20, test2: 19, exam: 60, total: 99, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 15, test2: 20, exam: 48, total: 83, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Zoe is doing very well. Keep up the good work!",
    principalRemark: "Very good performance!",
    nextTermBegins: "January 15, 2026"
  },

  "Forcebray Emmanuella": {
    class: "primary 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1201,
    average: "85.78",
    subjects: [
      { name: "English Language", test1: 18, test2: 17, exam: 39, total: 74, grade: "B", remark: "good" },
      { name: "Mathematics", test1: 15, test2: 20, exam: 34, total: 69, grade: "C", remark: "Credit" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 46, total: 86, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 18, exam: 40, total: 78, grade: "B", remark: "Good" },
      { name: "Basic Science & tech", test1: 20, test2: 18, exam: 60, total: 98, grade: "A1", remark: "Execellent" },
      { name: "National Values", test1: 20, test2: 20, exam: 54, total: 94, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 20, test2: 20, exam: 50, total: 90, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 20, test2: 18, exam: 56, total: 94, grade: "A1", remark: "Excellent" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "very good" },
      { name: "History", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 20, exam: 7, total: 47, grade: "F", remark: "Fail" },
      { name: "Verbal reasoning", test1: 20, test2: 15, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 35, total: 75, grade: "B", remark: "Good" },
      { name: "C.R.S", test1: 20, test2: 15, exam: 42, total: 77, grade: "B", remark: "Good" }
    ],
    formTeacherRemark: "He is intelligent but rough.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Ensure you make the school and your family proud.",
    principalRemark: "An excellent result. Keep it up. But next time improve in your neatness",
    nextTermBegins: "January 5, 2026"
  },

  "Emmanuel Angel": {
    class: "primary 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1201,
    average: "85.78",
    subjects: [
      { name: "English Language", test1: 20, test2: 17, exam: 37, total: 74, grade: "B", remark: "good" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 53, total: 93, grade: "A1", remark: "Excellent" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Execellent" },
      { name: "Basic Science & tech", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Execellent" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 20, test2: 20, exam: 45, total: 85, grade: "A2", remark: "Very Good" },
      { name: "P.H.E", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Excellent" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 48, total: 88, grade: "A2", remark: "very good" },
      { name: "History", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 20, exam: 24, total: 64, grade: "C", remark: "credit" },
      { name: "Verbal reasoning", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 46, total: 84, grade: "A2", remark: "very good" },
      { name: "C.R.S", test1: 20, test2: 20, exam: 57, total: 97, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "He is intelligent but rough.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Ensure you make the school and your family proud.",
    principalRemark: "An excellent result. Keep it up. But next time improve in your neatness",
    nextTermBegins: "January 5, 2026"
  },
  "Emmanuel Ejiro": {
    class: "primary 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1239,
    average: "88.50",
    subjects: [
      { name: "English Language", test1: 20, test2: 20, exam: 52, total: 92, grade: "A1", remark: "Execellent" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 52, total: 92, grade: "A1", remark: "Execellent" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 41, total: 81, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Execellent" },
      { name: "Basic Science & technology", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Execellent" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Execellent" },
      { name: "Hand-writing", test1: 20, test2: 20, exam: 50, total: 90, grade: "A1", remark: "Execellent" },
      { name: "P.H.E", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Execellent" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 54, total: 94, grade: "A1", remark: "Execellent" },
      { name: "History", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 48, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Execellent" },
      { name: "C.R.S", test1: 20, test2: 20, exam: 56, total: 96, grade: "A", remark: "Execellent" }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to be diligent in your studies.",
    principalRemark: "Well done. Keep it up.",
    nextTermBegins: "January 5, 2026"
  },
  "Augusii Bethel": {
    class: "primary 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1046,
    average: "74.71",
    subjects: [
      { name: "English Language", test1: 18, test2: 15, exam: 40, total: 73, grade: "B", remark: "Good" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 41, total: 81, grade: "A2", remark: "Very good" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 41, total: 81, grade: "C", remark: "Very good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 36, total: 76, grade: "B", remark: "Good" },
      { name: "Basic Science % tech", test1: 20, test2: 20, exam: 46, total: 86, grade: "A2", remark: "Very Good" },
      { name: "National Values", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Execellent" },
      { name: "Hand-writing", test1: 20, test2: 18, exam: 40, total: 78, grade: "B", remark: "Good" },
      { name: "P.H.E", test1: 20, test2: 18, exam: 33, total: 71, grade: "B", remark: "Good" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "History", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 20, exam: 53, total: 93, grade: "A1", remark: "Execellent" },
      { name: "Verbal reasoning", test1: 20, test2: 15, exam: 39, total: 74, grade: "B", remark: "Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 2, total: 42, grade: "F", remark: "Fail" },
      { name: "C.R.S", test1: 20, test2: 15, exam: 35, total: 70, grade: "b", remark: "Good" }
    ],
    formTeacherRemark: "Good effort. More practice needed.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep improving your study habits.",
    principalRemark: "Good work. Aim higher next term.",
    nextTermBegins: "January 5, 2026"
  },
  "Trustgod Areh": {
    class: "primary 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1111,
    average: "79.85",
    subjects: [
      { name: "English Language", test1: 18, test2: 20, exam: 52, total: 90, grade: "A1", remark: "Execellent" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 55, total: 95, grade: "A1", remark: "Execellent" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 45, total: 85, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 32, total: 72, grade: "B", remark: "Good" },
      { name: "Basic Science & tech", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "National Values", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 15, test2: 18, exam: 40, total: 73, grade: "B", remark: "Good" },
      { name: "P.H.E", test1: 20, test2: 20, exam: 56, total: 96, grade: "A1", remark: "Excellent" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 24, total: 64, grade: "C", remark: "Credit" },
      { name: "History", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 20, exam: 30, total: 70, grade: "B", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 20, test2: 18, exam: 51, total: 89, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 42, total: 82, grade: "A2", remark: "Very Good" },
      { name: "C.R.S", test1: 20, test2: 20, exam: 28, total: 68, grade: "C", remark: "Credit" }
    ],
    formTeacherRemark: "Excellent performance. Keep it up!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "You are doing great. Stay focused.",
    principalRemark: "Outstanding result. Well done!",
    nextTermBegins: "January 15, 2026"
  },

  // PRIMARY 2 STUDENTS
  "Prince Boniface": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1148,
    average: "82.00",
    subjects: [
      { name: "English Language", test1: 11, test2: 15, exam: 35, total: 61, grade: "C", remark: "Credit" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Basic Science & tech", test1: 20, test2: 20, exam: 45, total: 85, grade: "A2", remark: "Very Good" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 14, test2: 18, exam: 42, total: 74, grade: "B", remark: "Good" },
      { name: "Computer Studies", test1: 19, test2: 16, exam: 48, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 40, total: 80, grade: "A2", remark: "Very Good" },
      { name: "History", test1: 16, test2: 18, exam: 38, total: 67, grade: "C", remark: "Credit" },
      { name: "C.C.A", test1: 16, test2: 19, exam: 47, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 17, test2: 20, exam: 50, total: 87, grade: "A2", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 20, test2: 19, exam: 57, total: 96, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 20, test2: 19, exam: 55, total: 94, grade: "A1", remark: "Excellent" },
      { name: "C.R.S", test1: 18, test2: 20, exam: 54, total: 92, grade: "A1", remark: "Excellent" },
      { name: "Phonics", test1: 15, test2: 11, exam: 33, total: 59, grade: "D", remark: "Pass" }
    ],
    formTeacherRemark: "Excellent performance. Keep it up!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "You are doing great. Stay focused.",
    principalRemark: "Outstanding result. Well done!",
    nextTermBegins: "January 15, 2026"
  },

  "Antoye Gloria": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1022,
    average: "73.00",
    subjects: [
      { name: "English Language", test1: 13, test2: 16, exam: 40, total: 69, grade: "C", remark: "Credit" },
      { name: "Mathematics", test1: 18, test2: 16, exam: 42, total: 76, grade: "B", remark: "Good" },
      { name: "Basic Science & tech", test1: 15, test2: 16, exam: 48, total: 79, grade: "B", remark: "Good" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 18, test2: 12, exam: 45, total: 75, grade: "B", remark: "Good" },
      { name: "Computer Studies", test1: 15, test2: 10, exam: 30, total: 55, grade: "D", remark: "Pass" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "History", test1: 5, test2: 10, exam: 16, total: 31, grade: "F", remark: "Fail" },
      { name: "C.C.A", test1: 7, test2: 19, exam: 21, total: 47, grade: "F", remark: "Fail" },
      { name: "Quantitative reasoning", test1: 15, test2: 18, exam: 45, total: 78, grade: "B", remark: "Good" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 14, test2: 18, exam: 40, total: 72, grade: "B", remark: "Good" },
      { name: "C.R.S", test1: 16, test2: 17, exam: 49, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 15, test2: 16, exam: 47, total: 78, grade: "B", remark: "Good" }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Well done!",
    nextTermBegins: "January 15, 2026"
  },

  // REMAINING NURSERY 1 STUDENTS
  "Preye Duye Ebiakpo": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1242,
    average: "95.54",
    subjects: [
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Bible Knowledge", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 16, test2: 16, exam: 56, total: 88, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 55, total: 95, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 19, test2: 18, exam: 60, total: 97, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Priye is a dedicated student with good performance. Keep improving!",
    principalRemark: "Very good work. Continue to excel!",
    nextTermBegins: "January 15, 2026"
  },

  "Angel Melody": {
    class: "Pre-Nursery",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1092,
    average: "91.00",
    subjects: [
      { name: "Literacy (English)", test1: 18, test2: 20, exam: 55, total: 93, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 15, exam: 60, total: 95, grade: "A", remark: "Excellent" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Bible Knowledge", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Handwriting", test1: 14, test2: 15, exam: 46, total: 75, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 14, test2: 18, exam: 54, total: 81, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Angel is doing well. Keep up the good work!",
    principalRemark: "Good performance. Well done!",
    nextTermBegins: "January 15, 2026"
  },

  "Reward Tari": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1186,
    average: "91.23",
    subjects: [
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 17, exam: 60, total: 97, grade: "A", remark: "Excellent" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 46, total: 86, grade: "A", remark: "Very Good" },
      { name: "Bible Knowledge", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 24, total: 64, grade: "C", remark: "Credit" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 16, test2: 15, exam: 60, total: 91, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Reward is an excellent student with outstanding abilities!",
    principalRemark: "Excellent performance. Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "Antony Victory": {
    class: "Pre-Nursery",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1224,
    average: "87.43",
    subjects: [
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 51, total: 91, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 15, test2: 10, exam: 54, total: 79, grade: "A", remark: "Very Good" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 30, total: 70, grade: "A", remark: "Very Good" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Bible Knowledge", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 17, test2: 16, exam: 60, total: 93, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 18, test2: 10, exam: 40, total: 68, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 17, test2: 20, exam: 50, total: 87, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Victory is making good progress. Keep working hard!",
    principalRemark: "Good work. Continue to improve!",
    nextTermBegins: "January 15, 2026"
  },

  "Ebirabwel Greatness": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 878,
    average: "87.80",
    subjects: [
      { name: "Numeracy (Mathematics)", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Literacy (English)", test1: 19, test2: 20, exam: 52, total: 91, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 20, test2: 19, exam: 60, total: 99, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 43, total: 83, grade: "A", remark: "Very Good" },
      { name: "Rhymes & Songs", test1: 20, test2: 20, exam: 55, total: 95, grade: "A", remark: "Excellent" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 57, total: 97, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 12, test2: 19, exam: 42, total: 73, grade: "A", remark: "Very Good" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 30, total: 70, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Great effort in Numeracy.",
    principalRemark: "Good performance. Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "Lukesman Rosemary": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 769,
    average: "85.44",
    subjects: [
      { name: "Numeracy (Mathematics)", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Excellent" },
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" },
      { name: "Nursery Science", test1: 17, test2: 16, exam: 60, total: 93, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 38, total: 78, grade: "B", remark: "Good" },
      { name: "Social Habits", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 20, total: 60, grade: "B", remark: "Good" },
      { name: "Phonics", test1: 18, test2: 20, exam: 56, total: 94, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 20, test2: 20, exam: 40, total: 80, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Shows strong ability in Numeracy.",
    principalRemark: "Very good performance.",
    nextTermBegins: "January 15, 2026"
  },

  "Shilatowa Ominigod": {
    class: "Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 872,
    average: "87.20",
    subjects: [
      { name: "Literacy (English)", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Rhymes & Songs", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Social Habits", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Bible Knowledge", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "Handwriting", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Shilatowa is a bright student with great potential!",
    principalRemark: "Very good performance. Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "lukesman Rosemary": {
    class: "Pre-Nursery 1",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 822,
    average: "82.20",
    subjects: [
      { name: "Literacy (English)", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Rhymes & Songs", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Colouring", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" },
      { name: "Health Habits", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Social Habits", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Bible Knowledge", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Handwriting", test1: 14, test2: 15, exam: 45, total: 74, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Rosemary is doing well. Keep up the good work!",
    principalRemark: "Good performance. Well done!",
    nextTermBegins: "January 5, 2026"
  },

  // REMAINING PRIMARY 2 STUDENTS
  "Oyinnuah proyebuyeg": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1043,
    average: "74.50",
    subjects: [
      { name: "English Language", test1: 15, test2: 18, exam: 55, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Mathematics", test1: 18, test2: 20, exam: 55, total: 93, grade: "A1", remark: "Excellent" },
      { name: "Basic Science & tech", test1: 16, test2: 17, exam: 49, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 18, test2: 20, exam: 55, total: 93, grade: "A1", remark: "Excellent" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 10, test2: 18, exam: 28, total: 56, grade: "D", remark: "Pass" },
      { name: "Computer Studies", test1: 14, test2: 8, exam: 24, total: 46, grade: "F", remark: "Fail" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "History", test1: 10, test2: 15, exam: 15, total: 40, grade: "F", remark: "Fail" },
      { name: "C.C.A", test1: 11, test2: 13, exam: 32, total: 56, grade: "D", remark: "Pass" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 14, test2: 18, exam: 40, total: 72, grade: "B", remark: "Good" },
      { name: "C.R.S", test1: 17, test2: 18, exam: 50, total: 85, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 10, test2: 6, exam: 16, total: 32, grade: "F", remark: "Fail" }
    ],
    formTeacherRemark: "Good performance. Keep working hard.",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Well done!",
    nextTermBegins: "January 5, 2026"
  },

  "Delight starry": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1038,
    average: "74.14",
    subjects: [
      { name: "English Language", test1: 8, test2: 19, exam: 45, total: 72, grade: "B", remark: "Good" },
      { name: "Mathematics", test1: 18, test2: 18, exam: 45, total: 81, grade: "A2", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 12, test2: 12, exam: 30, total: 54, grade: "D", remark: "Pass" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 14, test2: 17, exam: 42, total: 73, grade: "B", remark: "Good" },
      { name: "Computer Studies", test1: 10, test2: 13, exam: 28, total: 51, grade: "D", remark: "Pass" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "History", test1: 6, test2: 10, exam: 18, total: 34, grade: "F", remark: "Fail" },
      { name: "C.C.A", test1: 14, test2: 18, exam: 40, total: 72, grade: "B", remark: "Good" },
      { name: "Quantitative reasoning", test1: 10, test2: 13, exam: 30, total: 53, grade: "D", remark: "Pass" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 18, test2: 14, exam: 40, total: 72, grade: "B", remark: "Good" },
      { name: "C.R.S", test1: 18, test2: 19, exam: 53, total: 90, grade: "A1", remark: "Excellent" },
      { name: "Phonics", test1: 17, test2: 18, exam: 51, total: 86, grade: "A2", remark: "Very Good" }
    ],
    formTeacherRemark: "Delight is a bright student. Excellent work!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the excellent performance.",
    principalRemark: "Outstanding work!",
    nextTermBegins: "January 5, 2026"
  },

  "Goodness Ebikabowei": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 963,
    average: "68.79",
    subjects: [
      { name: "English Language", test1: 11, test2: 18, exam: 44, total: 73, grade: "B", remark: "Good" },
      { name: "Mathematics", test1: 15, test2: 18, exam: 46, total: 79, grade: "B", remark: "Good" },
      { name: "Basic Science & tech", test1: 8, test2: 8, exam: 32, total: 48, grade: "F", remark: "Fail" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 7, test2: 11, exam: 20, total: 38, grade: "F", remark: "Fail" },
      { name: "Computer Studies", test1: 6, test2: 10, exam: 16, total: 32, grade: "F", remark: "Fail" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "History", test1: 16, test2: 13, exam: 9, total: 38, grade: "F", remark: "Fail" },
      { name: "C.C.A", test1: 17, test2: 15, exam: 45, total: 77, grade: "B", remark: "Good" },
      { name: "Quantitative reasoning", test1: 9, test2: 12, exam: 25, total: 46, grade: "F", remark: "Fail" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 19, test2: 20, exam: 55, total: 94, grade: "A1", remark: "Excellent" },
      { name: "C.R.S", test1: 19, test2: 20, exam: 56, total: 95, grade: "A1", remark: "Excellent" },
      { name: "Phonics", test1: 12, test2: 8, exam: 23, total: 43, grade: "F", remark: "Fail" }
    ],
    formTeacherRemark: "Goodness is an exceptional student with outstanding performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Excellent work. Keep it up!",
    principalRemark: "Outstanding performance!",
    nextTermBegins: "January 5, 2026"
  },

  "Favour Jackson": {
    class: "primary 2",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1131,
    average: "80.79",
    subjects: [
      { name: "English Language", test1: 13, test2: 16, exam: 50, total: 79, grade: "B", remark: "Good" },
      { name: "Mathematics", test1: 14, test2: 17, exam: 34, total: 65, grade: "C", remark: "Credit" },
      { name: "Basic Science & tech", test1: 15, test2: 16, exam: 46, total: 77, grade: "B", remark: "Good" },
      { name: "National Values", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "P.H.E", test1: 16, test2: 20, exam: 47, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 12, test2: 15, exam: 36, total: 63, grade: "C", remark: "Credit" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "History", test1: 13, test2: 17, exam: 39, total: 69, grade: "C", remark: "Credit" },
      { name: "C.C.A", test1: 18, test2: 16, exam: 40, total: 74, grade: "B", remark: "Good" },
      { name: "Quantitative reasoning", test1: 20, test2: 17, exam: 50, total: 87, grade: "A2", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 20, test2: 20, exam: 60, total: 100, grade: "A1", remark: "Excellent" },
      { name: "Hand-writing", test1: 15, test2: 18, exam: 45, total: 78, grade: "B", remark: "Good" },
      { name: "C.R.S", test1: 16, test2: 17, exam: 47, total: 80, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 15, test2: 16, exam: 45, total: 76, grade: "B", remark: "Good" }
    ],
    formTeacherRemark: "Favour is making good progress. Keep working hard!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve your study habits.",
    principalRemark: "Good work. Aim higher next term!",
    nextTermBegins: "January 5, 2026"
  },

  // PRIMARY 3 STUDENTS
  "Adura Boniface": {
    class: "primary 3",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 15, test2: 16, exam: 49, total: 80, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "History", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Adura is a dedicated student with excellent performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the excellent work.",
    principalRemark: "Outstanding performance!",
    nextTermBegins: "January 5, 2026"
  },

  "Azibagiri Mentor": {
    class: "primary 3",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "National Values", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "History", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "C.R.S", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Mentor is an exceptional student. Excellent work!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Outstanding performance. Keep it up!",
    principalRemark: "Excellent results!",
    nextTermBegins: "January 5, 2026"
  },

  "Igodo Tresure": {
    class: "primary 3",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 14, test2: 15, exam: 46, total: 75, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 14, test2: 15, exam: 45, total: 74, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" },
      { name: "History", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 14, test2: 15, exam: 44, total: 73, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Tresure is doing well. Keep working hard!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Good work!",
    nextTermBegins: "January 15, 2026"
  },

  "samuel adawgu": {
    class: "primary 3",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 13, test2: 14, exam: 42, total: 69, grade: "B", remark: "Good" },
      { name: "Mathematics", test1: 12, test2: 13, exam: 40, total: 65, grade: "B", remark: "Good" },
      { name: "Basic Science & tech", test1: 14, test2: 15, exam: 44, total: 73, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 13, test2: 14, exam: 41, total: 68, grade: "B", remark: "Good" },
      { name: "P.H.E", test1: 15, test2: 16, exam: 46, total: 77, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 12, test2: 13, exam: 39, total: 64, grade: "B", remark: "Good" },
      { name: "Pre-vocational Studies", test1: 14, test2: 15, exam: 43, total: 72, grade: "A", remark: "Very Good" },
      { name: "History", test1: 13, test2: 14, exam: 42, total: 69, grade: "B", remark: "Good" },
      { name: "C.C.A", test1: 15, test2: 16, exam: 45, total: 76, grade: "A", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 12, test2: 13, exam: 38, total: 63, grade: "B", remark: "Good" },
      { name: "Verbal reasoning", test1: 13, test2: 14, exam: 41, total: 68, grade: "B", remark: "Good" },
      { name: "Hand-writing", test1: 14, test2: 15, exam: 44, total: 73, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 15, test2: 16, exam: 45, total: 76, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 14, test2: 15, exam: 43, total: 72, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Samuel needs more practice. Keep working hard!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Focus on improving your study habits.",
    principalRemark: "Good effort. Aim higher next term!",
    nextTermBegins: "January 5, 2026"
  },

  "Ferida Monday": {
    class: "primary 3",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 20, test2: 20, exam: 20, total: 60, grade: "B", remark: "Good" },
      { name: "History", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 18, test2: 19, exam: 53, total: 90, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 15, test2: 16, exam: 46, total: 77, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 20, test2: 18, exam: 54, total: 92, grade: "A", remark: "Excellent" },
      { name: "Hand-writing", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 18, test2: 19, exam: 53, total: 90, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Ferida is a bright student with excellent performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the excellent work.",
    principalRemark: "Outstanding performance!",
    nextTermBegins: "January 5, 2026"
  },

  // PRIMARY 4 STUDENTS
  "Igodo Majesty": {
    class: "primary 4",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Basic Science & tech", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "National Values", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "History", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "C.R.S", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Majesty is an outstanding student with excellent performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Exceptional work. Keep it up!",
    principalRemark: "Excellent results!",
    nextTermBegins: "January 15, 2026"
  },

  "Azibagiri Godson": {
    class: "primary 4",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 15, test2: 16, exam: 49, total: 80, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "History", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 18, test2: 19, exam: 54, total: 91, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Godson is a dedicated student with good performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the good work.",
    principalRemark: "Well done!",
    nextTermBegins: "January 15, 2026"
  },

  "David Osei": {
    class: "primary 4",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 14, test2: 15, exam: 46, total: 75, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 17, test2: 18, exam: 52, total: 87, grade: "A", remark: "Very Good" },
      { name: "Computer Studies", test1: 14, test2: 15, exam: 45, total: 74, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" },
      { name: "History", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" },
      { name: "Quantitative reasoning", test1: 14, test2: 15, exam: 44, total: 73, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 17, test2: 18, exam: 51, total: 86, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 16, test2: 17, exam: 49, total: 82, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "David is making steady progress. Keep working hard!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Continue to improve.",
    principalRemark: "Good work!",
    nextTermBegins: "January 15, 2026"
  },

  // PRIMARY 5 STUDENTS
  "Igodo Godswill": {
    class: "primary 5",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "Mathematics", test1: 17, test2: 18, exam: 55, total: 90, grade: "A", remark: "Excellent" },
      { name: "Basic Science & tech", test1: 19, test2: 20, exam: 59, total: 98, grade: "A", remark: "Excellent" },
      { name: "National Values", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "P.H.E", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" },
      { name: "History", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "C.C.A", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "Hand-writing", test1: 19, test2: 20, exam: 59, total: 98, grade: "A", remark: "Excellent" },
      { name: "C.R.S", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Godswill is an exceptional student with outstanding performance across all subjects!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Excellent work. You are a role model!",
    principalRemark: "Outstanding performance! Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "Ogaga Glorious": {
    class: "primary 5",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 15, test2: 16, exam: 50, total: 81, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "National Values", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 15, test2: 16, exam: 49, total: 80, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "History", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "C.R.S", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Glorious is a bright student with excellent performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Keep up the excellent work.",
    principalRemark: "Very good performance!",
    nextTermBegins: "January 15, 2026"
  },

  "Perpetual": {
    class: "primary 5",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Mathematics", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Basic Science & tech", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "National Values", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "P.H.E", test1: 19, test2: 20, exam: 58, total: 97, grade: "A", remark: "Excellent" },
      { name: "Computer Studies", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Pre-vocational Studies", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" },
      { name: "History", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "C.C.A", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Quantitative reasoning", test1: 16, test2: 17, exam: 50, total: 83, grade: "A", remark: "Very Good" },
      { name: "Verbal reasoning", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Hand-writing", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "C.R.S", test1: 19, test2: 20, exam: 57, total: 96, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 18, test2: 19, exam: 55, total: 92, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Perpetual is an outstanding student with excellent performance!",
    hostelMasterRemark: "–",
    guidanceCounsellorRemark: "Exceptional work. Keep it up!",
    principalRemark: "Excellent results!",
    nextTermBegins: "January 15, 2026"
  },

  // JSS1 STUDENTS
  "Piama Isikpi": {
    class: "JSS 1",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 17, test2: 18, exam: 54, total: 89, grade: "A2", remark: "Very Good" },
      { name: "Mathematics", test1: 16, test2: 17, exam: 52, total: 85, grade: "A2", remark: "Very Good" },
      { name: "Social Studies", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "History", test1: 16, test2: 17, exam: 51, total: 84, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 18, test2: 19, exam: 55, total: 92, grade: "A1", remark: "Excellent" },
      { name: "Agricultural Science", test1: 18, test2: 19, exam: 55, total: 92, grade: "A1", remark: "Excellent" },
      { name: "Home Economics", test1: 18, test2: 19, exam: 56, total: 93, grade: "A1", remark: "Excellent" },
      { name: "Music", test1: 19, test2: 20, exam: 58, total: 97, grade: "A1", remark: "Excellent" },
      { name: "Fine Arts", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Basic Technology", test1: 15, test2: 16, exam: 49, total: 80, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 16, test2: 17, exam: 51, total: 84, grade: "A2", remark: "Very Good" },
      { name: "Basic Science", test1: 18, test2: 19, exam: 56, total: 93, grade: "A1", remark: "Excellent" },
      { name: "Civic Education", test1: 17, test2: 18, exam: 54, total: 89, grade: "A2", remark: "Very Good" },
      { name: "Literature", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Business Studies", test1: 15, test2: 16, exam: 48, total: 79, grade: "A2", remark: "Very Good" },
      { name: "Christian Religious Studies", test1: 19, test2: 20, exam: 57, total: 96, grade: "A1", remark: "Excellent" }
    ],
    formTeacherRemark: "Piama is an excellent student with outstanding performance!",
    principalRemark: "Excellent results across all subjects!",
    nextTermBegins: "January 15, 2026"
  },

  "Gift Forcebray": {
    class: "JSS 1",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 16, test2: 17, exam: 51, total: 84, grade: "A2", remark: "Very Good" },
      { name: "Mathematics", test1: 15, test2: 16, exam: 49, total: 80, grade: "A2", remark: "Very Good" },
      { name: "Social Studies", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "History", test1: 15, test2: 16, exam: 48, total: 79, grade: "A2", remark: "Very Good" },
      { name: "Phonics", test1: 17, test2: 18, exam: 52, total: 87, grade: "A2", remark: "Very Good" },
      { name: "Agricultural Science", test1: 17, test2: 18, exam: 52, total: 87, grade: "A2", remark: "Very Good" },
      { name: "Home Economics", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Music", test1: 18, test2: 19, exam: 55, total: 92, grade: "A1", remark: "Excellent" },
      { name: "Fine Arts", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Basic Technology", test1: 14, test2: 15, exam: 46, total: 75, grade: "B", remark: "Good" },
      { name: "Computer Studies", test1: 15, test2: 16, exam: 48, total: 79, grade: "A2", remark: "Very Good" },
      { name: "Basic Science", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Civic Education", test1: 16, test2: 17, exam: 51, total: 84, grade: "A2", remark: "Very Good" },
      { name: "Literature", test1: 15, test2: 16, exam: 47, total: 78, grade: "A2", remark: "Very Good" },
      { name: "Business Studies", test1: 14, test2: 15, exam: 45, total: 74, grade: "B", remark: "Good" },
      { name: "Christian Religious Studies", test1: 18, test2: 19, exam: 54, total: 91, grade: "A1", remark: "Excellent" }
    ],
    formTeacherRemark: "Gift is a dedicated student with good performance!",
    principalRemark: "Very good work. Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "Monday Faoziya": {
    class: "JSS 1",
    term: "First Term",
    year: "2025/2026",
    subjects: [
      { name: "English Language", test1: 15, test2: 16, exam: 48, total: 79, grade: "A2", remark: "Very Good" },
      { name: "Mathematics", test1: 14, test2: 15, exam: 46, total: 75, grade: "B", remark: "Good" },
      { name: "Social Studies", test1: 15, test2: 16, exam: 47, total: 78, grade: "A2", remark: "Very Good" },
      { name: "History", test1: 14, test2: 15, exam: 45, total: 74, grade: "B", remark: "Good" },
      { name: "Phonics", test1: 16, test2: 17, exam: 49, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Agricultural Science", test1: 16, test2: 17, exam: 49, total: 82, grade: "A2", remark: "Very Good" },
      { name: "Home Economics", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Music", test1: 17, test2: 18, exam: 52, total: 87, grade: "A2", remark: "Very Good" },
      { name: "Fine Arts", test1: 15, test2: 16, exam: 47, total: 78, grade: "A2", remark: "Very Good" },
      { name: "Basic Technology", test1: 13, test2: 14, exam: 43, total: 70, grade: "B", remark: "Good" },
      { name: "Computer Studies", test1: 14, test2: 15, exam: 45, total: 74, grade: "B", remark: "Good" },
      { name: "Basic Science", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Civic Education", test1: 15, test2: 16, exam: 48, total: 79, grade: "A2", remark: "Very Good" },
      { name: "Literature", test1: 14, test2: 15, exam: 44, total: 73, grade: "B", remark: "Good" },
      { name: "Business Studies", test1: 13, test2: 14, exam: 42, total: 69, grade: "B", remark: "Good" },
      { name: "Christian Religious Studies", test1: 17, test2: 18, exam: 51, total: 86, grade: "A2", remark: "Very Good" }
    ],
    formTeacherRemark: "Monday is making good progress. Keep working hard!",
    principalRemark: "Good work. Continue to improve!",
    nextTermBegins: "January 15, 2026"
  },

  // CRECHE STUDENTS
  "Albert Purity Amarachi": {
    class: "Creche",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1184,
    average: "91.08",
    subjects: [
      { name: "Play Activities", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "Basic Recognition", test1: 17, test2: 18, exam: 55, total: 90, grade: "A", remark: "Excellent" },
      { name: "Songs & Rhymes", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 18, test2: 19, exam: 56, total: 93, grade: "A", remark: "Excellent" },
      { name: "Social Skills", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Motor Skills", test1: 18, test2: 19, exam: 57, total: 94, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 19, test2: 18, exam: 58, total: 95, grade: "A", remark: "Excellent" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 18, exam: 56, total: 94, grade: "A", remark: "Excellent" },
      { name: "Literacy (English)", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 12, test2: 12, exam: 24, total: 48, grade: "F", remark: "Fail" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" },
      { name: "Phonics", test1: 18, test2: 20, exam: 50, total: 88, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Albert is a bright and active child. Excellent work!",
    principalRemark: "Outstanding performance for a creche student!",
    nextTermBegins: "January 15, 2026"
  },

  "Good News Moses": {
    class: "Creche",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1080,
    average: "83.08",
    subjects: [
      { name: "Play Activities", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Basic Recognition", test1: 15, test2: 16, exam: 50, total: 81, grade: "A", remark: "Very Good" },
      { name: "Songs & Rhymes", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 16, test2: 17, exam: 51, total: 84, grade: "A", remark: "Very Good" },
      { name: "Social Skills", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Motor Skills", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 10, test2: 15, exam: 35, total: 60, grade: "A", remark: "Very Good" },
      { name: "Literacy (English)", test1: 19, test2: 13, exam: 40, total: 72, grade: "A", remark: "Very Good" },
      { name: "Nursery Science", test1: 17, test2: 16, exam: 48, total: 81, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 9, test2: 20, exam: 52, total: 81, grade: "A", remark: "Very Good" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 13, test2: 18, exam: 40, total: 71, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Moses is doing very well. Keep up the good work!",
    principalRemark: "Very good performance!",
    nextTermBegins: "January 15, 2026"
  },

  "Starry Mackenzie": {
    class: "Creche",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1164,
    average: "89.54",
    subjects: [
      { name: "Play Activities", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Basic Recognition", test1: 16, test2: 17, exam: 52, total: 85, grade: "A", remark: "Very Good" },
      { name: "Songs & Rhymes", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Colouring", test1: 17, test2: 18, exam: 53, total: 88, grade: "A", remark: "Very Good" },
      { name: "Social Skills", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Motor Skills", test1: 17, test2: 18, exam: 54, total: 89, grade: "A", remark: "Very Good" },
      { name: "Numeracy (Mathematics)", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Excellent" },
      { name: "Literacy (English)", test1: 15, test2: 17, exam: 58, total: 90, grade: "A", remark: "Excellent" },
      { name: "Nursery Science", test1: 17, test2: 16, exam: 60, total: 93, grade: "A", remark: "Excellent" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Excellent" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 20, total: 60, grade: "B", remark: "Good" },
      { name: "Phonics", test1: 20, test2: 18, exam: 56, total: 94, grade: "A", remark: "Excellent" }
    ],
    formTeacherRemark: "Starry is a bright child with great potential!",
    principalRemark: "Excellent work. Keep it up!",
    nextTermBegins: "January 15, 2026"
  },

  "Igodo Richman": {
    class: "Creche",
    term: "First Term",
    year: "2025/2026",
    grandTotal: 1003,
    average: "83.58",
    subjects: [
      { name: "Play Activities", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Basic Recognition", test1: 14, test2: 15, exam: 46, total: 75, grade: "A", remark: "Very Good" },
      { name: "Songs & Rhymes", test1: 20, test2: 20, exam: 30, total: 70, grade: "B", remark: "Good" },
      { name: "Colouring", test1: 15, test2: 16, exam: 47, total: 78, grade: "A", remark: "Very Good" },
      { name: "Social Skills", test1: 20, test2: 20, exam: 48, total: 88, grade: "A", remark: "Very Good" },
      { name: "Motor Skills", test1: 15, test2: 16, exam: 48, total: 79, grade: "A", remark: "Very Good" },
      { name: "Nursery Science", test1: 15, test2: 12, exam: 66, total: 93, grade: "A", remark: "Excellent" },
      { name: "Literacy (English)", test1: 18, test2: 15, exam: 48, total: 81, grade: "A", remark: "Very Good" },
      { name: "Practical Life Skills", test1: 20, test2: 20, exam: 60, total: 100, grade: "A", remark: "Excellent" },
      { name: "Creative Arts", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Health Habits", test1: 20, test2: 20, exam: 50, total: 90, grade: "A", remark: "Excellent" },
      { name: "Phonics", test1: 12, test2: 20, exam: 48, total: 80, grade: "A", remark: "Very Good" }
    ],
    formTeacherRemark: "Richman is making good progress. Keep working!",
    principalRemark: "Good work. Continue to improve!",
    nextTermBegins: "January 15, 2026"
  },

  // SS1 STUDENTS
  "Stanley Favour": {
    class: "SS 1",
    term: "First Term",
    year: "2025/2026",
    department: "Science",
    subjects: [
      { name: "Mathematics", test1: 18, test2: 19, exam: 58, total: 95, grade: "A1", remark: "Excellent" },
      { name: "English Language", test1: 17, test2: 18, exam: 55, total: 90, grade: "A1", remark: "Excellent" },
      { name: "Further Mathematics", test1: 15, test2: 16, exam: 49, total: 80, grade: "A2", remark: "Very Good" },
      { name: "Biology", test1: 18, test2: 19, exam: 56, total: 93, grade: "A1", remark: "Excellent" },
      { name: "Physics", test1: 16, test2: 17, exam: 52, total: 85, grade: "A2", remark: "Very Good" },
      { name: "Chemistry", test1: 17, test2: 18, exam: 54, total: 89, grade: "A1", remark: "Very Good" },
      { name: "Geography", test1: 16, test2: 17, exam: 51, total: 84, grade: "A2", remark: "Very Good" },
      { name: "Technical Drawing", test1: 14, test2: 15, exam: 46, total: 75, grade: "B", remark: "Good" },
      { name: "Economics", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Computer Studies", test1: 19, test2: 20, exam: 59, total: 98, grade: "A1", remark: "Excellent" },
      { name: "Civic Education", test1: 17, test2: 18, exam: 53, total: 88, grade: "A2", remark: "Very Good" },
      { name: "Food and Nutrition", test1: 16, test2: 17, exam: 50, total: 83, grade: "A2", remark: "Very Good" },
      { name: "Agricultural Science", test1: 18, test2: 19, exam: 55, total: 92, grade: "A1", remark: "Excellent" }
    ],
    formTeacherRemark: "Stanley is an exceptional student with outstanding performance in all subjects. Keep up the excellent work!",
    principalRemark: "Excellent performance across all subjects. A model student. Well done!",
    nextTermBegins: "January 15, 2026"
  }
};


// Student departments for SS students (science, arts, or commercial)
export const studentDepartments = {
  "Stanley Favour": "science"
  // Add more SS students here as needed
  // Example: "Student Name": "arts" or "commercial"
};

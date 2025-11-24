// Student Portal Login Credentials
// Each student has their own unique password to access the portal

export const studentCredentials = {
  // PRIMARY 1
  "Emmanuel Angel": {
    password: "angel2025",
    class: "Primary 1",
    studentId: "HWA/P1/001",
    email: "emmanuel.angel@student.heavenlywisdom.edu"
  },
  "Emmanuel Ejiro": {
    password: "ejiro2025",
    class: "Primary 1",
    studentId: "HWA/P1/002",
    email: "emmanuel.ejiro@student.heavenlywisdom.edu"
  },
  "Augusii Bethel": {
    password: "bethel2025",
    class: "Primary 1",
    studentId: "HWA/P1/003",
    email: "augusii.bethel@student.heavenlywisdom.edu"
  },
  "Trustgod Areh": {
    password: "trust2025",
    class: "Primary 1",
    studentId: "HWA/P1/004",
    email: "trustgod.areh@student.heavenlywisdom.edu"
  },

  // PRIMARY 2
  "Prince Boniface": {
    password: "prince2025",
    class: "Primary 2",
    studentId: "HWA/P2/001",
    email: "prince.boniface@student.heavenlywisdom.edu"
  },
  "Antoye Gloria": {
    password: "gloria2025",
    class: "Primary 2",
    studentId: "HWA/P2/002",
    email: "antoye.gloria@student.heavenlywisdom.edu"
  },
  "Oyinnuah proyebuyeg": {
    password: "oyinnuah2025",
    class: "Primary 2",
    studentId: "HWA/P2/003",
    email: "oyinnuah.proyebuyeg@student.heavenlywisdom.edu"
  },
  "Delight starry": {
    password: "delight2025",
    class: "Primary 2",
    studentId: "HWA/P2/004",
    email: "delight.starry@student.heavenlywisdom.edu"
  },
  "Goodness Ebikabowei": {
    password: "goodness2025",
    class: "Primary 2",
    studentId: "HWA/P2/005",
    email: "goodness.ebikabowei@student.heavenlywisdom.edu"
  },
  "Favour Jackson": {
    password: "favour2025",
    class: "Primary 2",
    studentId: "HWA/P2/006",
    email: "favour.jackson@student.heavenlywisdom.edu"
  },

  // PRIMARY 3
  "Adura Boniface": {
    password: "adura2025",
    class: "Primary 3",
    studentId: "HWA/P3/001",
    email: "adura.boniface@student.heavenlywisdom.edu"
  },
  "Azibagiri Mentor": {
    password: "mentor2025",
    class: "Primary 3",
    studentId: "HWA/P3/002",
    email: "azibagiri.mentor@student.heavenlywisdom.edu"
  },
  "Igodo Tresure": {
    password: "tresure2025",
    class: "Primary 3",
    studentId: "HWA/P3/003",
    email: "igodo.tresure@student.heavenlywisdom.edu"
  },
  "samuel adawgu": {
    password: "samuel2025",
    class: "Primary 3",
    studentId: "HWA/P3/004",
    email: "samuel.adawgu@student.heavenlywisdom.edu"
  },
  "Ferida Monday": {
    password: "ferida2025",
    class: "Primary 3",
    studentId: "HWA/P3/005",
    email: "ferida.monday@student.heavenlywisdom.edu"
  },

  // PRIMARY 4
  "Igodo Majesty": {
    password: "majesty2025",
    class: "Primary 4",
    studentId: "HWA/P4/001",
    email: "igodo.majesty@student.heavenlywisdom.edu"
  },
  "Azibagiri Godson": {
    password: "godson2025",
    class: "Primary 4",
    studentId: "HWA/P4/002",
    email: "azibagiri.godson@student.heavenlywisdom.edu"
  },
  "David Osei": {
    password: "david2025",
    class: "Primary 4",
    studentId: "HWA/P4/003",
    email: "david.osei@student.heavenlywisdom.edu"
  },

  // PRIMARY 5
  "Igodo Godswill": {
    password: "godswill2025",
    class: "Primary 5",
    studentId: "HWA/P5/001",
    email: "igodo.godswill@student.heavenlywisdom.edu"
  },
  "Ogaga Glorious": {
    password: "glorious2025",
    class: "Primary 5",
    studentId: "HWA/P5/002",
    email: "ogaga.glorious@student.heavenlywisdom.edu"
  },
  "Perpetual": {
    password: "perpetual2025",
    class: "Primary 5",
    studentId: "HWA/P5/003",
    email: "perpetual@student.heavenlywisdom.edu"
  },

  // JSS 1
  "Piama Isikpi": {
    password: "piama2025",
    class: "JSS 1",
    studentId: "HWA/JSS1/001",
    email: "piama.isikpi@student.heavenlywisdom.edu"
  },
  "Gift Forcebray": {
    password: "gift2025",
    class: "JSS 1",
    studentId: "HWA/JSS1/002",
    email: "gift.forcebray@student.heavenlywisdom.edu"
  },
  "Monday Faoziya": {
    password: "faoziya2025",
    class: "JSS 1",
    studentId: "HWA/JSS1/003",
    email: "monday.faoziya@student.heavenlywisdom.edu"
  },

  // SS 1
  "Stanley Favour": {
    password: "stanley2025",
    class: "SS 1",
    studentId: "HWA/SS1/001",
    email: "stanley.favour@student.heavenlywisdom.edu"
  }
};

// Helper function to authenticate student
export function authenticateStudent(username, password) {
  const student = studentCredentials[username];
  
  if (!student) {
    return { success: false, message: "Student not found" };
  }
  
  if (student.password !== password) {
    return { success: false, message: "Incorrect password" };
  }
  
  return {
    success: true,
    message: "Login successful",
    data: {
      name: username,
      class: student.class,
      studentId: student.studentId,
      email: student.email,
      role: "student"
    }
  };
}

// Helper function to get student info
export function getStudentInfo(username) {
  const student = studentCredentials[username];
  if (!student) return null;
  
  return {
    name: username,
    class: student.class,
    studentId: student.studentId,
    email: student.email,
    role: "student"
  };
}

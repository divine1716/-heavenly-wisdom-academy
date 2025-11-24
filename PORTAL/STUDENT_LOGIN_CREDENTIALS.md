# 🎓 STUDENT PORTAL LOGIN CREDENTIALS

## How Students Login

Students now have **personalized login** to the portal:

1. Go to: **[Your Website]/PORTAL/student-login.html**
2. Enter their **Full Name** (exactly as registered)
3. Enter their **Password**
4. Click "Login to Portal"

## 📋 All Student Credentials

### PRIMARY 1

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Emmanuel Angel | angel2025 | HWA/P1/001 | Primary 1 |
| Emmanuel Ejiro | ejiro2025 | HWA/P1/002 | Primary 1 |
| Augusii Bethel | bethel2025 | HWA/P1/003 | Primary 1 |
| Trustgod Areh | trust2025 | HWA/P1/004 | Primary 1 |

### PRIMARY 2

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Prince Boniface | prince2025 | HWA/P2/001 | Primary 2 |
| Antoye Gloria | gloria2025 | HWA/P2/002 | Primary 2 |
| Oyinnuah proyebuyeg | oyinnuah2025 | HWA/P2/003 | Primary 2 |
| Delight starry | delight2025 | HWA/P2/004 | Primary 2 |
| Goodness Ebikabowei | goodness2025 | HWA/P2/005 | Primary 2 |
| Favour Jackson | favour2025 | HWA/P2/006 | Primary 2 |

### PRIMARY 3

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Adura Boniface | adura2025 | HWA/P3/001 | Primary 3 |
| Azibagiri Mentor | mentor2025 | HWA/P3/002 | Primary 3 |
| Igodo Tresure | tresure2025 | HWA/P3/003 | Primary 3 |
| samuel adawgu | samuel2025 | HWA/P3/004 | Primary 3 |
| Ferida Monday | ferida2025 | HWA/P3/005 | Primary 3 |

### PRIMARY 4

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Igodo Majesty | majesty2025 | HWA/P4/001 | Primary 4 |
| Azibagiri Godson | godson2025 | HWA/P4/002 | Primary 4 |
| David Osei | david2025 | HWA/P4/003 | Primary 4 |

### PRIMARY 5

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Igodo Godswill | godswill2025 | HWA/P5/001 | Primary 5 |
| Ogaga Glorious | glorious2025 | HWA/P5/002 | Primary 5 |
| Perpetual | perpetual2025 | HWA/P5/003 | Primary 5 |

### JSS 1

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Piama Isikpi | piama2025 | HWA/JSS1/001 | JSS 1 |
| Gift Forcebray | gift2025 | HWA/JSS1/002 | JSS 1 |
| Monday Faoziya | faoziya2025 | HWA/JSS1/003 | JSS 1 |

### SS 1

| Student Name | Password | Student ID | Class |
|-------------|----------|------------|-------|
| Stanley Favour | stanley2025 | HWA/SS1/001 | SS 1 |

---

## 🔐 Security Features

1. **Personalized Login**: Each student uses their own name and password
2. **Session Management**: Students stay logged in for 8 hours
3. **Dashboard Personalization**: Dashboard shows student's actual name and class
4. **Secure Results**: Results require both portal login AND result password

## 📱 How to Share Credentials with Students

### Option 1: Print Individual Cards
Print login cards for each student with:
- Student Name
- Password
- Portal URL: [Your Website]/PORTAL/student-login.html

### Option 2: SMS/WhatsApp
Send individual messages:
```
Hello [Student Name],

Your Heavenly Wisdom Academy Portal Login:
Name: [Student Name]
Password: [Password]
URL: [Website]/PORTAL/student-login.html

Keep this information safe!
```

### Option 3: Parent Meeting
Distribute printed credentials during parent-teacher meetings.

## 🔄 How to Change Passwords

To change a student's password:

1. Open: `PORTAL/student-credentials.js`
2. Find the student's name
3. Change the password value
4. Save and deploy

Example:
```javascript
"Emmanuel Angel": {
  password: "newpassword2025",  // Change this
  class: "Primary 1",
  studentId: "HWA/P1/001",
  email: "emmanuel.angel@student.heavenlywisdom.edu"
}
```

## ➕ How to Add New Students

1. Open: `PORTAL/student-credentials.js`
2. Add new entry in the format:
```javascript
"New Student Name": {
  password: "studentpass2025",
  class: "Primary X",
  studentId: "HWA/PX/00X",
  email: "student.name@student.heavenlywisdom.edu"
}
```
3. Save and deploy

## 📊 What Students See After Login

1. **Dashboard**: Personalized with their name
2. **User Info Card**: Shows their email, class, and student ID
3. **Results Access**: Can view their academic results
4. **Profile Page**: Shows their personal information

## 🆘 Support

If students have login issues:
- **Email**: adorableheavenlywisdom@gmail.com
- **Phone**: +234 806 229 7002

---

**Last Updated**: November 24, 2025
**System Version**: 2.0 - Personalized Student Login

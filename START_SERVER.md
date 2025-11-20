# 🚀 How to Start the Heavenly Wisdom Academy Server

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open Your Website
- **Local Development:** http://localhost:5000
- **Live Website:** Your Vercel URL

## ✅ What Works Now

### 🔐 **Authentication System**
- **Signup:** `/PORTAL/sign up/index.html`
- **Login:** `/PORTAL/index.html`
- **Dashboard:** `/PORTAL/dashboard.html`

### 📝 **Admission Form**
- **Form:** `/ADMISSION/public/index.html`
- **File Upload:** Passport photos supported
- **Email Notifications:** Automatic admin alerts

### 📊 **Student Results**
- **Check Results:** `/student result/index.html`
- **Password Protected:** Each student has a unique password

## 🔧 Server Features

- **Port:** 5000 (configurable in .env)
- **CORS:** Enabled for local and production
- **File Uploads:** Passport photos saved to `/uploads/`
- **Data Storage:** JSON files (submissions.json)
- **Security:** JWT tokens, bcrypt password hashing

## 📧 Email Setup (Optional)

To enable email notifications for admission forms:

1. Edit `.env` file
2. Add your Gmail credentials:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
3. Enable 2-Factor Authentication in Gmail
4. Generate App Password in Gmail Security settings

## 🐛 Troubleshooting

### Server Won't Start?
```bash
# Install missing dependencies
npm install bcrypt jsonwebtoken

# Try alternative start
node server.js
```

### Forms Not Working?
1. Make sure server is running on port 5000
2. Check browser console for errors
3. Verify CORS settings in server.js

### Email Not Sending?
- Forms still work without email
- Check .env file configuration
- Verify Gmail App Password

## 📱 Mobile Navigation

All pages now have professional mobile navigation with:
- Hamburger menu (☰)
- Colorful gradient cards
- Touch-friendly interface
- Dark mode toggle

## 🎯 Next Steps

1. **Start the server:** `npm start`
2. **Test signup:** Create a new account
3. **Test login:** Sign in with your account
4. **Test admission:** Submit a form
5. **Check results:** Use student passwords

**Your school website is now fully functional!** 🎉
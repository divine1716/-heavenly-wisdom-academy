# 📧 SendGrid Email Setup Guide

## ⚠️ SECURITY FIRST!

**YOU JUST SHARED YOUR API KEY PUBLICLY!** 

### Immediate Actions Required:
1. Go to SendGrid Dashboard → Settings → API Keys
2. **DELETE** the API key you just shared
3. **CREATE A NEW** API key
4. **NEVER** share API keys in chat, screenshots, or public repos

---

## 🚀 Setup Steps

### Step 1: Regenerate Your API Key

1. Login to [SendGrid](https://app.sendgrid.com/)
2. Go to **Settings** → **API Keys**
3. Find the key you shared and **DELETE IT**
4. Click **Create API Key**
5. Name it: `Heavenly Wisdom Academy`
6. Choose **Full Access** or **Restricted Access** (Mail Send only)
7. **COPY THE NEW KEY** (you'll only see it once!)

### Step 2: Add API Key to Your Project

1. Open the `.env` file in your project root
2. Replace this line:
   ```
   SENDGRID_API_KEY=REGENERATE_YOUR_KEY_DONT_USE_THE_OLD_ONE
   ```
   With:
   ```
   SENDGRID_API_KEY=SG.your_new_api_key_here
   ```

### Step 3: Verify Sender Email

1. In SendGrid, go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in:
   - **From Name**: Heavenly Wisdom Academy
   - **From Email**: adorableheavenlywisdom@gmail.com
   - **Reply To**: adorableheavenlywisdom@gmail.com
   - **Company**: Heavenly Wisdom International Academy
   - **Address**: Opposite Nikton Junction, Yenagoa, Bayelsa State
4. Check your email and click the verification link

### Step 4: Update .env File

```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_actual_new_key_here
SENDGRID_FROM_EMAIL=adorableheavenlywisdom@gmail.com
SENDGRID_FROM_NAME=Heavenly Wisdom Academy
```

### Step 5: Install SendGrid Package

Run this command in your terminal:
```bash
npm install @sendgrid/mail
```

### Step 6: Test Email Sending

1. Deploy your changes to Vercel
2. Go to your contact form
3. Submit a test inquiry
4. Check if you receive the email

---

## 📋 What Emails Will Be Sent?

### 1. Contact Form Submissions
- **To**: adorableheavenlywisdom@gmail.com
- **Subject**: Website Inquiry: [Subject]
- **Content**: Name, email, phone, message

### 2. Auto-Reply to Users
- **To**: User's email
- **Subject**: Thank you for contacting Heavenly Wisdom Academy
- **Content**: Confirmation message with school contact info

### 3. Tour Requests
- **To**: adorableheavenlywisdom@gmail.com
- **Subject**: School Tour Request
- **Content**: Name, date, time, number of visitors

### 4. Callback Requests
- **To**: adorableheavenlywisdom@gmail.com
- **Subject**: Callback Request
- **Content**: Name, phone, preferred time

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep API keys in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in Vercel
- Regenerate keys if exposed
- Use restricted access keys when possible

### ❌ DON'T:
- Share API keys in chat/screenshots
- Commit `.env` to GitHub
- Use the same key everywhere
- Give full access if not needed
- Hardcode keys in your code

---

## 🌐 Vercel Deployment

### Add Environment Variables:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `SENDGRID_API_KEY` = Your new API key
   - `SENDGRID_FROM_EMAIL` = adorableheavenlywisdom@gmail.com
   - `SENDGRID_FROM_NAME` = Heavenly Wisdom Academy
5. Click **Save**
6. Redeploy your project

---

## 📊 SendGrid Free Tier Limits

- **100 emails per day** (free forever)
- Perfect for school contact forms
- Upgrade if you need more

---

## 🆘 Troubleshooting

### Email not sending?
1. Check API key is correct in `.env`
2. Verify sender email in SendGrid
3. Check Vercel environment variables
4. Look at Vercel function logs

### Getting errors?
1. Make sure `@sendgrid/mail` is installed
2. Check API key has Mail Send permission
3. Verify email addresses are correct

---

## 📞 Need Help?

If emails still aren't working:
1. Check SendGrid Activity Feed
2. Review Vercel function logs
3. Test with SendGrid's API testing tool

---

**Remember**: Your new API key is like a password. Keep it secret! 🔐

# 🌐 Vercel Environment Variables Setup

## Quick Setup for Email Integration

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **heavenly-wisdom-academy**
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add These Variables

Add each of these one by one:

#### Variable 1: SENDGRID_API_KEY
- **Key**: `SENDGRID_API_KEY`
- **Value**: `SG.0qoD8wZiOgsjMrzuCVe7`
- **Environment**: Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: SENDGRID_FROM_EMAIL
- **Key**: `SENDGRID_FROM_EMAIL`
- **Value**: `adorableheavenlywisdom@gmail.com`
- **Environment**: Select all
- Click **Save**

#### Variable 3: SENDGRID_FROM_NAME
- **Key**: `SENDGRID_FROM_NAME`
- **Value**: `Heavenly Wisdom Academy`
- **Environment**: Select all
- Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 4: Test
1. Visit your website contact form
2. Submit a test inquiry
3. Check your email: adorableheavenlywisdom@gmail.com

---

## ⚠️ Important Security Note

**This API key was shared publicly and should be regenerated soon!**

To regenerate:
1. Go to SendGrid → Settings → API Keys
2. Delete the current key
3. Create a new one
4. Update it in Vercel Environment Variables
5. Redeploy

---

## 📧 What Will Happen After Setup

✅ Contact form submissions → Email to adorableheavenlywisdom@gmail.com  
✅ Auto-reply sent to users who submit forms  
✅ Tour requests → Email notifications  
✅ Callback requests → Email notifications  

---

## 🆘 Troubleshooting

### Emails not sending?
1. Check all 3 environment variables are added
2. Make sure you redeployed after adding them
3. Check Vercel function logs for errors
4. Verify sender email in SendGrid

### Still not working?
1. Go to SendGrid → Activity Feed
2. Check if emails are being sent
3. Look for bounce/error messages

---

**Setup Time**: ~5 minutes  
**Cost**: Free (100 emails/day)

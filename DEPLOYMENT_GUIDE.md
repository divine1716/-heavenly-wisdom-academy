# Deployment Guide - Free Hosting

## Overview

**Frontend:** Netlify (Free)
- URL: `heavenlywisdom.netlify.app` (you can customize)
- Hosts: HTML, CSS, JavaScript files
- Free SSL certificate (HTTPS)

**Backend:** Render (Free)
- URL: `heavenlywisdom-api.onrender.com` (you can customize)
- Hosts: Node.js server + MongoDB connection
- Free SSL certificate (HTTPS)

---

## STEP 1: Deploy Backend First

### 1.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

### 1.2 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository (or use manual deploy)
3. Configure:
   - **Name:** `heavenlywisdom-api` (or your choice)
   - **Root Directory:** `PORTAL/backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### 1.3 Add Environment Variables
In Render dashboard, add these:
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://Divineemanuel:Don123%40456@divinebonid.bxtbxre.mongodb.net/schoolportal?retryWrites=true&w=majority&appName=divinebonid
JWT_SECRET=heavenly_wisdom_academy_secret_key_2025
```

### 1.4 Get Your Backend URL
After deployment, Render will give you a URL like:
`https://heavenlywisdom-api.onrender.com`

**SAVE THIS URL!** You'll need it for the frontend.

---

## STEP 2: Update Frontend with Backend URL

Before deploying frontend, update these files with your backend URL:

### Files to Update:
1. `PORTAL/script.js` - Line with `http://localhost:5000`
2. `PORTAL/sign up/script.js` - Line with `http://localhost:5000`
3. `PORTAL/dashboard.js` - Line with `http://localhost:5000`
4. `PORTAL/profile.js` - Line with `http://localhost:5000`
5. `PORTAL/admin-panel.js` - Line with `http://localhost:5000`

**Replace:**
```javascript
'http://localhost:5000/api/auth/login'
```

**With:**
```javascript
'https://heavenlywisdom-api.onrender.com/api/auth/login'
```

(Use YOUR actual Render URL)

---

## STEP 3: Deploy Frontend

### 3.1 Create Netlify Account
1. Go to https://netlify.com
2. Click "Sign up"
3. Sign up with GitHub (recommended) or email

### 3.2 Deploy via Drag & Drop
1. In Netlify dashboard, scroll down to "Want to deploy a new site without connecting to Git?"
2. Drag and drop your entire project folder
3. OR click "Browse to upload" and select your project folder

### 3.3 Configure Site Name
1. After deployment, click "Site settings"
2. Click "Change site name"
3. Enter: `heavenlywisdom` (or your choice)
4. Your site will be: `heavenlywisdom.netlify.app`

---

## STEP 4: Update Backend CORS

Update `PORTAL/backend/server.js` with your Netlify URL:

**Find this section:**
```javascript
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://your-domain.com',
      'https://www.your-domain.com'
    ]
```

**Change to:**
```javascript
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://heavenlywisdom.netlify.app',
      'https://www.heavenlywisdom.netlify.app'
    ]
```

Then redeploy backend on Render.

---

## STEP 5: Update MongoDB Atlas

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click "Network Access"
3. Your current IP whitelist should work, but if issues:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

---

## STEP 6: Test Your Deployment

### Test Checklist:
- [ ] Visit your Netlify URL
- [ ] Homepage loads correctly
- [ ] Images appear
- [ ] Navigation links work
- [ ] Try to sign up (create test account)
- [ ] Try to login
- [ ] Dashboard loads
- [ ] Student results work
- [ ] Admin panel works (for admin users)

---

## Troubleshooting

### Backend Issues:
**"Cannot connect to server"**
- Check Render logs for errors
- Verify environment variables are set
- Check MongoDB connection string

**"CORS error"**
- Update CORS in server.js with correct Netlify URL
- Redeploy backend

### Frontend Issues:
**"API calls failing"**
- Verify you updated ALL fetch URLs to production backend
- Check browser console for errors

**"Images not loading"**
- Verify image paths are relative (not absolute)
- Check images folder is included in deployment

---

## Free Tier Limitations

### Render (Backend):
- ✅ Free SSL
- ✅ Automatic deploys
- ⚠️ Sleeps after 15 min of inactivity (wakes up in ~30 seconds)
- ⚠️ 750 hours/month free (enough for one service)

### Netlify (Frontend):
- ✅ Free SSL
- ✅ Automatic deploys
- ✅ 100GB bandwidth/month
- ✅ Always on (no sleep)

### MongoDB Atlas:
- ✅ 512MB storage free
- ✅ Shared cluster
- ✅ Enough for hundreds of users

---

## Upgrade Path

When ready to upgrade:
1. Buy custom domain (~$12/year)
2. Point domain to Netlify
3. Update backend CORS with new domain
4. Upgrade Render to paid plan ($7/month) for no sleep

---

## Your Final URLs

**Main Website:**
`https://heavenlywisdom.netlify.app`

**Portal Login:**
`https://heavenlywisdom.netlify.app/PORTAL/index.html`

**Student Results:**
`https://heavenlywisdom.netlify.app/student result/index.html`

**Admin Panel:**
`https://heavenlywisdom.netlify.app/PORTAL/admin-panel.html`

---

## Support

If you encounter issues:
1. Check Render logs (for backend errors)
2. Check browser console (for frontend errors)
3. Verify all URLs are updated
4. Check MongoDB Atlas connection

**Your school portal is ready to go live!** 🚀

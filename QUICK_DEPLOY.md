# Quick Deployment Steps

## 🚀 Deploy in 15 Minutes!

### Step 1: Deploy Backend (5 min)
1. Go to https://render.com → Sign up
2. New Web Service → Connect GitHub or Manual
3. Settings:
   - Name: `heavenlywisdom-api`
   - Root: `PORTAL/backend`
   - Build: `npm install`
   - Start: `node server.js`
4. Add Environment Variables (copy from `.env`)
5. Deploy!
6. **SAVE YOUR URL:** `https://your-app.onrender.com`

### Step 2: Update Frontend (3 min)
Replace `http://localhost:5000` with your Render URL in:
- `PORTAL/script.js`
- `PORTAL/sign up/script.js`
- `PORTAL/dashboard.js`
- `PORTAL/profile.js`
- `PORTAL/admin-panel.js`

### Step 3: Deploy Frontend (5 min)
1. Go to https://netlify.com → Sign up
2. Drag & drop your project folder
3. Change site name to `heavenlywisdom`
4. Done! Your site: `https://heavenlywisdom.netlify.app`

### Step 4: Update Backend CORS (2 min)
In `PORTAL/backend/server.js`, update CORS with your Netlify URL
Redeploy on Render

### Step 5: Test! ✅
Visit your site and test signup/login

---

## Need Help?
Check `DEPLOYMENT_GUIDE.md` for detailed instructions!

# Deploy Everything to Vercel - One Place!

## 🚀 Deploy Frontend + Backend Together

**Advantage:** Upload once, everything works!

**Your URL:** `heavenlywisdom.vercel.app`

---

## Step 1: Prepare Your Project (5 min)

### 1.1 Create vercel.json in root folder

Create a file called `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "PORTAL/backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "PORTAL/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 1.2 Update API URLs in Frontend

Since everything is on same domain, update fetch URLs:

**Change FROM:**
```javascript
'http://localhost:5000/api/auth/login'
```

**Change TO:**
```javascript
'/api/auth/login'
```

Update in these files:
- `PORTAL/script.js`
- `PORTAL/sign up/script.js`
- `PORTAL/dashboard.js`
- `PORTAL/profile.js`
- `PORTAL/admin-panel.js`

### 1.3 Update server.js CORS

In `PORTAL/backend/server.js`, update CORS:

```javascript
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://heavenlywisdom.vercel.app',
      'https://*.vercel.app'
    ]
  : [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000'
    ];
```

---

## Step 2: Deploy to Vercel (5 min)

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended) or email

### 2.2 Deploy Your Project

**Option A: Via GitHub (Recommended)**
1. Push your code to GitHub
2. In Vercel: "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy"

**Option B: Via CLI**
1. Install Vercel CLI: `npm install -g vercel`
2. In your project folder: `vercel`
3. Follow prompts
4. Done!

**Option C: Drag & Drop**
1. Zip your entire project folder
2. Go to Vercel dashboard
3. Drag and drop the zip file

### 2.3 Add Environment Variables

In Vercel dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add these:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://Divineemanuel:Don123%40456@divinebonid.bxtbxre.mongodb.net/schoolportal?retryWrites=true&w=majority&appName=divinebonid
JWT_SECRET=heavenly_wisdom_academy_secret_key_2025
```

4. Click "Redeploy" to apply changes

---

## Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard → "Settings" → "Domains"
2. Change from random name to: `heavenlywisdom`
3. Your URL: `https://heavenlywisdom.vercel.app`

---

## Step 4: Test Your Site! ✅

Visit: `https://heavenlywisdom.vercel.app`

Test:
- [ ] Homepage loads
- [ ] Images appear
- [ ] Sign up works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Student results work
- [ ] Admin panel works

---

## Advantages of Vercel

✅ **One deployment** - Frontend + Backend together
✅ **One URL** - Everything on same domain
✅ **No CORS issues** - Same origin
✅ **Free SSL** - Automatic HTTPS
✅ **Fast** - Global CDN
✅ **Easy updates** - Just push to GitHub

---

## Free Tier Limits

- ✅ 100GB bandwidth/month
- ✅ Unlimited projects
- ✅ Automatic deployments
- ✅ Custom domains
- ⚠️ Serverless functions (backend) have execution time limits

---

## Troubleshooting

**"Cannot find module"**
- Make sure `package.json` is in `PORTAL/backend/`
- Vercel will auto-install dependencies

**"API not working"**
- Check environment variables are set
- Check MongoDB connection
- View logs in Vercel dashboard

**"CORS error"**
- Since everything is same domain, shouldn't happen
- If it does, check CORS settings in server.js

---

## Your URLs

**Main Website:**
`https://heavenlywisdom.vercel.app`

**Portal:**
`https://heavenlywisdom.vercel.app/PORTAL/index.html`

**API:**
`https://heavenlywisdom.vercel.app/api/auth/login`

**Student Results:**
`https://heavenlywisdom.vercel.app/student result/index.html`

---

## Next Steps

1. Create `vercel.json` file
2. Update API URLs to use `/api/` instead of `http://localhost:5000/api/`
3. Deploy to Vercel
4. Test everything
5. Share your link! 🎉

**This is the easiest way to deploy!** Everything in one place, one command!

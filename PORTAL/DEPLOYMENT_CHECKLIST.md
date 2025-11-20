# Deployment Checklist

## Before Deploying

### 1. Environment Variables ✅
- [x] Created .gitignore file
- [x] Created .env.example template
- [ ] **IMPORTANT:** Never commit .env file to GitHub!

### 2. CORS Configuration ✅
- [x] Updated CORS to use environment-based origins
- [ ] **TODO:** Replace 'https://your-domain.com' in server.js with your actual domain

### 3. MongoDB Atlas Security
When you deploy, you need to update MongoDB Atlas:

1. Go to MongoDB Atlas → Network Access
2. **Remove** "Allow Access from Anywhere" (0.0.0.0/0)
3. **Add** your hosting provider's IP addresses:
   - For Render: They provide IP ranges in their docs
   - For Railway: Add their IP ranges
   - For Vercel: Add Vercel's IP ranges
   
**OR** keep "Allow from Anywhere" but add strong authentication

### 4. Update Frontend API URLs
Before deploying frontend, update these files to use your production backend URL:

- `PORTAL/script.js` - Line with `http://localhost:5000`
- `PORTAL/sign up/script.js` - Line with `http://localhost:5000`
- `PORTAL/dashboard.js` - Line with `http://localhost:5000`

Change from:
```javascript
fetch('http://localhost:5000/api/auth/login', ...)
```

To:
```javascript
fetch('https://your-backend-url.com/api/auth/login', ...)
```

### 5. Set Environment Variables on Hosting Platform

When deploying backend, add these environment variables:
```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 6. Update CORS Domain
In `PORTAL/backend/server.js`, replace:
```javascript
'https://your-domain.com'
```
With your actual frontend domain (e.g., 'https://heavenlywisdom.netlify.app')

## Deployment Steps

### Backend (Choose one):
1. **Render.com** (Recommended - Free tier)
2. **Railway.app** (Easy setup)
3. **Heroku** (Paid)

### Frontend (Choose one):
1. **Netlify** (Recommended - Free, easy)
2. **Vercel** (Great for React/Next.js)
3. **GitHub Pages** (Free, but limited)

## After Deployment

- [ ] Test signup/login
- [ ] Test all user roles
- [ ] Test student results
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Verify HTTPS is working

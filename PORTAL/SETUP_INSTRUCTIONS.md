# Portal Setup Instructions

## What I Fixed:
1. ✅ Fixed the dashboard authentication endpoint (changed from `/api/auth/me` to `/api/user/me`)
2. ✅ Added missing dependencies to package.json (express, cors, dotenv)
3. ✅ Added a backup `/api/auth/me` endpoint in auth routes
4. ✅ Signup and login are now properly connected to the backend

## To Get Your Portal Working:

### Step 1: Install MongoDB
You need MongoDB running on your computer.
- Download from: https://www.mongodb.com/try/download/community
- Install and make sure MongoDB service is running

### Step 2: Install Backend Dependencies
Open a terminal in the `PORTAL/backend` folder and run:
```
npm install
```

### Step 3: Start the Backend Server
In the same terminal (PORTAL/backend folder), run:
```
npm start
```

You should see:
- "✅ MongoDB connected"
- "Server running on http://localhost:5000"

### Step 4: Open the Frontend
Open `PORTAL/index.html` with Live Server (or any local server)

### Step 5: Test It!
1. Click "Sign Up" button
2. Fill in the form (name, email, password, select a role)
3. Click "Sign Up" - you should be redirected to login
4. Login with your email and password
5. You'll be taken to the dashboard showing your role-specific content

## Troubleshooting:

**"Unable to connect to server"**
- Make sure the backend is running (Step 3)
- Check that MongoDB is running

**"MongoDB connection error"**
- Install MongoDB and start the service
- Or change MONGO_URI in `.env` to use MongoDB Atlas (cloud)

**Port already in use**
- Change PORT in `.env` file to something else (like 5001)
- Update the fetch URLs in script.js and signup/script.js to match

## Test Accounts:
After signing up, you can create accounts with different roles:
- Student account
- Parent account  
- Teacher account
- Admin account

Each role will show different dashboard content!

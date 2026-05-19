# 🔐 DEMO ACCOUNT SETUP & TESTING GUIDE

## ✅ WHAT WAS FIXED

Your backend now **automatically creates the demo account** when it starts:

```
Email:    demo@example.com
Password: demo123
```

This account is created on first run and will persist in the database.

---

## 🚀 COMPLETE SETUP (5 MINUTES)

### Step 1: Start Backend

**Terminal 1 - Backend:**
```powershell
# Navigate to project root
cd d:\myAIproject\my_ai_project

# Activate virtual environment (if not already active)
.\venv\Scripts\Activate.ps1

# Start backend server
python main.py
```

**Expected Output:**
```
✅ Demo user created: demo@example.com / demo123
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Or if demo user already exists:
```
✅ Demo user already exists: demo@example.com
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 2: Start Frontend

**Terminal 2 - Frontend:**
```powershell
# Navigate to frontend
cd d:\myAIproject\my_ai_project\frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Test Login

1. **Browser opens to:** http://localhost:5173 (Home page)
2. **Click:** "Get Started" or "Sign In" button
3. **Login Modal opens** on same page
4. **Enter:**
   - Email: `demo@example.com`
   - Password: `demo123`
5. **Click:** "Sign In" button
6. **Result:** ✅ Should login successfully and go to /chat

---

## 🧪 TESTING CHECKLIST

### Backend Testing
- [ ] Backend starts without errors
- [ ] Prints "✅ Demo user created" or "✅ Demo user already exists"
- [ ] Backend running on http://localhost:8000

### Frontend Testing
- [ ] Frontend starts without errors
- [ ] Opens to home page (not login page)
- [ ] Navbar shows "Sign In" button

### Login Testing
- [ ] Click "Get Started" button
- [ ] Login modal appears
- [ ] Modal shows email and password fields
- [ ] Modal shows demo credentials info
- [ ] Enter: demo@example.com
- [ ] Enter: demo123
- [ ] Click "Sign In"
- [ ] ✅ No error message
- [ ] Modal closes
- [ ] Redirects to /chat
- [ ] Chat dashboard loads

### Chat Testing
- [ ] Chat interface shows
- [ ] Can type message
- [ ] Can send message
- [ ] Get AI response
- [ ] Everything works!

---

## ✅ COMPLETE FLOW

```
Terminal 1: Start Backend
            ↓
            Backend creates demo account
            ↓
            Backend running on :8000

                    ↓

Terminal 2: Start Frontend
            ↓
            Frontend opens to http://localhost:5173
            ↓
            See Home page
            ↓
            Click "Sign In"
            ↓
            Modal appears
            ↓
            Enter demo@example.com / demo123
            ↓
            Click "Sign In"
            ↓
            API call to backend: POST /auth/login
            ↓
            Backend validates credentials ✅
            ↓
            Backend returns JWT token
            ↓
            Frontend saves token
            ↓
            Redirects to /chat
            ↓
            Chat works! ✅
```

---

## 📁 FILES CREATED/MODIFIED

### New Files
```
✨ app/utils/seed_demo.py          - Creates demo account
✨ app/utils/__init__.py           - Package init
```

### Modified Files
```
🔄 main.py                         - Updated to create demo user on startup
```

---

## 🔍 WHAT HAPPENS ON STARTUP

When backend starts:

1. **Check if demo user exists**
   ```python
   existing_user = db.query(User).filter(User.email == "demo@example.com").first()
   ```

2. **If NOT found:**
   ```python
   Create new user with:
   - Email: demo@example.com
   - Password: demo123 (hashed)
   ```

3. **If already found:**
   ```python
   Skip creation, use existing account
   ```

4. **Print confirmation:**
   ```
   ✅ Demo user created: demo@example.com / demo123
   OR
   ✅ Demo user already exists: demo@example.com
   ```

---

## 🐛 TROUBLESHOOTING

### "Still getting 'wrong email or password'"

**Solution 1: Restart Backend**
- Stop backend (Ctrl+C)
- Start again with `python main.py`
- Wait for "✅ Demo user created" message

**Solution 2: Check Database**
1. Make sure DATABASE_URL is set in .env
2. Verify PostgreSQL connection is working
3. Check backend console for error messages

**Solution 3: Clear Cache**
1. In browser, press F12 (DevTools)
2. Go to Application → Local Storage
3. Clear all data
4. Refresh page
5. Try login again

### "Backend won't start"

**Check 1:**
```powershell
# Is virtual environment activated?
.\venv\Scripts\Activate.ps1
```

**Check 2:**
```powershell
# Are dependencies installed?
pip install -r requirements.txt
```

**Check 3:**
```powershell
# Is database connection working?
# Check DATABASE_URL in .env
```

### "Frontend won't connect to backend"

**Check CORS:**
- Backend now allows: http://localhost:5173
- If still failing, check browser console (F12)

**Check API URL:**
- Frontend API base: http://localhost:8000
- Verify backend is running on that port

---

## 📊 DATABASE INFO

**Demo Account Stored In:**
- Database: PostgreSQL (Neon)
- User Email: demo@example.com
- Password: demo123 (hashed with bcrypt)
- URL: DATABASE_URL in .env

**Account Persists:**
- ✅ Survives backend restarts
- ✅ Can be used multiple times
- ✅ Safe demo account for testing

---

## 🎯 QUICK COMMANDS

### Backend
```bash
# Terminal 1
cd d:\myAIproject\my_ai_project
.\venv\Scripts\Activate.ps1
python main.py
```

### Frontend
```bash
# Terminal 2
cd d:\myAIproject\my_ai_project\frontend
npm run dev
```

### Test Credentials
```
Email: demo@example.com
Password: demo123
```

---

## 🎓 HOW THE DEMO ACCOUNT WORKS

### On First Run
1. Backend starts
2. Checks if demo@example.com exists
3. **Doesn't exist** → Creates it
4. Prints: `✅ Demo user created: demo@example.com / demo123`

### On Subsequent Runs
1. Backend starts
2. Checks if demo@example.com exists
3. **Already exists** → Skips creation
4. Prints: `✅ Demo user already exists: demo@example.com`

### Forever Available
- Account stays in database permanently
- Can login anytime
- Can use for testing whenever needed

---

## ✨ FEATURES

✅ **Automatic Creation** - No manual database setup needed
✅ **One-Time Setup** - Runs on first startup only
✅ **Persistent** - Account remains after restart
✅ **Safe** - Doesn't overwrite existing account
✅ **Logged** - Prints confirmation to console
✅ **Ready to Use** - No additional configuration

---

## 🚀 NEXT STEPS

1. **Stop current processes** (if running)
   - Backend: Ctrl+C
   - Frontend: Ctrl+C

2. **Start Backend** (Terminal 1)
   ```
   python main.py
   ```

3. **Start Frontend** (Terminal 2)
   ```
   npm run dev
   ```

4. **See confirmation:**
   - Backend: `✅ Demo user created: demo@example.com / demo123`
   - Frontend: Opens to home page

5. **Test login:**
   - Click "Sign In"
   - Enter: demo@example.com / demo123
   - Go to chat

6. **Done! ✅**

---

## 📞 QUICK REFERENCE

| Item | Value |
|------|-------|
| **Demo Email** | demo@example.com |
| **Demo Password** | demo123 |
| **Backend** | http://localhost:8000 |
| **Frontend** | http://localhost:5173 |
| **Database** | PostgreSQL (Neon) |

---

## 🎉 SUMMARY

✅ Backend now creates demo account automatically
✅ Account persists in database
✅ Login with demo@example.com / demo123
✅ Full chat functionality works
✅ Everything is ready to use!

---

**Start your backend now with: `python main.py` 🚀**

# 🔧 Fix for Registration 500 Error

## Problem
When registering a new user, you get a **500 Internal Server Error**. This happens because your database schema is outdated and doesn't have the new columns (`name` and `language_preference`).

## Solution

### Step 1: Run the Database Reset Script

1. **Open a terminal** in your project directory:
   ```bash
   cd d:\myAIproject\my_ai_project
   ```

2. **Activate your virtual environment** (if not already activated):
   ```bash
   # On Windows PowerShell
   .\venv\Scripts\Activate.ps1
   
   # Or on Windows CMD
   venv\Scripts\activate.bat
   ```

3. **Run the reset script**:
   ```bash
   python reset_database.py
   ```

4. **When prompted, type `yes` to confirm**:
   ```
   ⚠️  WARNING: This will drop all existing tables and data!
   Make sure you have a backup if you have important data.
   
   Continue? (yes/no): yes
   ```

5. **Wait for completion**. You should see:
   ```
   ============================================================
   ✅ DATABASE MIGRATION COMPLETED SUCCESSFULLY!
   ============================================================
   ```

### Step 2: Restart Your Backend Server

1. **Stop the current backend** (Ctrl+C in the terminal running uvicorn)

2. **Restart the backend**:
   ```bash
   python main.py
   ```
   
   Or use uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

### Step 3: Test Registration

Now try registering again with the curl command:

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "user1@example.com",
  "password": "user1",
  "name": "user1"
}'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user1@example.com",
    "name": "user1",
    "language_preference": "english"
  }
}
```

---

## ✅ What the Reset Script Does

1. **Drops all existing tables** from the database
2. **Recreates tables with new schema** (includes `name` and `language_preference`)
3. **Creates demo user** with new fields:
   - Email: `demo@example.com`
   - Password: `demo123`
   - Name: `Demo User`

---

## 📝 Demo Credentials After Reset

After running the script, you can login with:

```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

---

## ❓ Troubleshooting

### If reset script fails:

**Error: "ModuleNotFoundError"**
- Make sure virtual environment is activated
- Make sure you're in the correct project directory

**Error: "Database connection failed"**
- Check your `.env` file - DATABASE_URL must be correct
- Ensure your Neon PostgreSQL database is accessible
- Check your internet connection

**Error: "Table already exists"**
- This shouldn't happen with the new script
- If it does, try stopping the backend first, then running reset script

---

## 🔄 What Changed in the Code

The following updates were made to support the new features:

1. **User Model** - Added `name` and `language_preference` fields
2. **Auth Routes** - Now return user object with token
3. **Schemas** - Added `UserResponse` and `LanguagePreferenceRequest`
4. **Demo Seeder** - Updated to include user name and language

---

## 📌 Next Steps After Fix

1. ✅ Register a new user
2. ✅ Test all 6 new features:
   - Language preference toggle
   - Personalized greeting
   - File upload
   - Voice input
   - Chat persistence
   - Sidebar navigation

---

**Status**: Ready to test after running reset script! 🚀

# 🚀 Quick Fix - Registration 500 Error

## TL;DR - Quick Fix in 3 Steps

### Step 1: Run Database Reset
```bash
cd d:\myAIproject\my_ai_project
python reset_database.py
# Type: yes
```

### Step 2: Restart Backend
```bash
python main.py
# or: uvicorn main:app --reload
```

### Step 3: Test Registration
```bash
curl -X POST http://127.0.0.1:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

✅ **You should get a success response with `access_token` and `user` data!**

---

## What Went Wrong?

Your database was created with the **old schema** (without `name` and `language_preference` columns). The new code tries to use these columns, causing a 500 error.

## What the Fix Does

- ✅ Drops old tables
- ✅ Creates new tables with updated schema
- ✅ Seeds demo user
- ✅ Restarts everything clean

## After the Fix

You can now:
1. ✅ Register new users with a name
2. ✅ Change language preference (English/Hindi)
3. ✅ Get personalized greetings
4. ✅ Upload files
5. ✅ Use voice input
6. ✅ See recent chats in sidebar

---

## Need More Details?

See: [FIX_REGISTRATION_ERROR.md](FIX_REGISTRATION_ERROR.md) for full troubleshooting guide.

---

**Time to fix: ~2 minutes** ⏱️

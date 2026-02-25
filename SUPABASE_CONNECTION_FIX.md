# Fix Supabase Database Connection on Render

## The Problem

Your backend is getting 500 errors because it can't connect to Supabase database. The error shows:
```
Error: connect ETIMEDOUT
```

This happens because Render has issues with direct Supabase connections using IPv6.

## Solution: Use Supabase Connection Pooler

### Step 1: Get Your Supabase Connection Pooler Details

1. Go to https://supabase.com/dashboard
2. Select your project (the one with database `kmcwivtntaacrgivevww`)
3. Click on **Settings** (gear icon in sidebar)
4. Click on **Database**
5. Scroll down to find **Connection Pooling** section
6. You'll see something like:

   **Connection Pooling**
   ```
   Host: aws-0-ap-southeast-1.pooler.supabase.com
   Port: 6543
   Database: postgres
   User: postgres.kmcwivtntaacrgivevww
   Password: [your-password]
   ```

7. Copy these values

### Step 2: Update Render Environment Variables

1. Go to Render Dashboard: https://dashboard.render.com
2. Click on your service: `artify-aura-api`
3. Click **Environment** in the left sidebar
4. Update these variables:

   **DB_HOST**
   - Old: `db.kmcwivtntaacrgivevww.supabase.co`
   - New: `aws-0-ap-southeast-1.pooler.supabase.com` (or whatever you copied)
   - Click the edit icon, change the value, save

   **DB_PORT**
   - Old: `5432`
   - New: `6543`
   - Click the edit icon, change the value, save

   **DB_USER** (might need to update)
   - Old: `postgres`
   - New: `postgres.kmcwivtntaacrgivevww` (check Supabase for exact value)
   - Click the edit icon, change the value, save

   **Keep these the same:**
   - `DB_NAME` = `postgres`
   - `DB_PASSWORD` = [your existing password]

5. Click **Save Changes** (Render will auto-redeploy)

### Step 3: Wait for Redeploy

1. Go to **Logs** tab
2. Wait for deployment to complete (2-3 minutes)
3. Look for:
   ```
   ✅ Connected to PostgreSQL database
   🚀 Server running on port 5000
   ```

### Step 4: Test

Open in browser:
```
https://artify-aura-api.onrender.com/api/health
```

Should return:
```json
{"status":"OK","message":"Artify Aura API is running"}
```

Then test your app:
```
https://artify-aura.vercel.app
```

## Alternative: Use Connection String (Easier)

If the above doesn't work, you can use a single connection string instead:

### Step 1: Get Connection String from Supabase

1. In Supabase Dashboard → Settings → Database
2. Find **Connection String** section
3. Select **Connection Pooling** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres.kmcwivtntaacrgivevww:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual password

### Step 2: Add to Render

1. In Render Dashboard → artify-aura-api → Environment
2. Click **Add Environment Variable**
3. Key: `DATABASE_URL`
4. Value: [paste the connection string from above]
5. Save

The code will automatically use `DATABASE_URL` if it's set.

## Troubleshooting

### Still Getting 500 Errors?

Check Render logs for the exact error:
1. Render Dashboard → artify-aura-api → Logs
2. Look for error messages after "Get products error:" or similar
3. Common issues:
   - Wrong password
   - Wrong user format
   - Supabase project paused/deleted
   - Network restrictions

### Check Supabase is Running

1. Go to Supabase Dashboard
2. Make sure your project is active (not paused)
3. Check if you can connect from Supabase SQL Editor

### Test Connection Locally

Update your local `backend/.env` with the pooler settings and test:
```bash
cd backend
npm start
```

If it works locally but not on Render, the issue is with Render's environment variables.

## Quick Checklist

- [ ] Got connection pooler host from Supabase
- [ ] Updated `DB_HOST` in Render to pooler host
- [ ] Updated `DB_PORT` in Render to `6543`
- [ ] Updated `DB_USER` if needed (might be `postgres.projectref`)
- [ ] Saved changes and waited for redeploy
- [ ] Checked logs for "Connected to PostgreSQL database"
- [ ] Tested health endpoint
- [ ] Tested frontend app

## Need Help?

If you're still stuck, share:
1. The exact connection pooler host from Supabase
2. The error message from Render logs
3. Screenshot of your Render environment variables (hide password)

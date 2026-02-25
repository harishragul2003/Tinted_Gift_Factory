# CORS Error Fix Guide

## Current Status

✅ Frontend environment variable is set correctly: `VITE_API_URL=https://artify-aura-api.onrender.com/api`

❌ Backend on Render is not responding with CORS headers

## The Problem

You're seeing these errors in the browser console:
```
Access to XMLHttpRequest at 'https://artify-aura-api.onrender.com/api/products' 
from origin 'https://artify-aura.vercel.app' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause

The backend on Render is either:
1. Not running (sleeping due to inactivity on free tier)
2. Missing the `FRONTEND_URL` environment variable
3. Not deployed with the latest code

## Solution

### Step 1: Check if Backend is Running

Open this URL in your browser:
```
https://artify-aura-api.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Artify Aura API is running",
  "timestamp": "2026-02-25T...",
  "env": "production",
  "corsOrigins": ["https://artify-aura.vercel.app", ...]
}
```

**If you get an error or timeout:**
- Your backend is sleeping or not deployed
- Go to Step 2

**If you see the response:**
- Your backend is running
- Go to Step 3

### Step 2: Wake Up or Redeploy Backend on Render

1. Go to https://dashboard.render.com
2. Find your service: `artify-aura-api`
3. Check the status - if it says "Sleeping", click on it to wake it up
4. If it's not deployed, click **Manual Deploy** → **Deploy latest commit**
5. Wait 2-3 minutes for deployment to complete
6. Try the health check URL again

### Step 3: Verify Environment Variables on Render

1. Go to your Render dashboard
2. Select `artify-aura-api` service
3. Go to **Environment** tab
4. Verify these variables are set:

   **Required:**
   - `FRONTEND_URL` = `https://artify-aura.vercel.app`
   - `DB_HOST` = Your Supabase host
   - `DB_NAME` = `postgres`
   - `DB_USER` = Your Supabase user
   - `DB_PASSWORD` = Your Supabase password
   - `JWT_SECRET` = Any secure random string
   - `NODE_ENV` = `production`
   - `PORT` = `5000`

5. If `FRONTEND_URL` is missing or wrong, add/update it
6. Click **Save Changes**
7. Render will automatically redeploy

### Step 4: Test CORS from Browser Console

1. Open https://artify-aura.vercel.app
2. Open DevTools (F12) → Console tab
3. Run this command:

```javascript
fetch('https://artify-aura-api.onrender.com/api/health')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Backend is accessible:', data);
    console.log('CORS origins:', data.corsOrigins);
  })
  .catch(err => console.error('❌ Backend error:', err))
```

**If successful:** You should see the health check response
**If failed:** Check the error message and go back to Step 2

### Step 5: Test Login

1. Try logging in on https://artify-aura.vercel.app
2. Open DevTools → Network tab
3. Look for the `/api/auth/login` request
4. Check:
   - **Status**: Should be 200 or 400 (not network error)
   - **Response Headers**: Should include `access-control-allow-origin`

## Common Issues

### Issue: Backend is Sleeping (Free Tier)

Render's free tier services sleep after 15 minutes of inactivity. First request wakes it up but takes 30-60 seconds.

**Solution:**
- Wait 1 minute and try again
- Consider upgrading to paid tier for always-on service
- Use a service like UptimeRobot to ping your backend every 10 minutes

### Issue: FRONTEND_URL Not Set

If the environment variable is missing, CORS will block all requests.

**Solution:**
1. Add `FRONTEND_URL=https://artify-aura.vercel.app` in Render
2. Save and wait for automatic redeploy
3. Test again

### Issue: Database Connection Failed

If the backend can't connect to Supabase, it might crash on startup.

**Solution:**
1. Check Render logs: Dashboard → Service → Logs
2. Look for database connection errors
3. Verify Supabase credentials are correct
4. Ensure Supabase allows connections from Render's IP

## Debugging Steps

### Check Render Logs

1. Go to Render dashboard
2. Select `artify-aura-api`
3. Click **Logs** tab
4. Look for:
   - `🚀 Server running on port 5000`
   - `🔒 CORS Configuration:`
   - Any error messages

### Check Network Tab

1. Open https://artify-aura.vercel.app
2. Open DevTools → Network tab
3. Try to login or load products
4. Click on failed request
5. Check:
   - **Request URL**: Should be `https://artify-aura-api.onrender.com/api/...`
   - **Status**: If 0 or ERR_FAILED, backend is down
   - **Response Headers**: Should include CORS headers

## Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Check Render Service Status:**
   - Make sure the service is running (not suspended)
   - Check if there are any Render platform issues

2. **Verify Database:**
   - Test Supabase connection from Render logs
   - Ensure database schema is created

3. **Check Code Deployment:**
   - Verify latest code is deployed on Render
   - Check that `backend/server.js` has the CORS configuration

4. **Contact Support:**
   - Render support: https://render.com/support
   - Check project issues on GitHub

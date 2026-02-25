# Backend Diagnostic Checklist

Use this checklist to diagnose why your backend isn't responding.

## 1. Test Backend Health

Open in browser: https://artify-aura-api.onrender.com/api/health

### ✅ Success Response:
```json
{
  "status": "OK",
  "message": "Artify Aura API is running",
  "timestamp": "2026-02-25T...",
  "env": "production",
  "corsOrigins": ["https://artify-aura.vercel.app", ...]
}
```
→ Backend is running! Go to section 2.

### ❌ Error or Timeout:
- Backend is sleeping or crashed
- Go to Render Dashboard → artify-aura-api
- Check status and logs
- Click "Manual Deploy" if needed

## 2. Check Render Service Status

1. Go to https://dashboard.render.com
2. Find service: `artify-aura-api`
3. Check status indicator:
   - 🟢 **Live**: Good, service is running
   - 🟡 **Building**: Wait for deployment to finish
   - 🔴 **Failed**: Check logs for errors
   - 💤 **Sleeping**: Click to wake up (free tier)

## 3. Verify Environment Variables

In Render Dashboard → artify-aura-api → Environment:

### Required Variables:
```
✓ FRONTEND_URL = https://artify-aura.vercel.app
✓ DB_HOST = db.kmcwivtntaacrgivevww.supabase.co
✓ DB_PORT = 5432
✓ DB_NAME = postgres
✓ DB_USER = postgres
✓ DB_PASSWORD = [your-password]
✓ JWT_SECRET = [any-secure-string]
✓ NODE_ENV = production
✓ PORT = 5000
```

### Missing FRONTEND_URL?
This is the most common issue! Without it, CORS will block all requests.

**Fix:**
1. Click "Add Environment Variable"
2. Key: `FRONTEND_URL`
3. Value: `https://artify-aura.vercel.app`
4. Save (auto-redeploys)

## 4. Check Render Logs

In Render Dashboard → artify-aura-api → Logs:

### Look for these startup messages:
```
🚀 Server running on port 5000
📍 API URL: http://localhost:5000/api
🔒 CORS Configuration:
Allowed origins: [...]
```

### Common Error Messages:

**Database Connection Error:**
```
Error: connect ECONNREFUSED
```
→ Check Supabase credentials

**Port Already in Use:**
```
Error: listen EADDRINUSE
```
→ Render issue, try redeploying

**Module Not Found:**
```
Error: Cannot find module
```
→ Dependencies not installed, check build logs

## 5. Test CORS from Browser

1. Open https://artify-aura.vercel.app
2. Press F12 (DevTools)
3. Go to Console tab
4. Paste and run:

```javascript
fetch('https://artify-aura-api.onrender.com/api/health', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', [...response.headers.entries()]);
  return response.json();
})
.then(data => console.log('✅ Success:', data))
.catch(error => console.error('❌ Error:', error));
```

### Expected Output:
```
Status: 200
Headers: [
  ["access-control-allow-origin", "https://artify-aura.vercel.app"],
  ["content-type", "application/json"],
  ...
]
✅ Success: { status: "OK", ... }
```

### If you see CORS error:
- `FRONTEND_URL` is not set or wrong in Render
- Backend code doesn't have CORS configuration
- Backend is not deployed with latest code

## 6. Test Login API

In browser console on https://artify-aura.vercel.app:

```javascript
fetch('https://artify-aura-api.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Expected (even with wrong credentials):
```json
{ "message": "Invalid credentials" }
```

### If you get network error:
- Backend is not accessible
- CORS is blocking the request
- Go back to step 1

## 7. Check Database Connection

The backend needs to connect to Supabase. Check logs for:

```
✅ Database connected successfully
```

Or error:
```
❌ Database connection failed: [error message]
```

### If database connection fails:

1. **Check Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → Database
   - Verify connection details match Render env vars

2. **Check Supabase Firewall:**
   - Go to Settings → Database → Connection Pooling
   - Ensure "Allow connections from anywhere" is enabled
   - Or add Render's IP ranges

3. **Test Connection String:**
   - Use the connection string from Supabase
   - Format: `postgresql://user:password@host:5432/postgres`

## 8. Redeploy Backend

If nothing else works, try a fresh deployment:

1. Go to Render Dashboard → artify-aura-api
2. Click "Manual Deploy" → "Clear build cache & deploy"
3. Wait 3-5 minutes for deployment
4. Check logs for startup messages
5. Test health endpoint again

## 9. Common Free Tier Issues

### Service Sleeping
- Free tier services sleep after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Subsequent requests are fast

**Solution:**
- Wait 1 minute after first request
- Use UptimeRobot to ping every 10 minutes
- Upgrade to paid tier for always-on

### Build Timeout
- Free tier has limited build time
- Large dependencies might timeout

**Solution:**
- Check build logs for timeout errors
- Optimize dependencies
- Upgrade to paid tier

## 10. Quick Fixes Summary

| Issue | Fix |
|-------|-----|
| Backend sleeping | Wait 1 minute, try again |
| CORS error | Add `FRONTEND_URL` env var in Render |
| Database error | Check Supabase credentials |
| 404 on routes | Verify routes start with `/api/` |
| Build failed | Check build logs, clear cache |
| Module not found | Verify package.json, redeploy |

## Need More Help?

1. **Check Render Status:** https://status.render.com
2. **Render Docs:** https://render.com/docs
3. **Project Issues:** Create an issue with:
   - Error messages from browser console
   - Render logs (last 50 lines)
   - Environment variables (hide sensitive values)

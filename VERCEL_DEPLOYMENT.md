# Deploying to Vercel

This guide will help you deploy the Surprise Basket application to Vercel.

## Important Note

Vercel is primarily designed for frontend/static sites and serverless functions. For this full-stack application with a persistent Node.js backend, **Render or Railway is recommended** instead of Vercel.

However, if you want to use Vercel, you'll need to:
1. Deploy the frontend on Vercel
2. Deploy the backend on a different platform (Render, Railway, Heroku, etc.)

## Option 1: Frontend Only on Vercel (Recommended)

### Deploy Frontend

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository: `harishragul2003/Tinted_Gift_Factory`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://artify-aura-api.onrender.com/api`
   - **CRITICAL**: Must include `/api` at the end or you'll get CORS errors
   - Add for all environments (Production, Preview, Development)

6. Click "Deploy"

### After Deployment

If you see CORS errors in the browser console:
1. Verify `VITE_API_URL` is set correctly in Vercel (with `/api` suffix)
2. Redeploy the frontend after adding/updating environment variables
3. Check that your backend on Render is running and accessible

### Deploy Backend on Render

Follow the instructions in `RENDER_DEPLOYMENT.md` to deploy the backend on Render.

## Option 2: Serverless Backend on Vercel (Advanced)

If you want to use Vercel for both, you'll need to convert the backend to serverless functions.

### Steps:

1. Create `api` folder in root
2. Convert each route to a serverless function
3. Update database connections to handle serverless (connection pooling)
4. This requires significant refactoring

**This is NOT recommended for this application** as it's designed as a traditional Node.js server.

## Recommended Deployment Strategy

**Best approach for this project:**

1. **Frontend**: Deploy on Vercel (fast, free, great for React)
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Backend**: Deploy on Render (free tier available, supports Node.js servers)
   - Root Directory: `backend`
   - Start Command: `node server.js`

3. **Database**: Already on Supabase (PostgreSQL)

## Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://artify-aura-api.onrender.com/api
```
**Note:** The `/api` suffix is required. Without it, requests will fail with CORS errors.

### Backend (Render)
```
NODE_ENV=production
PORT=5000
DB_HOST=db.kmcwivtntaacrgivevww.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
```

## Post-Deployment

1. Update CORS settings in backend to allow your Vercel frontend URL
2. Test all features
3. Run database schema in Supabase
4. Create admin user

## Troubleshooting

### Build Fails on Vercel
- Make sure Root Directory is set to `frontend`
- Check that all dependencies are in `frontend/package.json`
- Verify build command is `npm run build`

### API Calls Fail
- Check VITE_API_URL is correct
- Verify backend is running on Render
- Check CORS settings in backend

### Database Connection Issues
- Verify Supabase credentials
- Check that backend can connect to Supabase
- Ensure SSL is enabled

## Alternative: Deploy Everything on Render

For simplicity, you can deploy both frontend and backend on Render:
- See `RENDER_DEPLOYMENT.md` for complete instructions
- This keeps everything in one place
- Easier to manage environment variables
- Better for traditional Node.js applications

## Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Project Issues: https://github.com/harishragul2003/Tinted_Gift_Factory/issues

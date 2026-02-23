# Deploying to Render

This guide will help you deploy the Surprise Basket application to Render.

## Prerequisites

1. A Render account (https://render.com)
2. Your GitHub repository pushed
3. Supabase database credentials

## Deployment Options

### Option 1: Manual Deployment (Recommended for this setup)

#### Deploy Backend

1. Go to Render Dashboard (https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `harishragul2003/Tinted_Gift_Factory`
4. Configure:
   - **Name**: surprise-basket-backend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: `backend` ← IMPORTANT!
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=db.kmcwivtntaacrgivevww.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   JWT_SECRET=your-random-secret-key-here
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., https://surprise-basket-backend.onrender.com)

#### Deploy Frontend

1. Go to Render Dashboard
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: surprise-basket-frontend
   - **Branch**: main
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist

5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

6. Click "Create Static Site"

## Post-Deployment Steps

1. **Set up Database**:
   - Go to your Supabase dashboard
   - Run the SQL from `backend/database/schema.sql`

2. **Create Admin User**:
   - SSH into your backend service or run locally:
   ```bash
   node backend/create-admin.js
   ```

3. **Update CORS**:
   - Make sure your backend's FRONTEND_URL matches your actual frontend URL

4. **Test the Application**:
   - Visit your frontend URL
   - Try registering a user
   - Login as admin
   - Test all features

## Troubleshooting

### Build Fails

- Check that Node.js version is 18 or higher
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Database Connection Issues

- Verify Supabase credentials
- Check that Supabase allows connections from Render IPs
- Ensure SSL is enabled in database connection

### CORS Errors

- Update FRONTEND_URL in backend environment variables
- Restart the backend service

### Environment Variables Not Working

- Make sure variables are set in Render dashboard
- Restart services after adding variables
- Check variable names match exactly

## Free Tier Limitations

- Backend will sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month of runtime
- Consider upgrading for production use

## Updating Your Deployment

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Render will automatically redeploy

## Support

For issues, check:
- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Project Issues: https://github.com/harishragul2003/Tinted_Gift_Factory/issues

# Deploying to Render

This guide will help you deploy the Surprise Basket application to Render.

## Prerequisites

1. A Render account (https://render.com)
2. Your GitHub repository pushed
3. Supabase database credentials

## Deployment Options

### Option 1: Using render.yaml (Recommended)

The `render.yaml` file is already configured. Render will automatically detect it.

1. Go to https://dashboard.render.com
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `harishragul2003/Tinted_Gift_Factory`
4. Render will detect the `render.yaml` file
5. Add environment variables:
   - `DB_HOST`: Your Supabase host (e.g., db.xxx.supabase.co)
   - `DB_NAME`: postgres
   - `DB_USER`: postgres
   - `DB_PASSWORD`: Your Supabase password
6. Click "Apply"

### Option 2: Manual Deployment

#### Deploy Backend

1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: surprise-basket-backend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=your-supabase-host.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   JWT_SECRET=your-random-secret-key
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

6. Click "Create Web Service"

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

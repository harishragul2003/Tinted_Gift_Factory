# 🚀 Deployment Guide - Surprise Basket

Complete guide to deploy your Surprise Basket e-commerce platform to production.

## 📋 Pre-Deployment Checklist

- [ ] Database setup complete
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] Sample data loaded
- [ ] API endpoints tested
- [ ] Frontend build successful
- [ ] Security review completed

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your database credentials

### 2. Run Database Schema

1. Open Supabase SQL Editor
2. Copy contents from `backend/database/schema.sql`
3. Execute the SQL script
4. Verify tables are created

### 3. Create Admin User

```sql
-- Generate bcrypt hash for password 'admin123'
-- Use online tool or Node.js script

INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@surprisebasket.com', '$2a$10$[YOUR_BCRYPT_HASH]', 'admin');
```

## 🔧 Backend Deployment

### Option 1: Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add environment variables in Railway dashboard:
```
PORT=5000
NODE_ENV=production
DB_HOST=your-supabase-host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend-url.vercel.app
```

4. Deploy:
```bash
railway up
```

### Option 2: Render

1. Create new Web Service on [render.com](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Add environment variables in Render dashboard
5. Deploy

### Option 3: Heroku

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
heroku create surprise-basket-api
```

3. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set DB_HOST=your-host
# ... set all other variables
```

4. Deploy:
```bash
git subtree push --prefix backend heroku main
```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend:
```bash
cd frontend
```

3. Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

4. Deploy:
```bash
vercel --prod
```

Or use Vercel Dashboard:
1. Import GitHub repository
2. Set root directory to `frontend`
3. Add environment variable `VITE_API_URL`
4. Deploy

### Option 2: Netlify

1. Build the project:
```bash
cd frontend
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

Or use Netlify Dashboard:
1. Drag and drop `dist` folder
2. Configure environment variables
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 3: GitHub Pages

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/surprise-basket/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

## 🔒 Security Checklist

### Backend
- [ ] Change default admin password
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS only
- [ ] Set secure CORS origins
- [ ] Rate limiting implemented
- [ ] SQL injection prevention (using parameterized queries)
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

### Frontend
- [ ] API keys not exposed in client code
- [ ] HTTPS enforced
- [ ] XSS protection enabled
- [ ] Content Security Policy configured
- [ ] Sensitive data not stored in localStorage

### Database
- [ ] Strong database password
- [ ] SSL connection enabled
- [ ] Regular backups configured
- [ ] Access restricted to backend only

## 🌐 Domain Configuration

### Custom Domain Setup

1. Purchase domain from provider (Namecheap, GoDaddy, etc.)

2. For Frontend (Vercel):
   - Add domain in Vercel dashboard
   - Update DNS records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. For Backend (Railway):
   - Add custom domain in Railway
   - Update DNS:
     ```
     Type: CNAME
     Name: api
     Value: your-app.up.railway.app
     ```

## 📧 Email Configuration (Optional)

### Using Gmail

1. Enable 2-factor authentication
2. Generate App Password
3. Update backend `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Using SendGrid

1. Create SendGrid account
2. Get API key
3. Update email service in backend

## 📱 WhatsApp Integration (Optional)

### Using Twilio WhatsApp API

1. Create Twilio account
2. Set up WhatsApp sandbox
3. Get credentials
4. Update backend:
```env
WHATSAPP_API_KEY=your-twilio-key
WHATSAPP_PHONE_NUMBER=+1234567890
```

## 🔍 Monitoring & Analytics

### Backend Monitoring

1. **Sentry** for error tracking:
```bash
npm install @sentry/node
```

2. **LogRocket** for session replay

3. **New Relic** for performance monitoring

### Frontend Analytics

1. **Google Analytics**:
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

2. **Hotjar** for user behavior

## 🧪 Testing Before Production

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Load Testing
```bash
# Using Apache Bench
ab -n 1000 -c 100 https://your-api-url.com/api/products
```

## 📊 Performance Optimization

### Frontend
- [ ] Enable code splitting
- [ ] Optimize images (WebP format)
- [ ] Enable lazy loading
- [ ] Minify CSS/JS
- [ ] Enable Gzip compression
- [ ] Use CDN for static assets

### Backend
- [ ] Enable response compression
- [ ] Implement caching (Redis)
- [ ] Database query optimization
- [ ] Connection pooling configured
- [ ] Rate limiting enabled

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          cd frontend
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Error**
   - Check CORS configuration in backend
   - Verify FRONTEND_URL in backend .env

2. **Database Connection Failed**
   - Verify database credentials
   - Check if IP is whitelisted in Supabase

3. **Build Fails**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

4. **API 404 Errors**
   - Verify API_URL in frontend .env
   - Check backend routes are correct

## 📞 Support

For deployment issues:
- Email: support@surprisebasket.com
- Documentation: [Your docs URL]
- GitHub Issues: [Your repo URL]

---

🎉 Congratulations! Your Surprise Basket platform is now live!

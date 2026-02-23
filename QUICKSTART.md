# ⚡ Quick Start Guide - Surprise Basket

Get your Surprise Basket e-commerce platform running in 5 minutes!

## 🎯 Prerequisites

- Node.js v18+ installed
- PostgreSQL database (Supabase account)
- Git installed

## 🚀 Quick Setup

### Step 1: Clone & Install

```bash
# Clone the repository (if from git)
git clone <your-repo-url>
cd surprise-basket

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Database Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Copy and paste the contents of `backend/database/schema.sql`
5. Click "Run" to execute
6. Note your database credentials from Settings > Database

### Step 3: Backend Configuration

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your credentials
# Use notepad, vim, or any text editor
notepad .env  # Windows
nano .env     # Linux/Mac
```

Update these values in `.env`:
```env
PORT=5000
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-supabase-password
JWT_SECRET=your-random-secret-key-min-32-chars
FRONTEND_URL=http://localhost:3000
```

### Step 4: Frontend Configuration

```bash
cd ../frontend

# Copy environment template
cp .env.example .env

# Edit .env file
notepad .env  # Windows
nano .env     # Linux/Mac
```

Update:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

Open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ Connected to PostgreSQL database
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 6: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

## 👤 Default Login Credentials

After running the database schema, you need to create an admin user.

### Create Admin User

1. Generate a bcrypt hash for your password:

```bash
# In Node.js console or use online bcrypt generator
node
> const bcrypt = require('bcryptjs');
> bcrypt.hash('admin123', 10).then(hash => console.log(hash));
```

2. Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@surprisebasket.com', 'YOUR_BCRYPT_HASH_HERE', 'admin');
```

3. Login with:
- Email: `admin@surprisebasket.com`
- Password: `admin123` (or whatever you used)

## 🎨 Features to Try

### As a Customer:
1. Browse products on home page
2. Filter products by category
3. Add items to cart
4. Proceed to checkout
5. View order in dashboard

### As an Admin:
1. Login with admin credentials
2. Go to Admin Dashboard
3. View all orders
4. Update order status
5. Verify payments

## 📱 Test on Mobile

1. Find your local IP address:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

2. Update frontend `.env`:
```env
VITE_API_URL=http://YOUR_LOCAL_IP:5000/api
```

3. Access from mobile:
```
http://YOUR_LOCAL_IP:3000
```

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to database"
**Fix:** 
- Check database credentials in backend `.env`
- Verify Supabase project is active
- Check if your IP is whitelisted in Supabase

### Issue: "CORS error"
**Fix:**
- Verify FRONTEND_URL in backend `.env` matches your frontend URL
- Restart backend server after changing .env

### Issue: "Module not found"
**Fix:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Port already in use"
**Fix:**
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 📚 Next Steps

1. **Customize Design:**
   - Edit colors in `frontend/tailwind.config.js`
   - Modify components in `frontend/src/components/`

2. **Add Products:**
   - Login as admin
   - Use Supabase SQL Editor to insert products
   - Or create admin product management UI

3. **Configure Payment:**
   - Update QR code in `frontend/src/pages/Checkout.tsx`
   - Add your UPI ID

4. **Setup Email:**
   - Configure email settings in backend `.env`
   - Test order confirmation emails

5. **Deploy:**
   - Follow `DEPLOYMENT.md` for production deployment
   - Use Vercel for frontend, Railway for backend

## 🎓 Learning Resources

- **React + TypeScript:** [react-typescript-cheatsheet.netlify.app](https://react-typescript-cheatsheet.netlify.app/)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion:** [framer.com/motion](https://www.framer.com/motion/)
- **Express.js:** [expressjs.com](https://expressjs.com/)
- **PostgreSQL:** [postgresql.org/docs](https://www.postgresql.org/docs/)

## 💡 Tips

1. **Development:**
   - Use React DevTools browser extension
   - Enable hot reload for faster development
   - Check browser console for errors

2. **Database:**
   - Use Supabase Table Editor for easy data management
   - Enable Row Level Security for production
   - Regular backups recommended

3. **Testing:**
   - Test all user flows before deployment
   - Try different screen sizes
   - Test payment flow thoroughly

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `DEPLOYMENT.md` for production setup
- Open an issue on GitHub
- Email: support@surprisebasket.com

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Database connected successfully
- [ ] Admin user created
- [ ] Sample products visible
- [ ] Can add items to cart
- [ ] Can complete checkout flow
- [ ] Admin dashboard accessible

---

🎉 **You're all set!** Start building your gift shop empire!

Happy coding! 🚀

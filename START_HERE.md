# 🚀 Start Here - Surprise Basket

## ✅ Dependencies Installed Successfully!

Both frontend and backend dependencies have been installed.

## 🎯 Next Steps

### Step 1: Configure Environment Variables

#### Backend Configuration
1. Navigate to `backend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   copy .env.example .env
   ```
3. Edit `backend/.env` and update these values:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Get these from your Supabase project
   DB_HOST=db.xxxxx.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-supabase-password
   
   # Generate a random secret (32+ characters)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   FRONTEND_URL=http://localhost:3000
   ```

#### Frontend Configuration
1. Navigate to `frontend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd frontend
   copy .env.example .env
   ```
3. The default values should work:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Step 2: Set Up Database

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free account
   - Create a new project

2. **Get Database Credentials**
   - In Supabase dashboard, go to Settings → Database
   - Copy the connection details
   - Update your `backend/.env` file

3. **Run Database Schema**
   - In Supabase, go to SQL Editor
   - Open `backend/database/schema.sql` in your code editor
   - Copy all the SQL content
   - Paste it in Supabase SQL Editor
   - Click "Run" to execute
   - Verify tables are created in Table Editor

4. **Create Admin User**
   - Generate bcrypt hash for password "admin123":
     ```bash
     node
     > const bcrypt = require('bcryptjs');
     > bcrypt.hash('admin123', 10).then(hash => console.log(hash));
     ```
   - Copy the hash
   - In Supabase SQL Editor, run:
     ```sql
     INSERT INTO users (name, email, password, role) VALUES
     ('Admin', 'admin@surprisebasket.com', 'YOUR_BCRYPT_HASH_HERE', 'admin');
     ```

### Step 3: Start Development Servers

You need to run TWO separate terminal windows:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 API URL: http://localhost:5000/api
✅ Connected to PostgreSQL database
```

#### Terminal 2 - Frontend Server
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

### Step 4: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

### Step 5: Test the Application

1. **Browse Products**
   - Home page should load with animations
   - Click "Products" to see product listing
   - Products should display (from sample data)

2. **Test Shopping Cart**
   - Click "Add to Cart" on any product
   - Cart badge should update
   - Go to Cart page
   - Verify items are there

3. **Test Authentication**
   - Click "Login"
   - Register a new user or login with admin:
     - Email: `admin@surprisebasket.com`
     - Password: `admin123`

4. **Test Admin Dashboard** (if logged in as admin)
   - Go to Admin Dashboard
   - View statistics
   - See orders table
   - Charts should render

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Verify database credentials in `backend/.env`
- Check if Supabase project is active
- Ensure you ran the schema SQL

### Issue: "CORS error"
**Solution:**
- Verify `FRONTEND_URL` in `backend/.env` is `http://localhost:3000`
- Restart backend server

### Issue: Backend won't start
**Solution:**
- Check if port 5000 is already in use
- Kill the process: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Or change PORT in `backend/.env`

### Issue: Frontend won't start
**Solution:**
- Check if port 3000 is already in use
- Vite will automatically use next available port
- Or change port in `frontend/vite.config.ts`

### Issue: No products showing
**Solution:**
- Verify database schema was run successfully
- Check if sample data was inserted
- Check browser console for errors
- Check backend terminal for database connection errors

## ✅ Verification Checklist

- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] Backend `.env` file created and configured
- [ ] Frontend `.env` file created
- [ ] Supabase account created
- [ ] Database schema executed
- [ ] Admin user created
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Application loads in browser
- [ ] Products display on home page
- [ ] Can add items to cart
- [ ] Can login/register

## 📚 Additional Resources

- **Full Documentation:** README.md
- **Quick Setup:** QUICKSTART.md
- **All Features:** FEATURES.md
- **Deployment:** DEPLOYMENT.md
- **Contributing:** CONTRIBUTING.md

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Read QUICKSTART.md for detailed setup
3. Run `node verify-setup.js` to check your setup
4. Check browser console for errors
5. Check terminal output for error messages

## 🎉 You're Ready!

Once both servers are running and you can access the application:
- Start customizing the design
- Add your own products
- Modify features
- Deploy to production

**Happy coding! 🚀**

# 🚀 Getting Started with Surprise Basket

Welcome to Surprise Basket! This guide will help you get up and running quickly.

## 📖 What is Surprise Basket?

Surprise Basket is a modern, premium gift shop e-commerce platform featuring:
- Beautiful animated UI with React + TypeScript
- Secure backend with Node.js + Express
- PostgreSQL database (Supabase)
- QR code-based payment system
- Admin dashboard with analytics
- Fully responsive design

## 🎯 Quick Navigation

Choose your path:

### 👨‍💻 For Developers
1. **First Time Setup** → Read [QUICKSTART.md](QUICKSTART.md)
2. **Detailed Documentation** → Read [README.md](README.md)
3. **Project Overview** → Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
4. **Contributing** → Read [CONTRIBUTING.md](CONTRIBUTING.md)

### 🚀 For Deployment
1. **Production Deployment** → Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Environment Setup** → Check `.env.example` files
3. **Database Setup** → See `backend/database/schema.sql`

### 📋 For Project Management
1. **Feature List** → Read [FEATURES.md](FEATURES.md)
2. **Setup Checklist** → Read [CHECKLIST.md](CHECKLIST.md)
3. **Verification** → Run `node verify-setup.js`

## ⚡ 5-Minute Quick Start

### Prerequisites
```bash
# Check Node.js version (need v18+)
node --version

# Check npm
npm --version
```

### Installation

**Option 1: Automated (Recommended)**

Windows:
```bash
install.bat
```

Mac/Linux:
```bash
chmod +x install.sh
./install.sh
```

**Option 2: Manual**

```bash
# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

### Configuration

1. **Backend Environment** (`backend/.env`):
```env
PORT=5000
DB_HOST=your-supabase-host
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
```

2. **Frontend Environment** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Database Setup**:
   - Create Supabase account
   - Run SQL from `backend/database/schema.sql`

### Start Development

**Option 1: Automated**

Windows:
```bash
start-dev.bat
```

Mac/Linux:
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Option 2: Manual**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 📚 Documentation Structure

```
📁 Surprise Basket Documentation
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # 5-minute setup guide
├── 📄 GETTING_STARTED.md           # This file
├── 📄 PROJECT_SUMMARY.md           # Complete project overview
├── 📄 FEATURES.md                  # All features (200+)
├── 📄 DEPLOYMENT.md                # Production deployment
├── 📄 CONTRIBUTING.md              # Contribution guidelines
├── 📄 CHECKLIST.md                 # Setup verification
├── 📄 LICENSE                      # MIT License
│
├── 🔧 Configuration Files
│   ├── .gitignore                  # Git ignore rules
│   ├── install.sh / .bat           # Installation scripts
│   ├── start-dev.sh / .bat         # Development scripts
│   └── verify-setup.js             # Setup verification
│
├── 📁 frontend/                    # React + TypeScript
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   ├── pages/                  # Page components
│   │   ├── layouts/                # Layout components
│   │   ├── context/                # React Context
│   │   ├── services/               # API services
│   │   ├── types/                  # TypeScript types
│   │   ├── App.tsx                 # Root component
│   │   └── main.tsx                # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── 📁 backend/                     # Node.js + Express
    ├── config/                     # Configuration
    ├── controllers/                # Business logic
    ├── middleware/                 # Express middleware
    ├── routes/                     # API routes
    ├── utils/                      # Utilities
    ├── database/                   # SQL schema
    ├── server.js                   # Express server
    └── package.json
```

## 🎓 Learning Path

### Beginner Path
1. Read [QUICKSTART.md](QUICKSTART.md)
2. Follow installation steps
3. Explore the running application
4. Read [README.md](README.md) for details
5. Check [FEATURES.md](FEATURES.md) to understand capabilities

### Intermediate Path
1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Study the code structure
3. Understand the architecture
4. Make small modifications
5. Read [CONTRIBUTING.md](CONTRIBUTING.md)

### Advanced Path
1. Read all documentation
2. Understand the full stack
3. Implement new features
4. Optimize performance
5. Deploy to production using [DEPLOYMENT.md](DEPLOYMENT.md)

## 🛠️ Common Tasks

### Add a New Product (via Database)
```sql
INSERT INTO products (name, description, price, image_url, category_id, stock, is_featured)
VALUES ('New Gift', 'Description', 999.00, 'https://...', 'category-id', 50, false);
```

### Create Admin User
```sql
-- First, hash password using bcrypt
-- Then insert:
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', 'hashed-password', 'admin');
```

### Update Environment Variables
```bash
# Backend
nano backend/.env

# Frontend
nano frontend/.env

# Restart servers after changes
```

### Run Verification
```bash
node verify-setup.js
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
1. Check database credentials in `backend/.env`
2. Verify Supabase project is active
3. Check network connection

### Issue: "CORS error"
**Solution:**
1. Verify `FRONTEND_URL` in `backend/.env`
2. Restart backend server
3. Clear browser cache

### Issue: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Port already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 📞 Getting Help

### Documentation
- Check relevant `.md` files in root directory
- Read inline code comments
- Review example code

### Community
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Email: support@surprisebasket.com

### Resources
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)

## ✅ Next Steps

After getting started:

1. **Explore the Application**
   - Browse products
   - Add items to cart
   - Complete checkout flow
   - Check admin dashboard

2. **Customize**
   - Update colors in `tailwind.config.js`
   - Modify components in `frontend/src/components/`
   - Add your own products

3. **Develop**
   - Add new features
   - Improve existing features
   - Write tests
   - Optimize performance

4. **Deploy**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Set up production database
   - Configure domain
   - Enable SSL

5. **Maintain**
   - Monitor errors
   - Update dependencies
   - Backup database
   - Improve based on feedback

## 🎯 Project Goals

- ✅ Modern, beautiful UI
- ✅ Secure authentication
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Admin dashboard
- ✅ Production ready
- ✅ Well documented
- ✅ Easy to customize

## 🌟 Key Features

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, PostgreSQL, JWT
- **Features:** Shopping cart, Checkout, Admin panel, Analytics
- **Design:** Glassmorphism, Dark mode, Responsive
- **Security:** JWT auth, Bcrypt, CORS, SQL injection prevention

## 📈 Project Stats

- **Files:** 50+ source files
- **Features:** 200+ features
- **Documentation:** 10+ comprehensive guides
- **Lines of Code:** 5000+ lines
- **Technologies:** 15+ technologies
- **Ready for:** Development & Production

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Set up the project
- ✅ Understand the architecture
- ✅ Start developing
- ✅ Deploy to production
- ✅ Maintain and scale

**Happy coding with Surprise Basket! 🎁**

---

**Need help?** Check the other documentation files or reach out to the community!

**Want to contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md)!

**Ready to deploy?** Follow [DEPLOYMENT.md](DEPLOYMENT.md)!

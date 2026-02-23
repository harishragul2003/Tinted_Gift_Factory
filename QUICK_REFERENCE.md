# ⚡ Quick Reference - Surprise Basket

## 🚀 Start Development Servers

### Backend
```bash
cd backend
npm run dev
```
Runs on: http://localhost:5000

### Frontend
```bash
cd frontend
npm run dev
```
Runs on: http://localhost:3000

## 📁 Project Structure

```
surprise-basket/
├── frontend/          # React + TypeScript
│   ├── src/
│   │   ├── pages/     # All pages
│   │   ├── components/# Reusable components
│   │   ├── context/   # State management
│   │   └── services/  # API calls
│   └── .env           # Frontend config
│
└── backend/           # Node.js + Express
    ├── controllers/   # Business logic
    ├── routes/        # API endpoints
    ├── middleware/    # Auth & validation
    └── .env           # Backend config
```

## 🔑 Default Credentials

**Admin Login:**
- Email: `admin@surprisebasket.com`
- Password: `admin123`

## 🌐 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |
| Supabase | https://supabase.com |

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register    # Register user
POST /api/auth/login       # Login user
```

### Products
```
GET    /api/products       # Get all products
GET    /api/products/:id   # Get single product
POST   /api/products       # Create product (Admin)
PUT    /api/products/:id   # Update product (Admin)
DELETE /api/products/:id   # Delete product (Admin)
```

### Categories
```
GET  /api/categories       # Get all categories
POST /api/categories       # Create category (Admin)
```

### Orders
```
POST /api/orders           # Create order
GET  /api/orders/:userId   # Get user orders
GET  /api/admin/orders     # Get all orders (Admin)
PUT  /api/admin/orders/:id # Update order (Admin)
```

## 🗄️ Database Tables

- **users** - User accounts
- **categories** - Product categories
- **products** - Gift products
- **orders** - Customer orders
- **order_items** - Order line items

## 🛠️ Common Commands

### Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
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

### Run Tests
```bash
npm test
```

### Verify Setup
```bash
node verify-setup.js
```

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
  }
}
```

### Add New Page
1. Create file in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Add navigation link in `MainLayout.tsx`

### Add New API Endpoint
1. Create controller in `backend/controllers/`
2. Create route in `backend/routes/`
3. Import route in `backend/server.js`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=your-supabase-host
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Kill process or change port |
| CORS error | Check FRONTEND_URL in backend/.env |
| DB connection failed | Verify credentials in .env |
| Module not found | Run `npm install` |
| Build fails | Delete node_modules, reinstall |

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| START_HERE.md | First-time setup |
| QUICKSTART.md | 5-minute guide |
| README.md | Full documentation |
| FEATURES.md | All features |
| DEPLOYMENT.md | Production deploy |

## 🎯 Development Workflow

1. Make changes to code
2. Save file (auto-reload)
3. Check browser/terminal for errors
4. Test functionality
5. Commit changes

## 🚀 Deployment Checklist

- [ ] Update environment variables
- [ ] Build frontend (`npm run build`)
- [ ] Set up production database
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Configure custom domain
- [ ] Enable SSL
- [ ] Test production site

## 💡 Useful Shortcuts

### VS Code
- `Ctrl + P` - Quick file open
- `Ctrl + Shift + F` - Search in files
- `Ctrl + `` - Toggle terminal
- `F5` - Start debugging

### Browser DevTools
- `F12` - Open DevTools
- `Ctrl + Shift + C` - Inspect element
- `Ctrl + Shift + J` - Console

## 📞 Get Help

- Check documentation files
- Run `node verify-setup.js`
- Check browser console
- Check terminal output
- Read error messages carefully

## ✨ Quick Wins

### Add a Product (SQL)
```sql
INSERT INTO products (name, description, price, image_url, category_id, stock)
VALUES ('Gift Name', 'Description', 999.00, 'https://...', 'category-id', 50);
```

### Create Admin User (SQL)
```sql
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', 'bcrypt-hash', 'admin');
```

### Update Order Status (SQL)
```sql
UPDATE orders 
SET order_status = 'Shipped', payment_status = 'Payment Verified'
WHERE id = 'order-id';
```

---

**Keep this file handy for quick reference!** 📌

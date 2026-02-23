# 🎁 Surprise Basket - Premium Gift Shop E-commerce

A modern, fully animated gift shop e-commerce platform built with React, TypeScript, Node.js, and PostgreSQL.

## ✨ Features

### Frontend
- 🎨 Modern UI with Tailwind CSS & Framer Motion animations
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive (Mobile-first design)
- 🛒 Shopping cart with persistent storage
- 💳 QR code-based payment system
- 🔐 JWT authentication
- 👤 User dashboard
- 👨‍💼 Admin dashboard with analytics
- 🎯 Product filtering & search
- ⭐ Featured products showcase
- 🎭 Glassmorphism design elements
- 🔔 Toast notifications

### Backend
- 🚀 RESTful API with Express.js
- 🔒 Secure authentication with JWT & bcrypt
- 🗄️ PostgreSQL database (Supabase)
- 👮 Role-based access control
- 📦 Order management system
- 💰 Payment verification workflow
- 🏗️ MVC architecture

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)
- Chart.js (Analytics)
- Axios (API calls)
- React Router DOM
- Zustand (State management)
- React Hot Toast (Notifications)

### Backend
- Node.js
- Express.js
- PostgreSQL (Supabase)
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS
- dotenv

## 📁 Project Structure

```
surprise-basket/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── Login.tsx
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   ├── product.ts
│   │   │   ├── order.ts
│   │   │   └── user.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   ├── categoryController.js
    │   └── orderController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── categoryRoutes.js
    │   └── orderRoutes.js
    ├── utils/
    │   └── generateToken.js
    ├── database/
    │   └── schema.sql
    ├── server.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (Supabase account)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
NODE_ENV=development

# Supabase PostgreSQL
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

FRONTEND_URL=http://localhost:3000
```

4. Set up database:
- Create a Supabase project
- Run the SQL schema from `database/schema.sql` in Supabase SQL Editor
- Update `.env` with your database credentials

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📊 Database Schema

### Tables
- **users** - User accounts (customers & admins)
- **categories** - Product categories
- **products** - Gift products
- **orders** - Customer orders
- **order_items** - Order line items

## 🔐 Authentication

### Default Admin Credentials
After running the schema, create an admin user:
- Email: `admin@surprisebasket.com`
- Password: `admin123` (Change in production!)

## 💳 Payment Flow

1. User adds products to cart
2. Proceeds to checkout
3. QR code displayed with UPI ID
4. User makes payment via UPI
5. User uploads payment screenshot
6. User enters transaction ID
7. Order created with status "Payment Verification Pending"
8. Admin verifies payment and updates status
9. Order shipped and delivered

## 🎨 Design Features

- Soft pastel gradient theme
- Glassmorphism cards
- Smooth scroll animations
- Glow button effects
- Skeleton loading states
- Mobile bottom navigation
- Responsive grid layouts
- Touch-optimized UI

## 📱 Mobile Features

- Hamburger menu
- Bottom navigation bar
- Sticky add to cart button
- Swipeable carousels
- Touch gestures
- Responsive breakpoints:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:userId` - Get user orders
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/:id` - Update order status (Admin)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
npm start
```

### Environment Variables
Make sure to set all environment variables in your hosting platform.

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@surprisebasket.com

---

Made with ❤️ by Surprise Basket Team

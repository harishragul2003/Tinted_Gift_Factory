import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://artify-aura.vercel.app',
  /https:\/\/artify-aura-.*\.vercel\.app$/ // Allow all Vercel preview deployments
];

// Log CORS configuration on startup
console.log('🔒 CORS Configuration:');
console.log('Allowed origins:', allowedOrigins);
console.log('FRONTEND_URL from env:', process.env.FRONTEND_URL);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    // Check if origin is in allowed list or matches regex pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      }
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      console.log('✅ CORS: Allowing origin:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS: Blocking origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', orderRoutes);
app.use('/api/admin/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Artify Aura API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    corsOrigins: allowedOrigins.map(o => o instanceof RegExp ? o.toString() : o)
  });
});

// Root health check (without /api prefix)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Artify Aura API is running',
    timestamp: new Date().toISOString()
  });
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    const { sendOrderConfirmation } = await import('./utils/emailService.js');
    
    const testEmail = req.query.email || process.env.EMAIL_USER;
    
    await sendOrderConfirmation(testEmail, {
      id: 'test-' + Date.now(),
      total_amount: 1000,
      payment_status: 'Pending',
      order_status: 'Processing',
      shipping_address: '123 Test Street, Test City, 12345',
      items: [
        { name: 'Test Product 1', quantity: 2, price: 500 },
        { name: 'Test Product 2', quantity: 1, price: 500 }
      ]
    });
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully!',
      sentTo: testEmail
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        command: error.command
      }
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});

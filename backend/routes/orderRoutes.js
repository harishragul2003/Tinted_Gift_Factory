import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/:userId', protect, getUserOrders);

// Admin routes (when mounted at /api/admin/orders)
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id', protect, adminOnly, updateOrderStatus);

export default router;

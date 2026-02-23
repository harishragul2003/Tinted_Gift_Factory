import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:userId', protect, getUserOrders);
router.get('/admin/orders', protect, adminOnly, getAllOrders);
router.put('/admin/orders/:id', protect, adminOnly, updateOrderStatus);

export default router;

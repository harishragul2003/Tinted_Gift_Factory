import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, adminOnly, createCategory);

export default router;

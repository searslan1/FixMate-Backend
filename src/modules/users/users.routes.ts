import { Router } from 'express';
import { getMe, updateMe, changePassword } from './users.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

// Protected Routes (Sadece token ile erişilebilir)
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateMe);
router.patch('/me/password', authMiddleware, changePassword);

export default router;

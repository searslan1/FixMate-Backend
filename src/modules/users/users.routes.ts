import { Router } from 'express';
import { getMe, updateUserProfile, changePassword } from './users.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

// Protected Routes (Sadece token ile erişilebilir)
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateUserProfile);
router.patch('/me/password', authMiddleware, changePassword);



export default router;

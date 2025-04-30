import { Router } from 'express';
import {
  getMyNotifications,
  markNotificationAsRead
} from './notification.controller';

import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

// Kullanıcının kendi bildirimleri
router.get('/', authMiddleware, getMyNotifications);

// Bildirimi okundu olarak işaretleme
router.patch('/:id/read', authMiddleware, markNotificationAsRead);

export default router;

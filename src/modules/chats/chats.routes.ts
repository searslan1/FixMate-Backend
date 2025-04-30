import { Router } from 'express';
import {
  getConversationWithUser,
  getMyConversations
} from './chats.controller';

import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

// Kullanıcının tüm konuşma listesi
router.get('/', authMiddleware, getMyConversations);

// Belirli kullanıcıyla olan konuşma geçmişi
router.get('/:userId', authMiddleware, getConversationWithUser);

export default router;

import { Router } from 'express';
import {
  createReview,
  getMyReviews,
  getMechanicReviews
} from './reviews.controller';

import { authMiddleware } from '../../middlewares/authMiddleware';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = Router();

// Sadece müşteri değerlendirme yapabilir
router.post('/', authMiddleware, roleMiddleware('CUSTOMER'), createReview);

// Müşterinin yaptığı yorumlar
router.get('/me', authMiddleware, roleMiddleware('CUSTOMER'), getMyReviews);

// Belirli bir ustanın aldığı yorumlar (public endpoint)
router.get('/mechanic/:id', getMechanicReviews);

export default router;

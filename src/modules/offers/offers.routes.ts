import { Router } from 'express';
import { createOffer, getMyOffers, getOffersByServiceRequestId, updateOfferStatus } from './offers.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { roleMiddleware } from '../../middlewares/roleMiddleware';
const router = Router();

// Protected Routes
router.post('/', authMiddleware, roleMiddleware('MECHANIC'), createOffer);
router.get('/', authMiddleware, roleMiddleware('MECHANIC'), getMyOffers);
router.get('/service-request/:id', authMiddleware, roleMiddleware('CUSTOMER'), getOffersByServiceRequestId);
router.patch('/:id/status', authMiddleware, roleMiddleware('CUSTOMER'), updateOfferStatus);

export default router;

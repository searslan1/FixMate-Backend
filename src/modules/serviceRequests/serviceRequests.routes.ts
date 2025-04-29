import { Router } from 'express';
import { createServiceRequest, getMyServiceRequests, getServiceRequestById, cancelServiceRequest } from './serviceRequests.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

// Protected Routes
router.post('/', authMiddleware, createServiceRequest);
router.get('/', authMiddleware, getMyServiceRequests);
router.get('/:id', authMiddleware, getServiceRequestById);
router.patch('/:id/cancel', authMiddleware, cancelServiceRequest);

export default router;

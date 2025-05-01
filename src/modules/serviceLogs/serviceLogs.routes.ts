import { Router } from 'express';
import {
  createServiceLog,
  getServiceLogByAppointmentId,
} from './serviceLogs.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = Router();

// Servis kaydı oluştur (usta)
router.post('/:appointmentId', authMiddleware, roleMiddleware('MECHANIC'), createServiceLog);

// Servis kaydını görüntüle (usta ve müşteri)
router.get('/:appointmentId', authMiddleware, getServiceLogByAppointmentId);

export default router;

import { Router } from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} from './appointments.controller';

import { authMiddleware } from '../../middlewares/authMiddleware';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = Router();

// Tüm authenticated kullanıcılar için randevu oluşturma (müşteri veya teklif kabulü)
router.post('/', authMiddleware, createAppointment);

// Ustanın veya müşterinin kendi randevularını listelemesi
router.get('/', authMiddleware, getMyAppointments);

// Belirli bir randevunun detayını görme
router.get('/:id', authMiddleware, getAppointmentById);

// Ustanın randevu durumunu güncellemesi
router.patch('/:id/status', authMiddleware, roleMiddleware('MECHANIC'), updateAppointmentStatus);

export default router;

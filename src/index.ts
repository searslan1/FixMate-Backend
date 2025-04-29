import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import vehicleRoutes from './modules/vehicles/vehicles.routes';
import serviceRequestRoutes from './modules/serviceRequests/serviceRequests.routes';
import offerRoutes from './modules/offers/offers.routes';
import appointmentRoutes from './modules/appointments/appointments.routes';
//import emergencyRequestRoutes from './modules/emergencyRequests/emergencyRequests.routes';
//import reviewRoutes from './modules/reviews/reviews.routes';
//import chatRoutes from './modules/chats/chats.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/offers', offerRoutes);
router.use('/appointments', appointmentRoutes);
//router.use('/emergency-requests', emergencyRequestRoutes);
//router.use('/reviews', reviewRoutes);
//router.use('/chats', chatRoutes);

export default router;

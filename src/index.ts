import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import vehicleRoutes from './modules/vehicles/vehicles.routes';
import serviceRequestRoutes from './modules/serviceRequests/serviceRequests.routes';
import offerRoutes from './modules/offers/offers.routes';
import appointmentRoutes from './modules/appointments/appointments.routes';
import notificationRoutes from './modules/notification/notification.routes';
import reviewRoutes from './modules/reviews/reviews.routes';
import chatRoutes from './modules/chats/chats.routes';
import serviceLogsRoutes from './modules/serviceLogs/serviceLogs.routes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/offers', offerRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/chats', chatRoutes);
router.use('/serviceLogs', serviceLogsRoutes); // Assuming serviceLogs routes are similar to serviceRequests

export default router;

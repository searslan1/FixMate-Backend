import { Router } from 'express';
import { createVehicle, getMyVehicles, deleteVehicle } from './vehicles.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { updateVehicle, getVehicleHistory} from './vehicles.controller';

const router = Router();

// Protected Routes
router.post('/', authMiddleware, createVehicle);
router.get('/', authMiddleware, getMyVehicles);
router.get('/:id/history', authMiddleware, getVehicleHistory); //kullanıcıların kendi araçlarının servis geçmişini görebilir
router.delete('/:id', authMiddleware, deleteVehicle);
router.patch('/:id', authMiddleware, updateVehicle);

export default router;

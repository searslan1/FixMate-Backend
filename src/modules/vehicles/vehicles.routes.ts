import { Router } from 'express';
import { createVehicle, getMyVehicles, deleteVehicle } from './vehicles.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { updateVehicle } from './vehicles.controller';

const router = Router();

// Protected Routes
router.post('/', authMiddleware, createVehicle);
router.get('/', authMiddleware, getMyVehicles);
router.delete('/:id', authMiddleware, deleteVehicle);
router.patch('/:id', authMiddleware, updateVehicle);

export default router;

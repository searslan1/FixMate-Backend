"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicles_controller_1 = require("./vehicles.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const vehicles_controller_2 = require("./vehicles.controller");
const router = (0, express_1.Router)();
// Protected Routes
router.post('/', authMiddleware_1.authMiddleware, vehicles_controller_1.createVehicle);
router.get('/', authMiddleware_1.authMiddleware, vehicles_controller_1.getMyVehicles);
router.get('/:id/history', authMiddleware_1.authMiddleware, vehicles_controller_2.getVehicleHistory); //kullanıcıların kendi araçlarının servis geçmişini görebilir
router.delete('/:id', authMiddleware_1.authMiddleware, vehicles_controller_1.deleteVehicle);
router.patch('/:id', authMiddleware_1.authMiddleware, vehicles_controller_2.updateVehicle);
exports.default = router;

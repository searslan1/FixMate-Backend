"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceLogs_controller_1 = require("./serviceLogs.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Servis kaydı oluştur (usta)
router.post('/:appointmentId', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('MECHANIC'), serviceLogs_controller_1.createServiceLog);
// Servis kaydını görüntüle (usta ve müşteri)
router.get('/:appointmentId', authMiddleware_1.authMiddleware, serviceLogs_controller_1.getServiceLogByAppointmentId);
exports.default = router;

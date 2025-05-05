"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_controller_1 = require("./appointments.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Tüm authenticated kullanıcılar için randevu oluşturma (müşteri veya teklif kabulü)
router.post('/', authMiddleware_1.authMiddleware, appointments_controller_1.createAppointment);
// Ustanın veya müşterinin kendi randevularını listelemesi
router.get('/', authMiddleware_1.authMiddleware, appointments_controller_1.getMyAppointments);
// Belirli bir randevunun detayını görme
router.get('/:id', authMiddleware_1.authMiddleware, appointments_controller_1.getAppointmentById);
// Ustanın randevu durumunu güncellemesi
router.patch('/:id/status', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('MECHANIC'), appointments_controller_1.updateAppointmentStatus);
exports.default = router;

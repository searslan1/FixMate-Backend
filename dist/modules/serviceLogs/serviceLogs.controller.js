"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceLogByAppointmentId = exports.createServiceLog = void 0;
const serviceLogs_service_1 = require("./serviceLogs.service");
const serviceLogService = new serviceLogs_service_1.ServiceLogService();
// Usta → servis kaydı oluşturur
const createServiceLog = async (req, res, next) => {
    try {
        const mechanicId = req.user.id;
        const appointmentId = parseInt(req.params.appointmentId);
        const input = req.body;
        const created = await serviceLogService.createServiceLog(mechanicId, appointmentId, input);
        res.status(201).json({
            success: true,
            message: 'Servis kaydı oluşturuldu',
            data: created,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createServiceLog = createServiceLog;
// Müşteri/Usta → servis kaydını görüntüler
const getServiceLogByAppointmentId = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const appointmentId = parseInt(req.params.appointmentId);
        const log = await serviceLogService.getServiceLogByAppointmentId(userId, appointmentId);
        res.status(200).json({
            success: true,
            message: 'Servis kaydı getirildi',
            data: log,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getServiceLogByAppointmentId = getServiceLogByAppointmentId;

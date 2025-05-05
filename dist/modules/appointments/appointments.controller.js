"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = exports.getAppointmentById = exports.getMyAppointments = exports.createAppointment = void 0;
const appointments_service_1 = require("./appointments.service");
const appointmentService = new appointments_service_1.AppointmentService();
// Randevu oluşturma
const createAppointment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const input = req.body;
        const appointment = await appointmentService.createAppointment(userId, role, input);
        res.status(201).json({
            success: true,
            message: 'Randevu oluşturuldu',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAppointment = createAppointment;
// Kullanıcının kendi randevularını listeleme
const getMyAppointments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const appointments = await appointmentService.getMyAppointments(userId, role);
        res.status(200).json({
            success: true,
            message: 'Randevular getirildi',
            data: appointments,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyAppointments = getMyAppointments;
// Randevu detayını görme
const getAppointmentById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const id = Number(req.params.id);
        const appointment = await appointmentService.getAppointmentById(userId, role, id);
        res.status(200).json({
            success: true,
            message: 'Randevu detayı getirildi',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAppointmentById = getAppointmentById;
// Randevu statüsünü güncelleme
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const mechanicId = req.user.id;
        const appointmentId = Number(req.params.id);
        const { status } = req.body;
        const updated = await appointmentService.updateAppointmentStatus(mechanicId, appointmentId, status);
        res.status(200).json({
            success: true,
            message: 'Randevu durumu güncellendi',
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;

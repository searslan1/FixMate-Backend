"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLogService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ServiceLogService {
    // ✅ Servis kaydı oluşturma (usta)
    async createServiceLog(mechanicId, appointmentId, input) {
        // Randevu kontrolü
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
        });
        if (!appointment)
            throw new Error('Randevu bulunamadı');
        if (appointment.mechanicId !== mechanicId)
            throw new Error('Bu randevuya servis kaydı girme yetkiniz yok');
        const existing = await prisma.serviceLog.findUnique({
            where: { appointmentId },
        });
        if (existing)
            throw new Error('Bu randevu için zaten servis kaydı mevcut');
        const created = await prisma.serviceLog.create({
            data: {
                appointmentId,
                date: input.date,
                mileage: input.mileage,
                type: input.type,
                description: input.description,
                notes: input.notes ?? null,
                partsUsed: JSON.parse(JSON.stringify(input.partsUsed)),
            },
        });
        // ✅ Müşteriye bildirim gönder
        await prisma.notification.create({
            data: {
                userId: appointment.customerId,
                title: 'Servis Tamamlandı',
                message: 'Servis kaydınız başarıyla oluşturuldu.',
                type: 'SERVICE_COMPLETED',
                read: false,
            },
        });
        return created;
    }
    // ✅ Servis kaydı görüntüleme (usta/müşteri)
    async getServiceLogByAppointmentId(userId, appointmentId) {
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
        });
        if (!appointment)
            throw new Error('Randevu bulunamadı');
        if (appointment.customerId !== userId && appointment.mechanicId !== userId) {
            throw new Error('Bu servis kaydını görme yetkiniz yok');
        }
        const log = await prisma.serviceLog.findUnique({
            where: { appointmentId },
        });
        if (!log)
            throw new Error('Servis kaydı bulunamadı');
        return log;
    }
}
exports.ServiceLogService = ServiceLogService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const client_1 = require("@prisma/client");
const socketServer_1 = require("../../websocket/socketServer");
const prisma = new client_1.PrismaClient();
class NotificationService {
    // Bildirim oluştur + gönder
    async createAndSend(userId, title, message, type) {
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
            },
        });
        (0, socketServer_1.sendNotificationToUser)(userId, {
            id: notification.id,
            title: notification.title,
            message: notification.message,
            createdAt: notification.createdAt,
            isRead: notification.isRead,
            type: notification.type,
        });
        return notification;
    }
    // Kullanıcının tüm bildirimlerini getir
    async getMyNotifications(userId) {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return notifications;
    }
    // Bildirimi okundu olarak işaretle
    async markAsRead(userId, notificationId) {
        const notification = await prisma.notification.findFirst({
            where: {
                id: notificationId,
                userId,
            },
        });
        if (!notification) {
            throw new Error('Bildirim bulunamadı veya erişim yetkiniz yok');
        }
        if (notification.isRead)
            return notification;
        const updated = await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });
        return updated;
    }
}
exports.NotificationService = NotificationService;

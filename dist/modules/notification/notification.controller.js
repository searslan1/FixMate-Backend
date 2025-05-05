"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsRead = exports.getMyNotifications = void 0;
const notification_service_1 = require("./notification.service");
const notificationService = new notification_service_1.NotificationService();
// Kullanıcının bildirimlerini getir
const getMyNotifications = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const notifications = await notificationService.getMyNotifications(userId);
        res.status(200).json({
            success: true,
            message: 'Bildirimler getirildi',
            data: notifications,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyNotifications = getMyNotifications;
// Bildirimi okundu olarak işaretle
const markNotificationAsRead = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const notificationId = Number(req.params.id);
        const updated = await notificationService.markAsRead(userId, notificationId);
        res.status(200).json({
            success: true,
            message: 'Bildirim okundu olarak işaretlendi',
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.markNotificationAsRead = markNotificationAsRead;

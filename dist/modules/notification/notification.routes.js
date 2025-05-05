"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Kullanıcının kendi bildirimleri
router.get('/', authMiddleware_1.authMiddleware, notification_controller_1.getMyNotifications);
// Bildirimi okundu olarak işaretleme
router.patch('/:id/read', authMiddleware_1.authMiddleware, notification_controller_1.markNotificationAsRead);
exports.default = router;

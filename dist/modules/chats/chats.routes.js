"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chats_controller_1 = require("./chats.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Kullanıcının tüm konuşma listesi
router.get('/', authMiddleware_1.authMiddleware, chats_controller_1.getMyConversations);
// Belirli kullanıcıyla olan konuşma geçmişi
router.get('/:userId', authMiddleware_1.authMiddleware, chats_controller_1.getConversationWithUser);
exports.default = router;

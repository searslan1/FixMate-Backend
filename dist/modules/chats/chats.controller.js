"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationWithUser = exports.getMyConversations = void 0;
const chats_service_1 = require("./chats.service");
const chatService = new chats_service_1.ChatService();
// Kullanıcının tüm konuşmaları (kimlerle yazışılmış)
const getMyConversations = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const conversations = await chatService.getMyConversations(userId);
        res.status(200).json({
            success: true,
            message: 'Konuşmalar listelendi',
            data: conversations,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyConversations = getMyConversations;
// Belirli kullanıcıyla olan mesaj geçmişi
const getConversationWithUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const otherUserId = Number(req.params.userId);
        const messages = await chatService.getConversationWithUser(userId, otherUserId);
        res.status(200).json({
            success: true,
            message: 'Mesajlar getirildi',
            data: messages,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getConversationWithUser = getConversationWithUser;

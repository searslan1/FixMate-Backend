"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ChatService {
    // Kullanıcının mesajlaştığı tüm kişileri getir
    async getMyConversations(userId) {
        const sent = await prisma.chat.findMany({
            where: { senderId: userId },
            select: { receiverId: true },
            distinct: ['receiverId'],
        });
        const received = await prisma.chat.findMany({
            where: { receiverId: userId },
            select: { senderId: true },
            distinct: ['senderId'],
        });
        const ids = new Set();
        sent.forEach((chat) => ids.add(chat.receiverId));
        received.forEach((chat) => ids.add(chat.senderId));
        const users = await prisma.user.findMany({
            where: { id: { in: Array.from(ids) } },
            select: {
                id: true,
                name: true,
                role: true,
                phone: true,
            },
        });
        return users;
    }
    // Belirli kullanıcıyla olan tüm mesajları getir
    async getConversationWithUser(userId, otherUserId) {
        const messages = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                senderId: true,
                receiverId: true,
                message: true,
                createdAt: true,
            },
        });
        return messages;
    }
}
exports.ChatService = ChatService;

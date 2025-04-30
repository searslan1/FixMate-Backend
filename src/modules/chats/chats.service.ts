import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatService {
  // Kullanıcının mesajlaştığı tüm kişileri getir
  async getMyConversations(userId: number) {
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

    const ids = new Set<number>();

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
  async getConversationWithUser(userId: number, otherUserId: number) {
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

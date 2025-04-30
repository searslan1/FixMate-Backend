import { PrismaClient } from '@prisma/client';
import { sendNotificationToUser } from '../../websocket/socketServer';

const prisma = new PrismaClient();

export class NotificationService {
  // Bildirim oluştur + gönder
  async createAndSend(userId: number, title: string, message: string) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
      },
    });

    sendNotificationToUser(userId, {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      createdAt: notification.createdAt,
      isRead: notification.isRead,
    });

    return notification;
  }
  // Kullanıcının tüm bildirimlerini getir
  async getMyNotifications(userId: number) {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return notifications;
  }

  // Bildirimi okundu olarak işaretle
  async markAsRead(userId: number, notificationId: number) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new Error('Bildirim bulunamadı veya erişim yetkiniz yok');
    }

    if (notification.isRead) return notification;

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return updated;
  }
}

import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './notification.service';

const notificationService = new NotificationService();

// Kullanıcının bildirimlerini getir
export const getMyNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;

    const notifications = await notificationService.getMyNotifications(userId);

    res.status(200).json({
      success: true,
      message: 'Bildirimler getirildi',
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

// Bildirimi okundu olarak işaretle
export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const notificationId = Number(req.params.id);

    const updated = await notificationService.markAsRead(userId, notificationId);

    res.status(200).json({
      success: true,
      message: 'Bildirim okundu olarak işaretlendi',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

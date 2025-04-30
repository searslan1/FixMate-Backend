import { Request, Response, NextFunction } from 'express';
import { ChatService } from './chats.service';

const chatService = new ChatService();

// Kullanıcının tüm konuşmaları (kimlerle yazışılmış)
export const getMyConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const conversations = await chatService.getMyConversations(userId);

    res.status(200).json({
      success: true,
      message: 'Konuşmalar listelendi',
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};

// Belirli kullanıcıyla olan mesaj geçmişi
export const getConversationWithUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const otherUserId = Number(req.params.userId);

    const messages = await chatService.getConversationWithUser(userId, otherUserId);

    res.status(200).json({
      success: true,
      message: 'Mesajlar getirildi',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

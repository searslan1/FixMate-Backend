import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './reviews.service';

const reviewService = new ReviewService();

// Yorum oluştur
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const body = req.body;

    const review = await reviewService.createReview(userId, body);

    res.status(201).json({
      success: true,
      message: 'Yorum başarıyla eklendi',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Müşterinin kendi yorumları
export const getMyReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;

    const reviews = await reviewService.getMyReviews(userId);

    res.status(200).json({
      success: true,
      message: 'Yorumlar getirildi',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Belirli ustanın aldığı yorumlar
export const getMechanicReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mechanicId = Number(req.params.id);

    const result = await reviewService.getMechanicReviews(mechanicId);

    res.status(200).json({
      success: true,
      message: 'Usta yorumları getirildi',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

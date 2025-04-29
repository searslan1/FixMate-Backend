import { Request, Response, NextFunction } from 'express';
import { OfferService } from './offers.service';

const offerService = new OfferService();

// Teklif oluşturma (usta)
export const createOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const mechanicId = (req as any).user.id;
    const { serviceRequestId, price, type, date, time, message, durationEstimate } = req.body;

    const offer = await offerService.createOffer(mechanicId, {
      serviceRequestId,
      price,
      type,
      date,
      time,
      message,
      durationEstimate,
    });

    res.status(201).json({
      success: true,
      message: 'Teklif başarıyla oluşturuldu',
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// Ustanın kendi tekliflerini listelemesi
export const getMyOffers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const mechanicId = (req as any).user.id;
    const status = req.query.status as string | undefined;

    const offers = await offerService.getMyOffers(mechanicId, status);

    res.status(200).json({
      success: true,
      message: 'Teklifler getirildi',
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

// Kullanıcının iş talebine gelen tüm teklifleri listeleme
export const getOffersByServiceRequestId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const requestId = Number(req.params.id);

    const offers = await offerService.getOffersByServiceRequestId(userId, requestId);

    res.status(200).json({
      success: true,
      message: 'İş talebine gelen teklifler listelendi',
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

// Teklif durumu güncelleme (kabul/red)
export const updateOfferStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const offerId = Number(req.params.id);
    const { status } = req.body;

    const updatedOffer = await offerService.updateOfferStatus(userId, offerId, status);

    res.status(200).json({
      success: true,
      message: 'Teklif durumu güncellendi',
      data: updatedOffer,
    });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { ServiceRequestService } from './serviceRequests.service';

const serviceRequestService = new ServiceRequestService();

// İş talebi oluşturma
export const createServiceRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const {
        vehicleId,
        brand,
        model,
        year,
        mileage,
        serviceType,
        title,
        description,
        urgency,
        location,
        serviceLocation,
        preferredDate,
        maxBudget,
        imageUrls,
      } = req.body;
  
      const newRequest = await serviceRequestService.createServiceRequest(userId, {
        vehicleId,
        brand,
        model,
        year,
        mileage,
        serviceType,
        title,
        description,
        urgency,
        location,
        serviceLocation,
        preferredDate,
        maxBudget,
        imageUrls,
      });
  
      res.status(201).json({
        success: true,
        message: 'İş talebi başarıyla oluşturuldu',
        data: newRequest,
      });
    } catch (error) {
      next(error);
    }
  };

// Kendi iş taleplerini listeleme
export const getMyServiceRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const serviceRequests = await serviceRequestService.getMyServiceRequests(userId);

    res.status(200).json({
      success: true,
      message: 'İş talepleri başarıyla getirildi',
      data: serviceRequests,
    });
  } catch (error) {
    next(error);
  }
};

// Belirli bir iş talebini görüntüleme
export const getServiceRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const serviceRequestId = Number(req.params.id);

    const serviceRequest = await serviceRequestService.getServiceRequestById(userId, serviceRequestId);

    res.status(200).json({
      success: true,
      message: 'İş talebi detayları getirildi',
      data: serviceRequest,
    });
  } catch (error) {
    next(error);
  }
};

// İş talebini iptal etme
export const cancelServiceRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const serviceRequestId = Number(req.params.id);

    await serviceRequestService.cancelServiceRequest(userId, serviceRequestId);

    res.status(200).json({
      success: true,
      message: 'İş talebi başarıyla iptal edildi',
    });
  } catch (error) {
    next(error);
  }
};

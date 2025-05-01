import { Request, Response, NextFunction } from 'express';
import { ServiceLogService } from './serviceLogs.service';

const serviceLogService = new ServiceLogService();

// Usta → servis kaydı oluşturur
export const createServiceLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mechanicId = (req as any).user.id;
    const appointmentId = parseInt(req.params.appointmentId);
    const input = req.body;

    const created = await serviceLogService.createServiceLog(mechanicId, appointmentId, input);

    res.status(201).json({
      success: true,
      message: 'Servis kaydı oluşturuldu',
      data: created,
    });
  } catch (err) {
    next(err);
  }
};

// Müşteri/Usta → servis kaydını görüntüler
export const getServiceLogByAppointmentId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const appointmentId = parseInt(req.params.appointmentId);

    const log = await serviceLogService.getServiceLogByAppointmentId(userId, appointmentId);

    res.status(200).json({
      success: true,
      message: 'Servis kaydı getirildi',
      data: log,
    });
  } catch (err) {
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from './appointments.service';

const appointmentService = new AppointmentService();

// Randevu oluşturma
export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role;
    const input = req.body;

    const appointment = await appointmentService.createAppointment(userId, role, input);

    res.status(201).json({
      success: true,
      message: 'Randevu oluşturuldu',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Kullanıcının kendi randevularını listeleme
export const getMyAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role;

    const appointments = await appointmentService.getMyAppointments(userId, role);

    res.status(200).json({
      success: true,
      message: 'Randevular getirildi',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Randevu detayını görme
export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role;
    const id = Number(req.params.id);

    const appointment = await appointmentService.getAppointmentById(userId, role, id);

    res.status(200).json({
      success: true,
      message: 'Randevu detayı getirildi',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Randevu statüsünü güncelleme
export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mechanicId = (req as any).user.id;
    const appointmentId = Number(req.params.id);
    const { status } = req.body;

    const updated = await appointmentService.updateAppointmentStatus(mechanicId, appointmentId, status);

    res.status(200).json({
      success: true,
      message: 'Randevu durumu güncellendi',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

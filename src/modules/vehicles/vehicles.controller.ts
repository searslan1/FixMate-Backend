import { Request, Response, NextFunction } from 'express';
import { VehicleService } from './vehicles.service';

const vehicleService = new VehicleService();

// Araç ekleme
export const createVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { brand, model, year, plate } = req.body;

    const newVehicle = await vehicleService.createVehicle(userId, { brand, model, year, plate });

    res.status(201).json({
      success: true,
      message: 'Araç başarıyla eklendi',
      data: newVehicle,
    });
  } catch (error) {
    next(error);
  }
};

// Kendi araçlarını listeleme
export const getMyVehicles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const vehicles = await vehicleService.getMyVehicles(userId);

    res.status(200).json({
      success: true,
      message: 'Araçlar başarıyla getirildi',
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Araç silme
export const deleteVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const vehicleId = Number(req.params.id);

    await vehicleService.deleteVehicle(userId, vehicleId);

    res.status(200).json({
      success: true,
      message: 'Araç başarıyla silindi',
    });
  } catch (error) {
    next(error);
  }
};
// Araç güncelleme
export const updateVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const vehicleId = Number(req.params.id);
      const updateData = req.body;
  
      const updatedVehicle = await vehicleService.updateVehicle(userId, vehicleId, updateData);
  
      res.status(200).json({
        success: true,
        message: 'Araç bilgileri başarıyla güncellendi',
        data: updatedVehicle,
      });
    } catch (error) {
      next(error);
    }
  };
  
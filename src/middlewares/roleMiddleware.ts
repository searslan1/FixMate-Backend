import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';

export const roleMiddleware = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      res.status(403).json({
        success: false,
        message: 'Bu işlemi yapmaya yetkiniz yok.',
      });
      return;
    }

    next();
  };
};

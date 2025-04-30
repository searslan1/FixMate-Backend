import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = 'Sunucu hatası';

  // Zod doğrulama hatası
  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues[0]?.message || 'Geçersiz veri';
  }

  // Prisma özel hatası
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = 'Veritabanı hatası: ' + err.message;
  }

  // Yetkisiz erişim
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Geçersiz token';
  }

  // Özel hata mesajı varsa al
  else if (typeof err.message === 'string') {
    message = err.message;
  }

  logger.error(`[${req.method} ${req.url}] → ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
}

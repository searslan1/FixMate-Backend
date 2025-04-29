import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

// Kullanıcı Kayıt
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, phone } = req.body;

    const result = await authService.register({ email, password, name, phone });

    res.status(201).json({
      success: true,
      message: 'Kayıt başarılı',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Kullanıcı Giriş
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json({
      success: true,
      message: 'Giriş başarılı',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

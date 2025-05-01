import { Request, Response, NextFunction } from 'express';
import { UserService } from './users.service';

const userService = new UserService();

// Kullanıcının kendi profilini çekme
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;

    const user = await userService.getMe(userId);

    res.status(200).json({
      success: true,
      message: 'Kullanıcı bilgileri getirildi',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Kullanıcının profilini güncelleme
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role;

    const updated = await userService.updateProfile(userId, role, req.body);

    res.status(200).json({
      success: true,
      message: 'Profil güncellendi',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Kullanıcının şifresini değiştirme
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;

    await userService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Şifre başarıyla değiştirildi',
    });
  } catch (error) {
    next(error);
  }
};


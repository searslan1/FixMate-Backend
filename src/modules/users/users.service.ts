import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../../utils/password';

const prisma = new PrismaClient();

export class UserService {
  // Kullanıcının kendi bilgilerini getirme
  async getMe(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    return user;
  }

  // Kullanıcının bilgilerini güncelleme
  async updateMe(userId: number, data: { name?: string; phone?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        phone: data.phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  // Kullanıcının şifresini değiştirme
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    const isPasswordValid = await comparePasswords(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new Error('Mevcut şifre yanlış.');
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    });

    return;
  }
}

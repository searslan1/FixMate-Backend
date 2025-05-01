import { PrismaClient, UserRole } from '@prisma/client';
import { hashPassword, comparePasswords } from '../../utils/password';

const prisma = new PrismaClient();

export class UserService {
  // Kullanıcının kendi bilgilerini getirme
  async getMe(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        workplace: true,
        services: true,
        brands: true,
        photos: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(userId: number, role: UserRole, data: any) {
    const updateData: any = {};

    // Her rol için ortak alanlar
    if (data.name) updateData.name = data.name;
    if (data.phone) updateData.phone = data.phone;

    if (role === 'CUSTOMER') {
      if (data.address) updateData.address = data.address;
    }

    if (role === 'MECHANIC') {
      if (data.workplace) updateData.workplace = data.workplace;
      if (data.services) updateData.services = data.services;
      if (data.brands) updateData.brands = data.brands;
      if (data.photos) updateData.photos = data.photos;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        workplace: true,
        services: true,
        brands: true,
        photos: true,
        updatedAt: true,
      },
    });

    return updated;
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

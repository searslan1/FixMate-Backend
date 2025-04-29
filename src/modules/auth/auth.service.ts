import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../../utils/password';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

const prisma = new PrismaClient();

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterInput) {
    // Kullanıcı var mı kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Bu e-posta zaten kayıtlı.');
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(data.password);

    // Kullanıcıyı kaydet
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
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

  async login(data: LoginInput) {
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('E-posta veya şifre hatalı.');
    }

    // Şifreyi kontrol et
    const isPasswordValid = await comparePasswords(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('E-posta veya şifre hatalı.');
    }

    // Tokenlar üret
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    };
  }
}

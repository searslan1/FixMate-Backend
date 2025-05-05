"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(data) {
        // Kullanıcı var mı kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Bu e-posta zaten kayıtlı.');
        }
        // Şifreyi hashle
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
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
    async login(data) {
        // Kullanıcıyı bul
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new Error('E-posta veya şifre hatalı.');
        }
        // Şifreyi kontrol et
        const isPasswordValid = await (0, password_1.comparePasswords)(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('E-posta veya şifre hatalı.');
        }
        // Tokenlar üret
        const accessToken = (0, jwt_1.generateAccessToken)({ id: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user.id, role: user.role });
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
exports.AuthService = AuthService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = 'Sunucu hatası';
    // Zod doğrulama hatası
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = err.issues[0]?.message || 'Geçersiz veri';
    }
    // Prisma özel hatası
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
    logger_1.logger.error(`[${req.method} ${req.url}] → ${message}`);
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Yetkisiz erişim. Token bulunamadı.' });
        return; // BURADA return ekledik (tip uyumu için)
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next(); // BURADA da explicit return next()
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Yetkisiz erişim. Token geçersiz veya süresi dolmuş.' });
        return; // Hata durumunda yine return
    }
};
exports.authMiddleware = authMiddleware;
// Kullanıcıdan gelen isteklerde token doğrulaması yapar
// Eğer token geçerliyse, kullanıcı bilgilerini req.user'a ekler
// Eğer token geçersizse, 401 Unauthorized hatası döner

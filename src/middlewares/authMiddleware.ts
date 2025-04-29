import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';

interface JwtPayload {
  id: number;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Yetkisiz erişim. Token bulunamadı.' });
    return; // BURADA return ekledik (tip uyumu için)
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    (req as any).user = decoded;
    return next(); // BURADA da explicit return next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Yetkisiz erişim. Token geçersiz veya süresi dolmuş.' });
    return; // Hata durumunda yine return
  }
};
// Kullanıcıdan gelen isteklerde token doğrulaması yapar
// Eğer token geçerliyse, kullanıcı bilgilerini req.user'a ekler
// Eğer token geçersizse, 401 Unauthorized hatası döner


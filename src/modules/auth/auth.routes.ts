import { Router } from 'express';
import { register, login } from './auth.controller';

const router = Router();

// Kullanıcı kayıt
router.post('/register', register);

// Kullanıcı giriş
router.post('/login', login);

export default router;
// Bu dosya, kullanıcı kayıt ve giriş işlemleri için gerekli olan route'ları tanımlar.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
// Kullanıcı kayıt
router.post('/register', auth_controller_1.register);
// Kullanıcı giriş
router.post('/login', auth_controller_1.login);
exports.default = router;
// Bu dosya, kullanıcı kayıt ve giriş işlemleri için gerekli olan route'ları tanımlar.

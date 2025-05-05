"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const authService = new auth_service_1.AuthService();
// Kullanıcı Kayıt
const register = async (req, res, next) => {
    try {
        const { email, password, name, phone } = req.body;
        const result = await authService.register({ email, password, name, phone });
        res.status(201).json({
            success: true,
            message: 'Kayıt başarılı',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// Kullanıcı Giriş
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login({ email, password });
        res.status(200).json({
            success: true,
            message: 'Giriş başarılı',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;

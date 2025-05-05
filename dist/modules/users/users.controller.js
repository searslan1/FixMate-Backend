"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUserProfile = exports.getMe = void 0;
const users_service_1 = require("./users.service");
const userService = new users_service_1.UserService();
// Kullanıcının kendi profilini çekme
const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await userService.getMe(userId);
        res.status(200).json({
            success: true,
            message: 'Kullanıcı bilgileri getirildi',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// Kullanıcının profilini güncelleme
const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const updated = await userService.updateProfile(userId, role, req.body);
        res.status(200).json({
            success: true,
            message: 'Profil güncellendi',
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserProfile = updateUserProfile;
// Kullanıcının şifresini değiştirme
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        await userService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({
            success: true,
            message: 'Şifre başarıyla değiştirildi',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;

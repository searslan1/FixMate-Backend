"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Protected Routes (Sadece token ile erişilebilir)
router.get('/me', authMiddleware_1.authMiddleware, users_controller_1.getMe);
router.patch('/me', authMiddleware_1.authMiddleware, users_controller_1.updateUserProfile);
router.patch('/me/password', authMiddleware_1.authMiddleware, users_controller_1.changePassword);
exports.default = router;

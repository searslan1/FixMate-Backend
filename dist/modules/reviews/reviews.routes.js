"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = require("./reviews.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Sadece müşteri değerlendirme yapabilir
router.post('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('CUSTOMER'), reviews_controller_1.createReview);
// Müşterinin yaptığı yorumlar
router.get('/me', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('CUSTOMER'), reviews_controller_1.getMyReviews);
// Belirli bir ustanın aldığı yorumlar (public endpoint)
router.get('/mechanic/:id', reviews_controller_1.getMechanicReviews);
exports.default = router;

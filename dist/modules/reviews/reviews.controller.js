"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMechanicReviews = exports.getMyReviews = exports.createReview = void 0;
const reviews_service_1 = require("./reviews.service");
const reviewService = new reviews_service_1.ReviewService();
// Yorum oluştur
const createReview = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const body = req.body;
        const review = await reviewService.createReview(userId, body);
        res.status(201).json({
            success: true,
            message: 'Yorum başarıyla eklendi',
            data: review,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createReview = createReview;
// Müşterinin kendi yorumları
const getMyReviews = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reviews = await reviewService.getMyReviews(userId);
        res.status(200).json({
            success: true,
            message: 'Yorumlar getirildi',
            data: reviews,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyReviews = getMyReviews;
// Belirli ustanın aldığı yorumlar
const getMechanicReviews = async (req, res, next) => {
    try {
        const mechanicId = Number(req.params.id);
        const result = await reviewService.getMechanicReviews(mechanicId);
        res.status(200).json({
            success: true,
            message: 'Usta yorumları getirildi',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMechanicReviews = getMechanicReviews;

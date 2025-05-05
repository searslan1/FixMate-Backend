"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfferStatus = exports.getOffersByServiceRequestId = exports.getMyOffers = exports.createOffer = void 0;
const offers_service_1 = require("./offers.service");
const offerService = new offers_service_1.OfferService();
// Teklif oluşturma (usta)
const createOffer = async (req, res, next) => {
    try {
        const mechanicId = req.user.id;
        const { serviceRequestId, price, type, date, time, message, durationEstimate } = req.body;
        const offer = await offerService.createOffer(mechanicId, {
            serviceRequestId,
            price,
            type,
            date,
            time,
            message,
            durationEstimate,
        });
        res.status(201).json({
            success: true,
            message: 'Teklif başarıyla oluşturuldu',
            data: offer,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createOffer = createOffer;
// Ustanın kendi tekliflerini listelemesi
const getMyOffers = async (req, res, next) => {
    try {
        const mechanicId = req.user.id;
        const status = req.query.status;
        const offers = await offerService.getMyOffers(mechanicId, status);
        res.status(200).json({
            success: true,
            message: 'Teklifler getirildi',
            data: offers,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyOffers = getMyOffers;
// Kullanıcının iş talebine gelen tüm teklifleri listeleme
const getOffersByServiceRequestId = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const requestId = Number(req.params.id);
        const offers = await offerService.getOffersByServiceRequestId(userId, requestId);
        res.status(200).json({
            success: true,
            message: 'İş talebine gelen teklifler listelendi',
            data: offers,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOffersByServiceRequestId = getOffersByServiceRequestId;
// Teklif durumu güncelleme (kabul/red)
const updateOfferStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const offerId = Number(req.params.id);
        const { status } = req.body;
        const updatedOffer = await offerService.updateOfferStatus(userId, offerId, status);
        res.status(200).json({
            success: true,
            message: 'Teklif durumu güncellendi',
            data: updatedOffer,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOfferStatus = updateOfferStatus;

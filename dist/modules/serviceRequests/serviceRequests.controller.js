"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelServiceRequest = exports.getServiceRequestById = exports.getMyServiceRequests = exports.createServiceRequest = void 0;
const serviceRequests_service_1 = require("./serviceRequests.service");
const serviceRequestService = new serviceRequests_service_1.ServiceRequestService();
// İş talebi oluşturma
const createServiceRequest = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { vehicleId, brand, model, year, mileage, serviceType, title, description, urgency, location, serviceLocation, preferredDate, maxBudget, imageUrls, } = req.body;
        const newRequest = await serviceRequestService.createServiceRequest(userId, {
            vehicleId,
            brand,
            model,
            year,
            mileage,
            serviceType,
            title,
            description,
            urgency,
            location,
            serviceLocation,
            preferredDate,
            maxBudget,
            imageUrls,
        });
        res.status(201).json({
            success: true,
            message: 'İş talebi başarıyla oluşturuldu',
            data: newRequest,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createServiceRequest = createServiceRequest;
// Kendi iş taleplerini listeleme
const getMyServiceRequests = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const serviceRequests = await serviceRequestService.getMyServiceRequests(userId);
        res.status(200).json({
            success: true,
            message: 'İş talepleri başarıyla getirildi',
            data: serviceRequests,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyServiceRequests = getMyServiceRequests;
// Belirli bir iş talebini görüntüleme
const getServiceRequestById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const serviceRequestId = Number(req.params.id);
        const serviceRequest = await serviceRequestService.getServiceRequestById(userId, serviceRequestId);
        res.status(200).json({
            success: true,
            message: 'İş talebi detayları getirildi',
            data: serviceRequest,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getServiceRequestById = getServiceRequestById;
// İş talebini iptal etme
const cancelServiceRequest = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const serviceRequestId = Number(req.params.id);
        await serviceRequestService.cancelServiceRequest(userId, serviceRequestId);
        res.status(200).json({
            success: true,
            message: 'İş talebi başarıyla iptal edildi',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.cancelServiceRequest = cancelServiceRequest;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicle = exports.deleteVehicle = exports.getMyVehicles = exports.getVehicleHistory = exports.createVehicle = void 0;
const vehicles_service_1 = require("./vehicles.service");
const vehicleService = new vehicles_service_1.VehicleService();
// Araç ekleme
const createVehicle = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { brand, model, year, plate } = req.body;
        const newVehicle = await vehicleService.createVehicle(userId, { brand, model, year, plate });
        res.status(201).json({
            success: true,
            message: 'Araç başarıyla eklendi',
            data: newVehicle,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createVehicle = createVehicle;
const getVehicleHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const vehicleId = Number(req.params.id);
        const history = await vehicleService.getVehicleServiceHistory(vehicleId, userId);
        res.status(200).json({
            success: true,
            message: 'Servis geçmişi başarıyla getirildi',
            data: history,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getVehicleHistory = getVehicleHistory;
// Kendi araçlarını listeleme
const getMyVehicles = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const vehicles = await vehicleService.getMyVehicles(userId);
        res.status(200).json({
            success: true,
            message: 'Araçlar başarıyla getirildi',
            data: vehicles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyVehicles = getMyVehicles;
// Araç silme
const deleteVehicle = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const vehicleId = Number(req.params.id);
        await vehicleService.deleteVehicle(userId, vehicleId);
        res.status(200).json({
            success: true,
            message: 'Araç başarıyla silindi',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteVehicle = deleteVehicle;
// Araç güncelleme
const updateVehicle = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const vehicleId = Number(req.params.id);
        const updateData = req.body;
        const updatedVehicle = await vehicleService.updateVehicle(userId, vehicleId, updateData);
        res.status(200).json({
            success: true,
            message: 'Araç bilgileri başarıyla güncellendi',
            data: updatedVehicle,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateVehicle = updateVehicle;

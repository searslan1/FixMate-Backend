"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceRequests_controller_1 = require("./serviceRequests.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Protected Routes
router.post('/', authMiddleware_1.authMiddleware, serviceRequests_controller_1.createServiceRequest);
router.get('/', authMiddleware_1.authMiddleware, serviceRequests_controller_1.getMyServiceRequests);
router.get('/:id', authMiddleware_1.authMiddleware, serviceRequests_controller_1.getServiceRequestById);
router.patch('/:id/cancel', authMiddleware_1.authMiddleware, serviceRequests_controller_1.cancelServiceRequest);
exports.default = router;

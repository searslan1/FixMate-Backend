"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offers_controller_1 = require("./offers.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// Protected Routes
router.post('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('MECHANIC'), offers_controller_1.createOffer);
router.get('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('MECHANIC'), offers_controller_1.getMyOffers);
router.get('/service-request/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('CUSTOMER'), offers_controller_1.getOffersByServiceRequestId);
router.patch('/:id/status', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('CUSTOMER'), offers_controller_1.updateOfferStatus);
exports.default = router;

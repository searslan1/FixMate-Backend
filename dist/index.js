"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const vehicles_routes_1 = __importDefault(require("./modules/vehicles/vehicles.routes"));
const serviceRequests_routes_1 = __importDefault(require("./modules/serviceRequests/serviceRequests.routes"));
const offers_routes_1 = __importDefault(require("./modules/offers/offers.routes"));
const appointments_routes_1 = __importDefault(require("./modules/appointments/appointments.routes"));
const notification_routes_1 = __importDefault(require("./modules/notification/notification.routes"));
const reviews_routes_1 = __importDefault(require("./modules/reviews/reviews.routes"));
const chats_routes_1 = __importDefault(require("./modules/chats/chats.routes"));
const serviceLogs_routes_1 = __importDefault(require("./modules/serviceLogs/serviceLogs.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/users', users_routes_1.default);
router.use('/vehicles', vehicles_routes_1.default);
router.use('/service-requests', serviceRequests_routes_1.default);
router.use('/offers', offers_routes_1.default);
router.use('/appointments', appointments_routes_1.default);
router.use('/notifications', notification_routes_1.default);
router.use('/reviews', reviews_routes_1.default);
router.use('/chats', chats_routes_1.default);
router.use('/serviceLogs', serviceLogs_routes_1.default); // Assuming serviceLogs routes are similar to serviceRequests
exports.default = router;

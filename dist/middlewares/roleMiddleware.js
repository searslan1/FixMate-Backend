"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || user.role !== role) {
            res.status(403).json({
                success: false,
                message: 'Bu işlemi yapmaya yetkiniz yok.',
            });
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;

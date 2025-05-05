"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocketServer = startSocketServer;
exports.sendNotificationToUser = sendNotificationToUser;
const ws_1 = __importStar(require("ws"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const env_1 = require("../config/env");
const clients = new Map(); // userId → socket
function startSocketServer(server) {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', async (ws, req) => {
        const token = getTokenFromRequest(req);
        if (!token) {
            ws.close();
            return;
        }
        let userId;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
            userId = decoded.id;
            clients.set(userId, ws);
            console.log(`✅ WS connected: User ${userId}`);
        }
        catch (err) {
            ws.close();
            return;
        }
        ws.on('message', async (message) => {
            try {
                const parsed = JSON.parse(message.toString());
                const { to, text } = parsed;
                if (!to || !text)
                    return;
                // Mesajı DB’ye kaydet
                await database_1.prisma.chat.create({
                    data: {
                        senderId: userId,
                        receiverId: to,
                        message: text,
                    },
                });
                // Alıcı online ise anlık gönder
                const receiverWs = clients.get(to);
                if (receiverWs && receiverWs.readyState === ws_1.default.OPEN) {
                    receiverWs.send(JSON.stringify({
                        from: userId,
                        text,
                        createdAt: new Date().toISOString(),
                    }));
                }
            }
            catch (err) {
                console.error('❌ WS message error:', err);
            }
        });
        ws.on('close', () => {
            clients.delete(userId);
            console.log(`⛔️ WS disconnected: User ${userId}`);
        });
    });
}
function sendNotificationToUser(userId, notification) {
    const ws = clients.get(userId);
    if (ws && ws.readyState === ws_1.default.OPEN) {
        ws.send(JSON.stringify({
            type: 'notification',
            data: notification,
        }));
    }
}
function getTokenFromRequest(req) {
    const authHeader = req.headers['sec-websocket-protocol'];
    if (!authHeader)
        return null;
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    return token;
}

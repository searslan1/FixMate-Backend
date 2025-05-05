"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./index"));
const errorHandler_1 = require("./middlewares/errorHandler");
const http_1 = __importDefault(require("http"));
const socketServer_1 = require("./websocket/socketServer");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socketServer_1.startSocketServer)(server); // 🔥 WebSocket server başlat
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api', index_1.default);
//Global Error Handler
app.use(errorHandler_1.errorHandler);
// Server Başlat
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), timestamp(), logFormat),
        }),
        // Opsiyonel: prod için dosyaya log
        // new transports.File({ filename: 'logs/error.log', level: 'error' }),
        // new transports.File({ filename: 'logs/combined.log' }),
    ],
});

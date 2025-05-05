"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key';
const ACCESS_TOKEN_EXPIRES_IN = '15m'; // Access Token süresi
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Refresh Token süresi
// Access Token üretimi
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};
exports.generateAccessToken = generateAccessToken;
// Refresh Token üretimi
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};
exports.generateRefreshToken = generateRefreshToken;

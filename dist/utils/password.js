"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
// Şifreyi hash'lemek
const hashPassword = async (plainPassword) => {
    const hashed = await bcrypt_1.default.hash(plainPassword, SALT_ROUNDS);
    return hashed;
};
exports.hashPassword = hashPassword;
// Şifreyi doğrulamak
const comparePasswords = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt_1.default.compare(plainPassword, hashedPassword);
    return isMatch;
};
exports.comparePasswords = comparePasswords;

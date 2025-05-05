"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        try {
            schema.parse(req[property]);
            next();
        }
        catch (err) {
            next(err); // errorHandler zaten ZodError’ı yakalayacak
        }
    };
};
exports.validateRequest = validateRequest;
// ✅ Kullanım Örneği
// zod şema tanımı:
// import { z } from 'zod';
// export const registerSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });
// Route’ta kullanımı:
// import { validateRequest } from '../../middlewares/validateRequest';
// import { registerSchema } from './auth.schema';
// router.post('/register', validateRequest(registerSchema), register);

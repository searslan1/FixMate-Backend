import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (
  schema: ZodSchema<any>,
  property: 'body' | 'query' | 'params' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err) {
      next(err); // errorHandler zaten ZodError’ı yakalayacak
    }
  };
};
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
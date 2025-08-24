import { NextFunction, Request, Response } from 'express';
import { stati } from '../config/config';

/**
 * 
 * @param schema The Yup schema to validate against.
 */
export const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (e) {
        // Return validation errors
        res.status(stati.BAD_REQUEST).json({ errors: e.errors });
    }
};
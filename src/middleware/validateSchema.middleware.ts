import {Request, Response, NextFunction} from  'express';
import { AnyZodObject } from 'zod';

const validateSchema  = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default validateSchema;
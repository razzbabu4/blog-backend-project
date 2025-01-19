import { AnyZodObject } from "zod";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Combine req.body and req.cookies into a single object
        const dataToValidate = {
            ...req.body,
            ...req.cookies,
        };
        await schema.parseAsync(
            dataToValidate
        );
        next()
    })
};

export default validateRequest;
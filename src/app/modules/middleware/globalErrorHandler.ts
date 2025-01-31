/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import ApiError from '../../errors/ApiError';
import { TErrorSource } from '../../interface/error';
import handleValidationError from '../../errors/handleValidationerror';


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong';

    let errorSource: TErrorSource =
        [{
            path: '',
            message: 'Something went very wrong'
        }]

    if (error instanceof ZodError) {
        const simplifiedErr = handleZodError(error);
        statusCode = simplifiedErr?.statusCode;
        message = simplifiedErr?.message;
        errorSource = simplifiedErr?.errorSource;
    }
    else if (error?.name === "ValidationError") {
        const simplifiedErr = handleValidationError(error);
        statusCode = simplifiedErr?.statusCode;
        message = simplifiedErr?.message;
        errorSource = simplifiedErr?.errorSource;
    }
    else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorSource = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorSource = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }

    // ultimate return
    res.status(statusCode).json({
        success: false,
        message: message,
        error: errorSource,
        stack: config.NODE_ENV === "development" ? error?.stack : null
    });
};

export default globalErrorHandler;

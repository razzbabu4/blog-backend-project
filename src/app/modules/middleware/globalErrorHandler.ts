/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500; // get error.statusCode from AppError class
    const message = error.message || 'Something went wrong';


    // ultimate return
    res.status(statusCode).json({
        success: false,
        message: message,
        error
    });
};

export default globalErrorHandler;

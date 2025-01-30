/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../../config';


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    // ultimate return
    res.status(statusCode).json({
        success: false,
        message: message,
        error: error,
        stack: config.NODE_ENV === "development" ? error?.stack : null
    });
};

export default globalErrorHandler;

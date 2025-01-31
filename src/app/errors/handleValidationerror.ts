import mongoose from "mongoose";
import { TErrorSource, TGenericsErrorResponse } from "../interface/error";

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericsErrorResponse => {
    const statusCode = 400;
    const errorSource: TErrorSource = Object.values(error)
        .map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: value?.path,
                message: value?.message
            }
        })

    return {
        statusCode,
        message: "Validation Error",
        errorSource
    }
}

export default handleValidationError;
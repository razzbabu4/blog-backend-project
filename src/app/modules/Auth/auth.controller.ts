import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const userRegister = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.userRegisterIntoDB(req.body);
    // Filter response to include only the necessary fields
    const responseData = {
        _id: result._id,
        name: result.name,
        email: result.email,
    };
    // response utils
    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: responseData
    })
})

export const AuthControllers = {
    userRegister
}
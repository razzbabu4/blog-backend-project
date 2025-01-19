import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

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

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.userLogin(req.body);
    const { refreshToken, accessToken } = result;
    // save refresh token in cookies
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })
    // response utils
    sendResponse(res, {
        success: true,
        message: 'User login successfully',
        statusCode: 200,
        data: {
            accessToken
        }
    })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.refreshToken(req.cookies.refreshToken);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Access token is retrieve successfully',
        data: result
    })
})

export const AuthControllers = {
    userRegister,
    userLogin,
    refreshToken
}
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const userRegister = async (req: Request, res: Response) => {
    try {
        const result = await AuthServices.userRegisterIntoDB(req.body);
        // Filter response to include only the necessary fields
        const responseData = {
            _id: result._id,
            name: result.name,
            email: result.email,
        };
        res.status(200).json({
            message: 'User registered successfully',
            success: true,
            data: responseData,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: error,
        });
    }
}

export const AuthControllers = {
    userRegister
}
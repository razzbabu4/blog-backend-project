import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../User/user.model";
import { TUserRole } from "../User/user.interface";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
        }

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const { userEmail, role } = decoded;

        // check user existence
        const user = await User.isUserExistCheckByEmail(userEmail)
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not exist');
        }

        // check if user is blocked
        const isUserBlocked = user.isBlocked === true;

        if (isUserBlocked) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'User is marked as blocked');
        }

        // check user role
        if (requiredRole && !requiredRole.includes(role)) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized !!');
        }

        req.user = decoded as JwtPayload;
        next();
    })
}


export default auth;
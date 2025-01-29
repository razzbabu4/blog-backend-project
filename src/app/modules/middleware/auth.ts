import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../User/user.model";
import { TUserRole } from "../User/user.interface";

const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error('Unauthorized access');
        }

        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const { userEmail, role } = decoded;

        // check user existence
        const user = await User.isUserExistCheckByEmail(userEmail)
        if (!user) {
            throw new Error('This user is not exist');
        }

        // check if user is blocked
        const isUserBlocked = user.isBlocked === true;

        if (isUserBlocked) {
            throw new Error('User is marked as blocked');
        }

        // check user role
        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not authorized !!');
        }

        req.user = decoded as JwtPayload;
        next();
    })
}


export default auth;
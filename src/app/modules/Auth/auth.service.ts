import config from "../../config";
import { TLoginUser, TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";

const userRegisterIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}

const userLogin = async (payload: TLoginUser) => {
    // check user existence
    const user = await User.isUserExistCheckByEmail(payload.email)
    if (!user) {
        throw new Error('This user is not exist');
    }

    // check password is matched
    const isPasswordMatch = await User.isPasswordMatched(payload.password, user.password)

    if (!isPasswordMatch) {
        throw new Error('Wrong password');
    }

    // check if user is blocked
    const isUserBlocked = user.isBlocked === true;

    if (isUserBlocked) {
        throw new Error('User is marked as blocked');
    }

    // create token and send to the client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_secret_expireIn as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_secret_expireIn as string);

    return {
        accessToken,
        refreshToken
    }
}

const refreshToken = async (token: string) => {
    // check the token is valid
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;

    const { userEmail } = decoded;

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

    // create token and send to the client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_secret_expireIn as string);

    return {
        accessToken
    }

}

export const AuthServices = {
    userRegisterIntoDB,
    userLogin,
    refreshToken
}
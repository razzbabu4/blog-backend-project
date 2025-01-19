import config from "../../config";
import { TLoginUser, TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import jwt from "jsonwebtoken";

const userRegisterIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}

const userLogin = async (payload: TLoginUser) => {
    const user = await User.isUserExistCheckByEmail(payload.email)
    if (!user) {
        throw new Error('This user is not exist');
    }

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

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_secret_expireIn })

    return {
        accessToken
    }

}

export const AuthServices = {
    userRegisterIntoDB,
    userLogin
}
import { TLoginUser, TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userRegisterIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}

const userLogin = async (payload: TLoginUser) => {
    const { email } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('This user is not exist');
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Wrong password');
    }

    // create token and send to the client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, "ffffffff", { expiresIn: "1h" })

    return {
        accessToken
    }

}

export const AuthServices = {
    userRegisterIntoDB,
    userLogin
}
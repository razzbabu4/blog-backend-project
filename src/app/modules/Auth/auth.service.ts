import { TUser } from "../User/user.interface";
import { User } from "../User/user.model"

const userRegisterIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
}

export const AuthServices = {
    userRegisterIntoDB
}
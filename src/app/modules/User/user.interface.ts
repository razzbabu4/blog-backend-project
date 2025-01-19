/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserModel extends Model<TUser> {
    isUserExistCheckByEmail(email: string): Promise<TUser>,
    isPasswordMatched(plaintextPassword: string, hashPassword: string): Promise<boolean>
}

export type TLoginUser = {
    email: string;
    password: string;
}
/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserModel extends Model<TUser> {
    isUserExistCheckByEmail(email: string): Promise<TUser | null>,
    isPasswordMatched(plaintextPassword: string, hashPassword: string): Promise<boolean>
}

export type TLoginUser = {
    email: string;
    password: string;
}
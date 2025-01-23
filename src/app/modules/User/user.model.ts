import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true
});

// use pre hook to save hash password
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // hash password and save into db
    user.password = await bcrypt.hash(user.password, Number(config.salt_round));
    next();
})

// check user existence by email
userSchema.statics.isUserExistCheckByEmail = async function (email: string) {
    return await User.findOne({ email }).select("+password")
}

// check password 
userSchema.statics.isPasswordMatched = async function (plaintextPassword: string, hashPassword: string) {
    return await bcrypt.compare(plaintextPassword, hashPassword);
}


export const User = model<TUser, UserModel>('User', userSchema)
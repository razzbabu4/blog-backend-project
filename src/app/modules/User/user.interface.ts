export type TUser = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
}
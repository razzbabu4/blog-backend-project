import { z } from "zod";

// Zod schema for TUser
export const userValidationSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(20, { message: "Name must be at most 20 characters long." }),

    email: z
        .string()
        .email({ message: "Email must be a valid email address." }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),

    role: z
        .enum(["admin", "user"])
        .default("user"),

    isBlocked: z
        .boolean()
        .default(false).optional(),
});

export const UserValidation = {
    userValidationSchema
}

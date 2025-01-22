import { z } from "zod";

const createBlogValidationSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
        .min(1, "Title cannot be empty"),
    content: z
        .string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string",
        })
        .min(50, "Content cannot be empty"),
    isPublished: z.boolean().optional().default(true)
})

export const BlogValidationSchema = {
    createBlogValidationSchema
}
import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Blog = model<TBlog>('Blog', blogSchema)
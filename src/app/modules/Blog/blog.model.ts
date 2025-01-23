import { model, Query, Schema } from "mongoose";
import { BlogModel, TBlog } from "./blog.interface";

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

// use pre middleware for populate before execution
blogSchema.pre(/^find/, function (next) {
    const query = this as Query<Schema.Types.ObjectId, Schema.Types.ObjectId>
    query
        .find({ isPublished: true })
        .select("title content")
        .populate("author", "name email");

    next();
});

// check blog existence by id
blogSchema.statics.isBlogExistCheckById = async function (id: string) {
    return await Blog.findById(id)
}


export const Blog = model<TBlog, BlogModel>('Blog', blogSchema)
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../User/user.model";

const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
    // check if blog exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new Error("User not found. Unable to create blog.");
    }

    // assign login user "_id"
    payload.author = user._id;

    // create blog
    const result = await Blog.create(payload);

    // Populate the author field with user details
    const populatedBlog = await Blog.findById(result._id)
        .select("title content")
        .populate("author", "name email");

    if (!populatedBlog) {
        throw new Error("Failed to create blog. Please try again.");
    }

    return populatedBlog;
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, userEmail: string) => {
    // check if blog exist or not!
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error("Blog not found. Unable to update blog.");
    }

    // check if user exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new Error("User not found. Unable to create blog.");
    }

    // check owner of the blog
    if (blog.author.toString() !== user._id.toString()) {
        throw new Error("Unauthorized access");
    }
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
        .select("title content")
        .populate("author", "name email");
    return result;
}

export const BlogServices = {
    createBlogIntoDB, updateBlogIntoDB
}
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../User/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
    // check if blog exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found. Unable to create blog.");
    }

    // assign login user "_id"
    payload.author = user._id;

    // create blog
    const newBlog = await Blog.create(payload);

    // Populate the author field with user details
    const populatedBlog = await Blog.isBlogExistCheckById(newBlog._id.toString());
    return populatedBlog;
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, userEmail: string) => {
    // check if blog exist or not!
    const existedBlog = await Blog.isBlogExistCheckById(id)
    if (!existedBlog) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found. Unable to update blog.");
    }

    // check if user exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found. Unable to update blog.");
    }

    // check owner of the blog
    if (existedBlog?.author?.email !== userEmail) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }

    // update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true })
    return updatedBlog;
}

const deleteBlog = async (id: string, userEmail: string) => {
    // check if blog exist or not!
    const existedBlog = await Blog.isBlogExistCheckById(id)
    if (!existedBlog) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found. Unable to delete blog.");
    }

    // check if user exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found. Unable to delete blog.");
    }

    // check owner of the blog
    if (existedBlog?.author?.email !== userEmail) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return deletedBlog;
}

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogSearchableField = ["title", "content"];

    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(blogSearchableField)
        .filter()
        .sort()

    const blogs = await blogQuery.modelQuery;
    return blogs;
}



export const BlogServices = {
    createBlogIntoDB, updateBlogIntoDB, deleteBlog, getAllBlogsFromDB
}
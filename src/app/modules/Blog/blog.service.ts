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
    const newBlog = await Blog.create(payload);

    // Populate the author field with user details
    const populatedBlog = await Blog.isBlogExistCheckById(newBlog._id.toString());
    return populatedBlog;
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>, userEmail: string) => {
    // check if blog exist or not!
    const existedBlog = await Blog.isBlogExistCheckById(id)
    if (!existedBlog) {
        throw new Error("Blog not found. Unable to update blog.");
    }

    // check if user exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new Error("User not found. Unable to update blog.");
    }

    // check owner of the blog
    if (existedBlog?.author?.email !== userEmail) {
        throw new Error("Unauthorized access");
    }

    // update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true })
    return updatedBlog;
}

const deleteBlog = async (id: string, userEmail: string) => {
    // check if blog exist or not!
    const existedBlog = await Blog.isBlogExistCheckById(id)
    if (!existedBlog) {
        throw new Error("Blog not found. Unable to delete blog.");
    }

    // check if user exist or not!
    const user = await User.isUserExistCheckByEmail(userEmail);
    if (!user) {
        throw new Error("User not found. Unable to delete blog.");
    }

    // check owner of the blog
    if (existedBlog?.author?.email !== userEmail) {
        throw new Error("Unauthorized access");
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return deletedBlog;
}

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogSearchableField = ["title", "content"];
    let search = "";
    if (query?.search) {
        search = query?.search as string;
    }

    const searchQuery = Blog.find({
        $or: blogSearchableField.map((field) => {
            return {
                [field]: { $regex: search, $options: 'i' }
            }
        })
    });

    const filter = query?.filter as string;
    const filterCondition = filter ? { author: filter } : {}

    const filterQuery = searchQuery.find(filterCondition);

    const sortBy = (query?.sortBy as string) || "createdAt"

    const sortOrder = query?.sortOrder === "asc" ? 1 : -1;

    const sortQuery = filterQuery.sort({ [sortBy]: sortOrder });

    return sortQuery;
}



export const BlogServices = {
    createBlogIntoDB, updateBlogIntoDB, deleteBlog, getAllBlogsFromDB
}
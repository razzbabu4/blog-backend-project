import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../User/user.model";

const createBlogIntoDB = async (payload: TBlog, userEmail: string) => {
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
        .select("_id title content")
        .populate("author", "name email");

    if (!populatedBlog) {
        throw new Error("Failed to create blog. Please try again.");
    }

    return populatedBlog;
}

export const BlogServices = {
    createBlogIntoDB
}
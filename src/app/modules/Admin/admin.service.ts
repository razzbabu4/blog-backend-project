import { StatusCodes } from "http-status-codes";
import ApiError from "../../errors/ApiError";
import { Blog } from "../Blog/blog.model";
import { User } from "../User/user.model"

const blockUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User do not exists");
    }

    if (user.isBlocked === true) {
        throw new ApiError(StatusCodes.FORBIDDEN, "User already marked as block");
    }

    const result = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return result;
};

const deleteBlogFromDB = async (id: string) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(StatusCodes.NOT_FOUND, "This blog is already deleted or not found");
    }

    const result = await Blog.findByIdAndDelete(id, { new: true });
    return result;
}

export const AdminService = {
    blockUserIntoDB, deleteBlogFromDB
}
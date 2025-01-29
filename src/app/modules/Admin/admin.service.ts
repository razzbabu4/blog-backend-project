import { Blog } from "../Blog/blog.model";
import { User } from "../User/user.model"

const blockUserIntoDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw Error("User do not exists");
    }

    if (user.isBlocked === true) {
        throw Error("User already marked as block");
    }

    const result = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return result;
};

const deleteBlogFromDB = async (id: string) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw Error("This blog is already deleted or not found");
    }

    const result = await Blog.findByIdAndDelete(id, { new: true });
    return result;
}

export const AdminService = {
    blockUserIntoDB, deleteBlogFromDB
}
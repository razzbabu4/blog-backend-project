import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";
import sendResponse from "../../utils/sendResponse";

const createBlog = catchAsync(async (req: Request, res: Response) => {

    const createdBlog = await BlogServices.createBlogIntoDB(req.body, req?.user?.userEmail);

    sendResponse(res, {
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: createdBlog
    })
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedBlog = await BlogServices.updateBlogIntoDB(id, req.body, req?.user?.userEmail);
    sendResponse(res, {
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: updatedBlog
    })
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await BlogServices.deleteBlog(id, req?.user?.userEmail)
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200
    })
})

export const BlogController = {
    createBlog, updateBlog, deleteBlog
}
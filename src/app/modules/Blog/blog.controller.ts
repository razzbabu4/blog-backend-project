import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";
import sendResponse from "../../utils/sendResponse";

const createBlog = catchAsync(async (req: Request, res: Response) => {

    const result = await BlogServices.createBlogIntoDB(req.body, req?.user?.userEmail);

    sendResponse(res, {
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: result
    })
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogServices.updateBlogIntoDB(id, req.body, req?.user?.userEmail);
    sendResponse(res, {
        success: true,
        message: "Blog updated successfully",
        statusCode: 200,
        data: result
    })
})

export const BlogController = {
    createBlog, updateBlog
}
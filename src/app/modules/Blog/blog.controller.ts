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

export const BlogController = {
    createBlog
}
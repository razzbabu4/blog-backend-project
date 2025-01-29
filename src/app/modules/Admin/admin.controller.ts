import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";

const blockUser = catchAsync(async (req: Request, res: Response) => {
    await AdminService.blockUserIntoDB(req.params.userId);

    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
    })
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    await AdminService.deleteBlogFromDB(req.params.userId);
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200
    })
})

export const AdminController = {
    blockUser, deleteBlog
}


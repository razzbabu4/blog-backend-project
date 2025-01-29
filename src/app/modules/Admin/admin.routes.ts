import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../middleware/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.patch('/users/:userId/block', auth(USER_ROLE.admin), AdminController.blockUser);
router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminController.deleteBlog);

export const AdminRouter = router;
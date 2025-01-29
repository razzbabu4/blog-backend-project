import { Router } from "express";
import { BlogController } from "./blog.controller";
import auth from "../middleware/auth";
import validateRequest from "../middleware/validateRequest";
import { BlogValidationSchema } from "./blog.validation";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post('/create-blog', auth(USER_ROLE.user), validateRequest(BlogValidationSchema.createBlogValidationSchema), BlogController.createBlog);
router.patch('/:id', auth(USER_ROLE.user), validateRequest(BlogValidationSchema.updateBlogPartialValidationSchema), BlogController.updateBlog);
router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);
router.get('/', BlogController.getAllBlogs);

export const BlogRouter = router;
import { Router } from "express";
import { BlogController } from "./blog.controller";
import auth from "../middleware/auth";
import validateRequest from "../middleware/validateRequest";
import { BlogValidationSchema } from "./blog.validation";

const router = Router();

router.post('/create-blog', auth(), validateRequest(BlogValidationSchema.createBlogValidationSchema), BlogController.createBlog);
router.patch('/:id', auth(), BlogController.updateBlog);

export const BlogRouter = router;
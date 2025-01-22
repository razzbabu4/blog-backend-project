import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.routes";
import { BlogRouter } from "../modules/Blog/blog.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
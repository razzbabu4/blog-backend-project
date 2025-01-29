import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.routes";
import { BlogRouter } from "../modules/Blog/blog.routes";
import { AdminRouter } from "../modules/Admin/admin.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    },
    {
        path: '/admin',
        route: AdminRouter
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
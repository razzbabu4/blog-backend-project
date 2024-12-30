import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRouter
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
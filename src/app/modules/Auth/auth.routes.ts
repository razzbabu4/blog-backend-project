import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post('/register', AuthControllers.userRegister);

export const AuthRouter = router;
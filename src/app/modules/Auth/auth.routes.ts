import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../middleware/validateRequest";
import { UserValidation } from "../User/user.validation";

const router = Router();

router.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.userRegister);

export const AuthRouter = router;
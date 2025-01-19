import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../middleware/validateRequest";
import { UserValidation } from "../User/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.userRegister);
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.userLogin);

export const AuthRouter = router;
import { Router } from "express";
import { loginValidation, registerValidation } from "./auth.validation";
import {
    deleteUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
} from "./auth.controller";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/logout", isAuth, logoutUser);
router.delete("/delete", isAuth, deleteUser);
router.get("/refresh-access-token", refreshAccessToken);

export default router;

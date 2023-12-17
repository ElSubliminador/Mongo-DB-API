import {Router} from "express";
import {login,registerSup} from "../controllers/auth.controller.js";
import {body} from "express-validator";

const router = Router();

router.post(
    "/register/supervisor",
    registerSup);

router.post("/login",login);

export default router;
import express from "express";
import { signup } from "../../../controllers/auth/v1/signup.controller.js";
import { signin } from "../../../controllers/auth/v1/signin.controller.js";
import { logout } from "../../../controllers/auth/v1/logout.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;

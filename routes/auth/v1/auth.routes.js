import express from "express";

// ----------------- Controllers -----------------
import { signup } from "../../../controllers/auth/v1/signup.controller.js";
import { signin } from "../../../controllers/auth/v1/signin.controller.js";
import { logout } from "../../../controllers/auth/v1/logout.controller.js";

// ----------------- validators -----------------
import validator from "../../../validators/validator.js";
import {
  userLoginValidator,
  userValidator,
} from "../../../validators/user.validator.js";

const router = express.Router();

router.post("/signup", userValidator, validator, signup);
router.post("/signin", userLoginValidator, validator, signin);
router.post("/logout", logout);

export default router;

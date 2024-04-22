import express from "express";
import sendMessage from "../../../controllers/api/v1/sendMessage.controller.js";
import protectedRoute from "../../../middlewares/protectedRoute.middleware.js";
import {
  getMessageValidator,
  setMessageValidator,
} from "../../../validators/message.validator.js";
import validator from "../../../validators/validator.js";
import getMessage from "../../../controllers/api/v1/getMessage.controller.js";

const router = express.Router();

router.post(
  "/send-message/:receiverId",
  protectedRoute,
  setMessageValidator,
  validator,
  sendMessage
);

router.get(
  "/get-message/:toChatUserId",
  protectedRoute,
  getMessageValidator,
  validator,
  getMessage
);

export default router;

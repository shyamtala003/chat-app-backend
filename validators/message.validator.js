import { check } from "express-validator";

// validator send message payload
export const setMessageValidator = [
  check("message").notEmpty().withMessage("Message is required"),
  check("receiverId")
    .notEmpty()
    .withMessage("receiverId is required")
    .isMongoId()
    .withMessage("receiverId must be a valid mongoId"),
];

//  validate get message payload
export const getMessageValidator = [
  check("toChatUserId")
    .notEmpty()
    .withMessage("receiverId is required")
    .isMongoId()
    .withMessage("receiverId must be a valid mongoId"),
];

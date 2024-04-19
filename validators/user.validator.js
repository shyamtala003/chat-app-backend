import { check } from "express-validator";

// validator for registration
export const userValidator = [
  check("name")
    .isLength({ min: 1, max: 30 })
    .withMessage("Name must be between 1 and 30 characters"),

  check("username")
    .custom((value, { req }) => {
      if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
        throw new Error(
          "Username must not contain special characters and spaces"
        );
      }
      return true;
    })
    .isLength({ min: 6, max: 24 })
    .withMessage("Username must be a string between 6 and 24 characters"),

  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password length should be between 8 and 30 characters"),

  check("confirmPassword")
    .isLength({ min: 8, max: 32 })
    .withMessage("Confirm Password must be 8 to 32 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm password are not same");
      }
      return true;
    }),

  check("gender")
    .notEmpty()
    .withMessage("gender must be required")
    .isIn(["male", "female"])
    .withMessage("Gender must be either male or female"),
];

// validator for login
export const userLoginValidator = [
  check("username")
    .custom((value, { req }) => {
      if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)) {
        throw new Error(
          "Username must not contain special characters and spaces"
        );
      }
      return true;
    })
    .isLength({ min: 6, max: 24 })
    .withMessage("Username must be a string between 6 and 24 characters"),

  check("password")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password length should be between 8 and 30 characters"),
];

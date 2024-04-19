import { validationResult } from "express-validator";
import SetResponse from "../utils/response.util.js";

export default function validator(req, res, next) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => {
      return { [err.path]: err.msg };
    });

    return SetResponse(res, 422, false, "invalid input", {
      errors: extractedErrors,
    });
  } catch (error) {
    console.log(error);
  }
}

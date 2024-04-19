import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";

export const signup = async (req, res) => {
  const { name, username, password, gender } = req.body;

  // 1. username must be unique
  let isUsernameUnique = await userModel.findOne({ username });
  if (isUsernameUnique) {
    return setResponse(res, 409, false, "Username already exist in out system");
  }
};

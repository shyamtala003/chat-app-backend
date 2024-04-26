import bcryptjs from "bcryptjs";
import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";
import generateToken from "../../../utils/generateToken.util.js";
import { setCookie } from "../../../utils/setCookie.util.js";

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. check user existence
    const isUserExist = await userModel
      .findOne({ username: username })
      .select("+password");
    if (!isUserExist) {
      return setResponse(res, 404, false, "Username not found.");
    }

    // 2. match password
    const isMatch = await bcryptjs.compare(password, isUserExist.password);
    if (!isMatch) {
      return setResponse(res, 401, false, "Invalid password.");
    }

    // 3. Generate token
    const refreshToken = generateToken({ id: isUserExist._id }, "refreshToken");
    const accessToken = generateToken({ id: isUserExist._id });

    // 4. Set cookies
    setCookie(res, "refresh token", refreshToken);
    setCookie(res, "access token", accessToken, { maxAge: 15 * 60 * 1000 });

    return setResponse(res, 200, true, "User logged in successfully", {
      _id: isUserExist?._id,
      name: isUserExist?.name,
      username: isUserExist?.username,
      gender: isUserExist?.gender,
      profilePicture: isUserExist?.profilePicture,
    });
  } catch (error) {
    return setResponse(
      res,
      500,
      false,
      "An error occurred while processing your request",
      { error: error.message }
    );
  }
};

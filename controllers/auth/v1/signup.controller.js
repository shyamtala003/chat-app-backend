import bcryptjs from "bcryptjs";
import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";
import generateToken from "../../../utils/generateToken.util.js";
import { setCookie } from "../../../utils/setCookie.util.js";

export const signup = async (req, res) => {
  const { name, username, password, gender } = req.body;

  try {
    // 1. Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 2. Generate user avatar URL
    const profilePicture = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;

    // 3. Create user
    const user = new userModel({
      name,
      username,
      password: hashedPassword,
      gender,
      profilePicture,
    });

    // 4.Save user
    const savedUser = await user.save();

    // 5. Generate token
    const refreshToken = generateToken({ id: savedUser._id }, "refreshToken");
    const accessToken = generateToken({ id: savedUser._id });

    // 6. Set cookies
    setCookie(res, "refresh token", refreshToken, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    setCookie(res, "access token", accessToken, { maxAge: 15 * 60 * 1000 });

    return setResponse(res, 201, true, "Account created successfully", {
      _id: savedUser?._id,
      name: savedUser?.name,
      username: savedUser?.username,
      gender: savedUser?.gender,
      profilePicture: savedUser?.profilePicture,
    });
  } catch (error) {
    // Check if the error is due to duplicate username
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return setResponse(
        res,
        409,
        false,
        "Username already exists in our system"
      );
    }

    return setResponse(
      res,
      500,
      false,
      "An error occurred while processing your request",
      { error }
    );
  }
};

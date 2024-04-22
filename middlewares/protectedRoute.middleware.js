import { userModel } from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import setResponse from "../utils/response.util.js";
import { setCookie } from "../utils/setCookie.util.js";
import verifyToken from "../utils/verifyToken.util.js";

export default async function protectedRoute(req, res, next) {
  try {
    let accessToken = req.cookies["access token"];
    let refreshToken = req.cookies["refresh token"];

    // 1. if refresh token is not provided then throw exception
    if (!refreshToken)
      return setResponse(
        res,
        401,
        false,
        "Unauthorized - refresh token not provided"
      );

    // 2. if access token is provided then validate token
    if (accessToken) {
      // 1. Verify access token
      const decoded = verifyToken(res, accessToken, "accessToken");

      // 2. If access token is valid then set user data in request object
      let userData = await userModel.findById(decoded.id);

      // 3. throw exception if user is not found
      if (!userData)
        return setResponse(res, 404, false, "Unauthorized - User not found");

      req.user = userData;
      return next();
    }

    // 3. if refresh token is provided then validate token and send the new access token in cookie and set user data
    if (refreshToken) {
      // 1. Verify refresh token
      const decoded = verifyToken(res, refreshToken, "refreshToken");

      // 2. If refresh token is valid then set user data in request object
      let userData = await userModel.findById(decoded.id);

      // 3. throw exception if user is not found
      if (!userData)
        return setResponse(res, 404, false, "Unauthorized - User not found");

      req.user = userData;

      // 4. Generate new access token
      const accessToken = generateToken({ id: decoded.id });

      // 5. Set new access token in cookie
      setCookie(res, "access token", accessToken, { maxAge: 15 * 60 * 1000 });

      return next();
    }
  } catch (error) {
    console.log(error);
  }
}

import jsonwebtoken from "jsonwebtoken";
import setResponse from "./response.util.js";

export default function verifyToken(res, token, tokenType = "accessToken") {
  try {
    // Define default options for access token and refresh token
    const tokenOptions = {
      accessToken: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      },
      refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      },
    };

    // Select options based on token type
    const options = tokenOptions[tokenType];

    // Verify token
    const decoded = jsonwebtoken.verify(token, options.secret);

    return decoded;
  } catch (error) {
    // If token verification fails, an error will be thrown
    // You can handle the error as per your application's requirements
    console.error("Token verification failed:", error);
    return setResponse(res, 401, false, `Unauthorized - Invalid ${tokenType}`);
  }
}

import jsonwebtoken from "jsonwebtoken";

export default function generateToken(payload, tokenType = "accessToken") {
  try {
    // Define default options for access token and refresh token
    const tokenOptions = {
      accessToken: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: "15m",
        },
      },
      refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        signOptions: {},
      },
    };

    // Select options based on token type
    const options = tokenOptions[tokenType];

    // Generate token
    return jsonwebtoken.sign(payload, options.secret, options.signOptions);
  } catch (error) {
    console.log(error);
  }
}

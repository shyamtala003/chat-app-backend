import setResponse from "../../../utils/response.util.js";

export const logout = (req, res) => {
  // 1. remove all token cookies
  res.cookie("refresh token", "", { maxAge: 0 });
  res.cookie("access token", "", { maxAge: 0 });

  setResponse(res, 200, true, "user logout successful.");
};

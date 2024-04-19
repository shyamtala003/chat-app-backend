export function setCookie(res, name, value, options = {}) {
  // Default cookie options
  const defaultOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
  };

  // Merge default options with provided options
  const cookieOptions = { ...defaultOptions, ...options };

  // Set the cookie
  res.cookie(name, value, cookieOptions);
}

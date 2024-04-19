export default function setResponse(
  res,
  statusCode = 200,
  flag = true,
  message = "",
  data = {}
) {
  return res.status(statusCode).json({
    code: statusCode,
    success: flag,
    message,
    data,
  });
}

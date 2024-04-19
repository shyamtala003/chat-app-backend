export default function setResponse(
  res,
  statusCode = 200,
  flag = true,
  message = "",
  data = {}
) {
  try {
    return res.status(statusCode).json({
      code: statusCode,
      success: flag,
      message,
      data,
    });
  } catch (error) {
    console.log(error);
  }
}

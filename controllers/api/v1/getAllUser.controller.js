import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";

export default async function getAllUser(req, res) {
  try {
    console.log(req.user._id);
    const user = await userModel.find({ _id: { $ne: req.user._id } });
    return setResponse(res, 200, true, "all users list", { user });
  } catch (error) {
    console.log(error);
  }
}

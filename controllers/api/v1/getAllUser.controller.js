import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";

export default async function getAllUser(req, res) {
  try {
    const user = await userModel.find({});
    return setResponse(res, 200, true, "all users list", { user });
  } catch (error) {
    console.log(error);
  }
}

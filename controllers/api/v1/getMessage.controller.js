import { conversationModel } from "../../../models/conversation.model.js";
import setResponse from "../../../utils/response.util.js";

export default async function getMessage(req, res) {
  try {
    // 1. prepare search payload
    const { toChatUserId } = req.params;
    const senderId = req?.user?._id;

    // 2. find the conversation between the receiver and the sender
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [toChatUserId, senderId] },
      })
      .populate("messages");

    return setResponse(res, 200, true, "messages fetched successfully", {
      messages: conversation ? conversation.messages : [],
    });
  } catch (error) {
    console.log(error);
  }
}

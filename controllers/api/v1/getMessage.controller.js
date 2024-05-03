import { conversationModel } from "../../../models/conversation.model.js";
import setResponse from "../../../utils/response.util.js";
import { messageModel } from "../../../models/message.model.js";
import { io } from "../../../sockets/socketConfig.js";

export default async function getMessage(req, res) {
  try {
    // 1. Prepare search payload
    const { toChatUserId } = req.params;
    const senderId = req?.user?._id;

    // 2. Update the read status of messages
    let updateResult = await messageModel.updateMany(
      { senderId: toChatUserId, receiverId: senderId, read: false },
      { $set: { read: true } }
    );

    // 3. notify to toChatUser for your all messages are readed
    if (updateResult?.modifiedCount > 0) {
      onlineUser[toChatUserId] &&
        io
          .to(onlineUser[toChatUserId])
          .emit("allMessageReaded", { toChatUserId: senderId });
    }

    // 3. Find the conversation between the receiver and the sender
    const conversation = await conversationModel.getConversation(
      senderId,
      toChatUserId
    );

    return setResponse(res, 200, true, "Messages fetched successfully", {
      messages: conversation ? conversation.messages : [],
      read: true, // Indicate that messages are now read
    });
  } catch (error) {
    console.error(error);
    return setResponse(res, 500, false, "Internal server error");
  }
}

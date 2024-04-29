import { conversationModel } from "../../../models/conversation.model.js";
import { messageModel } from "../../../models/message.model.js";
import { io } from "../../../sockets/socketConfig.js";
import setResponse from "../../../utils/response.util.js";

export default async function sendMessage(req, res) {
  try {
    // 1. prepare the message payload
    const { message } = req.body;
    const { receiverId } = req.params;
    const senderId = req?.user?._id;

    // 2. find the conversation between the receiver and the sender
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // 3. if conversation is not found then create a new conversation
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    // 4. Create a new message
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });

    // 5. add message id inside conversation record
    conversation.messages.push(newMessage._id);

    // 6. save the conversation and the message
    await Promise.allSettled([newMessage.save(), conversation.save()]);

    // 7. notify msg receiver through socket if user is online
    onlineUser[receiverId] &&
      io.to(onlineUser[receiverId]).emit("newMessage", newMessage);

    return setResponse(res, 201, true, "message sended successfully", {
      message: newMessage,
    });
  } catch (error) {
    console.log(error);
  }
}

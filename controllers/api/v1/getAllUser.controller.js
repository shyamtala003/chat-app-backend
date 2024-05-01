import { userModel } from "../../../models/user.model.js";
import setResponse from "../../../utils/response.util.js";
import { messageModel } from "../../../models/message.model.js";

export default async function getAllUser(req, res) {
  try {
    // Fetch all users except the current user
    const users = await userModel.find({ _id: { $ne: req.user._id } });

    // Iterate through each user to fetch the last message
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        // Find the last message where the current user is either the sender or receiver
        const lastMessage = await messageModel
          .findOne({
            $or: [
              { senderId: req.user._id, receiverId: user._id },
              { senderId: user._id, receiverId: req.user._id },
            ],
          })
          .sort({ createdAt: -1 }); // Sort by createdAt to get the last message

        // Combine user data and last message into a single object
        const userDataWithLastMessage = {
          _id: user._id,
          name: user.name,
          username: user.username,
          gender: user.gender,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastMessage: lastMessage ? lastMessage.message : null,
          lastMessageDate: lastMessage ? lastMessage.createdAt : null,
        };

        return userDataWithLastMessage;
      })
    );

    // Sort users by lastMessageDate in descending order (latest first)
    usersWithLastMessage.sort((a, b) => {
      return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
    });

    return setResponse(res, 200, true, "All users list with last message", {
      users: usersWithLastMessage,
    });
  } catch (error) {
    console.error(error);
    return setResponse(res, 500, false, "Internal server error");
  }
}

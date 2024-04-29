import mongoose from "mongoose";
export default async function getConversation(senderId, receiverId) {
  const pipeline = [
    [
      {
        $match: {
          participants: {
            $all: [
              new mongoose.Types.ObjectId(senderId),
              new mongoose.Types.ObjectId(receiverId),
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ],
  ];

  try {
    const result = await this.aggregate(pipeline);
    return result[0];
  } catch (error) {
    console.error("Error while getting conversation:", error);
    throw error;
  }
}

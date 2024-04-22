import { Schema, model } from "mongoose";

const conversationSchema = Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamp: true }
);

export const conversationModel = model("Conversation", conversationSchema);

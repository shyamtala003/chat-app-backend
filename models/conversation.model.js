import { Schema, model } from "mongoose";
import getConversation from "../methods/conversation/getConversation.js";

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
  { timestamps: true }
);

// 1. method for get converasation
conversationSchema.statics.getConversation = getConversation;

export const conversationModel = model("Conversation", conversationSchema);

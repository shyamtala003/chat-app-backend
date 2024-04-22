import { Schema, model } from "mongoose";

const messageSchema = Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "senderId is required."],
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiverId is required."],
    },
    message: {
      type: String,
      required: [true, "message is required."],
    },
  },
  { timestamps: true }
);

export const messageModel = model("Message", messageSchema);

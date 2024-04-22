import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: { type: String, require: [true, "name is required."] },
    username: {
      type: String,
      required: [true, "username is required."],
      unique: [true, "username must be unique."],
    },
    password: {
      type: String,
      required: [true, "password is required."],
      select: false,
    },
    gender: {
      type: String,
      required: [true, "gender is require."],
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);

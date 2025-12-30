import mongoose from "mongoose";

// Message schema
const MessageSchema = new mongoose.Schema(
  {
    customId: { type: String, required: true },
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    scheduleTime: {
      type: Date,
      required: false,
    },
    isSchedule: {
      type: Boolean,
      required: false,
    },
    content: {
      url: { type: String, required: false },
      format: { type: String, required: false },
      message: { type: String, required: false },
      name: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;

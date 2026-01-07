import User from "../model/User.js";
import Pusher from "pusher";
import dotenv from "dotenv";
import express from "express";
import Message from "../model/Message.js";
dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});
export async function sendScheduleMessage(chatId, payload) {
  try {
    if (!chatId) return;

    await Promise.all([
      pusher.trigger(`private-message-${chatId}`, "client-message", payload),
      Message.findOneAndUpdate(
        { customId: payload.customId },
        { isSchedule: false }
      ),
    ]);
  } catch (error) {
    console.log(error);
  }
}

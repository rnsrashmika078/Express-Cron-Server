import express from "express";
import { promises as fs } from "fs";
import cors from "cors";
import cron from "node-cron"; //es module for cron task
import cookieParser from "cookie-parser"; // let read cookies from the browser
import { connectDb } from "./config/db.js";
import { sendScheduleMessage } from "./controller/UserFetchController.js";
import Message from "./model/Message.js";

const app = express(); //create instance of the express application
app.use(express.json()); // allow the server to accept json data
app.use(express.urlencoded({ extended: true })); //req.body allow the serve to read data from the html forms : name=John&age=30

const port = 5000;
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
await connectDb();

cron.schedule("0 * * * * *", async () => {
  const now = new Date();
  //run on every minute
  const scheduleMessages = await Message.find({
    scheduleTime: { $lte: now },
    isSchedule: true,
  });
  for (const msg of scheduleMessages) {
    await sendScheduleMessage(msg?.chatId, msg);
  }
});

app.listen(port, () => {
  console.log("Server is Running!");
});

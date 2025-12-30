import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  const db = "SAAS";
  const MONGODB_URI = `${process.env.MONGOOSE_URI}/${db}`;
  await mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database Connected!");
  });
};

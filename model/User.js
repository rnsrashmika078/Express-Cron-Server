import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  dp: {
    type: String,
    required: false,
  },
  lastSeen: {
    type: String,
    required: false,
  },
  friends: [
    {
      type: String,
      // unique: true,
    },
  ],
  receivedRequests: [
    {
      type: String,
      // unique: true,
    },
  ],
  sentRequests: [
    {
      type: String,
      // unique: true,
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

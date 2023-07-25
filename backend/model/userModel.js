const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    user: { type: String },
    userName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    Photo: { type: String },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

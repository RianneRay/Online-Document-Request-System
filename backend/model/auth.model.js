import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
  email: {
    type: String,
    required: true,
    unique: true
  }
  password: {
    type: String,
    required: true
  }
  role: {
    enum: ["user", "admin"]
    default: user
  }
  requestDocument: {
    type: [Schema.Types.ObjectId],
    ref: Document
  }
})


export const User = mongoose.model(User, userSchema);
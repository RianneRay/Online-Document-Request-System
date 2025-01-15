import mongoose from "mongoose";
import { User } from "./auth.model.js"

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending"
  },
  dateRequested: {
    type: Date,
    default: Date.now()
  },
  releaseDate: {
    type: Date,
    default: () => {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    }
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Document = mongoose.model("Document", documentSchema)
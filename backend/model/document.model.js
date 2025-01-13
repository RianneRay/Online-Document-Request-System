import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  releaseData: {
    type: Date,
    default: () => {
      let date = Date.now();
      date.setDate(date.getDate() + 1);
      return date;
    }
  }
})

export const Document = mongoose.model("Document", documentSchema)
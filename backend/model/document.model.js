import mongoose from "mongoose";

const documents = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  status: {
    enum: ["pending", "success"]
    default: pending
  }
  dateRequested: {
    type: Date,
    default: Date.now()
  }
  releaseData: {
    type: Date,
    default: () => {
      let date = Date.now();
      date.setDate(date.getDate() + 1);
      return date;
    }
  }
})
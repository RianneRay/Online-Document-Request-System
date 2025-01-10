import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  docName: {
    type: String,
    required: true
  },
  reqDate: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

export const Document = mongoose.model('Document', documentSchema);
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const aiChatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [messageSchema],
  interactions: [
    {
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const AIChatHistory = mongoose.model("AIChatHistory", aiChatHistorySchema);

export default AIChatHistory;

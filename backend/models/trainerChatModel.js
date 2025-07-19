import mongoose from "mongoose";

export const SENDER_TYPES = {
  USER: "user",
  TRAINER: "trainer",
};
 
const trainerMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: String, enum: [SENDER_TYPES.USER, SENDER_TYPES.TRAINER], required: true },
  content: { type: String, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: "1d", // ⏳ TTL: 1 day
  },
});

export default  mongoose.model("TrainerMessage", trainerMessageSchema);

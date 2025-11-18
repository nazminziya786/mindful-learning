// models/Wellbeing.js
import mongoose from "mongoose";

const WellbeingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  mood: { type: String },          // e.g. "happy", "stressed"
  moodEmoji: { type: String },     // optional emoji
  energy: { type: Number },        // 1-10
  concerns: { type: String },
  createdAt: { type: Date, default: Date.now }
});

WellbeingSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Wellbeing", WellbeingSchema);

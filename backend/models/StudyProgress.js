// models/StudyProgress.js
import mongoose from "mongoose";

const StudyProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  metric: { type: String, required: true }, // e.g. "weeklyGoalCompletion", "totalStudyTime"
  value: { type: mongoose.Schema.Types.Mixed },
  meta: { type: mongoose.Schema.Types.Mixed },
  updatedAt: { type: Date, default: Date.now }
});

StudyProgressSchema.index({ user: 1, metric: 1 }, { unique: true });

export default mongoose.model("StudyProgress", StudyProgressSchema);

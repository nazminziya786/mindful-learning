// models/WeeklyReport.js
import mongoose from "mongoose";

const WeeklyReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weekStart: { type: Date, required: true }, // canonical start date of week (e.g. Monday)
  avgScore: { type: Number },
  totalStudyMinutes: { type: Number },
  goalsCompleted: { type: Number },
  testsTaken: { type: Number },
  dailyProgress: { type: Map, of: Number }, // Mon->75, Tue->82 etc.
  createdAt: { type: Date, default: Date.now }
});

WeeklyReportSchema.index({ user: 1, weekStart: 1 }, { unique: true });

export default mongoose.model("WeeklyReport", WeeklyReportSchema);

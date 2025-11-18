// models/DailyReport.js
import mongoose from "mongoose";

const DailyReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  overallScore: { type: Number },    // e.g. 8.5
  studyTimeMinutes: { type: Number },// minutes
  tasksDone: { type: Number },
  subjectPerformance: {              // object with subject->score
    type: Map,
    of: Number,
    default: {}
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

DailyReportSchema.index({ user: 1, date: 1 }, { unique: true }); // one report per user per day

export default mongoose.model("DailyReport", DailyReportSchema);

// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import reportRoutes from "./routes/reports.js";
import wellbeingRoutes from "./routes/wellbeing.js";
import studyRoutes from "./routes/study.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, "..")));

// connect to Mongo
await connectDB(process.env.MONGO_URI);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/wellbeing", wellbeingRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/chat", chatRoutes);

// health
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date() }));

// Serve the main HTML file for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "learn_mind_app.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

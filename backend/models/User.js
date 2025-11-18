// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed
  phone: { type: String },
  grade: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);

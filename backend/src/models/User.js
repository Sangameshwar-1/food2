import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  name: { type: String },
});

const User = mongoose.model("User", userSchema);

export { User };
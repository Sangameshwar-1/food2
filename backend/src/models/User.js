import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  // Add other fields as needed
});

const User = mongoose.model("User", userSchema);

export { User }; // Named export
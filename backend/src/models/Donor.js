import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  weight: { type: Number, required: true },
  bloodType: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
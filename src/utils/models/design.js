import mongoose from 'mongoose';

// Design Schema
const designsSchema = new mongoose.Schema({
  image: { url: String },
  slug: { type: String, unique: true },
  title: { type: String },
  designNumber: { type: Number },
  carName: { type: String },
  starred: { type: Boolean, default: false }, // New field for starring designs
}, { timestamps: true });

export const Design = mongoose.models.Design || mongoose.model("Design", designsSchema);
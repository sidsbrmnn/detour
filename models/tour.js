const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const tourSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String },
  duration: { type: Number, required: true },
  groupSize: { type: Number, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["beginner", "amateur", "pro"]
  },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  ratingCount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  cover: { type: String, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now() },
  startDate: { type: Date, required: true }
});

tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

const Tour = model("Tour", tourSchema);

module.exports = Tour;

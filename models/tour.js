const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name."],
    unique: true
  },
  slug: {
    type: String
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration."]
  },
  groupSize: {
    type: Number,
    required: [true, "A tour must have a group size."]
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty."],
    enum: ["beginner", "amateur", "pro"]
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1"],
    max: [5, "rating cannot be above 5"]
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price."]
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a description."]
  },
  description: {
    type: String,
    trim: true
  },
  cover: {
    type: String,
    required: [true, "A tour must have a cover image."]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDate: {
    type: Date,
    required: [true, "A tour must have a start date."]
  }
});

tourSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = model("Tour", tourSchema);

module.exports = Tour;

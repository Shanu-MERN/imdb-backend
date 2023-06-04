import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "EN",
  },
  releasedYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

export const Movie = mongoose.model("data", movieSchema);

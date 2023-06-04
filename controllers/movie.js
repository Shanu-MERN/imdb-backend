import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Movie } from "../models/movie.js";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const data = await Movie.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).send(`No Movie with id ${req.params.id} found`);
  }
};

const addMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    await newMovie.save();
  } catch (error) {
    return res
      .status(500)
      .json(`Error adding Movie to database: ${error.message}`);
  }
  return res.json(newMovie);
};

const updateMovie = async (req, res) => {
  try {
    var movie = await Movie.findById(req.params.id);
  } catch (error) {
    return res.status(500).send(`No movie with id ${req.params.id} found`);
  }
  for (const key in req.body) {
    console.log(!req.body[key]);
    if (req.body[key]) movie[key] = req.body[key];
  }
  await movie.save();
  return res.json(movie);
};

const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    return res.json(deletedMovie);
  } catch (error) {
    return res.status(500).send(`No Movie with id ${req.params.id} found`);
  }
};

export { getAllMovies, addMovie, updateMovie, deleteMovie, getMovie };

import express from "express";
const router = express.Router();

import {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.js";

router.route("/").get(getAllMovies).post(addMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default router;

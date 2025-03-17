import express from "express";

/// * controllers
import MoviesController from "../controllers/movies.controller";

/// * middlewares
import Middlewares from "../middlewares";

const router = express.Router();

router.route("/").get(Middlewares.checkAuth, MoviesController.getMovieList);
router.route("/genres").get(Middlewares.checkAuth, MoviesController.getGenres);

export default router;

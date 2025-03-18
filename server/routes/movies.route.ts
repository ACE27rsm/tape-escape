import express from "express";

/// * controllers
import MoviesController from "../controllers/movies.controller";

/// * middlewares
import Middlewares from "../middlewares";

const router = express.Router();

router.route("/").get(Middlewares.checkAuth, MoviesController.getMovieList);
router.route("/genres").get(Middlewares.checkAuth, MoviesController.getGenres);
router
  .route("/movie/:movieId")
  .get(Middlewares.checkAuth, MoviesController.getMovieDetails);
router.route("/rent").post(Middlewares.checkAuth, MoviesController.rentMovie);
router
  .route("/return")
  .post(Middlewares.checkAuth, MoviesController.returnMovie);
router
  .route("/history")
  .get(Middlewares.checkAuth, MoviesController.userRentHistory);

export default router;

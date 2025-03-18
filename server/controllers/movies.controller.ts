import express, { NextFunction } from "express";
import httpErrors from "http-errors";

/// * API
import Movies from "../libs/Movies";

/// * types
import { IRequestWithAuth } from "../../types";

class MoviesController {
  /// o ********************************
  static async getMovieList(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const query = req.query.query ? String(req.query.query) : "";
      const page = req.query.page ? Number(req.query.page) : 1;
      let userId = req.user?.username;

      if (!userId) {
        throw new httpErrors.BadRequest("userId is required");
      }

      if (query) {
        const movieList = await Movies.searchMovieByName(query, page, userId);
        res.send(movieList);
      } else {
        const movieList = await Movies.getMovieList(page, userId);
        res.send(movieList);
      }
    } catch (error) {
      next(error);
    }
  }

  /// o ********************************
  static async getGenres(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      const genres = await Movies.getGenres();
      res.send(genres);
    } catch (error) {
      next(error);
    }
  }

  /// o ********************************
  static async getMovieDetails(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      let movieId = req.params.movieId ? Number(req.params.movieId) : 0;
      let userId = req.user?.username;

      if (!req.params.movieId) {
        throw new httpErrors.BadRequest("movieId is required");
      }

      if (!userId) {
        throw new httpErrors.BadRequest("userId is required");
      }

      const movie = await Movies.getMovieDetails(movieId, userId);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  }

  /// o ********************************
  static async rentMovie(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      let movieId = req.body.movieId;
      let userId = req.user?.username;

      if (!movieId) {
        throw new httpErrors.BadRequest("movieId is required");
      }

      if (!userId) {
        throw new httpErrors.BadRequest("userId is required");
      }

      await Movies.rentMovie(userId, movieId);
      res.end();
    } catch (error) {
      next(error);
    }
  }

  /// o ********************************
  static async returnMovie(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      let movieId = req.body.movieId;
      let userId = req.user?.username;

      if (!movieId) {
        throw new httpErrors.BadRequest("movieId is required");
      }

      if (!userId) {
        throw new httpErrors.BadRequest("userId is required");
      }

      await Movies.returnMovie(userId, movieId);
      res.end();
    } catch (error) {
      next(error);
    }
  }

  /// o ********************************
  static async userRentHistory(
    req: IRequestWithAuth,
    res: express.Response,
    next: NextFunction
  ) {
    try {
      let userId = req.user?.username;

      if (!userId) {
        throw new httpErrors.BadRequest("userId is required");
      }

      const history = await Movies.getUserRentedMovies(userId);
      res.send(history);
    } catch (error) {
      next(error);
    }
  }
}

export default MoviesController;

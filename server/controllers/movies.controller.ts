import express, { NextFunction } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";

/// * API
import TMDB_API from "@/libs/TMDB_API";

/// * types
import { IRequestWithAuth, TMDB } from "../../types";

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

      if (query) {
        const movieList = await TMDB_API.searchMovieByName(query, page);
        res.send(movieList);
      } else {
        const movieList = await TMDB_API.getMovieList(page);
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
      const genres = await TMDB_API.getGenres();
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
      if (!req.params.movieId) {
        throw new httpErrors.BadRequest("movieId is required");
      }

      const movie = await TMDB_API.getMovieDetails(movieId);
      res.send(movie);
    } catch (error) {
      next(error);
    }
  }
}

export default MoviesController;

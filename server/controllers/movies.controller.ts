import express, { NextFunction } from "express";
import httpErrors from "http-errors";
import httpStatus from "http-status";

/// * API
import TMDB_API from "@/libs/TMDB_API";

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
      const query = req.body.query;
      const page = req.body.page || 1;

      const movieList = await TMDB_API.getMovieList(page);

      res.send(movieList);
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
}

export default MoviesController;

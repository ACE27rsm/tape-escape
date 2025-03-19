import httpErrors from "http-errors";
import httpStatus from "http-status";
import _ from "lodash";

/// * libs
import Logger from "./Logger";
import TMDB from "./TMDB_API";
import SocketServer from "./SocketServer";

/// * types
import { Movies as MovieTypes, TMDB as TMDBTypes } from "../../types";

const logger = new Logger("movies");

class Movies {
  static rentedMovies: MovieTypes.RentedMovie[] = [];
  static rentedMoviesHistory: MovieTypes.RentedMovieHistory[] = [];
  static currentRentId = 0;

  /// ! ********************************
  private static errorHandler(functionName: string, error: unknown): never {
    logger.error({ error, functionName });
    throw error;
  }

  /// o ********************************
  static async getGenres(): Promise<TMDBTypes.Genre[]> {
    try {
      const genres = await TMDB.getGenres();

      return genres;
    } catch (error) {
      return this.errorHandler("getGenres", error);
    }
  }

  /// o ********************************
  static async getMovieList(
    page: number = 1,
    userId: string
  ): Promise<MovieTypes.MovieList> {
    try {
      const movieList = await TMDB.getMovieList(page);

      const movies: MovieTypes.Movie[] = movieList.results.map((movie) => {
        const rentedMovie = this.rentedMovies.find(
          (rentedMovie) => rentedMovie.movieId === movie.id
        );

        return {
          ...movie,
          rented: !!rentedMovie,
          rentedByThisUser: rentedMovie?.userId === userId,
        };
      });

      return {
        ...movieList,
        results: movies,
      };
    } catch (error) {
      return this.errorHandler("getMovieList", error);
    }
  }

  /// o ********************************
  static async getMovieDetails(
    movieId: number,
    userId: string
  ): Promise<MovieTypes.MovieDetails | null> {
    try {
      const movie = await TMDB.getMovieDetails(movieId);

      if (!movie) {
        return null;
      }

      const rentedMovie = this.rentedMovies.find(
        (rentedMovie) => rentedMovie.movieId === movie.id
      );

      return {
        ...movie,
        rented: !!rentedMovie,
        rentedByThisUser: rentedMovie?.userId === userId,
      };
    } catch (error) {
      return this.errorHandler("getMovieDetails", error);
    }
  }

  /// o ********************************
  static async searchMovieByName(
    query: string,
    page: number = 1,
    userId: string
  ): Promise<MovieTypes.MovieList> {
    try {
      const movieList = await TMDB.searchMovieByName(query, page);

      const movies: MovieTypes.Movie[] = movieList.results.map((movie) => {
        const rentedMovie = this.rentedMovies.find(
          (rentedMovie) => rentedMovie.movieId === movie.id
        );

        return {
          ...movie,
          rented: !!rentedMovie,
          rentedByThisUser: rentedMovie?.userId === userId,
        };
      });

      return {
        ...movieList,
        results: movies,
      };
    } catch (error) {
      return this.errorHandler("searchMovieByName", error);
    }
  }

  /// l ********************************
  static async rentMovie(userId: string, movieId: number): Promise<void> {
    try {
      const rentedMovieIndex = this.rentedMovies.findIndex(
        (rentedMovie) =>
          rentedMovie.userId === userId && rentedMovie.movieId === movieId
      );

      if (rentedMovieIndex !== -1) {
        throw httpErrors(httpStatus.BAD_REQUEST, "Movie is already rented");
      }

      const rentId = ++this.currentRentId;
      const rentedMovie: MovieTypes.RentedMovie = {
        rentId,
        userId,
        movieId,
        rentDate: new Date(),
      };
      const rentedMovieHistory: MovieTypes.RentedMovieHistory = {
        rentId,
        userId,
        movieId,
        rentDate: new Date(),
        returnDate: null,
      };

      this.rentedMovies.push(rentedMovie);
      this.rentedMoviesHistory.push(rentedMovieHistory);

      SocketServer.broadcast("movieRented", { movieId, userId });
    } catch (error) {
      return this.errorHandler("rentMovie", error);
    }
  }

  /// l ********************************
  static async returnMovie(userId: string, movieId: number): Promise<void> {
    try {
      const rentedMovieIndex = this.rentedMovies.findIndex(
        (rentedMovie) =>
          rentedMovie.userId === userId && rentedMovie.movieId === movieId
      );

      if (rentedMovieIndex === -1) {
        throw httpErrors(httpStatus.BAD_REQUEST, "Movie is not rented");
      }

      const rentedMovie = this.rentedMovies[rentedMovieIndex];

      if (rentedMovie.userId !== userId) {
        throw httpErrors(httpStatus.FORBIDDEN, "You can't return this movie");
      }

      this.rentedMovies = this.rentedMovies.filter(
        (rentedMovie) =>
          rentedMovie.userId !== userId || rentedMovie.movieId !== movieId
      );

      const rentedMovieHistoryIndex = this.rentedMoviesHistory.findIndex(
        (rentedMovie) =>
          rentedMovie.userId === userId && rentedMovie.movieId === movieId
      );

      if (rentedMovieHistoryIndex !== -1) {
        this.rentedMoviesHistory[rentedMovieHistoryIndex].returnDate =
          new Date();
      }

      SocketServer.broadcast("movieReturned", { movieId, userId });
    } catch (error) {
      return this.errorHandler("returnMovie", error);
    }
  }

  /// b ********************************
  static async getUserRentedMovies(
    userId: string
  ): Promise<MovieTypes.UserRentedMovie[]> {
    try {
      const rentedMovies = this.rentedMoviesHistory.filter(
        (rentedMovie) => rentedMovie.userId === userId
      );

      const movies = await Promise.all(
        rentedMovies.map((rentedMovie) =>
          this.getMovieDetails(rentedMovie.movieId, userId)
        )
      );

      const result: MovieTypes.UserRentedMovie[] = [];

      movies.forEach((movie, index) => {
        if (movie) {
          result.push({
            ...rentedMovies[index],
            ...movie,
          });
        }
      });

      return _.orderBy(result, ["returnDate", "rentDate"], ["desc", "desc"]);
    } catch (error) {
      return this.errorHandler("getUserRentedMovies", error);
    }
  }
}

export default Movies;

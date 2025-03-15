import axios from "axios";

/// * libs
import Logger from "./Logger";

/// * static
import config from "../config";

/// * types
import { TMDB } from "../../types/TMDB.types";

const logger = new Logger("TMDB_API");

class TMDB_API {
  private static apiKey = config.tmdb.apiKey;
  private static request = axios.create({
    baseURL: "https://api.themoviedb.org",
  });
  private static baseURLPosterPath = "https://image.tmdb.org/t/p/original";

  /// ! ********************************
  private static errorHandler(functionName: string, error: any): never {
    logger.error({ error, functionName });
    throw error;
  }

  /// y ********************************
  static init() {
    this.request.interceptors.request.use((config) => {
      config.headers.accept = "application/json";
      config.headers.Authorization = `Bearer ${this.apiKey}`;

      return config;
    });
  }

  /// o ********************************
  static async getGenres(): Promise<TMDB.Genre[]> {
    try {
      const response = await this.request.get("/3/genre/movie/list");

      const genres: TMDB.Genre[] = response.data.genres;

      return genres;
    } catch (error) {
      return this.errorHandler("getGenres", error);
    }
  }

  /// o ********************************
  static async getMovieList(page: number = 1): Promise<TMDB.MovieList> {
    try {
      const response = await this.request.get("/3/movie/popular", {
        params: {
          page,
          language: "en",
        },
      });

      const movieList: TMDB.MovieList = {
        ...response.data,
        results: response.data.results.map((movie: TMDB.Movie) => {
          return {
            ...movie,
            poster_path: `${this.baseURLPosterPath}${movie.poster_path}`,
            backdrop_path: `${this.baseURLPosterPath}${movie.backdrop_path}`,
          };
        }),
      };

      return movieList;
    } catch (error) {
      return this.errorHandler("getMovieList", error);
    }
  }

  /// o ********************************
  static async getMovieDetails(
    movieId: number
  ): Promise<TMDB.MovieDetails | null> {
    try {
      const response = await this.request.get(`/3/movie/${movieId}`, {
        params: {
          language: "en-US",
        },
      });

      if (response.data) {
        const movie: TMDB.MovieDetails = {
          ...response.data,
          poster_path: `${this.baseURLPosterPath}${response.data.poster_path}`,
          backdrop_path: `${this.baseURLPosterPath}${response.data.backdrop_path}`,
        };

        return movie;
      } else {
        return null;
      }
    } catch (error) {
      return this.errorHandler("getMovieDetails", error);
    }
  }

  /// o ********************************
  static async serchMovieByName(query: string): Promise<TMDB.MovieList> {
    try {
      const response = await this.request.get(`/3/search/movie`, {
        params: {
          page: 1,
          include_adult: false,
          language: "en-US",
          query,
        },
      });

      const movieList: TMDB.MovieList = {
        ...response.data,
        results: response.data.results.map((movie: TMDB.Movie) => {
          return {
            ...movie,
            poster_path: `${this.baseURLPosterPath}${movie.poster_path}`,
            backdrop_path: `${this.baseURLPosterPath}${movie.backdrop_path}`,
          };
        }),
      };

      return movieList;
    } catch (error) {
      return this.errorHandler("serchMovieByName", error);
    }
  }
}

TMDB_API.init();

export default TMDB_API;

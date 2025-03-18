import { TMDB } from "./TMDB.types";

export namespace Movies {
  export interface RentedMovie {
    rentId: number;
    userId: string;
    movieId: number;
    rentDate: Date;
  }

  export interface RentedMovieHistory {
    rentId: number;
    userId: string;
    movieId: number;
    rentDate: Date;
    returnDate: Date | null;
  }

  export interface UserRentedMovie
    extends RentedMovieHistory,
      TMDB.MovieDetails {}

  export interface Movie extends TMDB.Movie {
    rented: boolean;
    rentedByThisUser: boolean;
  }

  export interface MovieList extends TMDB.MovieList {
    results: Movie[];
  }

  export interface MovieDetails extends TMDB.MovieDetails {
    rented: boolean;
    rentedByThisUser: boolean;
  }
}

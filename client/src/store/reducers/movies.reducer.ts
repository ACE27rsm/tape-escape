import { createSlice } from "@reduxjs/toolkit";
import { Movies, TMDB, IMovieListResult } from "../../../../types";

export interface IUIState {
  genres: {
    fetching: boolean;
    list: TMDB.Genre[];
  };
  list: {
    fetching: boolean;
    moviesList: Movies.Movie[];
    query: string;
    page: number;
    totalPages: number;
  };
  movieDetails: {
    fetching: boolean;
    movie: Movies.MovieDetails | null;
  };
}

const init = (): IUIState => ({
  genres: {
    fetching: false,
    list: [],
  },
  list: {
    fetching: false,
    moviesList: [],
    query: "",
    page: 1,
    totalPages: 1,
  },
  movieDetails: {
    fetching: false,
    movie: null,
  },
});

const slice = createSlice({
  name: "ui",
  initialState: init(),
  reducers: {
    MOVIES_GENRES_FETCHING: (movies, { payload }: { payload: boolean }) => {
      movies.genres.fetching = payload;
    },

    MOVIES_GENRES_SET: (movies, { payload }: { payload: TMDB.Genre[] }) => {
      movies.genres.list = payload;
    },

    MOVIES_LIST_FETCHING: (movies, { payload }: { payload: boolean }) => {
      movies.list.fetching = payload;
    },

    MOVIES_LIST_SET: (movies, { payload }: { payload: IMovieListResult }) => {
      movies.list.moviesList = payload.results;
      movies.list.totalPages = payload.total_pages;
      movies.list.page = payload.page;
      movies.list.query = payload.query;
    },

    MOVIES_DETAILS_FETCHING: (movies, { payload }: { payload: boolean }) => {
      movies.movieDetails.fetching = payload;
    },

    MOVIES_DETAILS_SET: (
      movies,
      { payload }: { payload: Movies.MovieDetails | null }
    ) => {
      movies.movieDetails.movie = payload;
    },

    MOVIES_RENTED_TOGGLE: (
      movies,
      {
        payload,
      }: {
        payload: {
          movieId: number;
          rented: boolean;
          rentedByThisUser: boolean;
        };
      }
    ) => {
      movies.list.moviesList = movies.list.moviesList.map((movie) => {
        if (movie.id === payload.movieId) {
          movie.rented = payload.rented;
          movie.rentedByThisUser = payload.rentedByThisUser;
        }
        return movie;
      });

      if (
        movies.movieDetails.movie &&
        movies.movieDetails.movie.id === payload.movieId
      ) {
        movies.movieDetails.movie.rented = payload.rented;
        movies.movieDetails.movie.rentedByThisUser = payload.rentedByThisUser;
      }
    },

    MOVIES_RESET: () => {
      return init();
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

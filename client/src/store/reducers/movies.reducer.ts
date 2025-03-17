import { createSlice } from "@reduxjs/toolkit";
import { TMDB, IMovieListResult } from "../../../../types";

export interface IUIState {
  genres: {
    fetching: boolean;
    list: TMDB.Genre[];
  };
  list: {
    fetching: boolean;
    moviesList: TMDB.Movie[];
    query: string;
    page: number;
    totalPages: number;
  };
  movieDetails: {
    fetching: boolean;
    movie: TMDB.MovieDetails | null;
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
      { payload }: { payload: TMDB.MovieDetails | null }
    ) => {
      movies.movieDetails.movie = payload;
    },

    MOVIES_RESET: () => {
      return init();
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

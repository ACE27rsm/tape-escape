import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";

/// * from slice
import { actions } from "../reducers/movies.reducer";

/// * types
import { IMovieListPayload } from "../../../../types";

export const {
  MOVIES_GENRES_FETCHING,
  MOVIES_GENRES_SET,
  MOVIES_DETAILS_FETCHING,
  MOVIES_DETAILS_SET,
  MOVIES_LIST_FETCHING,
  MOVIES_LIST_SET,
  MOVIES_RESET,
  MOVIES_RENTED_TOGGLE,
} = actions;

export const MOVIES_GENRES_GET = createAction("movies/MOVIES_GENRES_GET");

export const MOVIES_LIST_GET: ActionCreatorWithPayload<IMovieListPayload> =
  createAction("movies/MOVIES_LIST_GET");

export const MOVIES_LIST_GET_DEBOUNCED: ActionCreatorWithPayload<IMovieListPayload> =
  createAction("movies/MOVIES_LIST_GET_DEBOUNCED");

export const MOVIES_DETAILS_GET: ActionCreatorWithPayload<number> =
  createAction("movies/MOVIES_DETAILS_GET");

export const MOVIES_RENT_MOVIE: ActionCreatorWithPayload<number> = createAction(
  "movies/MOVIES_RENT_MOVIE"
);

export const MOVIES_RETURN_MOVIE: ActionCreatorWithPayload<number> =
  createAction("movies/MOVIES_RETURN_MOVIE");

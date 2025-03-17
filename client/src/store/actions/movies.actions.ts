import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";

/// * from slice
import { actions } from "../reducers/movies.reducer";

export const {
  MOVIES_GENRES_FETCHING,
  MOVIES_GENRES_SET,
  MOVIES_DETAILS_FETCHING,
  MOVIES_DETAILS_SET,
  MOVIES_LIST_FETCHING,
  MOVIES_LIST_SET,
  MOVIES_RESET,
} = actions;

export const MOVIES_GENRES_GET = createAction("movies/MOVIES_GENRES_GET");

export const MOVIES_LIST_GET: ActionCreatorWithPayload<{ query: string }> =
  createAction("movies/MOVIES_LIST_GET");

export const MOVIES_DETAILS_GET: ActionCreatorWithPayload<{ movieId: string }> =
  createAction("movies/MOVIES_DETAILS_GET");

import express from "express";

import { IUserWithoutPassword } from "./User.types";
import { TMDB } from "./TMDB.types";

export * from "./User.types";
export * from "./TMDB.types";

export interface IRequestWithAuth extends express.Request {
  user?: IUserWithoutPassword;
}

export interface IMovieListResult extends TMDB.MovieList {
  query: string;
}

export interface IMovieListPayload {
  query: string;
  page: number;
}

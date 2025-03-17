import express from "express";

import { IUserWithoutPassword } from "./User.types";

export * from "./User.types";
export * from "./TMDB.types";

export interface IRequestWithAuth extends express.Request {
  user?: IUserWithoutPassword;
}

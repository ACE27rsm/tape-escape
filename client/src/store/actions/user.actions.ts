import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import {
  IUserLoginPayload,
  IUserWithoutPassword,
} from "../../../../types/User.types";

/// * from slice
import { actions } from "../reducers/user.reducer";

export const { USER_SET, USER_RESET, USER_FETCHING, USER_ERROR } = actions;

export const USER_LOGIN: ActionCreatorWithPayload<IUserLoginPayload> =
  createAction("user/USER_LOGIN");

export const USER_LOGIN_TASKS: ActionCreatorWithPayload<IUserWithoutPassword> =
  createAction("user/USER_LOGIN_TASKS");

export const USER_LOGOUT = createAction("user/USER_LOGOUT");

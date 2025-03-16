import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import { IUserLoginPayload } from "../../../../types/User.types";

/// * from slice
import { actions } from "../reducers/user.reducer";

export const { USER_SET, USER_RESET, USER_FETCHING, USER_ERROR } = actions;

export const USER_LOGIN =
  createAction<ActionCreatorWithPayload<IUserLoginPayload>>("user/USER_LOGIN");

export const USER_LOGOUT = createAction("user/USER_LOGOUT");

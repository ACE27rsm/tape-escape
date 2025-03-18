import { createSlice } from "@reduxjs/toolkit";
import { IUserWithoutPassword } from "../../../../types/User.types";

export type TStatus = "init" | "starting" | "loading" | "intro" | "ready";

const init = () => ({
  fetching: false,
  username: "",
  firstName: "",
  lastName: "",
  avatar: "",
  error: "",
});

const slice = createSlice({
  name: "user",
  initialState: init(),
  reducers: {
    /// o *******************************************************
    USER_FETCHING: (user, { payload }: { payload: boolean }) => {
      user.fetching = payload;
    },

    /// o *******************************************************
    USER_ERROR: (user, { payload }: { payload: string }) => {
      user.username = "";
      user.firstName = "";
      user.lastName = "";
      user.avatar = "";
      user.error = payload;
    },

    /// o *******************************************************
    USER_SET: (user, { payload }: { payload: IUserWithoutPassword }) => {
      user.username = payload.username;
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.avatar = payload.avatar;
      user.error = "";
    },

    /// o *******************************************************
    USER_RESET: (user) => {
      user.fetching = false;
      user.username = "";
      user.firstName = "";
      user.lastName = "";
      user.avatar = "";
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

import { createSlice } from "@reduxjs/toolkit";

export type TStatus =
  | "init"
  | "loading"
  | "intro"
  | "login"
  | "ready";

export interface IUIState {
  status: TStatus;
}

const init = (): IUIState => ({
  status: "login",
});

const slice = createSlice({
  name: "ui",
  initialState: init(),
  reducers: {
    UI_STATUS: (ui, { payload }: { payload: TStatus }) => {
      ui.status = payload;
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

import { createSlice } from "@reduxjs/toolkit";

export type TStatus =
  | "init"
  | "starting"
  | "loading"
  | "intro"
  | "login"
  | "ready";

export interface IUIState {
  status: TStatus;
}

const init = (): IUIState => ({
  status: "intro",
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

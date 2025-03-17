import { createSlice } from "@reduxjs/toolkit";

export type TStatus = "init" | "loading" | "ready";

export interface IUIState {
  status: TStatus;
}

const init = (): IUIState => ({
  status: "ready",
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

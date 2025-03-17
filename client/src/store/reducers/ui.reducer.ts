import { createSlice } from "@reduxjs/toolkit";

export type TStatus = "init" | "loading" | "ready";

export interface IUIState {
  status: TStatus;
  blueScreen: boolean;
}

const init = (): IUIState => ({
  status: "ready",
  blueScreen: false,
});

const slice = createSlice({
  name: "ui",
  initialState: init(),
  reducers: {
    UI_STATUS: (ui, { payload }: { payload: TStatus }) => {
      ui.status = payload;
    },

    UI_BLUE_SCREEN: (ui, { payload }: { payload: boolean }) => {
      ui.blueScreen = payload;
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

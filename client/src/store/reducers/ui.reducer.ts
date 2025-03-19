import { createSlice } from "@reduxjs/toolkit";

export type TStatus = "init" | "loading" | "ready";

export interface IUIState {
  status: TStatus;
  blueScreen: string;
}

const init = (): IUIState => ({
  status: "init",
  blueScreen: "",
});

const slice = createSlice({
  name: "ui",
  initialState: init(),
  reducers: {
    UI_STATUS: (ui, { payload }: { payload: TStatus }) => {
      ui.status = payload;
    },

    UI_BLUE_SCREEN: (ui, { payload }: { payload: string }) => {
      ui.blueScreen = payload;
    },
  },
});

export default slice.reducer;

export const { actions } = slice;

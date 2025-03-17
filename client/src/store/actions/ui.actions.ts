import { createAction, ActionCreatorWithPayload } from "@reduxjs/toolkit";

/// * from slice
import { actions } from "../reducers/ui.reducer";

export const { UI_STATUS, UI_BLUE_SCREEN } = actions;

export const UI_SEND_TEST_REQUEST = createAction("ui/UI_SEND_TEST_REQUEST");

export const UI_SOCKET_START = createAction("ui/UI_SOCKET_START");
export const UI_SOCKET_STOP = createAction("ui/UI_SOCKET_STOP");

export const UI_ERROR_HANDLER: ActionCreatorWithPayload<any> = createAction(
  "ui/UI_ERROR_HANDLER"
);

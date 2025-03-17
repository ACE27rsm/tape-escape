import { Reducer } from "@reduxjs/toolkit";
import { RouterState } from "redux-first-history";

/// ! reducers
import uiReducer from "./ui.reducer";
import userReducer from "./user.reducer";

const reducer = (routerReducer: Reducer<RouterState>) => ({
  ui: uiReducer,
  user: userReducer,
  router: routerReducer,
});

export default reducer;

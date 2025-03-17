import { Reducer } from "@reduxjs/toolkit";
import { RouterState } from "redux-first-history";

/// ! reducers
import moviesReducer from "./movies.reducer";
import uiReducer from "./ui.reducer";
import userReducer from "./user.reducer";

const reducer = (routerReducer: Reducer<RouterState>) => ({
  movies: moviesReducer,
  ui: uiReducer,
  user: userReducer,
  router: routerReducer,
});

export default reducer;

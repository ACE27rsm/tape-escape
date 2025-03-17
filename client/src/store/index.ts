import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

/// * store configuration
import { runSaga } from "./middlewares/sagas";
import middleware from "./middlewares";
import reducer from "./reducers";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

export const makeStore = () => {
  const store = configureStore({
    middleware: middleware(routerMiddleware),
    reducer: reducer(routerReducer),
  });

  return store;
};

export const store = makeStore();
export const history = createReduxHistory(store);
runSaga();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

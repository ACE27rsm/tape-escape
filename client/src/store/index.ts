import { configureStore } from "@reduxjs/toolkit";

/// * store configuration
import { runSaga } from "./middlewares/sagas";
import middleware from "./middlewares";
import reducer from "./reducers";

export const makeStore = () => {
  const store = configureStore({
    middleware,
    reducer,
  });
  runSaga();

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../../store/";
import { HistoryRouter } from "redux-first-history/rr6";

/// * store
import { history } from "../../store";

/// * components
import Dispatchers from "./ReduxProvider.Dispatchers";

const store: AppStore = makeStore();

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Dispatchers />
        {children}
      </HistoryRouter>
    </Provider>
  );
};

export default ReduxProvider;

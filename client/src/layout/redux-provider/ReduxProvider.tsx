import { ReactNode, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";

/// * store
import { history, store } from "../../store";

/// * components
import Dispatchers from "./ReduxProvider.Dispatchers";
import { History } from "history";
import { Router } from "react-router";

export type Props = {
  basename?: string;
  history: History;
  children?: ReactNode;
};

export const HistoryRouter = (props: Props) => {
  const { basename, children, history } = props;
  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setHistoryState), [history]);

  return (
    <Router
      basename={basename}
      location={historyState.location}
      navigationType={historyState.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

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

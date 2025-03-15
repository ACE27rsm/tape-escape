import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../../store/";

/// * components
import Dispatchers from "./ReduxProvider.Dispatchers";

const store: AppStore = makeStore();

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Dispatchers />
      {children}
    </Provider>
  );
};

export default ReduxProvider;

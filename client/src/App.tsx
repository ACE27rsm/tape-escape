import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import Layout from "./layout/Layout";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

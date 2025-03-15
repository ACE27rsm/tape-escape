import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import Layout from "./layout/Layout";
import { Provider as ChakraProvider } from "./components/ui/provider";
import ReduxProvider from "./layout/redux-provider/ReduxProvider";

function App() {
  return (
    <ReduxProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;

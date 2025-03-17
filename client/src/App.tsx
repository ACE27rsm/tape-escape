import { Route, Routes } from "react-router";
import { Provider as ChakraProvider } from "./components/ui/provider";
import ReduxProvider from "./layout/redux-provider/ReduxProvider";

/// * components
import Layout from "./layout/Layout";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protect-route/ProtectRoute";
import Intro from "./components/intro/Intro";

function App() {
  return (
    <ReduxProvider>
      <ChakraProvider>
        <Layout>
          <Routes>
            <Route path="/">
              <Route path="" element={<Intro />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<ProtectedRoute />} />
            </Route>
          </Routes>
        </Layout>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
